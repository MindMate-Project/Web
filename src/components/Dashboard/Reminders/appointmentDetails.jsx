import React, { useEffect, useState } from "react";
import "./appointmentDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRemindersByPatient,
  deleteReminder,
} from "../../../redux/slices/reminderSlice";
import DeleteReminderModal from "./deleteModal";

export default function AppointmentCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const patientId = localStorage.getItem("selectedPatientId");

  const reminders = useSelector(
    (state) => state.reminderReducer?.reminders || []
  );

  const [appointment, setAppointment] = useState(null);

  // ===== MODAL STATE =====
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ===== GET DATA =====
  useEffect(() => {
    if (patientId) dispatch(getRemindersByPatient(patientId));
  }, [dispatch, patientId]);

  useEffect(() => {
    const app = reminders.find((r) => r._id === id);
    setAppointment(app);
  }, [reminders, id]);

  // ===== NAVIGATION =====
  const handleBack = () => navigate("/api/dashboard/reminders");

  const handleEdit = () =>
    navigate(`/api/dashboard/reminders/apointment/${id}/edit`);

  // ===== DELETE =====
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!appointment) return;

    setIsDeleting(true);

    try {
      await dispatch(deleteReminder(appointment._id)).unwrap();

      setIsDeleteModalOpen(false);
      navigate("/api/dashboard/reminders");

    } catch (err) {
      console.error(err);
    }

    setIsDeleting(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // ===== LOADING =====
  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="appointment-details-page">

      <button
        className="details-back-button"
        onClick={handleBack}
        type="button"
      >
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

      <h2 className="details-page-title">Appointment Information</h2>

      <div className="details-card">

        <div className="details-row">
          <div className="details-label">Doctor Name</div>
          <div className="details-content two">
            <div className="details-box">{appointment.doctorName}</div>
            <div className="details-box">
              <span className="details-subtitle">Specialty</span>
              <span className="details-value">{appointment.specialty}</span>
            </div>
          </div>
        </div>

        <div className="details-row">
          <div className="details-label">Location</div>
          <div className="details-content">
            <div className="details-box center full">
              <span className="details-value">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5EA5C0"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="details-icon"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {appointment.location}
              </span>
            </div>
          </div>
        </div>

        <div className="details-row">
          <div className="details-label">Purpose</div>
          <div className="details-content">
            <div className="details-box full">
              {appointment.appointmentType}
            </div>
          </div>
        </div>

        <div className="details-row">
          <div className="details-label">Schedule</div>
          <div className="details-content two">

            {/* Date */}
            <div className="details-box center">
              <span className="details-value">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5EA5C0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="details-icon"
                >
                  <path d="M16 14v2.2l1.6 1"/>
                  <path d="M16 2v4"/>
                  <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>
                  <path d="M3 10h5"/>
                  <path d="M8 2v4"/>
                  <circle cx="16" cy="16" r="6"/>
                </svg>
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </span>
            </div>

            {/* Time */}
            <div className="details-box center">
              <span className="details-value">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5EA5C0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="details-icon"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6h4"/>
                </svg>
                {new Date(appointment.appointmentDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              </span>
            </div>
          </div>
        </div>

        <div className="details-row">
          <div className="details-label">Notes</div>
          <div className="details-content">
            <textarea
              className="details-notes"
              value={appointment.notes || ""}
              readOnly
            />
          </div>
        </div>

        <div className="details-actions">
          <button
            className="details-btn edit"
            onClick={handleEdit}
            type="button"
          >
            Edit
          </button>

          <button
            className="details-btn delete"
            onClick={handleDeleteClick}
            type="button"
          >
            Delete
          </button>
        </div>

      </div>

      {/* DELETE MODAL */}
      <DeleteReminderModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

    </div>
  );
}