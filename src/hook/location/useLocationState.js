import { useState, useMemo, useEffect } from "react";
import useGetPatientData from "../patient/get-patient-data-hook";
import useMapSocket from "./useMapSocket";

export default function useLocationState() {
    // 1. Get single patient from localStorage
    const patientId = localStorage.getItem("selectedPatientId");
    
    // 2. Fetch single patient data using your new hook
    const [patientData] = useGetPatientData(patientId);
    
    // 3. Since the socket hook expects an array of patients, wrap our single patient
    const patientsList = useMemo(() => {
        return patientData?.data ? [patientData.data] : [];
    }, [patientData]);

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
            const id = patient.patientId || patient._id;
            const liveData = liveLocations[id];
            
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
            } else if (patient.device?.updatedAt) {
                initialTime = new Date(patient.device.updatedAt);
            }

            // 2. Either use live socket data OR fallback to initial setup from API 
            let currentPos = liveData?.position || initialPos;
            if (currentPos && currentPos.length === 2) {
                currentPos = [
                    Number(Number(currentPos[0]).toFixed(6)),
                    Number(Number(currentPos[1]).toFixed(6))
                ];
            }

            const currentBattery = liveData?.battery ?? initialBattery;
            
            // If we have no timestamp at all, we assume it's offline. 
            // We use 0 (epoch) if there's no initialTime so it immediately reads as offline.
            const currentTime = liveData?.lastUpdated 
                ? new Date(liveData.lastUpdated) 
                : (initialTime ? new Date(initialTime) : new Date(0));

            // 3. Mark offline if no ping in 5 minutes (300,000ms)
            const isOffline = (Date.now() - currentTime.getTime()) > 300000;

            // Extract safe zone data from the device or live socket
            let safeZone = null;
            if (liveData?.safeZone) {
                safeZone = {
                    ...liveData.safeZone,
                    lat: Number(Number(liveData.safeZone.lat).toFixed(6)),
                    lng: Number(Number(liveData.safeZone.lng).toFixed(6))
                };
            } else if (patient.device?.safeZone) {
                const sz = patient.device.safeZone;
                if (sz.lat !== undefined && sz.lng !== undefined && sz.radiusMeters !== undefined) {
                    safeZone = {
                        lat: Number(Number(sz.lat).toFixed(6)),
                        lng: Number(Number(sz.lng).toFixed(6)),
                        radiusMeters: sz.radiusMeters,
                    };
                }
            }

            let finalStatus = "Online";
            if (isOffline) {
                finalStatus = "Offline";
            } else if (currentBattery !== null && currentBattery < 20) {
                finalStatus = "Alert";
            }

            return {
                id: id,
                name: patient.name,
                profilePicture: patient.profilePicture,
                position: currentPos,
                status: finalStatus,
                lastUpdated: currentTime,
                battery: currentBattery,
                isOffline: isOffline,
                safeZone: safeZone,
            };
        }).filter(patient => patient.position !== null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientsList, liveLocations, tick]);

    const [centerPosition, setCenterPosition] = useState([31.2357, 30.0444]); // Center of Cairo
    const [mapZoom, setMapZoom] = useState(4); // Default zoom
    const [mapId, setMapId] = useState(0); // Used to force recenter even if coords are same

    // Automatically follow the tracked patient's live location
    useEffect(() => {
        if (patients.length > 0) {
            const trackedPatient = patients[0];
            if (trackedPatient && trackedPatient.position) {
                setCenterPosition(trackedPatient.position);
                if (mapZoom < 16) {
                    setMapZoom(16);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patients]);

    const handlePatientClick = (patient) => {
        // Only trigger update if we actually click valid coordinates
        if (patient?.position) {
            setCenterPosition([...patient.position]); // spread forces new array reference
            setMapZoom(16); // Zoom in on patient
            setMapId(prev => prev + 1); // Force map updater even if coords are same
        }
    };

    return {
        patients,
        centerPosition,
        mapZoom,
        mapId,
        handlePatientClick
    };
}
