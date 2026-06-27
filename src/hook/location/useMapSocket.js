import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useMapSocket(patients) {
    const [liveLocations, setLiveLocations] = useState({});
    const socketRef = useRef(null);

    useEffect(() => {
        // Only initialize if we have patients
        if (!patients || patients.length === 0) return;

        // Connect socket with authentication
        const token = localStorage.getItem("token");
        const socket = io('https://alzaheimer-backend.onrender.com', {
            transports: ['websocket'],
            auth: {
                token: token
            }
        });
        socketRef.current = socket;

        // Subscribe to all patient rooms
        patients.forEach((patient) => {
            const id = patient.patientId || patient._id;
            if (id) {
                socket.emit('subscribe:patient', id);
            }
        });

        // Listen for location updates
        socket.on('location-update', (payload) => {
            console.log('Location update:', payload);
            setLiveLocations((prev) => ({
                ...prev,
                [payload.patientId]: {
                    position: [payload.latitude, payload.longitude],
                    lastUpdated: payload.timestamp ? new Date(payload.timestamp) : new Date(),
                    battery: payload.battery,
                    safeZone: payload.lat !== undefined && payload.lng !== undefined && payload.radiusMeters !== undefined ? {
                        lat: payload.lat,
                        lng: payload.lng,
                        radiusMeters: payload.radiusMeters
                    } : null
                },
            }));
        });

        // Cleanup on unmount
        return () => {
            patients.forEach((patient) => {
                const id = patient.patientId || patient._id;
                if (id) {
                    socket.emit('leave:patient', id);
                }
            });
            socket.disconnect();
            socketRef.current = null;
        };
    }, [patients]);

    // HTTP Polling fallback (runs every 10 seconds)
    useEffect(() => {
        if (!patients || patients.length === 0) return;

        const pollLocation = async () => {
            // Only use HTTP fallback if the socket is not connected
            if (socketRef.current?.connected) {
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) return;

            for (const patient of patients) {
                const id = patient.patientId || patient._id;
                if (!id) continue;

                try {
                    const timestamp = new Date().getTime();
                    const res = await fetch(`https://alzaheimer-backend.onrender.com/api/device/location/${id}?t=${timestamp}`, {
                        headers: { Authorization: `Bearer ${token}` },
                        cache: 'no-store'
                    });
                    const result = await res.json();
                    
                    if (result.status === "success" && result.data?.location) {
                        setLiveLocations((prev) => {
                            const existing = prev[id];
                            const newTime = result.data.updatedAt ? new Date(result.data.updatedAt) : new Date();
                            const newPos = [result.data.location.lat, result.data.location.lng];
                            
                            let shouldUpdate = false;
                            if (!existing) {
                                shouldUpdate = true;
                            } else {
                                const oldPos = existing.position;
                                const posChanged = !oldPos || oldPos[0] !== newPos[0] || oldPos[1] !== newPos[1];
                                const timeChanged = newTime > existing.lastUpdated;
                                if (posChanged || timeChanged) {
                                    shouldUpdate = true;
                                }
                            }
                            
                            // Only update if the HTTP data is newer or coords changed
                            if (shouldUpdate) {
                                return {
                                    ...prev,
                                    [id]: {
                                        ...(existing || {}),
                                        position: newPos,
                                        lastUpdated: newTime > (existing?.lastUpdated || 0) ? newTime : new Date(),
                                        battery: result.data.battery !== undefined ? result.data.battery : existing?.battery,
                                    }
                                };
                            }
                            return prev;
                        });
                    }
                } catch (err) {
                    console.error("HTTP Polling error for patient", id, err);
                }
            }
        };

        const interval = setInterval(pollLocation, 15000);
        pollLocation(); // initial fetch

        return () => clearInterval(interval);
    }, [patients]);

    return { liveLocations, socket: socketRef.current };
}
