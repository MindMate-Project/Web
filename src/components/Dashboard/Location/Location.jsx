import { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "./leaflet-overrides.css";
import "./Location.css";

// Fix for default Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetinaUrl,
    shadowUrl: markerShadowUrl,
});

// Fake patient locations data
const FAKE_PATIENTS = [
    {
        id: 1,
        name: "Mahmoud Abdellah",
        position: [31.292065171184845, 30.052141946294228],
        status: "Safe",
        lastUpdated: new Date(),
    },
    {
        id: 2,
        name: "Ahmed Ali",
        position: [31.292794528727995, 30.053607203719388],
        status: "Safe",
        lastUpdated: new Date(),
    },
];

export default function Location() {
    const [patients, setPatients    ] = useState(FAKE_PATIENTS);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [centerPosition, setCenterPosition] = useState([31.2357, 30.0444]); // Center of Cairo

    // // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPatients((prevPatients) =>
                prevPatients.map((patient) => ({
                    ...patient,
                    position: [
                        patient.position[0] + (Math.random() - 0.5) * 0.01,
                        patient.position[1] + (Math.random() - 0.5) * 0.01,
                    ],
                    lastUpdated: new Date(),
                })),
            );
        }, 3000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        setCenterPosition(patient.position);
    };

    return (
        <div className="location-container">
            <div className="location-header">
                <h1>Live Location Tracking</h1>
                <p>Real-time patient location monitoring</p>
            </div>

            <div className="location-content">
                {/* Map Section */}
                <div className="map-wrapper">
                    <MapContainer
                        center={centerPosition}
                        zoom={4}
                        className="map-container"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Render patient markers */}
                        {patients.map((patient) => (
                            <div key={patient.id}>
                                <Marker
                                    position={patient.position}
                                    eventHandlers={{
                                        click: () =>
                                            handlePatientClick(patient),
                                    }}
                                >
                                    <Popup>
                                        <div className="popup-content">
                                            <h3>{patient.name}</h3>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    className={`status-badge ${patient.status.toLowerCase()}`}
                                                >
                                                    {patient.status}
                                                </span>
                                            </p>
                                            <p className="popup-time">
                                                {patient.lastUpdated.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </Popup>
                                </Marker>

                                {/* Accuracy circle around marker */}
                                <CircleMarker
                                    center={patient.position}
                                    radius={30}
                                    weight={2}
                                    color={
                                        patient.status === "Alert"
                                            ? "#ef4444"
                                            : "#10b981"
                                    }
                                    fillOpacity={0.1}
                                />
                            </div>
                        ))}
                    </MapContainer>
                </div>

                {/* Patient List Section */}
                <div className="patient-list-wrapper">
                    <div className="patient-list-header">
                        <h2>Patients List</h2>
                        <span className="patient-count">{patients.length}</span>
                    </div>

                    <div className="patient-list">
                        {patients.map((patient) => (
                            <div
                                key={patient.id}
                                className={`patient-card ${
                                    selectedPatient?.id === patient.id
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => handlePatientClick(patient)}
                            >
                                <div className="patient-avatar">
                                    {patient.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="patient-info">
                                    <h3>{patient.name}</h3>
                                    <p className="patient-location">
                                        📍 {patient.position[0].toFixed(4)},{" "}
                                        {patient.position[1].toFixed(4)}
                                    </p>
                                    <p className="patient-time">
                                        🕐{" "}
                                        {patient.lastUpdated.toLocaleTimeString()}
                                    </p>
                                </div>
                                <div
                                    className={`status-indicator ${patient.status.toLowerCase()}`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
