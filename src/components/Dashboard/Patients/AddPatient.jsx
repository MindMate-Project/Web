import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddPatient.css";

export default function AddPatient() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        relationship: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement add patient logic
        console.log("Add patient:", formData);
    };

    const handleCancel = () => {
        navigate("/api/dashboard/patients");
    };

    return (
        <div className="add-patient-container">
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
                        <label htmlFor="relationship">
                            Patient Relationship
                        </label>
                        <input
                            type="text"
                            id="relationship"
                            name="relationship"
                            value={formData.relationship}
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
                        <button type="submit" className="add-btn">
                            Add
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
