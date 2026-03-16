import "./DashboardMain.css";
import { useState } from "react";
import useGetAllPatients from "../../hook/patient/get-all-patients-hook";

function DashboardPage() {
    const allPatients = useGetAllPatients();
    const patients = allPatients?.data ?? [];
    
    // Read initial patient from localStorage
    const [selectedPatientId, setSelectedPatientId] = useState(
        localStorage.getItem("selectedPatientId") || null
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const selectedPatient =
        patients?.find((p) => p.patientId === selectedPatientId) ?? null;

    const handleSelectPatient = (patient) => {
        const id = patient.patientId;
        setSelectedPatientId(id);
        localStorage.setItem("selectedPatientId", id); // Save immediately to localStorage
        setDropdownOpen(false);
    };

    return (
        <div className="dashboard">
            {/* Header with Patient Dropdown */}
            <div className="dashboard-header">
                <div className="dashboard-header-top">
                    <div>
                        <h2>Dashboard</h2>
                        <p>Overview of your patient's status and activities</p>
                    </div>

                    {/* Patient Dropdown */}
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
                                            key={patient._id || patient.id || index}
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
                                            {selectedPatientId === patient._id && (
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

            {/* Grid */}
            <div className="dashboard-grid">
                <div className="card span-3">
                    <h3>Patients</h3>
                </div>

                <div className="card span-3">
                    <h3>Memory Bank</h3>
                </div>

                <div className="card span-2">
                    <h3>Live Location</h3>
                </div>

                <div className="card span-2">
                    <h3>Reminders</h3>
                </div>

                <div className="card span-2">
                    <h3>Reminders Status</h3>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
