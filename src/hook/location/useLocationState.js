import { useState, useMemo, useEffect } from "react";
import useGetAllPatients from "../patient/get-all-patients-hook";
import useMapSocket from "./useMapSocket";

export default function useLocationState() {
    const { patients: reduxPatients } = useGetAllPatients();
    const patientsList = useMemo(() => reduxPatients?.data || [], [reduxPatients]);
    const { liveLocations } = useMapSocket(patientsList);

    // Force re-render periodically so `isOffline` threshold is continuously re-evaluated
    // eslint-disable-next-line no-unused-vars
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 1000); 
        return () => clearInterval(interval);
    }, []);

    // Map Redux initial data with live socket updates
    const patients = useMemo(() => {
        return patientsList.map((patient) => {
            const liveData = liveLocations[patient._id];
            
            let initialPos = null; 
            let initialBattery = null;
            let initialTime = null;
            
            // 1. Fallback to nested device properties
            if (patient.device?.latitude && patient.device?.longitude) {
                initialPos = [patient.device.latitude, patient.device.longitude];
            }
            if (patient.device?.battery !== undefined) {
                initialBattery = patient.device.battery;
            }
            if (patient.device?.timestamp) {
                initialTime = new Date(patient.device.timestamp);
            }

            // 2. Either use live socket data OR fallback to initial setup from API 
            const currentPos = liveData?.position || initialPos;
            const currentBattery = liveData?.battery ?? initialBattery;
            const currentTime = liveData?.lastUpdated || initialTime || new Date();

            // 3. Mark offline if no ping in 10 seconds (~10,000ms)
            const isOffline = (Date.now() - currentTime.getTime()) > 10000;

            let finalStatus = "Safe";
            if (isOffline) {
                finalStatus = "Offline";
            } else if (currentBattery !== null && currentBattery < 20) {
                finalStatus = "Alert";
            }

            return {
                id: patient._id,
                name: patient.name,
                imageCover: patient.imageCover,
                position: currentPos,
                status: finalStatus,
                lastUpdated: currentTime,
                battery: currentBattery,
                isOffline: isOffline
            };
        }).filter(patient => patient.position !== null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientsList, liveLocations, tick]);

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [centerPosition, setCenterPosition] = useState([31.2357, 30.0444]); // Center of Cairo
    const [mapZoom, setMapZoom] = useState(4); // Default zoom

    useEffect(() => {
        // If a patient is selected, keep the map centered on their live location
        if (selectedPatient) {
            const updatedPatient = patients.find(p => p.id === selectedPatient.id);
            if (updatedPatient && updatedPatient.position) {
                setCenterPosition(updatedPatient.position);
                // Keep the current mapZoom, or force it to 16 if it was somehow zoomed out
                if (mapZoom < 16) {
                    setMapZoom(16);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patients, selectedPatient]);

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        setCenterPosition(patient.position);
        setMapZoom(16); // Zoom in on patient
    };

    return {
        patients,
        selectedPatient,
        centerPosition,
        mapZoom,
        handlePatientClick
    };
}
