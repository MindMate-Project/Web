import React, { useState } from "react";
import "./AddAppointment.css";
import { useNavigate } from "react-router-dom";
import useCreateReminder from "../../../hook/reminder/addReminderHook";

const AddReminder = () => {
  const navigate = useNavigate();

  const [handleCreateReminder, { loading, error }] = useCreateReminder();

  const patientId = localStorage.getItem("selectedPatientId");

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const caregiverId = user?._id;

  const [form, setForm] = useState({
    doctorName: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
    appointmentType: "consultation",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurposeChange = (e) => {
    setForm((prev) => ({
      ...prev,
      appointmentType: e.target.value,
    }));
  };

  const handleSave = async () => {
    const requiredFields = [
      "doctorName",
      "specialty",
      "date",
      "time",
      "location",
      "appointmentType",
    ];

    const emptyFields = requiredFields.filter(
      (field) => !form[field] || form[field].trim() === ""
    );

    if (emptyFields.length > 0) {
      alert(`Please fill all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    if (!patientId || !caregiverId) {
      alert("Patient or Caregiver ID is missing");
      return;
    }

    // ✅ TIMEZONE FIX: removed trailing "Z" → parsed as local time → correct UTC offset
    const scheduledDateTime = new Date(
      `${form.date}T${form.time}:00`
    ).toISOString();

    const payload = {
      type: "appointment",
      patient: patientId,
      caregiver: caregiverId,
      scheduledTime: scheduledDateTime,
      doctorName: form.doctorName,
      specialty: form.specialty,
      location: form.location,
      appointmentType: form.appointmentType,
      appointmentDate: scheduledDateTime,
      notes: form.notes,
    };

    try {
      await handleCreateReminder(payload);
      navigate("/api/dashboard/reminders");
    } catch (err) {
      console.error(err);
      alert("Error saving reminder");
    }
  };

  const handleBack = () => {
    navigate("/api/dashboard/reminders");
  };

  return (
    <div className="add-reminder">
      <button className="back-button" onClick={handleBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back To Reminders
      </button>

      <p className="page-title">Add New Appointment</p>

      <div className="form-card">
        <div className="form-grid">

          <div className="form-group">
            <label>Doctor Name *</label>
            <input
              type="text"
              className="input"
              name="doctorName"
              placeholder="e.g. Dr. John Doe"
              value={form.doctorName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Specialty</label>
            <input
              type="text"
              className="input"
              name="specialty"
              placeholder="e.g. Cardiologist"
              value={form.specialty}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              className="input"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              className="input"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              className="input"
              name="location"
              placeholder="e.g. City Hospital, Building B"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group purpose-group-wrapper">
            <label>Purpose *</label>
            <div className="purpose-group">
              {["consultation", "follow-up", "lab", "scan"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="purpose"
                    value={type}
                    checked={form.appointmentType === type}
                    onChange={handlePurposeChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group notes-group">
            <label>Notes (optional)</label>
            <textarea
              className="input textarea"
              name="notes"
              placeholder="e.g. Bring previous test results..."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-actions">
          <button className="btn-save" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>

          <button className="btn-cancel" onClick={handleBack}>
            Cancel
          </button>
        </div>

        {/* ✅ Error handling */}
        {error && <p className="error-text">Error: {error.message || "Something went wrong"}</p>}
      </div>
    </div>
  );
};

export default AddReminder;