import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; 
import { useState, useEffect } from "react";
import useGetAllReminders from "../../../hook/reminder/get-all-reminders-hook"; 
import "./Reminders.css";

export default function Reminders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("appointments");
  const { reminders, loading, fetchReminders } = useGetAllReminders();

  const patientId = localStorage.getItem("selectedPatientId");

  useEffect(() => {
    if (patientId) {
      fetchReminders(patientId);
    }
  }, [fetchReminders, patientId]);

  const appointments =
    reminders?.filter((r) => r.type === "appointment") || [];

  const medications =
    reminders
      ?.filter((r) => r.type === "medication")
      .map((med) => ({
        ...med,
        name: med.medicineName,
        time: med.scheduledTime,
        type: med.form,
      })) || [];

  return (
    <div className="reminders-page">
      <h1 className="page-title">Reminders</h1>

      <div className="tab-container">
        <button 
          className={`tab-btn ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button 
          className={`tab-btn ${activeTab === "medications" ? "active" : ""}`}
          onClick={() => setActiveTab("medications")}
        >
          Medications
        </button>
      </div>

      {activeTab === "appointments" && (
        <div className="reminder-section">
          <div className="section-header">
          <h3>Upcoming Appointments</h3>
          <button
            className="btn-add"
            onClick={() => navigate("/api/dashboard/reminders/add-appointment")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New
          </button>
        </div>

        <div className="reminder-card">
          <div className="table-container">
            {loading && reminders.length === 0 ? (
              <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>
            ) : (
              <table className="reminder-table">
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
                    appointments.map((app) => (
                      <tr
                        key={app._id}
                        onClick={() =>
                          navigate(`/api/dashboard/reminders/appointment/${app._id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td data-label="Doctor Name">{app.doctorName}</td>
                        <td data-label="Specialty">{app.specialty}</td>
                        <td data-label="Date">{new Date(app.appointmentDate).toLocaleDateString()}</td>
                        <td data-label="Time">
                          <span className="time-badge appointment">
                            {/* ✅ toLocaleTimeString converts UTC→local automatically ✓ */}
                            {new Date(app.appointmentDate).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>
                        <td data-label="Purpose" style={{ textTransform: "capitalize" }}>
                          {app.appointmentType}
                        </td>
                        <td data-label="Location">{app.location}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          </div>
        </div>
      )}

      {activeTab === "medications" && (
        <div className="reminder-section">
          <div className="section-header">
          <h3>Medication Schedule</h3>
          <button
            className="btn-add"
            onClick={() => navigate("/api/dashboard/reminders/add-medicine")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New
          </button>
        </div>

        <div className="reminder-card">
          <div className="table-container">
            <table className="reminder-table">
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
                {medications.length > 0 ? (
                  medications.map((med) => (
                    <tr
                      key={med._id}
                      onClick={() =>
                        navigate(`/api/dashboard/reminders/medicine/${med._id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td data-label="Drug Name">{med.name}</td>
                      <td data-label="Dosage">{med.dosage}</td>
                      <td data-label="Frequency">{med.frequency}</td>
                      <td data-label="Time">
                        <span className="time-badge medication">
                          {/* ✅ toLocaleTimeString converts UTC→local automatically ✓ */}
                          {new Date(med.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td data-label="Times Per Day">{med.timesPerDay}</td>
                      <td data-label="Type" style={{ textTransform: "capitalize" }}>{med.type}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                      No medications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}