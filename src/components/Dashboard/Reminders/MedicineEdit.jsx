import React, { useState, useEffect } from "react";
import "./AddMedicine.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useUpdateReminder from "../../../hook/reminder/updateReminderHook";
import SuccessModal from "./UpdatedSuccessfully";

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [handleUpdateReminder, { loading, error }] = useUpdateReminder();

  const reminders = useSelector(
    (state) => state.reminderReducer?.reminders || []
  );

  const patientId = localStorage.getItem("selectedPatientId");
  const initialData = reminders.find((r) => r._id === id);

  const [showSuccess, setShowSuccess] = useState(false);

  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [form, setForm] = useState("");
  const [frequency, setFrequency] = useState("");

  const [startDay, setStartDay] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");

  const [endDay, setEndDay] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");

  useEffect(() => {
    if (initialData) {
      setMedicineName(initialData.medicineName || "");
      setDosage(initialData.dosage || "");
      setTimesPerDay(initialData.timesPerDay || 1);
      setForm(initialData.form || "");
      setFrequency(initialData.frequency || "");

      if (initialData.scheduledTime) {
        const d = new Date(initialData.scheduledTime);

        // ✅ TIMEZONE FIX (read):
        const hours   = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        setTime(`${hours}:${minutes}`);
      }

      if (initialData.startDate) {
        const d = new Date(initialData.startDate);
        setStartDay(String(d.getDate()).padStart(2, "0"));
        setStartMonth(String(d.getMonth() + 1).padStart(2, "0"));
        setStartYear(String(d.getFullYear()).slice(-2));
      }

      if (initialData.endDate) {
        const d = new Date(initialData.endDate);
        setEndDay(String(d.getDate()).padStart(2, "0"));
        setEndMonth(String(d.getMonth() + 1).padStart(2, "0"));
        setEndYear(String(d.getFullYear()).slice(-2));
      }
    }
  }, [initialData]);

  const handleBack = () => {
    navigate(`/api/dashboard/reminders/medicine/${id}`);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (
      !startDay ||
      !startMonth ||
      !startYear ||
      !endDay ||
      !endMonth ||
      !endYear ||
      !time
    ) {
      alert("Please fill all required fields");
      return;
    }

    const startDate = `20${startYear}-${startMonth}-${startDay}`;
    const endDate = `20${endYear}-${endMonth}-${endDay}`;

    // ✅ TIMEZONE FIX (save):
    const scheduledDateTime = new Date(
      `${startDate}T${time}:00`
    ).toISOString();

    const updatedData = {
      medicineName,
      dosage,
      timesPerDay,
      form,
      frequency,
      startDate,
      endDate,
      scheduledTime: scheduledDateTime,
      type: "medication",
    };

    try {
      const result = await handleUpdateReminder(id, updatedData, patientId);
      if (result.success) {
        setShowSuccess(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
    navigate("/api/dashboard/reminders");
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div className="add-medicine-container">

      <button className="back-button" onClick={handleBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Back To Details
      </button>

      <p className="page-title">Edit Medicine Information</p>

      <div className="medicine-card">
        <div className="form-section">

          <div className="form-group">
            <label>Drug Name *</label>
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Dosage *</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Time Per Day</label>
            <input
              type="number"
              min="1"
              value={timesPerDay}
              onChange={(e) => setTimesPerDay(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label>Treatment Period *</label>
            <div className="treatment-period">
              <div className="date-inputs-group">
                <span className="date-label">From</span>
                <div className="date-inputs">
                  <input value={startDay} onChange={e => setStartDay(e.target.value)} maxLength="2" />
                  <input value={startMonth} onChange={e => setStartMonth(e.target.value)} maxLength="2" />
                  <input value={startYear} onChange={e => setStartYear(e.target.value)} maxLength="2" />
                </div>
              </div>
              <div className="date-inputs-group">
                <span className="date-label">To</span>
                <div className="date-inputs">
                  <input value={endDay} onChange={e => setEndDay(e.target.value)} maxLength="2" />
                  <input value={endMonth} onChange={e => setEndMonth(e.target.value)} maxLength="2" />
                  <input value={endYear} onChange={e => setEndYear(e.target.value)} maxLength="2" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Type *</label>
            <div className="radio-group">
              {["tablet", "capsule", "syrup", "injection"].map((t) => (
                <label key={t}>
                  <input
                    type="radio"
                    value={t}
                    checked={form === t}
                    onChange={(e) => setForm(e.target.value)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Frequency *</label>
            <div className="radio-group">
              {["once", "daily", "weekly"].map((f) => (
                <label key={f}>
                  <input
                    type="radio"
                    value={f}
                    checked={frequency === f}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="form-actions">
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button className="cancel-btn" onClick={handleBack}>
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

export default EditMedicine;