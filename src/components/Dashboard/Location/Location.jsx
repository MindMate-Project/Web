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
// import father from "./../../../images/father.jpg";

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
        handlePatientClick,
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
                        You haven't selected a patient from the dashboard or
                        their tracking device is not currently broadcasting
                        locations.
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
                    <p>Real-Time Patient Location Monitoring</p>
                </div>
            </div>

            <div className="location-content">
                {/* Map Section */}
                <div className="map-wrapper relative-map-wrapper">
                    <div className="map-inner-container">
                        <MapContainer
                            center={centerPosition}
                            zoom={mapZoom}
                            className="map-container"
                        >
                            <MapUpdater
                                center={centerPosition}
                                zoom={mapZoom}
                                mapId={mapId}
                            />
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
                                                    {patient.isOffline ? (
                                                        <span>
                                                            Last active at{" "}
                                                            {patient.lastUpdated.toLocaleString(
                                                                [],
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                },
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            Active now (
                                                            {patient.lastUpdated.toLocaleString(
                                                                [],
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                },
                                                            )}
                                                            )
                                                        </span>
                                                    )}
                                                </p>
                                                {patient.battery !== null &&
                                                    patient.battery !==
                                                        undefined && (
                                                        <p className="popup-battery">
                                                            🔋 {patient.battery}
                                                            %
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

                        {/* Patient Tracked Info Card Overlay */}
                        {currentPatient && (
                            <div
                                className="new-patient-card-overlay"
                                onClick={() =>
                                    handlePatientClick(currentPatient)
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <div
                                    className={`npc-safe-zone ${!currentPatient.isOffline ? "active-safe-zone" : ""}`}
                                >
                                    {currentPatient.status === "Alert"
                                        ? "Alert"
                                        : "Safe Zone"}
                                </div>
                                <div className="npc-main">
                                    <div className="npc-avatar">
                                        {currentPatient.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <div className="npc-info">
                                        <h3>{currentPatient.name}</h3>
                                        <p className="npc-address">
                                            <span className="npc-icon">
                                                <svg
                                                    width="12"
                                                    height="16"
                                                    viewBox="0 0 14 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M7 0C3.13401 0 0 3.13401 0 7C0 12.25 7 18 7 18C7 18 14 12.25 14 7C14 3.13401 10.866 0 7 0ZM7 9.5C5.61929 9.5 4.5 8.38071 4.5 7C4.5 5.61929 5.61929 4.5 7 4.5C8.38071 4.5 9.5 5.61929 9.5 7C9.5 8.38071 8.38071 9.5 7 9.5Z"
                                                        fill="#ef4444"
                                                    />
                                                </svg>
                                            </span>
                                            Home -{" "}
                                            {currentPatient.position[0].toFixed(
                                                4,
                                            )}
                                            ,{" "}
                                            {currentPatient.position[1].toFixed(
                                                4,
                                            )}
                                        </p>
                                        <p className="npc-time">
                                            <span className="npc-icon">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M7.99992 1.33331C4.31992 1.33331 1.33325 4.31998 1.33325 7.99998C1.33325 11.68 4.31992 14.6666 7.99992 14.6666C11.6799 14.6666 14.6666 11.68 14.6666 7.99998C14.6666 4.31998 11.6799 1.33331 7.99992 1.33331ZM7.99992 13.3333C5.05325 13.3333 2.66659 10.9466 2.66659 7.99998C2.66659 5.05331 5.05325 2.66665 7.99992 2.66665C10.9466 2.66665 13.3333 5.05331 13.3333 7.99998C13.3333 10.9466 10.9466 13.3333 7.99992 13.3333ZM8.33325 3.99998H7.33325V8.66665L11.3333 11.0666L11.8333 10.2666L8.33325 8.13331V3.99998Z"
                                                        fill="#a3a6ad"
                                                    />
                                                </svg>
                                            </span>
                                            {currentPatient.lastUpdated.toLocaleString(
                                                [],
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
