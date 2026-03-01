import { useNavigate } from "react-router-dom";
import "./PatientDetails.css";

export default function PatientDetails() {
    const navigate = useNavigate();

    // Sample patient data - replace with actual data from props/API
    const patient = {
        name: "Ahmed Ali",
        age: 75,
        image: "https://i.pravatar.cc/150?img=12",
        phone: "+20 102 358 9603",
        gender: "Male",
        location: "24 St. Nasr Street, Nasr City, Cairo, Egypt",
        email: "ahmad.k.ali@gmail.com",
        relationship: "Father",
        birthdate: "13 March 1951",
        medicalNotes: {
            diagnosis: "Alzheimer's Disease",
            stage: "Stage 2 (Mild Cognitive Decline)",
            chronicDiseases: ["Diabetes", "Hypertension"],
            allergies: "Penicillin",
            currentMedications: "Donepezil 10mg, Metformin 500mg",
        },
    };

    const handleBack = () => {
        navigate("/api/dashboard/patients");
    };

    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log("Edit patient");
    };

    const handleDelete = () => {
        // TODO: Implement delete functionality
        console.log("Delete patient");
    };

    return (
        <div className="patient-details-container">
            <button className="back-button" onClick={handleBack}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back To Patients
            </button>

            <div className="details-grid">
                {/* Basic Information Section */}
                <section className="basic-info">
                    <h2 className="section-title">Basic Information</h2>

                    <div className="basic-info-layout">
                        <div className="profile-section">
                            <img
                                src={patient.image}
                                alt={patient.name}
                                className="profile-image"
                            />
                            <div className="profile-name-age">
                                <h3>{patient.name}</h3>
                                <p>Age: {patient.age}</p>
                            </div>
                        </div>

                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-icon phone-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="info-value">
                                    {patient.phone}
                                </span>
                            </div>

                            <div className="info-item">
                                <div className="info-icon gender-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M20 9V5h-4M15 9l5-5M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 0v8m-3-3h6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="info-value">
                                    {patient.gender}
                                </span>
                            </div>

                            <div className="info-item full-width">
                                <div className="info-icon location-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx="12"
                                            cy="10"
                                            r="3"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                                <span className="info-value">
                                    {patient.location}
                                </span>
                            </div>

                            <div className="info-item full-width">
                                <div className="info-icon email-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M22 6l-10 7L2 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                                <span className="info-value">
                                    {patient.email}
                                </span>
                            </div>

                            <div className="info-item">
                                <div className="info-icon relationship-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="info-value">
                                    {patient.relationship}
                                </span>
                            </div>

                            <div className="info-item">
                                <div className="info-icon calendar-icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M16 2v4M8 2v4M3 10h18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <span className="info-value">
                                    {patient.birthdate}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Medical Notes Section */}
                <section className="medical-notes">
                    <h2 className="section-title">Medical Notes</h2>

                    <div className="medical-card">
                        <div className="medical-content">
                            <h3 className="medical-header">
                                Health Information
                            </h3>
                            <ul className="medical-list">
                                <li>
                                    <strong>Diagnosis:</strong>{" "}
                                    {patient.medicalNotes.diagnosis}
                                </li>
                                <li>
                                    <strong>Stage:</strong>{" "}
                                    {patient.medicalNotes.stage}
                                </li>
                                <li>
                                    <strong>Chronic Diseases:</strong>{" "}
                                    {patient.medicalNotes.chronicDiseases.join(
                                        ", ",
                                    )}
                                </li>
                                <li>
                                    <strong>Allergies:</strong>{" "}
                                    {patient.medicalNotes.allergies}
                                </li>
                                <li>
                                    <strong>Current Medications:</strong>{" "}
                                    {patient.medicalNotes.currentMedications}
                                </li>
                            </ul>
                        </div>

                        <div className="medical-actions">
                            <button className="edit-btn" onClick={handleEdit}>
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
