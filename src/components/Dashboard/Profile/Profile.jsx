import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import useGetProfile from "../../../hook/profile/useGetProfile";

const Profile = () => {
  const navigate = useNavigate();

  const { profile, loading, error } = useGetProfile();

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
      <h1 className="profile-page-title">Profile</h1>

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