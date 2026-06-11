import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-page">
      <h1 className="profile-page-title">Profile</h1>

      <div className="profile-page-card">
        {/* Profile Header */}
        <div className="profile-page-header">
          <div className="profile-page-avatar-wrapper">
            <img
              className="profile-page-avatar"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Sara Ahmed"
            />
          </div>
          <div className="profile-page-user-info">
            <span className="profile-page-user-name">Sara Ahmed</span>
            <span className="profile-page-user-email">saraahmed24@gmail.com</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="profile-page-form">
          {/* Row 1 */}
          <div className="profile-page-field-group">
            <div className="profile-page-field">
              <label className="profile-page-label">First Name</label>
              <div className="profile-page-input">sara</div>
            </div>
            <div className="profile-page-field">
              <label className="profile-page-label">Last Name</label>
              <div className="profile-page-input">ahmed</div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="profile-page-field-group">
            <div className="profile-page-field">
              <label className="profile-page-label">Email</label>
              <div className="profile-page-input">saraahmed24@gmail.com</div>
            </div>
            <div className="profile-page-field">
              <label className="profile-page-label">Phone Number</label>
              <div className="profile-page-input">+20 10567890</div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="profile-page-field-group">
            <div className="profile-page-field">
              <label className="profile-page-label">Date of Birth</label>
              <div className="profile-page-input">24/4/2004</div>
            </div>
            <div className="profile-page-field">
              <label className="profile-page-label">Gender</label>
              <div className="profile-page-input">Female</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-page-actions">
          <button 
            className="profile-page-btn-edit"
            onClick={() => navigate("/api/dashboard/profile/edit")}
          >
              Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
