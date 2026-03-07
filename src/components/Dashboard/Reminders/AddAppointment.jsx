
import React from "react";
import "./AddAppointment.css";

const AddReminder = () => {
  return (
    <div className="add-reminder">
        <p className="page-title">Add New Appointment</p>
        <div className="form-card">
            <div className="form-grid">
                
                {/* Doctor Name */}
                <div className="form-group">
                    <label>Doctor Name *</label>
                    <input type="text" className="input" placeholder="Khaled Ali" />
                </div>

                {/* Specialty */}
                <div className="form-group">
                    <label>Specialty</label>
                    <input type="text" className="input" placeholder="Cardiologist" />
                </div>

                {/* Appointment Type */}
                <div className="form-group">
                    <label>Appointment Type</label>
                    <input type="text" className="input" placeholder="Follow up" />
                </div>

                {/* Location */}
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="input" placeholder="New cairo clinic" />
                </div>

                {/* Date */}
                <div className="form-group">
                    <label>Appointment Date</label>
                    <input type="date" className="input" />
                </div>

                {/* Time */}
                <div className="form-group">
                    <label>Appointment Time</label>
                    <input type="time" className="input" />
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