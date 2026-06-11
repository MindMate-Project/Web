import React, { useState } from "react";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "sara",
    lastName: "ahmed",
    email: "saraahmed24@gmail.com",
    phone: "+20 10567890",
    dob: "2004-04-24",
    gender: "Female",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm({
      firstName: "sara",
      lastName: "ahmed",
      email: "saraahmed24@gmail.com",
      phone: "+20 10567890",
      dob: "2004-04-24",
      gender: "Female",
    });
  };
  const handleBack = () => navigate("/api/dashboard/profile");

  return (
    <div className="edit-profile-page">
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
        Back To Profile
      </button>
      <h1 className="edit-profile-page-title">Edit Profile</h1>

      <div className="edit-profile-page-card">
        {/* ── Profile Header ── */}
        <div className="edit-profile-page-header">
          <div className="edit-profile-page-avatar-wrapper">
            <img
              className="edit-profile-page-avatar"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Sara Ahmed"
            />
          </div>
          <div className="edit-profile-page-user-info">
            <span className="edit-profile-page-user-name">Sara Ahmed</span>
            <span className="edit-profile-page-user-email">saraahmed24@gmail.com</span>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="edit-profile-page-form">
          {/* Row 1 */}
          <div className="edit-profile-page-field-group">
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" htmlFor="ep-firstName">
                First Name
              </label>
              <input
                id="ep-firstName"
                className="edit-profile-page-input"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" htmlFor="ep-lastName">
                Last Name
              </label>
              <input
                id="ep-lastName"
                className="edit-profile-page-input"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="edit-profile-page-field-group">
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" htmlFor="ep-email">
                Email
              </label>
              <input
                id="ep-email"
                className="edit-profile-page-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" htmlFor="ep-phone">
                Phone Number
              </label>
              <input
                id="ep-phone"
                className="edit-profile-page-input"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="edit-profile-page-field-group">
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" htmlFor="ep-dob">
                Date of Birth
              </label>
              <input
                id="ep-dob"
                className="edit-profile-page-input edit-profile-page-input--date"
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
              />
            </div>
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" htmlFor="ep-gender">
                Gender
              </label>
              <select
                id="ep-gender"
                className="edit-profile-page-select"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="edit-profile-page-buttons">
          <button className="edit-profile-page-save-btn">Save</button>
          <button className="edit-profile-page-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
