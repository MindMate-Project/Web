import React, { useEffect, useState, useCallback } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
    CircleMarker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "./leaflet-overrides.css";
import "./Location.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import useLocationState from "../../../hook/location/useLocationState";
import useSafeZone from "../../../hook/location/useSafeZone";
import useDeviceStatus from "../../../hook/location/useDeviceStatus";
import useEmergencySnooze from "../../../hook/location/useEmergencySnooze";

// Fix duplicate marker issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetinaUrl,
    shadowUrl: markerShadowUrl,
});

// Custom green/gold marker for safe zone center
const createSafeZoneIcon = (isEditing) => {
    return new L.Icon({
        iconUrl: isEditing 
            ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png'
            : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

// Custom red marker for patient
const createPatientIcon = (patient, isInsideCurrentZone) => {
    return new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

function MapUpdater({ center, zoom, mapId }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [center[0], center[1], zoom, map, mapId]);
    return null;
}

function MapClickHandler({ onMapClick, enabled }) {
    useMapEvents({
        click(e) {
            if (enabled) {
                onMapClick([e.latlng.lat, e.latlng.lng]);
            }
        },
    });
    return null;
}

export default function Location() {
    const {
        patients,
        centerPosition,
        mapZoom,
        mapId,
        handlePatientClick,
    } = useLocationState();

    const {
        loading: safeZoneLoading,
        error: safeZoneError,
        success: safeZoneSuccess,
        setSafeZone,
        removeSafeZone,
        clearMessages,
    } = useSafeZone();

    const currentPatient = patients.length > 0 ? patients[0] : null;

    const [selectedPatientId] = useState(
        localStorage.getItem("selectedPatientId") || null
    );

    // ─── Device status (safe zone check via API) ───
    const { safeZone: apiSafeZone } = useDeviceStatus(selectedPatientId || currentPatient?.id);
    
    // ─── Snooze status ───
    const { isSnoozed, snoozeUntil, snooze, clearSnooze } = useEmergencySnooze(selectedPatientId || currentPatient?.id);

    // ─── Safe Zone & UI State ───
    const [szRadius, setSzRadius] = useState(500);
    const [szHasExisting, setSzHasExisting] = useState(false);
    const [alarmMuted, setAlarmMuted] = useState(false);
    const [patientExpanded, setPatientExpanded] = useState(false);
    const [szEditing, setSzEditing] = useState(false);
    const [szPickingCenter, setSzPickingCenter] = useState(false);
    const [szCenter, setSzCenter] = useState(null);
    const [snoozeMenuOpen, setSnoozeMenuOpen] = useState(false);

    const handleSnooze = (hours) => {
        snooze(hours);
        setSnoozeMenuOpen(false);
    };

    // ─── Desktop Map Layer & Keyboard States ───
    const [mapStyle, setMapStyle] = useState("street");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
            const key = e.key.toLowerCase();
            if (key === "r") {
                if (currentPatient) handlePatientClick(currentPatient);
            } else if (key === "s") {
                setSzEditing((prev) => {
                    const next = !prev;
                    if (next) setPatientExpanded(false);
                    return next;
                });
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPatient, handlePatientClick]);

    // ─── Haversine: is patient inside safe zone? ───
    const isInsideSafeZone = (() => {
        if (!currentPatient?.position || !szCenter || !szRadius) return null;
        const [pLat, pLng] = currentPatient.position;
        const [sLat, sLng] = szCenter;
        const R = 6371000;
        const dLat = ((pLat - sLat) * Math.PI) / 180;
        const dLng = ((pLng - sLng) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((sLat * Math.PI) / 180) *
                Math.cos((pLat * Math.PI) / 180) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return distance <= szRadius;
    })();


    // ─── Emergency Siren Sound (Web Audio API) ───
    useEffect(() => {
        if (isInsideSafeZone === false && !alarmMuted && !isSnoozed) {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Handle browser autoplay restriction: resume audio context on first user click
            if (audioCtx.state === "suspended") {
                const resumeAudio = () => {
                    audioCtx.resume();
                    window.removeEventListener("click", resumeAudio);
                };
                window.addEventListener("click", resumeAudio);
            }

            const interval = setInterval(() => {
                try {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.type = "sine";
                    // 880Hz (A5 pitch) creates a clear, medical-grade alert pulse
                    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
                    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
                    
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start();
                    osc.stop(audioCtx.currentTime + 0.4);
                } catch (e) {
                    console.warn("Audio Context error:", e);
                }
            }, 1200);

            return () => {
                clearInterval(interval);
                audioCtx.close().catch(() => {});
            };
        }
    }, [isInsideSafeZone, alarmMuted, isSnoozed]);

    // Extract primitive values for stable dependencies
    const szLat = apiSafeZone?.lat;
    const szLng = apiSafeZone?.lng;
    const szRad = apiSafeZone?.radiusMeters;
    const patientId = currentPatient?.id;

    // Sync existing safe zone from patient data only when values actually change
    useEffect(() => {
        if (szLat !== undefined && szLng !== undefined) {
            setSzCenter([szLat, szLng]);
            setSzRadius(szRad);
            setSzHasExisting(true);
        } else {
            setSzCenter(null);
            setSzRadius(500);
            setSzHasExisting(false);
        }
    }, [szLat, szLng, szRad, patientId]);

    // Clear messages after 4s
    useEffect(() => {
        if (safeZoneSuccess || safeZoneError) {
            const timer = setTimeout(() => clearMessages(), 4000);
            return () => clearTimeout(timer);
        }
    }, [safeZoneSuccess, safeZoneError, clearMessages]);

    const handleMapClick = useCallback((latlng) => {
        setSzCenter(latlng);
        setSzPickingCenter(false);
    }, []);

    const handleSaveSafeZone = async () => {
        if (!currentPatient || !szCenter) return;
        try {
            await setSafeZone(currentPatient.id, {
                lat: szCenter[0],
                lng: szCenter[1],
                radiusMeters: szRadius,
            });
            setSzHasExisting(true);
            setSzEditing(false);
        } catch {
            // error already set in hook
        }
    };

    const handleRemoveSafeZone = async () => {
        if (!currentPatient) return;
        try {
            await removeSafeZone(currentPatient.id);
            setSzCenter(null);
            setSzRadius(500);
            setSzHasExisting(false);
            setSzEditing(false);
        } catch {
            // error already set in hook
        }
    };

    const handleUseCurrentLocation = () => {
        if (currentPatient?.position) {
            setSzCenter([...currentPatient.position]);
        }
    };



    // ─── Empty State ───
    if (patients && patients.length === 0) {
        return (
            <div className="location-container empty-state">
                <div className="empty-state-content">
                    <div className="empty-state-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        <div className={`location-container ${isInsideSafeZone === false && !isSnoozed ? 'emergency-mode' : ''}`}>
            <div className="location-header">
                <div className="location-header-left">
                    <div className="location-header-info">
                        <h1>Live Location Tracking</h1>
                        <p>Real-Time Patient Location Monitoring</p>
                    </div>
                    {isInsideSafeZone === false && !isSnoozed && (
                        <div className="emergency-alert-banner">
                            <svg className="emergency-warning-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <div>
                                <strong>EMERGENCY ALERT</strong><br />
                                Patient has breached the safe zone!
                            </div>
                            
                            <div className="location-emergency-actions">
                                <button 
                                    className="emergency-mute-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setAlarmMuted(prev => !prev);
                                    }}
                                >
                                    {alarmMuted ? "🔊 Unmute" : "🔇 Mute"}
                                </button>
                            </div>
                        </div>
                    )}
                    {isSnoozed && (
                        <div className="snoozed-alert-banner">
                            <svg className="snoozed-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <div>
                                <strong>ALARM SNOOZED</strong><br />
                                With Caregiver until {snoozeUntil ? new Date(snoozeUntil).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                            </div>
                            <button 
                                className="cancel-snooze-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearSnooze();
                                }}
                            >
                                Resume Alarms
                            </button>
                        </div>
                    )}
                </div>

                {currentPatient && (
                    <div className="sz-header-container" style={{ gap: '15px' }}>
                        <div className="location-snooze-wrapper">
                            <button 
                                className={`sz-trigger-btn ${isSnoozed ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSnoozeMenuOpen(!snoozeMenuOpen);
                                }}
                            >
                                <span className="sz-trigger-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                </span>
                                <span className="sz-trigger-text">Caregiver</span>
                                <span className={`sz-trigger-badge ${isSnoozed ? 'safe' : 'inactive'}`}>
                                    {isSnoozed ? 'Active' : 'Off'}
                                </span>
                            </button>
                            
                            {snoozeMenuOpen && (
                                <div className="emergency-snooze-menu" onClick={(e) => e.stopPropagation()} style={{ top: '100%', right: '0', left: 'auto', marginTop: '10px' }}>
                                    <div className="snooze-menu-header">{isSnoozed ? "Edit Caregiver Period" : "Set Caregiver Period"}</div>
                                    <button className="snooze-option" onClick={() => handleSnooze(1)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        1 Hour
                                    </button>
                                    <button className="snooze-option" onClick={() => handleSnooze(3)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        3 Hours
                                    </button>
                                    <button className="snooze-option" onClick={() => handleSnooze(24)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        1 Day
                                    </button>
                                    <div className="snooze-custom">
                                        <div className="snooze-custom-inputs">
                                            <input 
                                                type="number" 
                                                min="0" 
                                                placeholder="Days" 
                                                id="locCustomSnoozeDays"
                                            />
                                            <input 
                                                type="number" 
                                                min="0" 
                                                placeholder="Hrs" 
                                                id="locCustomSnoozeHrs"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const d = parseInt(document.getElementById('locCustomSnoozeDays').value || 0, 10);
                                                const h = parseInt(document.getElementById('locCustomSnoozeHrs').value || 0, 10);
                                                const totalHours = (d * 24) + h;
                                                if (totalHours > 0) handleSnooze(totalHours);
                                            }}
                                        >
                                            Set
                                        </button>
                                    </div>
                                    {isSnoozed && (
                                        <button 
                                            className="snooze-option" 
                                            style={{ color: '#ef4444', borderTop: '1px solid #e2e8f0', marginTop: '4px', paddingTop: '8px' }}
                                            onClick={() => {
                                                clearSnooze();
                                                setSnoozeMenuOpen(false);
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            Remove Caregiver
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <button 
                            className={`sz-trigger-btn ${szEditing ? "active" : ""}`}
                            onClick={() => {
                                setSzEditing(prev => !prev);
                                setPatientExpanded(false);
                            }}
                        >
                            <span className="sz-trigger-icon">🛡️</span>
                            <span className="sz-trigger-text">Safe Zone</span>
                            <span className={`sz-trigger-badge ${
                                szHasExisting
                                    ? isInsideSafeZone ? "safe" : "alert"
                                    : "inactive"
                            }`}>
                                {szHasExisting
                                    ? isInsideSafeZone ? "Active" : "Breached"
                                    : "Off"}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            <div className="location-content">
                <div className="map-wrapper relative-map-wrapper">
                    <div className="map-inner-container">
                        <MapContainer
                            center={centerPosition}
                            zoom={mapZoom}
                            className="map-container"
                            zoomControl={window.innerWidth > 768}
                            attributionControl={false}
                        >
                            <MapUpdater center={centerPosition} zoom={mapZoom} mapId={mapId} />
                            <MapClickHandler onMapClick={handleMapClick} enabled={szPickingCenter} />
                             <TileLayer
                                 url={
                                     mapStyle === "satellite"
                                         ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                         : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                 }
                                 attribution={
                                     mapStyle === "satellite"
                                         ? "Tiles &copy; Esri &mdash; Source: Esri"
                                         : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                 }
                             />

                             {/* Patient markers */}
                             {patients.map((patient) => (
                                 <div key={patient.id}>
                                     <Marker
                                         position={patient.position}
                                         icon={createPatientIcon(
                                             patient,
                                             patient.id === currentPatient?.id ? isInsideSafeZone : undefined
                                         )}
                                         zIndexOffset={1000}
                                         riseOnHover={true}
                                         eventHandlers={{ click: () => handlePatientClick(patient) }}
                                     >
                                        <Popup>
                                            <div className="popup-content">
                                                <h3>{patient.name}</h3>
                                                <p>
                                                    <strong>Status:</strong>{" "}
                                                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                                                        {patient.status}
                                                    </span>
                                                </p>
                                                <p className="popup-time">
                                                    {patient.isOffline ? (
                                                        <span>Last active at {patient.lastUpdated.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                                                    ) : (
                                                        <span>Active now ({patient.lastUpdated.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })})</span>
                                                    )}
                                                </p>
                                                {patient.battery !== null && patient.battery !== undefined && (
                                                    <p className="popup-battery">🔋 {patient.battery}%</p>
                                                )}
                                            </div>
                                        </Popup>
                                    </Marker>
                                    {!patient.isOffline && (
                                        <CircleMarker
                                            center={patient.position}
                                            radius={30}
                                            weight={2}
                                            color={patient.status === "Alert" ? "#ef4444" : "#10b981"}
                                            fillOpacity={0.1}
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Safe Zone Circle + center marker */}
                            {szCenter && (
                                <>
                                    <Circle
                                        center={szCenter}
                                        radius={szRadius}
                                        pathOptions={{
                                            color: isInsideSafeZone === false ? "#ef4444" : "#10b981",
                                            fillColor: isInsideSafeZone === false ? "#ef4444" : "#10b981",
                                            fillOpacity: 0.06,
                                            weight: 2.5,
                                            dashArray: "10 6",
                                        }}
                                    />
                                     <Marker
                                         position={szCenter}
                                         icon={createSafeZoneIcon(szEditing)}
                                         draggable={szEditing}
                                         zIndexOffset={500}
                                         riseOnHover={true}
                                        eventHandlers={{
                                            dragend: (e) => {
                                                const { lat, lng } = e.target.getLatLng();
                                                setSzCenter([lat, lng]);
                                            },
                                        }}
                                    >
                                        <Popup>
                                            <div className="popup-content">
                                                <h3>Safe Zone Center</h3>
                                                <p>Radius: {szRadius}m</p>
                                                <p>{szCenter[0].toFixed(6)}, {szCenter[1].toFixed(6)}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </>
                            )}
                        </MapContainer>

                        {/* Recenter Button */}
                        {currentPatient && (
                            <button
                                className="map-recenter-btn"
                                onClick={() => handlePatientClick(currentPatient)}
                                title="Recenter on Patient"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="3" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                </svg>
                            </button>
                        )}

                         {/* Map Layer Switcher */}
                         <div className="map-style-switcher">
                             <button
                                 className={`map-style-btn ${mapStyle === "street" ? "active" : ""}`}
                                 onClick={() => setMapStyle("street")}
                                 title="Street View"
                             >
                                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                     <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                                     <line x1="9" y1="3" x2="9" y2="18" />
                                     <line x1="15" y1="6" x2="15" y2="21" />
                                 </svg>
                             </button>
                             <button
                                 className={`map-style-btn ${mapStyle === "satellite" ? "active" : ""}`}
                                 onClick={() => setMapStyle("satellite")}
                                 title="Satellite View"
                             >
                                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                     <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                     <line x1="12" y1="22.08" x2="12" y2="12" />
                                 </svg>
                             </button>
                         </div>

                         {/* Keyboard Shortcuts Guide */}
                         <div className="map-shortcuts-guide">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                                 <line x1="6" y1="8" x2="6" y2="8" />
                                 <line x1="10" y1="8" x2="10" y2="8" />
                                 <line x1="14" y1="8" x2="14" y2="8" />
                                 <line x1="18" y1="8" x2="18" y2="8" />
                                 <line x1="6" y1="12" x2="6" y2="12" />
                                 <line x1="10" y1="12" x2="10" y2="12" />
                                 <line x1="14" y1="12" x2="14" y2="12" />
                                 <line x1="18" y1="12" x2="18" y2="12" />
                                 <line x1="7" y1="16" x2="17" y2="16" />
                             </svg>
                             <span>Shortcuts: <b>R</b> Recenter · <b>S</b> Edit Zone</span>
                         </div>

                        {/* Picking mode banner */}
                        {szPickingCenter && (
                            <div className="sz-picking-overlay">
                                <div className="sz-picking-banner">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Click on the map to set safe zone center
                                    <button className="sz-picking-cancel" onClick={() => setSzPickingCenter(false)}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {/* Patient info card — bottom-left */}
                        {currentPatient && (
                            <div
                                className={`new-patient-card-overlay ${patientExpanded ? "expanded" : "collapsed"}`}
                                onClick={(e) => {
                                    // On mobile, clicking the collapsed card expands it instead of centering map
                                    if (window.innerWidth <= 768 && !patientExpanded) {
                                        e.stopPropagation();
                                        setPatientExpanded(true);
                                        setSzEditing(false); // Collapse Safe Zone when expanding patient card
                                    } else {
                                        handlePatientClick(currentPatient);
                                    }
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                {patientExpanded && <div className="mobile-drawer-handle" />}
                                <button
                                    className="npc-close-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPatientExpanded(false);
                                    }}
                                >
                                    ✕
                                </button>
                                 <div className={`npc-safe-zone ${
                                     currentPatient.status === "Alert" || (isInsideSafeZone === false && !isSnoozed)
                                         ? "outside"
                                         : isSnoozed
                                             ? "inside"
                                             : szHasExisting && isInsideSafeZone
                                                 ? "inside"
                                                 : currentPatient.isOffline
                                                     ? "offline"
                                                     : "online"
                                 }`}>
                                     {currentPatient.status === "Alert"
                                         ? "⚠ Alert"
                                         : szHasExisting
                                           ? isSnoozed 
                                              ? "⏸ With Caregiver" 
                                              : isInsideSafeZone ? "✓ In Safe Zone" : "✕ Outside Zone"
                                           : currentPatient.isOffline ? "Offline" : "Online"}
                                 </div>
                                <div className="npc-main">
                                    <div className="npc-avatar">
                                        {currentPatient.name.charAt(0).toUpperCase()}
                                        <span className={`npc-status-dot ${
                                            currentPatient.isOffline 
                                                ? "offline" 
                                                : currentPatient.status === "Alert" 
                                                    ? "alert" 
                                                    : "online"
                                        }`} />
                                    </div>
                                    <div className="npc-info">
                                        <h3>{currentPatient.name}</h3>
                                        <p className="npc-address">
                                            <span className="npc-icon">
                                                <svg width="12" height="16" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 0C3.13401 0 0 3.13401 0 7C0 12.25 7 18 7 18C7 18 14 12.25 14 7C14 3.13401 10.866 0 7 0ZM7 9.5C5.61929 9.5 4.5 8.38071 4.5 7C4.5 5.61929 5.61929 4.5 7 4.5C8.38071 4.5 9.5 5.61929 9.5 7C9.5 8.38071 8.38071 9.5 7 9.5Z" fill="#ef4444" />
                                                </svg>
                                            </span>
                                            {currentPatient.position[0].toFixed(6)}, {currentPatient.position[1].toFixed(6)}
                                        </p>
                                        <p className="npc-time">
                                            <span className="npc-icon">
                                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.99992 1.33331C4.31992 1.33331 1.33325 4.31998 1.33325 7.99998C1.33325 11.68 4.31992 14.6666 7.99992 14.6666C11.6799 14.6666 14.6666 11.68 14.6666 7.99998C14.6666 4.31998 11.6799 1.33331 7.99992 1.33331ZM7.99992 13.3333C5.05325 13.3333 2.66659 10.9466 2.66659 7.99998C2.66659 5.05331 5.05325 2.66665 7.99992 2.66665C10.9466 2.66665 13.3333 5.05331 13.3333 7.99998C13.3333 10.9466 10.9466 13.3333 7.99992 13.3333ZM8.33325 3.99998H7.33325V8.66665L11.3333 11.0666L11.8333 10.2666L8.33325 8.13331V3.99998Z" fill="#a3a6ad" />
                                                </svg>
                                            </span>
                                            {currentPatient.lastUpdated.toLocaleString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ═══════ SAFE ZONE ASIDE — bottom-right ═══════ */}
                {currentPatient && szEditing && !szPickingCenter && (
                    <div className="sz-aside expanded">
                        {/* ── Header / Close ── */}
                        <div className="sz-aside-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Safe Zone Settings</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSzEditing(false);
                                }}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* ── Edit Panel ── */}
                        <div className="sz-aside-body">
                            {/* Status banner */}
                            {szHasExisting && isInsideSafeZone !== null && (
                                <div className={`sz-status-pill ${isInsideSafeZone ? "safe" : "alert"}`}>
                                    <span className="sz-status-pill-dot"></span>
                                    {isInsideSafeZone
                                        ? "Patient is inside the safe zone"
                                        : "Patient is outside the safe zone!"}
                                </div>
                            )}

                            {/* Center Point */}
                            <div className="sz-field">
                                <label className="sz-field-label">Center Point</label>
                                {szCenter ? (
                                    <div className="sz-coords-box">
                                        <div className="sz-coord">
                                            <span className="sz-coord-k">LAT</span>
                                            <span className="sz-coord-v">{szCenter[0].toFixed(6)}</span>
                                        </div>
                                        <div className="sz-coord-divider"></div>
                                        <div className="sz-coord">
                                            <span className="sz-coord-k">LNG</span>
                                            <span className="sz-coord-v">{szCenter[1].toFixed(6)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="sz-coords-empty">
                                        No center point set
                                    </div>
                                )}
                                <div className="sz-center-btns">
                                    <button
                                        className={`sz-small-btn ${szPickingCenter ? "active" : ""}`}
                                        onClick={() => setSzPickingCenter((p) => !p)}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {szPickingCenter ? "Picking…" : "Pick on Map"}
                                    </button>
                                    <button className="sz-small-btn" onClick={handleUseCurrentLocation}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <circle cx="12" cy="12" r="3" />
                                            <line x1="12" y1="2" x2="12" y2="6" />
                                            <line x1="12" y1="18" x2="12" y2="22" />
                                            <line x1="2" y1="12" x2="6" y2="12" />
                                            <line x1="18" y1="12" x2="22" y2="12" />
                                        </svg>
                                        Patient Pos
                                    </button>
                                </div>
                            </div>

                            {/* Radius */}
                            <div className="sz-field">
                                <label className="sz-field-label">
                                    Radius
                                    <div className="sz-radius-input-wrapper">
                                        <input
                                            type="number"
                                            className="sz-radius-input"
                                            value={szRadius}
                                            onChange={(e) => setSzRadius(Number(e.target.value))}
                                            min={10}
                                            max={50000}
                                        />
                                        <span>m</span>
                                    </div>
                                </label>
                                <input
                                    type="range"
                                    className="sz-slider"
                                    min={10}
                                    max={1000}
                                    step={10}
                                    value={szRadius}
                                    onChange={(e) => setSzRadius(Number(e.target.value))}
                                />
                                <div className="sz-slider-ends">
                                    <span>10m</span>
                                    <span>1km</span>
                                </div>
                                <div className="sz-presets">
                                    {[10, 20, 40, 100, 500].map((v) => (
                                        <button
                                            key={v}
                                            className={`sz-chip ${szRadius === v ? "active" : ""}`}
                                            onClick={() => setSzRadius(v)}
                                        >
                                            {v >= 1000 ? `${v / 1000}km` : `${v}m`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Messages */}
                            {safeZoneSuccess && (
                                <div className="sz-msg sz-msg-ok">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    {safeZoneSuccess}
                                </div>
                            )}
                            {safeZoneError && (
                                <div className="sz-msg sz-msg-err">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                                    {safeZoneError}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="sz-btn-row">
                                <button
                                    className="sz-btn-save"
                                    onClick={handleSaveSafeZone}
                                    disabled={!szCenter || safeZoneLoading}
                                >
                                    {safeZoneLoading ? (
                                        <span className="sz-spinner"></span>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    )}
                                    {szHasExisting ? "Update" : "Save"}
                                </button>
                                {szHasExisting && (
                                    <button
                                        className="sz-btn-delete"
                                        onClick={handleRemoveSafeZone}
                                        disabled={safeZoneLoading}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
