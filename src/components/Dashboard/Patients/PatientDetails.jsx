import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import "./PatientDetails.css";
import useGetPatientData from "../../../hook/patient/get-patient-data-hook";
import useDeletePatient from "../../../hook/patient/delete-patient-hook";
import { useParams } from "react-router-dom";
import dateToAge, { formatDate } from "./../../../components/utils/dateToAge";
import father from "./../../../images/father.jpg";
import "./DeleteModal.css";

export default function PatientDetails() {
    const navigate = useNavigate();
    const params = useParams();
    const [patientData] = useGetPatientData(params.id);
    const patient = patientData?.data;
    
    // Delete Hook and Modal State
    const [executeDelete, isDeleting] = useDeletePatient();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleBack = () => {
        navigate("/api/dashboard/patients");
    };

    const handleEdit = () => {
        if (patient?._id) {
            navigate(`/api/dashboard/patients/${patient._id}/edit`);
        }   
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = async () => {
        if (patient?._id) {
            await executeDelete(patient._id);
            setIsDeleteModalOpen(false);
            navigate("/api/dashboard/patients");
        }
    };

    // Prevent rendering if data hasn't loaded
    if (!patient) {
        return (
            <div className="patient-details-container">
                <p>Loading patient...</p>
            </div>
        );
    }

    return (
        <div className="patient-details-container">
            <button className="back-button" onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M19 12H5M5 12L12 19M5 12L12 5"
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
                                src={patient.imageCover || father}
                                alt={patient.name}
                                className="profile-image"
                            />
                            <div className="profile-name-age">
                                <h3>{patient.name}</h3>
                                <p>
                                    Age:{" "}
                                    {patient.dateOfBirth
                                        ? dateToAge(patient.dateOfBirth)
                                        : "N/A"}
                                </p>
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
                                    {patient.phoneNumber || "N/A"}
                                </span>
                            </div>

                            <div className="info-item">
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
                                    {patient.address || "N/A"}
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
                                    {patient.relationship || "N/A"}
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
                                    {patient.gender || "N/A"}
                                </span>
                            </div>

                            <div className="info-item">
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
                                    {patient.email || "N/A"}
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
                                    {patient.dateOfBirth
                                        ? formatDate(patient.dateOfBirth)
                                        : "N/A"}
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
                                    {patient.medicalNotes?.diagnosis || "N/A"}
                                </li>
                                <li>
                                    <strong>Stage:</strong>{" "}
                                    {patient.medicalNotes?.stage || "N/A"}
                                </li>
                                <li>
                                    <strong>Chronic Diseases:</strong>{" "}
                                    {patient.medicalNotes?.chronicDiseases?.length
                                        ? patient.medicalNotes.chronicDiseases.join(", ")
                                        : "N/A"}
                                </li>
                                <li>
                                    <strong>Allergies:</strong>{" "}
                                    {patient.medicalNotes?.allergies?.length
                                        ? patient.medicalNotes.allergies.join(", ")
                                        : "N/A"}
                                </li>
                                <li>
                                    <strong>Current Medications:</strong>{" "}
                                    {patient.medicalNotes?.currentMedication?.length
                                        ? patient.medicalNotes.currentMedication.join(", ")
                                        : "N/A"}
                                </li>
                            </ul>
                        </div>

                        <div className="medical-actions">
                            <button className="edit-btn" onClick={handleEdit}>
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={handleDeleteClick}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Reusing the Delete Modal from Patients.jsx */}
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Patient Confirm"
                className="delete-modal-content"
                overlayClassName="delete-modal-overlay"
                portalClassName="patients-container"
                ariaHideApp={false}
            >
                <h2>Delete Patient</h2>
                <p>
                    Are you sure you want to delete{" "}
                    <strong>{patient.name}</strong>? This will permanently remove the patient from your list.
                </p>
                <div className="delete-modal-actions">
                    <button
                        className="delete-cancel-btn"
                        onClick={closeDeleteModal}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        className="delete-confirm-btn"
                        onClick={confirmDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
