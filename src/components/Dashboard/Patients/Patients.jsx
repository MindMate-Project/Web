import { useState } from "react";
import "./Patients.css";
import { useNavigate } from "react-router-dom";


export default function Patients() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: "salim Ali",
            age: 75,
            gender: "Male",
            image: "https://i.pravatar.cc/150?img=12",
        },
        {
            id: 2,
            name: "Ahmed Ali",
            age: 75,
            gender: "Male",
            image: "https://i.pravatar.cc/150?img=13",
        },
    ]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleAddPatient = () => {
        // TODO: Implement add patient functionality
        navigate("/api/dashboard/patients/add");
        console.log("Add new patient");
    };

    const handleViewPatient = (patientId) => {
        // TODO: Implement view patient functionality
        console.log("View patient:", patientId);

        // usenavigate(`/api/dashboard/patients/${patientId}`);
            navigate(`/api/dashboard/patients/${patientId}`);
    
    };

    const handleDeletePatient = (patientId) => {
        // TODO: Implement delete patient functionality
        setPatients(patients.filter((p) => p.id !== patientId));
    };

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="patients-container">
            <div className="patients-header">
                <div className="patients-title">
                    <h1>Patients</h1>
                    <p className="patients-count">
                        Total: {patients.length} Patients
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
                        <div key={patient.id} className="patient-card">
                            <div className="patient-info">
                                <img
                                    src={patient.image}
                                    alt={patient.name}
                                    className="patient-avatar"
                                />
                                <div className="patient-details">
                                    <h3>{patient.name}</h3>
                                    <p>
                                        {patient.age} years old •{" "}
                                        {patient.gender}
                                    </p>
                                </div>
                            </div>

                            <div className="patient-actions">
                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        handleViewPatient(patient.id)
                                    }
                                >
                                    View
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDeletePatient(patient.id)
                                    }
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
        </div>
    );
}
