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
        <div className="ap-container">
            <div className="ap-card">
                <div className="ap-icon-wrapper">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="ap-email-icon">
                        <rect width="100" height="100" rx="20" fill="#F4F4F5"/>
                        <path d="M22 35C22 31.6863 24.6863 29 28 29H72C75.3137 29 78 31.6863 78 35V65C78 68.3137 75.3137 71 72 71H28C24.6863 71 22 68.3137 22 65V35Z" fill="#F04438"/>
                        <path d="M22 35L50 52L78 35" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="65" cy="65" r="22" fill="white"/>
                        <path d="M65 55C59.4772 55 55 59.4772 55 65C55 70.5228 59.4772 75 65 75C70.5228 75 75 70.5228 75 65V63C75 60.7909 73.2091 59 71 59C68.7909 59 67 60.7909 67 63V66" stroke="#F04438" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M67 65C67 66.1046 66.1046 67 65 67C63.8954 67 63 66.1046 63 65C63 63.8954 63.8954 63 65 63C66.1046 63 67 63.8954 67 65Z" stroke="#F04438" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <h2 className="ap-subtitle">
                    Please enter the patient's email address to send<br/>a connection request!
                </h2>

                <form onSubmit={handleSubmit} className="ap-form">
                    <div className="ap-form-group ap-form-group--row">
                        <label htmlFor="email" className="ap-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="ap-input"
                            required
                        />
                    </div>

                    <div className="ap-form-group ap-form-group--row">
                        <label htmlFor="relation" className="ap-label">Relation</label>
                        <input
                            type="text"
                            id="relation"
                            name="relation"
                            value={formData.relation || ""}
                            onChange={handleChange}
                            placeholder="e.g. Son, Daughter, Sibling..."
                            className="ap-input"
                            required
                        />
                    </div>

                    <div className="ap-info-row">
                        <svg className="ap-info-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <span className="ap-info-text">
                            Access will be granted only after the patient approves your request.
                        </span>
                    </div>

                    <div className="ap-actions">
                        <button 
                            type="submit" 
                            className="ap-btn ap-btn--primary"
                            disabled={loading || !formData.email || !formData.relation}
                        >
                            {loading ? "Sending..." : "Send"}
                        </button>
                        <button 
                            type="button"
                            className="ap-btn ap-btn--secondary"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Status Modal */}
            <Modal
                isOpen={modalConfig.isOpen}
                onRequestClose={closeModal}
                className="delete-modal-content"
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
