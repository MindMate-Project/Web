import React from "react";
import { useNavigate } from "react-router-dom";
import "./Reminders.css";

export default function Reminders() {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      doctor: "Khaled Ali",
      specialty: "Neurologist",
      date: "15 Mar 2026",
      time: "10:30 AM",
      purpose: "Consultation",
      location: "Cairo Medical Center",
    },
    {
      id: 2,
      doctor: "Nour El-Din",
      specialty: "Psychiatrist",
      date: "18 Mar 2026",
      time: "11:15 AM",
      purpose: "Lab",
      location: "Al-Salam Hospital",
    },
    {
      id: 3,
      doctor: "Sara Mahmoud",
      specialty: "Radiologist",
      date: "22 Mar 2026",
      time: "02:00 PM",
      purpose: "Scan",
      location: "Ismailia Diagnostic Center",
    },
    {
      id: 4,
      doctor: "Mohamed Ali",
      specialty: "Pathologist",
      date: "27 Mar 2026",
      time: "09:45 AM",
      purpose: "Follow-up",
      location: "Future Care Lab",
    },
  ];

  const medications = [
    {
      id: 1,
      name: "Donepezil",
      dosage: "2 Tablets",
      frequency: "Daily",
      time: "01:00 PM",
      timesPerDay: 1,
      type: "Capsule",
    },
    {
      id: 2,
      name: "Vitamin B12",
      dosage: "1 Tablet",
      frequency: "Daily",
      time: "11:15 AM",
      timesPerDay: 1,
      type: "Tablet",
    },
    {
      id: 3,
      name: "Memantine",
      dosage: "2 Capsules",
      frequency: "Daily",
      time: "02:00 PM",
      timesPerDay: 2,
      type: "Tablet",
    },
    {
      id: 4,
      name: "Aspirin",
      dosage: "1 Capsule",
      frequency: "Daily",
      time: "09:45 AM",
      timesPerDay: 1,
      type: "Capsule",
    },
  ];

  return (
    <div className="reminders-page">
      <h1 className="page-title">Reminders</h1>

      {/* Upcoming Appointments */}
      <div className="reminder-section">

        <div className="section-header">
          <h3>Upcoming Appointments</h3>

          <button
            className="btn-add"
            onClick={() =>
              navigate("/api/dashboard/reminders/add-appointment")
            }
          >
            Add New
          </button>
        </div>

        <div className="reminder-card">
          <div className="table-container">
            <table className="reminder-table">

              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialty</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Purpose</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() =>
                      navigate(`/api/dashboard/reminders/appointment/${app.id}`)
                    }
                  >
                    <td>{app.doctor}</td>
                    <td>{app.specialty}</td>
                    <td>{app.date}</td>

                    <td>
                      <span className="time-badge appointment">
                        {app.time}
                      </span>
                    </td>

                    <td>{app.purpose}</td>
                    <td>{app.location}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>


      {/* Medication Schedule */}
      <div className="reminder-section">

        <div className="section-header">
          <h3>Medication Schedule</h3>

          <button
            className="btn-add"
            onClick={() =>
              navigate("/api/dashboard/reminders/add-medicine")
            }
          >
            Add New
          </button>
        </div>

        <div className="reminder-card">
          <div className="table-container">
            <table className="reminder-table">

              <thead>
                <tr>
                  <th>Drug Name</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Time</th>
                  <th>Times Per Day</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {medications.map((med) => (
                  <tr
                    key={med.id}
                    onClick={() =>
                      navigate(`/api/dashboard/reminders/medicine/${med.id}`)
                    }
                  >
                    <td>{med.name}</td>
                    <td>{med.dosage}</td>
                    <td>{med.frequency}</td>

                    <td>
                      <span className="time-badge medication">
                        {med.time}
                      </span>
                    </td>

                    <td>{med.timesPerDay}</td>
                    <td>{med.type}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}