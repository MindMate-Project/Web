import "./DashboardMain.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    CircleMarker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import useGetAllPatients from "../../hook/patient/get-all-patients-hook";
import useGetAllReminders from "../../hook/reminder/get-all-reminders-hook";
import useLocationState from "../../hook/location/useLocationState";

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
    const patients = allPatients?.data ?? [];

    // Read initial patient from localStorage
    const [selectedPatientId, setSelectedPatientId] = useState(
        localStorage.getItem("selectedPatientId") || null,
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    useEffect(() => {
        if (selectedPatientId) {
            fetchReminders(selectedPatientId);
        }
    }, [selectedPatientId, fetchReminders]);

    const selectedPatient =
        patients?.find((p) => p.patientId === selectedPatientId) ?? null;

    const handleSelectPatient = (patient) => {
        const id = patient.patientId;
        setSelectedPatientId(id);
        localStorage.setItem("selectedPatientId", id); // Save immediately to localStorage
        setDropdownOpen(false);
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

    return (
        <div className="dashboard">
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
                                className="patient-dropdown-trigger"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                <div className="patient-dropdown-avatar">
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
                                                className={`patient-dropdown-item ${selectedPatientId === patient._id ? "active" : ""}`}
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
                                                    patient._id && (
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
                                                <td>
                                                    {appt.doctorName || "-"}
                                                </td>
                                                <td>{appt.specialty || "-"}</td>
                                                <td>
                                                    {formatDate(
                                                        appt.scheduledTime,
                                                    )}
                                                </td>
                                                <td>
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
                                                <td>
                                                    {appt.appointmentType ||
                                                        "-"}
                                                </td>
                                                <td>{appt.location || "-"}</td>
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
                                                <td>
                                                    {med.medicineName ||
                                                        med.name ||
                                                        "-"}
                                                </td>
                                                <td>{med.dosage || "-"}</td>
                                                <td>{med.frequency || "-"}</td>
                                                <td>
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
                                                <td>
                                                    {med.timesPerDay || "-"}
                                                </td>
                                                <td>
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
                                className="btn-view"
                                onClick={() =>
                                    navigate("/api/dashboard/location")
                                }
                            >
                                View
                            </button>
                        </div>
                        <div className="map-card-container">
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
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                />
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
                                                                    ? `Last active: ${patient.lastUpdated.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}`
                                                                    : `Active now: ${patient.lastUpdated.toLocaleString([], { hour: "2-digit", minute: "2-digit" })}`}
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
                                                            patient.status ===
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
                            <div className="location-overlay">
                                <div
                                    className="location-info-popup"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        trackedPatient &&
                                        handlePatientClick(trackedPatient)
                                    }
                                >
                                    <div className="patient-avatar-large">
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
                                                    ? `${trackedPatient.position[0].toFixed(4)}, ${trackedPatient.position[1].toFixed(4)}`
                                                    : "Location unavailable"}
                                            </p>
                                        </div>
                                        <div className="location-row text-time">
                                            <span className="clock-icon">
                                                🕒
                                            </span>
                                            <p>
                                                {trackedPatient?.lastUpdated
                                                    ? new Date(
                                                          trackedPatient.lastUpdated,
                                                      ).toLocaleTimeString([], {
                                                          hour: "2-digit",
                                                          minute: "2-digit",
                                                      })
                                                    : "Time unavailable"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`safe-zone-tag ${trackedPatient?.status === "Offline" ? "offline" : ""}`}
                                    >
                                        {trackedPatient?.status || "Safe Zone"}
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
