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

function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        // Only fly if coordinates actually changed
        map.flyTo(center, zoom, { duration: 1.5 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center[0], center[1], zoom, map]);
    return null;
}

export default function Location() {
    const {
        patients,
        selectedPatient,
        centerPosition,
        mapZoom,
        handlePatientClick,
    } = useLocationState();

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
                    <h2>No Patients to Track</h2>
                    <p>
                        You currently don't have any patients assigned to your
                        care or their tracking devices are not currently
                        broadcasting locations.
                    </p>
                </div>
            </div>
        );
    }

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
                        zoom={mapZoom}
                        className="map-container"
                    >
                        <MapUpdater center={centerPosition} zoom={mapZoom} />
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
                                                        {patient.lastUpdated.toLocaleTimeString()}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        Active now (
                                                        {patient.lastUpdated.toLocaleTimeString()}
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
                                <div className="patient-avatar-wrapper">
                                    <img
                                        src={patient.imageCover || father}
                                        alt={patient.name}
                                        className="patient-avatar-img"
                                    />
                                </div>
                                <div className="patient-info">
                                    <h3>{patient.name}</h3>
                                    <p className="patient-location">
                                        📍 {patient.position[0].toFixed(4)},{" "}
                                        {patient.position[1].toFixed(4)}
                                    </p>
                                    <p className="patient-time">
                                        🕐{" "}
                                        {patient.isOffline ? (
                                            <span>
                                                Last active{" "}
                                                {patient.lastUpdated.toLocaleTimeString()}
                                            </span>
                                        ) : (
                                            <span>Active now</span>
                                        )}
                                    </p>
                                    {patient.battery !== null &&
                                        patient.battery !== undefined && (
                                            <p className="patient-battery">
                                                🔋 {patient.battery}%
                                            </p>
                                        )}
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
