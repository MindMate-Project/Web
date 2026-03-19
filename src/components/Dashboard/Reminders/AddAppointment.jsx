import React, { useState } from "react";
import "./AddAppointment.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRemindersByPatient, createReminder } from "../../../redux/slices/reminderSlice";

const AddReminder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patientId = localStorage.getItem("selectedPatientId");
  
  // Get the user string from localStorage
  const userString = localStorage.getItem("user");

  // Parse it to a JS object
  const user = JSON.parse(userString);

  // Access the ID
  const caregiverId = user._id;


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
    setForm((prev) => ({ ...prev, appointmentType: e.target.value }));
  };

  const handleSave = async () => {
    // List of required fields
    const requiredFields = ["doctorName", "specialty", "date", "time", "location", "appointmentType"];

    // Check if any required field is empty
    const emptyFields = requiredFields.filter(field => !form[field] || form[field].trim() === "");

    if (emptyFields.length > 0) {
      alert(`Please fill all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    if (!patientId || !caregiverId) {
      alert("Patient or Caregiver ID is missing");
      return;
    }

    const scheduledDateTime = new Date(`${form.date}T${form.time}:00Z`).toISOString();

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
      notes: form.notes, // optional
    };

    try {
      await dispatch(createReminder(payload));
      await dispatch(getRemindersByPatient(patientId)); // update table immediately
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
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
              value={form.specialty}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date*</label>
            <input
              type="date"
              className="input"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Time*</label>
            <input
              type="time"
              className="input"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location*</label>
            <input
              type="text"
              className="input"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group purpose-group-wrapper">
            <label>Purpose *</label>
            <div className="purpose-group">
              <label>
                <input
                  type="radio"
                  name="purpose"
                  value="consultation"
                  checked={form.appointmentType === "consultation"}
                  onChange={handlePurposeChange}
                />
                Consultation
              </label>
              <label>
                <input
                  type="radio"
                  name="purpose"
                  value="follow-up"
                  checked={form.appointmentType === "follow-up"}
                  onChange={handlePurposeChange}
                />
                Follow-Up
              </label>
              <label>
                <input
                  type="radio"
                  name="purpose"
                  value="lab"
                  checked={form.appointmentType === "lab"}
                  onChange={handlePurposeChange}
                />
                Lab
              </label>
              <label>
                <input
                  type="radio"
                  name="purpose"
                  value="scan"
                  checked={form.appointmentType === "scan"}
                  onChange={handlePurposeChange}
                />
                Scan
              </label>
            </div>
          </div>

          <div className="form-group notes-group">
            <label>Notes <span>(optional)</span></label>
            <textarea
              className="input textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-save" onClick={handleSave}>Save</button>
          <button className="btn-cancel" onClick={handleBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddReminder;