import React from "react";
import { useState } from "react";
import "./Reminders.css";
import { useNavigate } from "react-router-dom";
export default function Reminders() {
      const navigate = useNavigate();
    return (
        <div className="reminders">
            <h1 className="reminders-title">Reminders</h1>

            {/* Appointments */}
        <div className="reminder-card">
            <div className="reminder-header">
                <h3>Appointments</h3>

            <div className="btns">
                <button className="btn-edit">Edit</button>
                <button className="btn-add"
                onClick={() => navigate("/api/dashboard/reminders/add-appointment")}
                >
                  Add New
                </button>
            </div>
            </div>

        <table className="reminder-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Dr. Khaled Ali , Cardiologist</td>
              <td>10:00 AM</td>
              <td>07-02-2026</td>
              <td className="status upcoming">Upcoming</td>
            </tr>

            <tr>
              <td>Dr. Salma Hassan – Geriatric Specialist</td>
              <td>01:00 PM</td>
              <td>20-02-2026</td>
              <td className="status upcoming">Upcoming</td>
            </tr>

            <tr>
              <td>Blood Test – El Salam Lab</td>
              <td>11:00 AM</td>
              <td>10-03-2026</td>
              <td className="status scheduled">Scheduled</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Medication */}
      <div className="reminder-card">
        <div className="reminder-header">
          <h3>Medication</h3>

          <div className="btns">
            <button className="btn-edit">Edit</button>
            <button className="btn-add"
            onClick={() => navigate("/api/dashboard/reminders/add-medicine")}
            >
              Add New
            </button>
          </div>
        </div>

        <table className="reminder-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Dose</th>
              <th>Time</th>
              <th>Repeat Rule</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Aspirin Protect</td>
              <td>81 mg – 1 tablet</td>
              <td>09:00 AM</td>
              <td>Daily</td>
            </tr>

            <tr>
              <td>Metformin</td>
              <td>500 mg – 1 tablet</td>
              <td>01:00 PM</td>
              <td>Daily</td>
            </tr>

            <tr>
              <td>Amlodipine</td>
              <td>5 mg – 1 tablet</td>
              <td>05:00 PM</td>
              <td>Daily</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
