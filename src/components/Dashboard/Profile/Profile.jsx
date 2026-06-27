import React, { useEffect } from "react";
import "./Profile.css";
import { useNavigate, useLocation } from "react-router-dom";
import useGetProfile from "../../../hook/profile/useGetProfile";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const { profile, loading, error } = useGetProfile();

  useEffect(() => {
    // Clear the location state so the message doesn't persist on page refresh
    if (successMessage) {
      const timeout = setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 5000); // Automatically hide after 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const fullName = profile?.name || "";
  const firstName = fullName.split(" ")[0] || "";
  const lastName = fullName.split(" ").slice(1).join(" ") || "";

  if (loading) {
    return (
      <div className="profile-page">
        <h1 className="profile-page-title">Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <h1 className="profile-page-title">Profile</h1>
        <p>{error?.message || "Failed to load profile"}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 className="profile-page-title" style={{ marginBottom: 0 }}>Profile</h1>
      </div>

      {successMessage && (
        <div style={{
          backgroundColor: '#ecfdf5',
          borderLeft: '4px solid #10b981',
          padding: '12px 16px',
          marginBottom: '24px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span style={{ color: '#065f46', fontWeight: '500', fontSize: '0.95rem' }}>{successMessage}</span>
        </div>
      )}

      <div className="profile-page-card">
        {/* Profile Header */}
        <div className="profile-page-header">
          <div className="profile-page-avatar-wrapper">
            <img
              className="profile-page-avatar"
              src={
                profile?.profilePicture ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt={profile?.name || "Profile"}
            />
          </div>

          <div className="profile-page-user-info">
            <span className="profile-page-user-name">
              {profile?.name || "-"}
            </span>

            <span className="profile-page-user-email">
              {profile?.email || "-"}
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="profile-page-form">
          {/* Row 1 */}
          <div className="profile-page-field-group">
            <div className="profile-page-field">
              <label className="profile-page-label">
                First Name
              </label>
              <div className="profile-page-input">
                {firstName || "-"}
              </div>
            </div>

            <div className="profile-page-field">
              <label className="profile-page-label">
                Last Name
              </label>
              <div className="profile-page-input">
                {lastName || "-"}
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="profile-page-field-group">
            <div className="profile-page-field">
              <label className="profile-page-label">
                Email
              </label>
              <div className="profile-page-input">
                {profile?.email || "-"}
              </div>
            </div>

            <div className="profile-page-field">
              <label className="profile-page-label">
                Phone Number
              </label>
              <div className="profile-page-input">
                {profile?.phoneNumber || "-"}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="profile-page-field-group">
            <div className="profile-page-field">
              <label className="profile-page-label">
                Address
              </label>
              <div className="profile-page-input">
                {profile?.address || "-"}
              </div>
            </div>

            <div className="profile-page-field">
              <label className="profile-page-label">
                Gender
              </label>
              <div className="profile-page-input">
                {profile?.gender || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-page-actions">
          <button
            className="profile-page-btn-edit"
            onClick={() =>
              navigate("/api/dashboard/profile/edit")
            }
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;