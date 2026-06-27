import { useState, useCallback } from "react";
import baseUrl from "../../API/baseURL";

/**
 * Hook to manage safe zone CRUD operations for a patient's device.
 *
 * API Endpoints:
 *   PATCH  /api/device/safe-zone/:patientId  — set / update safe zone
 *   DELETE /api/device/safe-zone/:patientId  — remove safe zone
 */
export default function useSafeZone() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const getAuthConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    /**
     * Set or update the safe zone for a patient.
     * @param {string} patientId
     * @param {{ lat: number, lng: number, radiusMeters: number }} safeZoneData
     */
    const setSafeZone = useCallback(async (patientId, safeZoneData) => {
        if (!patientId) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await baseUrl.patch(
                `/api/device/safe-zone/${patientId}`,
                safeZoneData,
                getAuthConfig()
            );
            setSuccess(res?.data?.message || "Safe zone updated successfully");
            return res;
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update safe zone";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Remove the safe zone for a patient.
     * @param {string} patientId
     */
    const removeSafeZone = useCallback(async (patientId) => {
        if (!patientId) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await baseUrl.delete(
                `/api/device/safe-zone/${patientId}`,
                getAuthConfig()
            );
            setSuccess(res?.data?.message || "Safe zone removed successfully");
            return res;
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to remove safe zone";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearMessages = useCallback(() => {
        setError(null);
        setSuccess(null);
    }, []);

    return {
        loading,
        error,
        success,
        setSafeZone,
        removeSafeZone,
        clearMessages,
    };
}
