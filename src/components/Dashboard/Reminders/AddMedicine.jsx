import React from "react";
import "./AddMedicine.css";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/api/dashboard/reminders");
  };

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
          {/* Row 1 */}
          <div className="form-group">
            <label>Drug Name *</label>
            <input type="text" placeholder="Amlodipine" />
          </div>
          <div className="form-group">
            <label>Dosage *</label>
            <input type="text" placeholder="1 tablet" />
          </div>

          {/* Row 2 */}
          <div className="form-group">
            <label>Time *</label>
            <input type="time" defaultValue="10:00" />
          </div>
          <div className="form-group">
            <label>Time Per Day (optional)</label>
            <input type="number" min="1" defaultValue="1" />
          </div>

          {/* Row 3: Treatment Period */}
          <div className="form-group full-width">
            <label>Treatment Period *</label>
            <div className="treatment-period">
              <div className="date-inputs-group">
                <span className="date-label">From</span>
                <div className="date-inputs">
                  <input type="text" placeholder="DD" maxLength="2" />
                  <input type="text" placeholder="MM" maxLength="2" />
                  <input type="text" placeholder="YY" maxLength="2" />
                </div>
              </div>
              <div className="date-inputs-group">
                <span className="date-label">To</span>
                <div className="date-inputs">
                  <input type="text" placeholder="DD" maxLength="2" />
                  <input type="text" placeholder="MM" maxLength="2" />
                  <input type="text" placeholder="YY" maxLength="2" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Type */}
          <div className="form-group full-width">
            <label>Type *</label>
            <div className="radio-group">
              <label><input type="radio" name="type" /> Tablet</label>
              <label><input type="radio" name="type" /> Capsule</label>
              <label><input type="radio" name="type" /> Syrup</label>
              <label><input type="radio" name="type" /> Injection</label>
            </div>
          </div>

          {/* Row 5: Frequency */}
          <div className="form-group full-width">
            <label>Frequency *</label>
            <div className="radio-group">
              <label><input type="radio" name="frequency" /> Once</label>
              <label><input type="radio" name="frequency" /> Daily</label>
              <label><input type="radio" name="frequency" /> Weekly</label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="save-btn">Add</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;