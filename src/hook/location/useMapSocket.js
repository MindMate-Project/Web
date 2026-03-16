import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useMapSocket(patients) {
    const [liveLocations, setLiveLocations] = useState({});
    const socketRef = useRef(null);

    useEffect(() => {
        // Only initialize if we have patients
        if (!patients || patients.length === 0) return;

        // Connect socket
        const socket = io('https://alzaheimer-backend.onrender.com', {
            transports: ['websocket'],
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

    return { liveLocations, socket: socketRef.current };
}
