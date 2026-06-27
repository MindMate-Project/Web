import { useState } from "react";
import Modal from "react-modal";
import "./Patients.css";
import "./DeleteModal.css";
import { useNavigate } from "react-router-dom";
import useGetAllPatients from "../../../hook/patient/get-all-patients-hook";
import useDeletePatient from "../../../hook/patient/delete-patient-hook";
import dateToAge from "../../utils/dateToAge";
import father from "./../../../images/father.jpg";

export default function Patients() {
    const allPatients = useGetAllPatients();
    const CurrentPatients = allPatients?.data;

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [handleDelete, isDeleting] = useDeletePatient();
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddPatient = () => {
        navigate("/api/dashboard/patients/add");
    };

    const handleViewPatient = (patientId) => {
        navigate(`/api/dashboard/patients/${patientId}`);
    };

    const handleDeletePatient = (patient) => {
        setPatientToDelete(patient);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (patientToDelete) {
            await handleDelete(patientToDelete.patientId);
            closeModal();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPatientToDelete(null);
    };

    // We filter `CurrentPatients` which we get from the custom hook
    const filteredPatients =
        CurrentPatients?.length > 0
            ? CurrentPatients.filter((patient) =>
                  patient.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
              )
            : [];

    return (
        <div className="patients-container">
            <div className="patients-header">
                <div className="patients-title">
                    <h1>Patients</h1>
                    <p className="patients-count">
                        Total:{" "}
                        <span className="patients-count-number">
                            {CurrentPatients?.length || 0}
                        </span>{" "}
                        Patients
                    </p>
                </div>

                <div className="patients-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <svg
                            className="search-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <button
                        className="add-patient-btn"
                        onClick={handleAddPatient}
                    >
                        Add New Patient
                    </button>
                </div>
            </div>

            <div className="patients-list">
                {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                        <div key={patient.patientId} className="patient-card">
                            <div className="patient-info">
                                <img
                                    src={patient.profilePicture || father}
                                    alt={patient.name}
                                    className="patient-avatar"
                                />
                                <div className="patient-details">
                                    <h3>{patient.name}</h3>
                                    <p>
                                        {patient.dateOfBirth
                                            ? dateToAge(patient.dateOfBirth)
                                            : "N/A"}{" "}
                                        years old •{" "}
                                        {patient.gender
                                            ? patient.gender
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="patient-actions">
                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        handleViewPatient(patient.patientId)
                                    }
                                >
                                    View
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeletePatient(patient)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-patients">
                        <p>No patients found</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Patient Confirm"
                className="delete-modal-content"
                overlayClassName="delete-modal-overlay"
                portalClassName="patients-container"
                ariaHideApp={false}
            >
                <h2>Delete Patient</h2>
                <p>
                    Are you sure you want to delete{" "}
                    <strong>{patientToDelete?.name}</strong>? This will
                    permanently remove the patient from your list.
                </p>
                <div className="delete-modal-actions">
                    <button
                        className="delete-cancel-btn"
                        onClick={closeModal}
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
