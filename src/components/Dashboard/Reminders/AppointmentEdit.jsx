import React, { useState, useEffect } from "react";
import "./AddAppointment.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useUpdateReminder from "../../../hook/reminder/updateReminderHook";
import SuccessModal from "./UpdatedSuccessfully"; 

const AppointmentEdit = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [handleUpdateReminder, { loading, error }] = useUpdateReminder();

  const reminders = useSelector((state) => state.reminderReducer?.reminders || []);
  const initialData = reminders.find(r => r._id === id);

  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("consultation");
  const [notes, setNotes] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setDoctorName(initialData.doctorName || "");
      setSpecialty(initialData.specialty || "");
      setLocation(initialData.location || "");
      setPurpose(initialData.appointmentType || "consultation");
      setNotes(initialData.notes || "");

      if (initialData.appointmentDate) {
        const dateObj = new Date(initialData.appointmentDate);
        const year    = dateObj.getFullYear();
        const month   = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day     = String(dateObj.getDate()).padStart(2, "0");
        const hours   = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        setAppointmentDate(`${year}-${month}-${day}`);
        setAppointmentTime(`${hours}:${minutes}`);
      }
    }
  }, [initialData]);

  const handleBack = () => {
    navigate(`/api/dashboard/reminders/appointment/${id}`);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      alert("Please select date and time");
      return;
    }

    // ✅ TIMEZONE FIX (save):
    const scheduledDateTime = new Date(
      `${appointmentDate}T${appointmentTime}:00`
    ).toISOString();

    const updatedData = {
      doctorName,
      specialty,
      location,
      appointmentType: purpose.toLowerCase(),
      appointmentDate: scheduledDateTime,
      scheduledTime: scheduledDateTime,
      notes,
    };

    try {
      const patientId = localStorage.getItem("selectedPatientId");
      const result = await handleUpdateReminder(id, updatedData, patientId);

      if (result.success) {
        setShowSuccess(true);
      }

    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
    navigate("/api/dashboard/reminders");
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div className="add-reminder">

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
        Back To Details
      </button>

      <p className="page-title">Edit Appointment Information</p>

      <div className="form-card">
        <div className="form-grid">

          <div className="form-group">
            <label>Doctor Name *</label>
            <input type="text" className="input" value={doctorName} onChange={e => setDoctorName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Specialty</label>
            <input type="text" className="input" value={specialty} onChange={e => setSpecialty(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Date*</label>
            <input type="date" className="input" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Time*</label>
            <input type="time" className="input" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Location*</label>
            <input type="text" className="input" value={location} onChange={e => setLocation(e.target.value)} />
          </div>

          <div className="form-group purpose-group-wrapper">
            <label>Purpose *</label>
            <div className="purpose-group">
              {["Consultation", "Follow-Up", "Lab", "Scan"].map(p => (
                <label key={p}>
                  <input
                    type="radio"
                    name="purpose"
                    value={p.toLowerCase()}
                    checked={purpose.toLowerCase() === p.toLowerCase()}
                    onChange={e => setPurpose(e.target.value)}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group notes-group">
            <label>Notes (optional)</label>
            <textarea className="input textarea" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

        </div>

        <div className="form-actions">
          <button className="btn-save" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button className="btn-cancel" onClick={handleBack}>
            Cancel
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}

      </div>

      <SuccessModal
        isOpen={showSuccess}
        onContinue={handleContinue}
      />

    </div>
  );
};

export default AppointmentEdit;