import { useState, useEffect } from 'react';

export default function useEmergencySnooze(patientId) {
    const [isSnoozed, setIsSnoozed] = useState(false);
    const [snoozeUntil, setSnoozeUntil] = useState(null);

    useEffect(() => {
        if (!patientId) {
            setIsSnoozed(false);
            setSnoozeUntil(null);
            return;
        }

        const checkSnooze = () => {
            const storedSnooze = localStorage.getItem(`snooze_emergency_${patientId}`);
            if (storedSnooze) {
                const snoozeTime = parseInt(storedSnooze, 10);
                if (Date.now() < snoozeTime) {
                    setIsSnoozed(true);
                    setSnoozeUntil(snoozeTime);
                } else {
                    localStorage.removeItem(`snooze_emergency_${patientId}`);
                    setIsSnoozed(false);
                    setSnoozeUntil(null);
                }
            } else {
                setIsSnoozed(false);
                setSnoozeUntil(null);
            }
        };

        checkSnooze();
        const interval = setInterval(checkSnooze, 5000); // Check frequently
        return () => clearInterval(interval);
    }, [patientId]);

    const snooze = (hours) => {
        if (!patientId) return;
        const time = Date.now() + hours * 60 * 60 * 1000;
        localStorage.setItem(`snooze_emergency_${patientId}`, time.toString());
        setIsSnoozed(true);
        setSnoozeUntil(time);
    };

    const clearSnooze = () => {
        if (!patientId) return;
        localStorage.removeItem(`snooze_emergency_${patientId}`);
        setIsSnoozed(false);
        setSnoozeUntil(null);
    };

    return { isSnoozed, snoozeUntil, snooze, clearSnooze };
}
