import React, { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "./leaflet-overrides.css";
import "./Location.css";
import father from "./../../../images/father.jpg";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import useLocationState from "../../../hook/location/useLocationState";

// Fix duplicate marker issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetinaUrl,
    shadowUrl: markerShadowUrl,
});

function MapUpdater({ center, zoom, mapId }) {
    const map = useMap();
    useEffect(() => {
        // Fly to coordinates whenever center, zoom, or explicit mapId changes
        map.flyTo(center, zoom, { duration: 1.5 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center[0], center[1], zoom, map, mapId]);
    return null;
}

export default function Location() {
    const {
        patients,
        centerPosition,
        mapZoom,
        mapId, // Use this to force map updater when clicked
        handlePatientClick
    } = useLocationState();

    const currentPatient = patients.length > 0 ? patients[0] : null;

    if (patients && patients.length === 0) {
        return (
            <div className="location-container empty-state">
                <div className="empty-state-content">
                    <div className="empty-state-icon">
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                            <path d="M2 12h20"></path>
                            <path d="M12 20c-5.5 0-10-4.5-10-10"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </div>
                    <h2>No Location Data Available</h2>
                    <p>
                        You haven't selected a patient from the dashboard or their tracking device is not currently broadcasting locations.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="location-container">
            <div className="location-header">
                <div className="location-header-info">
                    <h1>Live Location Tracking</h1>
                    <p>Real-time location for {currentPatient?.name || "Patient"}</p>
                </div>
            </div>

            <div className="location-content">
                {/* Map Section */}
                <div className="map-wrapper">
                    <MapContainer
                        center={centerPosition}
                        zoom={mapZoom}
                        className="map-container"
                    >
                        <MapUpdater center={centerPosition} zoom={mapZoom} mapId={mapId} />
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
                                        click: () => handlePatientClick(patient),
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
                                                {patient.isOffline ? (
                                                    <span>
                                                        Last active at{" "}
                                                        {patient.lastUpdated.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        Active now (
                                                        {patient.lastUpdated.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        )
                                                    </span>
                                                )}
                                            </p>
                                            {patient.battery !== null &&
                                                patient.battery !==
                                                    undefined && (
                                                    <p className="popup-battery">
                                                        🔋 {patient.battery}%
                                                    </p>
                                                )}
                                        </div>
                                    </Popup>
                                </Marker>

                                {/* Accuracy circle around marker - only show if active */}
                                {!patient.isOffline && (
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
                                )}
                            </div>
                        ))}
                    </MapContainer>
                </div>

                {/* Patient Tracked Info Card */}
                {currentPatient && (
                    <div className="patient-list-wrapper">
                        <div className="patient-list-header">
                            <h2>Tracked Patient</h2>
                        </div>
    
                        <div className="patient-list">
                            <div 
                                className="patient-card active" 
                                style={{ cursor: "pointer" }}
                                onClick={() => handlePatientClick(currentPatient)}
                            >
                                <div className="patient-avatar-wrapper">
                                    <img
                                        src={currentPatient.imageCover || father}
                                        alt={currentPatient.name}
                                        className="patient-avatar-img"
                                    />
                                </div>
                                <div className="patient-info">
                                    <h3>{currentPatient.name}</h3>
                                    <p className="patient-location">
                                        📍 {currentPatient.position[0].toFixed(4)},{" "}
                                        {currentPatient.position[1].toFixed(4)}
                                    </p>
                                    <p className="patient-time">
                                        🕐{" "}
                                        {currentPatient.isOffline ? (
                                            <span>
                                                Last active{" "}
                                                {currentPatient.lastUpdated.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        ) : (
                                            <span>Active now</span>
                                        )}
                                    </p>
                                </div>
                                <div
                                    className={`status-indicator ${currentPatient.status.toLowerCase()}`}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
