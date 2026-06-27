import "./DashboardMain.css";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Circle,
    CircleMarker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import useGetAllPatients from "../../hook/patient/get-all-patients-hook";
import useGetAllReminders from "../../hook/reminder/get-all-reminders-hook";
import useLocationState from "../../hook/location/useLocationState";
import useDeviceStatus from "../../hook/location/useDeviceStatus";
import useEmergencySnooze from "../../hook/location/useEmergencySnooze";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix duplicate marker issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetinaUrl,
    shadowUrl: markerShadowUrl,
});

// Custom red icon for patient marker
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom green icon for safe zone center
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function MapUpdater({ center, zoom, mapId }) {
    const map = useMap();
    const lat = center ? center[0] : null;
    const lng = center ? center[1] : null;

    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], zoom, { duration: 1.5 });
        }
    }, [lat, lng, zoom, map, mapId]);
    return null;
}

function DashboardPage() {
    const navigate = useNavigate();
    const allPatients = useGetAllPatients();
    const patients = useMemo(() => allPatients?.data ?? [], [allPatients]);

    // Read initial patient from localStorage
    const [selectedPatientId, setSelectedPatientId] = useState(
        localStorage.getItem("selectedPatientId") || null,
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [emergencyDismissed, setEmergencyDismissed] = useState(false);
    const [snoozeMenuOpen, setSnoozeMenuOpen] = useState(false);
    const [mapStyle, setMapStyle] = useState("street");

    const { reminders, fetchReminders } = useGetAllReminders();

    // Get live location state
    const {
        patients: locationPatients,
        centerPosition,
        mapZoom,
        mapId,
        handlePatientClick,
    } = useLocationState();
    const trackedPatient = locationPatients?.[0]; // live data for selected patient

    // ─── Device status (safe zone check via API) ───
    const { safeZone: apiSafeZone } = useDeviceStatus(selectedPatientId);
    
    // ─── Snooze state ───
    const { isSnoozed, snooze } = useEmergencySnooze(selectedPatientId);

    // Haversine formula — returns distance in meters between two lat/lng points
    const haversineDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371000; // Earth radius in meters
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLng = ((lng2 - lng1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    let isOutsideSafeZone = false;
    const currentPosition = trackedPatient?.position ? [...trackedPatient.position] : null;
    
    if (currentPosition && apiSafeZone) {
        const pLat = Number(currentPosition[0]);
        const pLng = Number(currentPosition[1]);
        const sLat = Number(apiSafeZone.lat);
        const sLng = Number(apiSafeZone.lng);
        const radius = Number(apiSafeZone.radiusMeters);
        
        const distance = haversineDistance(pLat, pLng, sLat, sLng);
        isOutsideSafeZone = distance > radius;
    }

    // Auto-select first patient if none is selected
    useEffect(() => {
        if (!selectedPatientId && patients.length > 0) {
            const firstId = patients[0].patientId || patients[0]._id;
            if (firstId) {
                setSelectedPatientId(firstId);
                localStorage.setItem("selectedPatientId", firstId);
            }
        }
    }, [patients, selectedPatientId]);

    useEffect(() => {
        if (selectedPatientId) {
            fetchReminders(selectedPatientId);
        }
    }, [selectedPatientId, fetchReminders]);

    // Reset emergency dismissed when patient changes
    useEffect(() => {
        setEmergencyDismissed(false);
        setSnoozeMenuOpen(false);
    }, [selectedPatientId, isOutsideSafeZone]);

    const selectedPatient =
        patients?.find((p) => (p.patientId || p._id) === selectedPatientId) ?? null;

    const handleSelectPatient = (patient) => {
        const id = patient.patientId || patient._id;
        setSelectedPatientId(id);
        localStorage.setItem("selectedPatientId", id); // Save immediately to localStorage
        setDropdownOpen(false);
    };

    // ─── Emergency state ───
    const isEmergency = isOutsideSafeZone && !emergencyDismissed && !isSnoozed;

    const handleSnooze = (hours) => {
        snooze(hours);
        setSnoozeMenuOpen(false);
    };

    // Filter Reminders
    const allReminders = Array.isArray(reminders) ? reminders : [];
    const appointments = allReminders
        .filter((r) => r.type === "appointment")
        .slice(0, 3);
    const medicines = allReminders
        .filter((r) => r.type === "medication")
        .slice(0, 3);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // Determine the safe zone tag text and class
    const getSafeZoneInfo = () => {
        if (!apiSafeZone) return { text: trackedPatient?.status || "No Zone", className: "no-zone" };
        if (trackedPatient?.isOffline) return { text: "Offline", className: "offline" };
        if (isSnoozed) return { text: "With Caregiver", className: "safe" };
        if (isOutsideSafeZone) return { text: "Outside Safe Zone", className: "danger" };
        return { text: "In Safe Zone", className: "safe" };
    };

    const szInfo = getSafeZoneInfo();

    return (
        <div className={`dashboard ${isEmergency ? "dashboard-emergency" : ""}`}>
            {/* ── EMERGENCY BANNER ── */}
            {isEmergency && (
                <div className="emergency-banner">
                    <div className="emergency-banner-inner">
                        <div className="emergency-banner-left">
                            <div className="emergency-icon-pulse">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                    <line x1="12" y1="9" x2="12" y2="13"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                            </div>
                            <div className="emergency-banner-text">
                                <span className="emergency-banner-title">Emergency Alert</span>
                                <span className="emergency-banner-desc">
                                    <strong>{selectedPatient?.name || "Patient"}</strong> is outside the safe zone!
                                </span>
                            </div>
                        </div>
                        <div className="emergency-banner-actions">
                            <div className="emergency-snooze-wrapper">
                                <button
                                    className="emergency-btn-snooze"
                                    onClick={() => setSnoozeMenuOpen(!snoozeMenuOpen)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    With Caregiver?
                                </button>
                                
                                {snoozeMenuOpen && (
                                    <div className="emergency-snooze-menu">
                                        <div className="snooze-menu-header">Snooze Alert For</div>
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
                                                    id="customSnoozeDays"
                                                />
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    placeholder="Hrs" 
                                                    id="customSnoozeHrs"
                                                />
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    const d = parseInt(document.getElementById('customSnoozeDays').value || 0, 10);
                                                    const h = parseInt(document.getElementById('customSnoozeHrs').value || 0, 10);
                                                    const totalHours = (d * 24) + h;
                                                    if (totalHours > 0) handleSnooze(totalHours);
                                                }}
                                            >
                                                Set
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="emergency-btn-track"
                                onClick={() => navigate("/api/dashboard/location")}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="10" r="3"/>
                                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                                </svg>
                                Track Now
                            </button>
                            <button
                                className="emergency-btn-dismiss"
                                onClick={() => setEmergencyDismissed(true)}
                                title="Dismiss alert"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header with Patient Dropdown */}
            <div className="dashboard-header">
                <div className="dashboard-header-top">
                    <div>
                        <h2>Dashboard</h2>
                    </div>

                    {/* Patient Dropdown */}
                    <div className="patient-dropdown-group">
                        <span className="patient-dropdown-label">
                            Select Patient
                        </span>
                        <div className="patient-dropdown-wrapper">
                            <button
                                className={`patient-dropdown-trigger ${isEmergency ? "emergency-trigger" : ""}`}
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                <div className={`patient-dropdown-avatar ${isEmergency ? "emergency-avatar" : ""}`}>
                                    {selectedPatient ? (
                                        <img
                                            src={
                                                selectedPatient.image ||
                                                "https://i.pravatar.cc/150?img=0"
                                            }
                                            alt={selectedPatient.name}
                                        />
                                    ) : (
                                        <span className="patient-dropdown-placeholder-icon">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                <span className="patient-dropdown-name">
                                    {selectedPatient
                                        ? selectedPatient.name
                                        : "Select Patient"}
                                </span>
                                {isEmergency && (
                                    <span className="dropdown-emergency-dot" />
                                )}
                                <svg
                                    className={`patient-dropdown-chevron ${dropdownOpen ? "open" : ""}`}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="patient-dropdown-menu">
                                    {patients && patients.length > 0 ? (
                                        patients.map((patient, index) => (
                                            <div
                                                key={
                                                    patient._id ||
                                                    patient.id ||
                                                    index
                                                }
                                                className={`patient-dropdown-item ${selectedPatientId === (patient.patientId || patient._id) ? "active" : ""}`}
                                                onClick={() =>
                                                    handleSelectPatient(patient)
                                                }
                                            >
                                                <img
                                                    src={
                                                        patient.image ||
                                                        "https://i.pravatar.cc/150?img=0"
                                                    }
                                                    alt={patient.name}
                                                    className="patient-dropdown-item-avatar"
                                                />
                                                <div className="patient-dropdown-item-info">
                                                    <span className="patient-dropdown-item-name">
                                                        {patient.name}
                                                    </span>
                                                    <span className="patient-dropdown-item-age">
                                                        {patient.age
                                                            ? `${patient.age} yrs`
                                                            : ""}
                                                    </span>
                                                </div>
                                                {selectedPatientId ===
                                                    (patient.patientId || patient._id) && (
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="patient-dropdown-empty">
                                            No patients found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="dashboard-layout">
                {/* Left Column */}
                <div className="dashboard-left">
                    {/* Today's Appointments */}
                    <div className="dashboard-section">
                        <div className="section-head">
                            <h3>Today's Appointments</h3>
                            <button
                                className="btn-view"
                                onClick={() =>
                                    navigate("/api/dashboard/reminders")
                                }
                            >
                                View All
                            </button>
                        </div>
                        <div className="card scrollable-table-container">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>Doctor Name</th>
                                        <th>Specialty</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Purpose</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.length > 0 ? (
                                        appointments.map((appt, i) => (
                                            <tr key={appt._id || i}>
                                                <td data-label="Doctor Name">
                                                    {appt.doctorName || "-"}
                                                </td>
                                                <td data-label="Specialty">{appt.specialty || "-"}</td>
                                                <td data-label="Date">
                                                    {formatDate(
                                                        appt.scheduledTime,
                                                    )}
                                                </td>
                                                <td data-label="Time">
                                                    <span className="badge green-badge">
                                                        {appt.scheduledTime
                                                            ? new Date(
                                                                  appt.scheduledTime,
                                                              ).toLocaleTimeString(
                                                                  [],
                                                                  {
                                                                      hour: "2-digit",
                                                                      minute: "2-digit",
                                                                  },
                                                              )
                                                            : "-"}
                                                    </span>
                                                </td>
                                                <td data-label="Purpose">
                                                    {appt.appointmentType ||
                                                        "-"}
                                                </td>
                                                <td data-label="Location">{appt.location || "-"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "20px",
                                                }}
                                            >
                                                No upcoming appointments
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Today's Medicine */}
                    <div className="dashboard-section mt-25">
                        <div className="section-head">
                            <h3>Today's Medicine</h3>
                            <button
                                className="btn-view"
                                onClick={() =>
                                    navigate("/api/dashboard/reminders")
                                }
                            >
                                View All
                            </button>
                        </div>
                        <div className="card scrollable-table-container">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>Drug Name</th>
                                        <th>Dosage</th>
                                        <th>Frequency</th>
                                        <th>Time</th>
                                        <th>Times Per Day</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.length > 0 ? (
                                        medicines.map((med, i) => (
                                            <tr key={med._id || i}>
                                                <td data-label="Medicine Name">
                                                    {med.medicineName ||
                                                        med.name ||
                                                        "-"}
                                                </td>
                                                <td data-label="Dosage">{med.dosage || "-"}</td>
                                                <td data-label="Frequency">{med.frequency || "-"}</td>
                                                <td data-label="Time">
                                                    <span className="badge orange-badge">
                                                        {med.scheduledTime
                                                            ? new Date(
                                                                  med.scheduledTime,
                                                              ).toLocaleTimeString(
                                                                  [],
                                                                  {
                                                                      hour: "2-digit",
                                                                      minute: "2-digit",
                                                                  },
                                                              )
                                                            : "-"}
                                                    </span>
                                                </td>
                                                <td data-label="Times Per Day">
                                                    {med.timesPerDay || "-"}
                                                </td>
                                                <td data-label="Type">
                                                    {med.form ||
                                                        med.type ||
                                                        "-"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "20px",
                                                }}
                                            >
                                                No upcoming medicines
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (Live Location) */}
                <div className="dashboard-right">
                    <div className="dashboard-section">
                        <div className="section-head">
                            <h3>Live Location</h3>
                            <button
                                className={`btn-view ${isEmergency ? "btn-view-emergency" : ""}`}
                                onClick={() =>
                                    navigate("/api/dashboard/location")
                                }
                            >
                                {isEmergency ? "⚠ Track Now" : "View"}
                            </button>
                        </div>
                        <div className={`map-card-container ${isEmergency ? "map-emergency" : ""}`}>
                            <MapContainer
                                center={centerPosition || [30.0444, 31.2357]}
                                zoom={mapZoom || 13}
                                className="dashboard-map"
                                zoomControl={false}
                            >
                                <MapUpdater
                                    center={
                                        centerPosition || [30.0444, 31.2357]
                                    }
                                    zoom={mapZoom || 13}
                                    mapId={mapId}
                                />
                                <TileLayer
                                    url={
                                        mapStyle === "satellite"
                                            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    }
                                    attribution={
                                        mapStyle === "satellite"
                                            ? "Tiles &copy; Esri &mdash; Source: Esri"
                                            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    }
                                />

                                {/* Map Layer Switcher */}
                                <div className="dashboard-map-style-switcher">
                                    <button
                                        className={`dashboard-map-style-btn ${mapStyle === "street" ? "active" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMapStyle("street");
                                        }}
                                        title="Street View"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                                            <line x1="9" y1="3" x2="9" y2="18" />
                                            <line x1="15" y1="6" x2="15" y2="21" />
                                        </svg>
                                    </button>
                                    <button
                                        className={`dashboard-map-style-btn ${mapStyle === "satellite" ? "active" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMapStyle("satellite");
                                        }}
                                        title="Satellite View"
                                    >
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                            <line x1="12" y1="22.08" x2="12" y2="12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Safe zone circle overlay from API */}
                                {apiSafeZone && (
                                    <>
                                        <Circle
                                            center={[apiSafeZone.lat, apiSafeZone.lng]}
                                            radius={apiSafeZone.radiusMeters}
                                            pathOptions={{
                                                color: isOutsideSafeZone ? "#ef4444" : "#10b981",
                                                fillColor: isOutsideSafeZone ? "#ef4444" : "#10b981",
                                                fillOpacity: 0.06,
                                                weight: 2,
                                                dashArray: "8 5",
                                            }}
                                        />
                                        <Marker
                                            position={[apiSafeZone.lat, apiSafeZone.lng]}
                                            icon={greenIcon}
                                        >
                                            <Popup>
                                                <div className="popup-content">
                                                    <h3 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                                                        Safe Zone Center
                                                    </h3>
                                                    <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                                                        Radius: {apiSafeZone.radiusMeters}m
                                                    </p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </>
                                )}

                                {/* Patient markers */}
                                {locationPatients &&
                                    locationPatients.map((patient) => {
                                        if (!patient.position) return null;
                                        return (
                                            <div
                                                key={
                                                    patient.id ||
                                                    patient.patientId ||
                                                    Math.random()
                                                }
                                            >
                                                <Marker
                                                    position={patient.position}
                                                    icon={redIcon}
                                                    eventHandlers={{
                                                        click: () =>
                                                            handlePatientClick(
                                                                patient,
                                                            ),
                                                    }}
                                                >
                                                    <Popup>
                                                        <div className="popup-content">
                                                            <h3
                                                                style={{
                                                                    margin: "0 0 5px 0",
                                                                    fontSize:
                                                                        "14px",
                                                                }}
                                                            >
                                                                {patient.name}
                                                            </h3>
                                                            <p
                                                                style={{
                                                                    margin: "0 0 5px 0",
                                                                    fontSize:
                                                                        "12px",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Status:
                                                                </strong>{" "}
                                                                <span
                                                                    className={`status-badge ${patient.status.toLowerCase()}`}
                                                                    style={{
                                                                        fontWeight:
                                                                            "600",
                                                                        color:
                                                                            patient.status ===
                                                                            "Alert"
                                                                                ? "#ef4444"
                                                                                : patient.status ===
                                                                                    "Offline"
                                                                                  ? "#9ea0a5"
                                                                                  : "#10b981",
                                                                    }}
                                                                >
                                                                    {
                                                                        patient.status
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p
                                                                style={{
                                                                    margin: "0",
                                                                    fontSize:
                                                                        "11px",
                                                                    color: "#666",
                                                                }}
                                                            >
                                                                {patient.isOffline
                                                                    ? `Last active: ${patient.lastUpdated.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                                                                    : `Active now: ${patient.lastUpdated.toLocaleString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`}
                                                            </p>
                                                            {patient.battery !==
                                                                null &&
                                                                patient.battery !==
                                                                    undefined && (
                                                                    <p
                                                                        style={{
                                                                            margin: "5px 0 0 0",
                                                                            fontSize:
                                                                                "12px",
                                                                            fontWeight:
                                                                                "bold",
                                                                        }}
                                                                    >
                                                                        🔋{" "}
                                                                        {
                                                                            patient.battery
                                                                        }
                                                                        %
                                                                    </p>
                                                                )}
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                                {!patient.isOffline && (
                                                    <CircleMarker
                                                        center={
                                                            patient.position
                                                        }
                                                        radius={30}
                                                        weight={2}
                                                        color={
                                                            isOutsideSafeZone
                                                                ? "#ef4444"
                                                                : patient.status ===
                                                                "Alert"
                                                                    ? "#ef4444"
                                                                    : "#10b981"
                                                        }
                                                        fillOpacity={0.1}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                            </MapContainer>

                            {/* Patient info overlay */}
                            <div className="location-overlay">
                                <div
                                    className={`location-info-popup ${isEmergency ? "location-info-emergency" : ""}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        trackedPatient &&
                                        handlePatientClick(trackedPatient)
                                    }
                                >
                                    <div className={`patient-avatar-large ${isEmergency ? "avatar-emergency" : ""}`}>
                                        {trackedPatient &&
                                        trackedPatient.imageCover ? (
                                            <img
                                                src={trackedPatient.imageCover}
                                                alt={trackedPatient.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : trackedPatient?.name ? (
                                            trackedPatient.name
                                                .charAt(0)
                                                .toUpperCase()
                                        ) : (
                                            "U"
                                        )}
                                    </div>
                                    <div className="patient-location-details">
                                        <h4>
                                            {trackedPatient?.name ||
                                                "Unknown Patient"}
                                        </h4>
                                        <div className="location-row">
                                            <span className="pin-icon">📍</span>
                                            <p>
                                                {trackedPatient?.position
                                                    ? `${trackedPatient.position[0].toFixed(6)}, ${trackedPatient.position[1].toFixed(6)}`
                                                    : "Location unavailable"}
                                            </p>
                                        </div>
                                        <div className="location-row text-time">
                                            <span className="clock-icon">🕒</span>
                                            <p>
                                                {trackedPatient?.lastUpdated
                                                    ? new Date(trackedPatient.lastUpdated).toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                                    : "Time unavailable"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`safe-zone-tag ${szInfo.className}`}
                                    >
                                        {szInfo.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
