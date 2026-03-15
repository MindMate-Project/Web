import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import useAddPatient from "../../../hook/patient/add-new-patient-hook";
import "./AddPatient.css";
import "./DeleteModal.css";

export default function AddPatient() {
    const navigate = useNavigate();
    const [handleAddPatient, loading] = useAddPatient();
    
    // Form and Modal State
    const [formData, setFormData] = useState({
        email: "",
        relationship: "",
    });
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "success", // "success" | "error"
        message: "",
    });

    const handleBack = () => {
        navigate("/api/dashboard/patients");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.relation) return;

        const result = await handleAddPatient(
            formData.email,
            formData.relation
        );

        if (result.success) {
            setModalConfig({
                isOpen: true,
                type: "success",
                message: "Patient assignment request sent successfully! The patient must approve this request before access is allowed.",
            });
            // Clear form on success
            setFormData({ email: "", relation: "" });
        } else {
            // Determine appropriate error message based on API status
            let errorMessage = "Failed to send assignment request. Please check the email and try again.";
            const { status, data, message } = result.error || {};

            if (status === 404) {
                errorMessage = "No patient found with this email address.";
            } else if (status === 409) {
                errorMessage = "This patient is already assigned to you or a request is already pending.";
            } else if (status === 400) {
                errorMessage = data?.message || "Invalid patient information provided.";
            } else if (data?.message) {
                errorMessage = data.message;
            } else if (message) {
                errorMessage = message;
            }

            setModalConfig({
                isOpen: true,
                type: "error",
                message: errorMessage,
            });
        }
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        if (modalConfig.type === "success") {
            navigate("/api/dashboard/patients");
        }
    };

    const handleCancel = () => {
        navigate("/api/dashboard/patients");
    };

    return (
        <div className="add-patient-container">
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

            <h1 className="page-title">Add New Patient</h1>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">patient Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ahmed.k.ali@gmail.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="relation">
                            Patient Relationship
                        </label>
                        <input
                            type="text"
                            id="relation"
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                            placeholder="Father"
                            required
                        />
                    </div>

                    <p className="info-text">
                        The patient must approve this request before access is
                        allowed
                    </p>

                    <div className="form-actions">
                        <button 
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="add-btn"
                            disabled={loading || !formData.email || !formData.relation}
                        >
                            {loading ? "Sending Request..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Status Modal */}
            <Modal
                isOpen={modalConfig.isOpen}
                onRequestClose={closeModal}
                className="delete-modal-content" // Reusing styling from DeleteModal for consistency
                overlayClassName="delete-modal-overlay"
                portalClassName="patients-container"
                ariaHideApp={false}
            >
                <h2>{modalConfig.type === "success" ? "Request Sent" : "Error"}</h2>
                <p>{modalConfig.message}</p>
                <div className="delete-modal-actions">
                    <button
                        className={modalConfig.type === "success" ? "add-btn" : "delete-confirm-btn"}
                        onClick={closeModal}
                        style={{ width: "100%" }}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}
