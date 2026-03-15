import React from "react";
import "./AddAppointment.css";
import { useNavigate } from "react-router-dom";

const AddReminder = () => {
  const navigate = useNavigate();

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

          {/* Doctor Name */}
          <div className="form-group">
            <label>Doctor Name *</label>
            <input
              type="text"
              className="input"
              placeholder="Khaled Ali"
            />
          </div>

          {/* Specialty */}
          <div className="form-group">
            <label>Specialty</label>
            <input
              type="text"
              className="input"
              placeholder="Cardiologist"
            />
          </div>

          {/* Appointment Date */}
          <div className="form-group">
            <label>Date*</label>
            <input
              type="date"
              className="input"
            />
          </div>

          {/* Appointment Time */}
          <div className="form-group">
            <label>Time*</label>
            <input
              type="time"
              className="input"
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location*</label>
            <input
              type="text"
              className="input"
              placeholder="New cairo clinic"
            />
          </div>

          {/* Purpose */}
          <div className="form-group purpose-group-wrapper">
            <label>Purpose *</label>

            <div className="purpose-group">
              <label>
                <input type="radio" name="purpose" />
                Consultation
              </label>

              <label>
                <input type="radio" name="purpose" />
                Follow-Up
              </label>

              <label>
                <input type="radio" name="purpose" />
                Lab
              </label>

              <label>
                <input type="radio" name="purpose" />
                Scan
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="form-group notes-group">
            <label>Notes <span>(optional)</span></label>
            <textarea
              className="input textarea"
              
            ></textarea>
          </div>

        </div>

        <div className="form-actions">
          <button className="btn-save">Save</button>
          <button className="btn-cancel">Cancel</button>
        </div>
      </div>

    </div>
  );
};

export default AddReminder;