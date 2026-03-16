import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import useGetPatientData from "../../../hook/patient/get-patient-data-hook";
import useEditPatient from "../../../hook/patient/edit-patient-data-hook";
import father from "./../../../images/father.jpg";
import "./DeleteModal.css";
import "./EditPatient.css";

export default function EditPatient() {
    const navigate = useNavigate();
    const params = useParams();
    const [patientData] = useGetPatientData(params.id);
    const [handleEditPatient, isSaving] = useEditPatient();
    const patient = patientData?.data;
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        gender: "male",
        email: "",
        dateOfBirth: "",
        address: "",
        diagnosis: "",
        stage: "",
        allergies: "",
        relationship: "",
        chronicDiseases: "",
        currentMedication: ""
    });

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "success",
        message: "",
    });

    // Populate form data when patient data is loaded
    useEffect(() => {
        if (patient) {
            // Safely parse date for the date input (YYYY-MM-DD)
            let parsedDate = "";
            if (patient.dateOfBirth) {
                try {
                    // Check if it's a numeric timestamp (like 1716383820000 or "1716383820000")
                    const isNumeric = !isNaN(Number(patient.dateOfBirth)) && String(patient.dateOfBirth).trim() !== "";
                    const dateValue = isNumeric ? Number(patient.dateOfBirth) : patient.dateOfBirth;
                    
                    const dateObj = new Date(dateValue);
                    if (!isNaN(dateObj.getTime())) {
                        const year = dateObj.getFullYear();
                        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObj.getDate()).padStart(2, '0');
                        parsedDate = `${year}-${month}-${day}`;
                    }
                } catch(e) {
                    console.error("Error parsing date", e);
                }
            }

            setFormData({
                name: patient.name || "",
                phoneNumber: patient.phoneNumber || "",
                gender: patient.gender || "male",
                email: patient.email || "",
                relationship: patient.relationship || "",
                dateOfBirth: parsedDate,
                address: patient.address || "",
                diagnosis: patient.medicalNotes?.diagnosis || "",
                stage: patient.medicalNotes?.stage || "",
                allergies: patient.medicalNotes?.allergies?.join(", ") || "",
                chronicDiseases: patient.medicalNotes?.chronicDiseases?.join(", ") || "",
                currentMedication: patient.medicalNotes?.currentMedication?.join(", ") || ""
            });
        }
    }, [patient]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleBack = () => {
        navigate(`/api/dashboard/patients/${params.id}`);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!formData.name || !formData.phoneNumber) {
            setModalConfig({
                isOpen: true,
                type: "error",
                message: "Please fill in all required fields (Name, Phone)."
            });
            return;
        }

        // Prepare payload, converting comma-separated strings back to arrays
        const payload = {
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            address: formData.address,
            relationship: formData.relationship,
            medicalNotes: {
                diagnosis: formData.diagnosis,
                stage: formData.stage,
                allergies: formData.allergies.split(",").map(i => i.trim()).filter(Boolean),
                chronicDiseases: formData.chronicDiseases.split(",").map(i => i.trim()).filter(Boolean),
                currentMedication: formData.currentMedication.split(",").map(i => i.trim()).filter(Boolean),
            }
        };

        const result = await handleEditPatient(params.id, payload);

        if (result.success) {
            setModalConfig({
                isOpen: true,
                type: "success",
                message: "Patient profile updated successfully!"
            });
        } else {
            console.error("Update failed:", result.error);
            let errorMessage = "Failed to update patient data. Please try again.";
            const { status, data, message } = result.error || {};

            if (status === 404) {
                errorMessage = "Patient not found. They may have been deleted.";
            } else if (status === 400) {
                errorMessage = data?.message || "Invalid or incorrectly formatted data provided.";
            } else if (status === 401 || status === 403) {
                errorMessage = "You are not authorized to update this patient's profile.";
            } else if (data?.message) {
                errorMessage = data.message;
            } else if (message) {
                errorMessage = message;
            }

            setModalConfig({
                isOpen: true,
                type: "error",
                message: errorMessage
            });
        }
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        // Only navigate away on success
        if (modalConfig.type === "success") {
            navigate(`/api/dashboard/patients/${params.id}`);
        }
    };

    if (!patient) {
        return (
            <div className="edit-patient-container">
                <p>Loading patient data...</p>
            </div>
        );
    }

    return (
        <div className="edit-patient-container">
            <button className="back-button" onClick={handleBack} type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M19 12H5M5 12L12 19M5 12L12 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back To Details
            </button>

            <h1 className="page-title">Edit Patient Profile</h1>

            <form onSubmit={handleSave} className="edit-form-layout">
                {/* Left Column: Image Upload */}
                <aside className="image-upload-section">
                    <div className="current-image-wrapper">
                        <img
                            src={previewImage || patient.imageCover || father}
                            alt={patient.name}
                            className="current-image"
                        />
                    </div>
                    <div className="upload-actions">
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            id="photo-upload"
                        />
                        <button 
                            type="button" 
                            className="upload-btn"
                            onClick={triggerFileInput}
                        >
                            Change Photo
                        </button>
                        <p className="upload-hint">JPG, PNG or GIF (Max 2MB)</p>
                    </div>
                </aside>

                {/* Right Column: Form Data */}
                <div className="form-sections">
                    {/* Basic Info Card */}
                    <section className="form-section-card">
                        <h2 className="section-title">Basic Information</h2>
                        
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter patient's full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    className="form-input"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select 
                                    id="gender" 
                                    className="form-select"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address (Read Only)</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-input read-only-input"
                                    value={formData.email}
                                    readOnly
                                    title="Email verification required to change this field"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    className="form-input"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="relationship">Support Relationship *</label>
                                <input
                                    type="text"
                                    id="relationship"
                                    className="form-input"
                                    value={formData.relationship}
                                    onChange={handleChange}
                                    placeholder="e.g. Father, Mother, Spouse"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="address">Address / Location</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="form-input"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Full address"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Medical Notes Card */}
                    <section className="form-section-card">
                        <h2 className="section-title">Medical Information</h2>
                        
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="diagnosis">Primary Diagnosis</label>
                                <input
                                    type="text"
                                    id="diagnosis"
                                    className="form-input"
                                    value={formData.diagnosis}
                                    onChange={handleChange}
                                    placeholder="Current diagnosis"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="stage">Condition Stage</label>
                                <input
                                    type="text"
                                    id="stage"
                                    className="form-input"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    placeholder="e.g. Early, Moderate, Late"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="allergies">Allergies (comma-separated)</label>
                                <input
                                    type="text"
                                    id="allergies"
                                    className="form-input"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    placeholder="Peanuts, Penicillin..."
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="chronic">Chronic Diseases (comma-separated)</label>
                                <textarea
                                    id="chronicDiseases"
                                    className="form-textarea"
                                    value={formData.chronicDiseases}
                                    onChange={handleChange}
                                    placeholder="List any chronic conditions..."
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="currentMedication">Current Medications (comma-separated)</label>
                                <textarea
                                    id="currentMedication"
                                    className="form-textarea"
                                    value={formData.currentMedication}
                                    onChange={handleChange}
                                    placeholder="List current medications..."
                                />
                            </div>
                        </div>

                        {/* Save & Cancel Actions */}
                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="btn-cancel"
                                onClick={handleBack}
                                disabled={isSaving}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn-save"
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </section>
                </div>
            </form>

            <Modal
                isOpen={modalConfig.isOpen}
                onRequestClose={closeModal}
                className="delete-modal-content"
                overlayClassName="delete-modal-overlay"
                portalClassName="patients-container"
                ariaHideApp={false}
            >
                <h2>{modalConfig.type === "success" ? "Success" : "Validation Error"}</h2>
                <p>{modalConfig.message}</p>
                <div className="delete-modal-actions">
                    <button
                        className={modalConfig.type === "success" ? "success-modal-btn" : "delete-confirm-btn"}
                        onClick={closeModal}
                        style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "none", color: "white", cursor: "pointer", fontWeight: "600" }}
                    >
                        {modalConfig.type === "success" ? "Return to Details" : "Go Back & Fix"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}
