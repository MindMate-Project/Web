import React, { useState } from "react";
import "./AddMedicine.css";
import { useNavigate } from "react-router-dom";
import useCreateReminder from "../../../hook/reminder/addReminderHook";

const AddMedicine = () => {
  const navigate = useNavigate();

  //  use hook instead of dispatch
  const [handleCreateReminder] = useCreateReminder();

  const patientId = localStorage.getItem("selectedPatientId");
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const caregiverId = user._id;

  const [form, setForm] = useState({
    medicineName: "",
    dosage: "",
    scheduledTime: "",
    timesPerDay: 1,
    form: "tablet",
    frequency: "once",
    startDay: "",
    startMonth: "",
    startYear: "",
    endDay: "",
    endMonth: "",
    endYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const requiredFields = ["medicineName", "dosage", "scheduledTime", "form", "frequency", "startDay","startMonth","startYear","endDay","endMonth","endYear"];
    const emptyFields = requiredFields.filter(f => !form[f] || form[f].toString().trim() === "");

    if (emptyFields.length > 0) {
      alert(`Please fill all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    if (!patientId || !caregiverId) {
      alert("Patient or Caregiver ID is missing");
      return;
    }

    try {
      const startDateStr = `${form.startYear}-${form.startMonth.padStart(2,'0')}-${form.startDay.padStart(2,'0')}T${form.scheduledTime}:00`;
      const endDateStr = `${form.endYear}-${form.endMonth.padStart(2,'0')}-${form.endDay.padStart(2,'0')}T${form.scheduledTime}:00`;

      const startDate = new Date(startDateStr).toISOString();
      const endDate = new Date(endDateStr).toISOString();

      const payload = {
        type: "medication",
        patient: patientId,
        caregiver: caregiverId,
        medicineName: form.medicineName,
        dosage: form.dosage,
        timesPerDay: Number(form.timesPerDay),
        form: form.form,
        frequency: form.frequency.toLowerCase(),
        scheduledTime: startDate,
        startDate: startDate,
        endDate: endDate,
      };

      //  replaced dispatch with hook
      await handleCreateReminder(payload);

      navigate("/api/dashboard/reminders");
    } catch (err) {
      console.error(err);
      alert("Error saving medicine");
    }
  };

  const handleBack = () => navigate("/api/dashboard/reminders");

  return (
    <div className="add-medicine-container">
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

      <p className="page-title">Add New Medicine</p>

      <div className="medicine-card">
        <div className="form-section">
          <div className="form-group">
            <label>Drug Name *</label>
            <input type="text" name="medicineName" value={form.medicineName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Dosage *</label>
            <input type="text" name="dosage" value={form.dosage} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input type="time" name="scheduledTime" value={form.scheduledTime} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Times Per Day</label>
            <input type="number" min="1" name="timesPerDay" value={form.timesPerDay} onChange={handleChange} />
          </div>

          <div className="form-group full-width">
            <label>Treatment Period *</label>
            <div className="treatment-period">
              <div className="date-inputs-group">
                <span className="date-label">From</span>
                <div className="date-inputs">
                  <input type="text" name="startDay" placeholder="DD" maxLength="2" value={form.startDay} onChange={handleChange} />
                  <input type="text" name="startMonth" placeholder="MM" maxLength="2" value={form.startMonth} onChange={handleChange} />
                  <input type="text" name="startYear" placeholder="YY" maxLength="4" value={form.startYear} onChange={handleChange} />
                </div>
              </div>
              <div className="date-inputs-group">
                <span className="date-label">To</span>
                <div className="date-inputs">
                  <input type="text" name="endDay" placeholder="DD" maxLength="2" value={form.endDay} onChange={handleChange} />
                  <input type="text" name="endMonth" placeholder="MM" maxLength="2" value={form.endMonth} onChange={handleChange} />
                  <input type="text" name="endYear" placeholder="YY" maxLength="4" value={form.endYear} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Type *</label>
            <div className="radio-group">
              {["tablet","capsule","syrup","injection"].map(f => (
                <label key={f}>
                  <input type="radio" name="form" value={f} checked={form.form===f} onChange={handleChange} /> {f.charAt(0).toUpperCase() + f.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Frequency *</label>
            <div className="radio-group">
              {["once","daily","weekly"].map(f => (
                <label key={f}>
                  <input type="radio" name="frequency" value={f} checked={form.frequency===f} onChange={handleChange} /> {f.charAt(0).toUpperCase() + f.slice(1)}
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>Add</button>
          <button className="cancel-btn" onClick={handleBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;