import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { useEffect } from "react";
import { getRemindersByPatient } from "../../../redux/slices/reminderSlice"; 
import "./Reminders.css";

export default function Reminders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const patientId = localStorage.getItem("selectedPatientId");

  const { reminders, loading } = useSelector((state) => state.reminderReducer);

  useEffect(() => {
    if (patientId) {
      dispatch(getRemindersByPatient(patientId));
    }
  }, [dispatch, patientId]);

  // ================= APPOINTMENTS =================
  const appointments =
    reminders?.filter((r) => r.type === "appointment") || [];

  // ================= MEDICATIONS (mapped) =================
  const medications =
    reminders
      ?.filter((r) => r.type === "medication")
      .map((med) => ({
        ...med,
        name: med.medicineName,
        time: med.scheduledTime,
        type: med.form,
      })) || [];

  return (
    <div className="reminders-page">
      <h1 className="page-title">Reminders</h1>

      {/* ================= APPOINTMENTS ================= */}
      <div className="reminder-section">
        <div className="section-header">
          <h3>Upcoming Appointments</h3>
          <button
            className="btn-add"
            onClick={() => navigate("/api/dashboard/reminders/add-appointment")}
          >
            Add New
          </button>
        </div>

        <div className="reminder-card">
          <div className="table-container">
            {loading && reminders.length === 0 ? (
              <p style={{ padding: "20px", textAlign: "center" }}>
                Loading...
              </p>
            ) : (
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
                  {appointments.length > 0 ? (
                    appointments.map((app) => (
                      <tr
                        key={app._id}
                        onClick={() =>
                          navigate(
                            `/api/dashboard/reminders/appointment/${app._id}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>{app.doctorName}</td>
                        <td>{app.specialty}</td>
                        <td>
                          {new Date(app.appointmentDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span className="time-badge appointment">
                            {new Date(
                              app.appointmentDate
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {app.appointmentType}
                        </td>
                        <td>{app.location}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ================= MEDICATIONS ================= */}
      <div className="reminder-section">
        <div className="section-header">
          <h3>Medication Schedule</h3>
          <button
            className="btn-add"
            onClick={() => navigate("/api/dashboard/reminders/add-medicine")}
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
                {medications.length > 0 ? (
                  medications.map((med) => (
                    <tr
                      key={med._id}
                      onClick={() =>
                        navigate(
                          `/api/dashboard/reminders/medicine/${med._id}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{med.name}</td>
                      <td>{med.dosage}</td>
                      <td>{med.frequency}</td>
                      <td>
                        <span className="time-badge medication">
                          {new Date(med.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td>{med.timesPerDay}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {med.type}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No medications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}