import React, { useEffect, useState } from "react";
import "./MedicineDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRemindersByPatient,
  deleteReminder,
} from "../../../redux/slices/reminderSlice";
import DeleteReminderModal from "./deleteModal";

export default function MedicineDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const patientId = localStorage.getItem("selectedPatientId");

  const reminders = useSelector(
    (state) => state.reminderReducer?.reminders || []
  );

  const [medicine, setMedicine] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (patientId) dispatch(getRemindersByPatient(patientId));
  }, [dispatch, patientId]);

  useEffect(() => {
    const med = reminders.find(
      (r) => r._id === id && r.type === "medication"
    );
    setMedicine(med);
  }, [reminders, id]);

  const handleBack = () => navigate("/api/dashboard/reminders");

  const medicineEdit = () =>
    navigate(`/api/dashboard/reminders/medicine/${id}/edit`);

  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  const confirmDelete = async () => {
    if (!medicine) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteReminder(medicine._id)).unwrap();
      setIsDeleteModalOpen(false);
      navigate("/api/dashboard/reminders");
    } catch (err) {
      console.error(err);
    }
    setIsDeleting(false);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  if (!medicine) return <p>Loading...</p>;

  return (
    <div className="medicine-details-page">

      <button className="back-button" onClick={handleBack} type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Back To Reminders
      </button>

      <h2 className="medicine-details-title">Medicine Information</h2>

      <div className="medicine-details-card">

        {/* Drug Name */}
        <div className="medicine-details-row">
          <div className="medicine-details-label">Drug Name</div>
          <div className="medicine-details-content">
            <div className="medicine-details-box medicine-details-full">
              <span className="medicine-details-text">
                {medicine.medicineName}
              </span>
            </div>
          </div>
        </div>

        {/* Dosage */}
        <div className="medicine-details-row">
          <div className="medicine-details-label">Dosage</div>
          <div className="medicine-details-content medicine-details-two">

            <div className="medicine-details-box medicine-details-vertical">
              <span className="medicine-details-subtitle">Amount</span>
              <div className="medicine-details-value">
                <svg viewBox="-0.72 -0.72 25.44 25.44" className="medicine-details-icon">
                  <path
                    d="M19.54,4.46a5,5,0,0,0-7.08,0l-8,8a5,5,0,0,0,7.08,7.08l8-8a5,5,0,0,0,0-7.08Z"
                    fill="#ffffff"
                    stroke="#2ca9bc"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15.54,15.54l-4,4a5,5,0,0,1-7.08-7.08l4-4Z"
                    fill="#2ca9bc"
                  />
                </svg>
                <span className="medicine-details-text">
                  {medicine.dosage}
                </span>
              </div>
            </div>

            <div className="medicine-details-box medicine-details-vertical">
              <span className="medicine-details-subtitle">Type</span>
              <div className="medicine-details-value">
                <svg viewBox="-0.72 -0.72 25.44 25.44" className="medicine-details-icon">
                  <path
                    d="M19.54,4.46a5,5,0,0,0-7.08,0l-8,8a5,5,0,0,0,7.08,7.08l8-8a5,5,0,0,0,0-7.08Z"
                    fill="#ffffff"
                    stroke="#2ca9bc"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15.54,15.54l-4,4a5,5,0,0,1-7.08-7.08l4-4Z"
                    fill="#2ca9bc"
                  />
                </svg>
                <span className="medicine-details-text">
                  {medicine.form}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Treatment Period */}
        <div className="medicine-details-row">
          <div className="medicine-details-label">Treatment Period</div>
          <div className="medicine-details-content medicine-details-two">

            <div className="medicine-details-box medicine-details-vertical">
              <span className="medicine-details-subtitle">Start Date</span>
              <div className="medicine-details-value">
                <svg
                  viewBox="0 0 24 24"
                  stroke="#5EA5C0"
                  strokeWidth="1.5"
                  fill="none"
                  className="medicine-details-icon"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="medicine-details-text">
                  {new Date(medicine.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="medicine-details-box medicine-details-vertical">
              <span className="medicine-details-subtitle">End Date</span>
              <div className="medicine-details-value">
                <svg
                  viewBox="0 0 24 24"
                  stroke="#5EA5C0"
                  strokeWidth="1.5"
                  fill="none"
                  className="medicine-details-icon"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span className="medicine-details-text">
                  {new Date(medicine.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Reminder Time */}
        <div className="medicine-details-row">
          <div className="medicine-details-label">Reminder Time</div>
          <div className="medicine-details-content">
            <div className="medicine-details-box medicine-details-full">
              <div className="medicine-details-value">
                <svg
                  viewBox="0 0 24 24"
                  stroke="#5EA5C0"
                  strokeWidth="1.5"
                  fill="none"
                  className="medicine-details-icon"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="medicine-details-text">
                  {new Date(medicine.scheduledTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dosage Schedule */}
        <div className="medicine-details-row">
          <div className="medicine-details-label">Dosage Schedule</div>
          <div className="medicine-details-content medicine-details-two">

            <div className="medicine-details-box">
              <div className="medicine-details-value">

                <svg
                width="20px"
                height="20px"
                viewBox="0 0 56 56"
                fill="#2ca9bc"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0) matrix(-1, 0, 0, 1, 0, 0)"
                >
                <path d="M 8.7343 13.4688 C 9.0858 13.4688 9.3436 13.4219 9.6718 13.1641 L 17.5234 7.2344 C 17.9218 6.9532 18.1327 6.5781 18.1327 6.1797 C 18.1327 5.6875 17.8983 5.2891 17.4999 4.9141 C 16.6093 4.1172 15.0155 3.6719 13.6093 3.6719 C 9.9296 3.6719 7.0234 6.6016 7.0234 10.2578 C 7.0234 11.1250 7.1640 11.9922 7.3983 12.5313 C 7.6562 13.1172 8.1718 13.4688 8.7343 13.4688 Z M 47.2421 13.4688 C 47.8280 13.4688 48.2968 13.0937 48.5780 12.5313 C 48.8358 12.0157 48.9765 11.1250 48.9765 10.2578 C 48.9765 6.6016 46.0468 3.6719 42.3671 3.6719 C 40.9843 3.6719 39.3905 4.1172 38.4999 4.9141 C 38.1014 5.2891 37.8671 5.6875 37.8671 6.1797 C 37.8671 6.5781 38.0780 6.9532 38.4530 7.2344 L 46.3046 13.1641 C 46.6327 13.4219 46.8905 13.4688 47.2421 13.4688 Z M 8.3827 51.6016 C 9.1093 52.3281 10.2577 52.3281 10.9843 51.5781 L 14.6874 47.8985 C 18.4140 50.6406 23.0077 52.2813 27.9999 52.2813 C 32.9921 52.2813 37.5858 50.6406 41.3124 47.8985 L 45.0155 51.5781 C 45.7421 52.3281 46.8905 52.3281 47.5936 51.6016 C 48.2733 50.9219 48.2968 49.7735 47.5702 49.0703 L 44.0077 45.5313 C 47.9687 41.5 50.4063 35.9688 50.4063 29.8750 C 50.4063 17.5000 40.3749 7.4453 27.9999 7.4453 C 15.6249 7.4453 5.5937 17.5000 5.5937 29.8750 C 5.5937 35.9688 8.0312 41.5 11.9687 45.5313 L 8.4062 49.0703 C 7.7030 49.7735 7.7030 50.9219 8.3827 51.6016 Z M 27.9999 48.2735 C 17.8280 48.2735 9.5780 40.0469 9.5780 29.8750 C 9.5780 19.7266 17.8280 11.4766 27.9999 11.4766 C 38.1483 11.4766 46.3749 19.7266 46.3749 29.8750 C 46.3749 40.0469 38.1483 48.2735 27.9999 48.2735 Z M 17.3358 32.4532 L 27.9765 32.4532 C 28.8905 32.4532 29.6171 31.7500 29.6171 30.8359 L 29.6171 16.6328 C 29.6171 15.7188 28.8905 14.9922 27.9765 14.9922 C 27.0624 14.9922 26.3593 15.7188 26.3593 16.6328 L 26.3593 29.1953 L 17.3358 29.1953 C 16.3983 29.1953 15.6952 29.9219 15.6952 30.8359 C 15.6952 31.7500 16.3983 32.4532 17.3358 32.4532 Z"/>
                </svg>

                <span className="medicine-details-text">
                  {medicine.frequency}
                </span>
              </div>
            </div>

            <div className="medicine-details-box">
              <div className="medicine-details-value">

                <svg
                width="20px"
                height="20px"
                viewBox="0 0 56 56"
                fill="#2ca9bc"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0) matrix(-1, 0, 0, 1, 0, 0)"
                >
                <path d="M 8.7343 13.4688 C 9.0858 13.4688 9.3436 13.4219 9.6718 13.1641 L 17.5234 7.2344 C 17.9218 6.9532 18.1327 6.5781 18.1327 6.1797 C 18.1327 5.6875 17.8983 5.2891 17.4999 4.9141 C 16.6093 4.1172 15.0155 3.6719 13.6093 3.6719 C 9.9296 3.6719 7.0234 6.6016 7.0234 10.2578 C 7.0234 11.1250 7.1640 11.9922 7.3983 12.5313 C 7.6562 13.1172 8.1718 13.4688 8.7343 13.4688 Z M 47.2421 13.4688 C 47.8280 13.4688 48.2968 13.0937 48.5780 12.5313 C 48.8358 12.0157 48.9765 11.1250 48.9765 10.2578 C 48.9765 6.6016 46.0468 3.6719 42.3671 3.6719 C 40.9843 3.6719 39.3905 4.1172 38.4999 4.9141 C 38.1014 5.2891 37.8671 5.6875 37.8671 6.1797 C 37.8671 6.5781 38.0780 6.9532 38.4530 7.2344 L 46.3046 13.1641 C 46.6327 13.4219 46.8905 13.4688 47.2421 13.4688 Z M 8.3827 51.6016 C 9.1093 52.3281 10.2577 52.3281 10.9843 51.5781 L 14.6874 47.8985 C 18.4140 50.6406 23.0077 52.2813 27.9999 52.2813 C 32.9921 52.2813 37.5858 50.6406 41.3124 47.8985 L 45.0155 51.5781 C 45.7421 52.3281 46.8905 52.3281 47.5936 51.6016 C 48.2733 50.9219 48.2968 49.7735 47.5702 49.0703 L 44.0077 45.5313 C 47.9687 41.5 50.4063 35.9688 50.4063 29.8750 C 50.4063 17.5000 40.3749 7.4453 27.9999 7.4453 C 15.6249 7.4453 5.5937 17.5000 5.5937 29.8750 C 5.5937 35.9688 8.0312 41.5 11.9687 45.5313 L 8.4062 49.0703 C 7.7030 49.7735 7.7030 50.9219 8.3827 51.6016 Z M 27.9999 48.2735 C 17.8280 48.2735 9.5780 40.0469 9.5780 29.8750 C 9.5780 19.7266 17.8280 11.4766 27.9999 11.4766 C 38.1483 11.4766 46.3749 19.7266 46.3749 29.8750 C 46.3749 40.0469 38.1483 48.2735 27.9999 48.2735 Z M 17.3358 32.4532 L 27.9765 32.4532 C 28.8905 32.4532 29.6171 31.7500 29.6171 30.8359 L 29.6171 16.6328 C 29.6171 15.7188 28.8905 14.9922 27.9765 14.9922 C 27.0624 14.9922 26.3593 15.7188 26.3593 16.6328 L 26.3593 29.1953 L 17.3358 29.1953 C 16.3983 29.1953 15.6952 29.9219 15.6952 30.8359 C 15.6952 31.7500 16.3983 32.4532 17.3358 32.4532 Z"/>
                </svg>

                <span className="medicine-details-text">
                  {medicine.timesPerDay}
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="medicine-details-actions">
          <button
            className="medicine-details-btn medicine-details-edit"
            onClick={medicineEdit}
          >
            Edit
          </button>

          <button
            className="medicine-details-btn medicine-details-delete"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>

      </div>

      <DeleteReminderModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />

    </div>
  );
}