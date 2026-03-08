import React from "react";
import "./AddMedicine.css";

const AddMedicine = () => {
  return (
    <div className="add-medicine-container">
      <p className="page-title">Add New Medicine</p>

      <div className="medicine-card">

        <div className="form-section">
          <div className="form-group">
            <label>Medicine Name *</label>
            <input type="text" placeholder="Donepezil" />
          </div>

          <div className="form-group">
            <label>Dosage</label>
            <input type="text" placeholder="81 mg - 1 tablet" />
          </div>

          <div className="form-group">
            <label>Repeat Rule</label>
            <input type="text" placeholder="Daily" />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input type="time" defaultValue="13:00" />
          </div>
        </div>
        <div className="form-actions">
            <button className="save-btn">Save</button>
            <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;