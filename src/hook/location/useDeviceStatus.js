import { useState, useEffect, useCallback, useRef } from "react";
import baseUrl from "../../API/baseURL";

/**
 * Hook that fetches a patient's device location and safe zone.
 *
 * API Endpoints:
 *   GET /api/device/location/:patientId    — get live GPS coords
 *   GET /api/device/safe-zone/:patientId   — get safe zone center + radius
 */
export default function useDeviceStatus(patientId) {
    const [deviceLocation, setDeviceLocation] = useState(null); // { lat, lng }
    const [safeZone, setSafeZone] = useState(null); // { lat, lng, radiusMeters }
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const intervalRef = useRef(null);

    const getAuthConfig = useCallback(() => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }), []);

    const fetchStatus = useCallback(async () => {
        if (!patientId) return;

        try {
            // Fetch both in parallel
            const [locationRes, safeZoneRes] = await Promise.allSettled([
                baseUrl.get(`/api/device/location/${patientId}`, getAuthConfig()),
                baseUrl.get(`/api/device/safe-zone/${patientId}`, getAuthConfig()),
            ]);

            // Extract device location
            let loc = null;
            if (locationRes.status === "fulfilled") {
                const data = locationRes.value?.data?.data;
                if (data?.location?.lat !== undefined && data?.location?.lng !== undefined) {
                    loc = { 
                        lat: Number(Number(data.location.lat).toFixed(6)), 
                        lng: Number(Number(data.location.lng).toFixed(6)),
                        lastUpdated: data?.updatedAt || data?.device?.updatedAt || null
                    };
                }
            }
            setDeviceLocation(loc);

            // Extract safe zone
            let sz = null;
            if (safeZoneRes.status === "fulfilled") {
                const data = safeZoneRes.value?.data?.data;
                if (data?.homeLocation?.lat !== undefined &&
                    data?.homeLocation?.lng !== undefined &&
                    data?.homeLocation?.radiusMeters !== undefined) {
                    sz = {
                        lat: Number(Number(data.homeLocation.lat).toFixed(6)),
                        lng: Number(Number(data.homeLocation.lng).toFixed(6)),
                        radiusMeters: data.homeLocation.radiusMeters,
                    };
                }
            }
            setSafeZone(sz);
            setError(null);
        } catch (err) {
            console.error("useDeviceStatus fetch error:", err);
            setError(err?.response?.data?.message || err?.message || "Failed to fetch device status");
            setSafeZone(null);
        }
    }, [patientId, getAuthConfig]);

    // Initial fetch + polling every 10 seconds
    useEffect(() => {
        if (!patientId) {
            setDeviceLocation(null);
            setSafeZone(null);
            return;
        }

        setLoading(true);
        fetchStatus().finally(() => setLoading(false));

        // Poll every 10 seconds for live updates
        intervalRef.current = setInterval(() => {
            fetchStatus();
        }, 10000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [patientId, fetchStatus]);

    return {
        deviceLocation,
        safeZone,
        loading,
        error,
        refetch: fetchStatus,
    };
}
