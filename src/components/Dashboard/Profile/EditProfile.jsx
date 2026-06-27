import React, { useState, useEffect, useRef, useCallback } from "react";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

import useGetCaregiverProfile from "../../../hook/profile/useGetProfile";
import useUpdateCaregiverProfile from "../../../hook/profile/useUpdateProfile";
import useUploadProfilePicture from "../../../hook/profile/useUploadProfile";
import useDeleteProfilePicture from "../../../hook/profile/useDeleteProfilePhoto";

const IconPencil = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconUpload = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const DEFAULT_AVATAR = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`;


const CropModal = ({ imageSrc, onConfirm, onCancel }) => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const imgRef = useRef(new Image());

  const SIZE = 280;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;
    if (!img.complete) return;

    ctx.clearRect(0, 0, SIZE, SIZE);

    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    const scale = zoom * Math.max(SIZE / img.naturalWidth, SIZE / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (SIZE - w) / 2 + offset.x;
    const y = (SIZE - h) / 2 + offset.y;
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(94,165,192,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [zoom, offset]);

  useEffect(() => {
    imgRef.current.src = imageSrc;
    imgRef.current.onload = draw;
  }, [imageSrc, draw]);

  useEffect(() => { draw(); }, [draw]);

  const onMouseDown = (e) => {
    setDragging(true);
    dragStart.current = {
      mx: e.clientX ?? e.touches?.[0]?.clientX,
      my: e.clientY ?? e.touches?.[0]?.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };
  const onMouseMove = (e) => {
    if (!dragging || !dragStart.current) return;
    const mx = e.clientX ?? e.touches?.[0]?.clientX;
    const my = e.clientY ?? e.touches?.[0]?.clientY;
    setOffset({
      x: dragStart.current.ox + (mx - dragStart.current.mx),
      y: dragStart.current.oy + (my - dragStart.current.my),
    });
  };
  const onMouseUp = () => setDragging(false);

  const handleConfirm = () => {
    const out = document.createElement("canvas");
    out.width = SIZE;
    out.height = SIZE;
    const ctx = out.getContext("2d");
    const img = imgRef.current;
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    const scale = zoom * Math.max(SIZE / img.naturalWidth, SIZE / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (SIZE - w) / 2 + offset.x;
    const y = (SIZE - h) / 2 + offset.y;
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();

    out.toBlob((blob) => {
      const preview = URL.createObjectURL(blob);
      const file = new File([blob], "profile.png", { type: "image/png" });
      onConfirm(preview, file);
    }, "image/png");
  };

  return (
    <div className="ep-modal-overlay" onClick={onCancel}>
      <div className="ep-modal ep-crop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ep-modal-header">
          <span className="ep-modal-title">Adjust Photo</span>
          <button className="ep-modal-close-btn" onClick={onCancel}><IconX /></button>
        </div>

        <p className="ep-crop-hint">Drag to reposition · scroll or slide to zoom</p>

        <div className="ep-crop-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            className="ep-crop-canvas"
            style={{ cursor: dragging ? "grabbing" : "grab" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onMouseDown}
            onTouchMove={onMouseMove}
            onTouchEnd={onMouseUp}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((z) => Math.min(3, Math.max(1, z - e.deltaY * 0.002)));
            }}
          />
        </div>

        <div className="ep-zoom-row">
          <span className="ep-zoom-label">Zoom</span>
          <input
            type="range" min="1" max="3" step="0.01"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="ep-zoom-slider"
          />
        </div>

        <div className="ep-modal-actions">
          <button className="ep-modal-btn ep-modal-btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="ep-modal-btn ep-modal-btn--primary" onClick={handleConfirm}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};


const DeleteConfirmModal = ({ onConfirm, onCancel, loading }) => (
  <div className="ep-modal-overlay" onClick={onCancel}>
    <div className="ep-modal ep-confirm-modal" onClick={(e) => e.stopPropagation()}>
      <div className="ep-confirm-icon-wrap">
        <IconTrash />
      </div>
      <h3 className="ep-confirm-title">Remove profile photo?</h3>
      <p className="ep-confirm-body">
        Are you sure you want to delete your profile picture? This cannot be undone.
      </p>
      <div className="ep-modal-actions">
        <button className="ep-modal-btn ep-modal-btn--secondary" onClick={onCancel} disabled={loading}>
          No, keep it
        </button>
        <button className="ep-modal-btn ep-modal-btn--danger" onClick={onConfirm} disabled={loading}>
          {loading ? <span className="ep-avatar-edit-spinner" /> : "Yes, delete"}
        </button>
      </div>
    </div>
  </div>
);


const AvatarEditor = ({ previewImage, onPreviewChange, uploadPicture, deletePicture, uploadLoading, deleteLoading }) => {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const busy = uploadLoading || deleteLoading;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    setCropSrc(src);
    setMenuOpen(false);
    e.target.value = "";
  };

  const handleCropConfirm = async (preview, file) => {
    setCropSrc(null);
    const res = await uploadPicture(file);
    if (res?.success) {
      onPreviewChange(preview);
    }
  };

  const handleDeleteConfirm = async () => {
    const res = await deletePicture();
    if (res?.success) {
      onPreviewChange(DEFAULT_AVATAR);
    }
    setShowDelete(false);
  };

  return (
    <>
      <div className="edit-profile-page-avatar-wrapper" ref={dropdownRef}>
        <img className={`edit-profile-page-avatar${previewImage === DEFAULT_AVATAR ? " ep-avatar--placeholder" : ""}`} src={previewImage} alt="profile" />

        <button
          className="ep-avatar-edit-btn"
          onClick={() => !busy && setMenuOpen((v) => !v)}
          disabled={busy}
          aria-label="Edit profile picture"
        >
          {uploadLoading
            ? <span className="ep-avatar-edit-spinner" />
            : <IconPencil />}
        </button>

        {menuOpen && (
          <div className="ep-avatar-dropdown" role="menu">
            <button
              className="ep-avatar-dropdown-item"
              onClick={() => { fileInputRef.current?.click(); }}
              disabled={busy}
              role="menuitem"
            >
              <IconUpload /> Upload new photo
            </button>

            <div className="ep-avatar-dropdown-divider" />

            <button
              className="ep-avatar-dropdown-item ep-avatar-dropdown-item--danger"
              onClick={() => { setShowDelete(true); setMenuOpen(false); }}
              disabled={busy}
              role="menuitem"
            >
              <IconTrash /> Remove photo
            </button>

            <div className="ep-avatar-dropdown-divider" />

            <button
              className="ep-avatar-dropdown-item"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              <IconX /> Cancel
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {cropSrc && (
        <CropModal
          imageSrc={cropSrc}
          onConfirm={handleCropConfirm}
          onCancel={() => setCropSrc(null)}
        />
      )}

      {showDelete && (
        <DeleteConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDelete(false)}
          loading={deleteLoading}
        />
      )}
    </>
  );
};


const EditProfile = () => {
  const navigate = useNavigate();

  const { profile: caregiver } = useGetCaregiverProfile();

  // ✅ FIXED: was `const [updateProfile, { loading }] = useUpdateCaregiverProfile();`
  // Hook returns an object, not an array — object destructuring required.
  // handleUpdateProfile is aliased to updateProfile so nothing else changes.
  const {
    handleUpdateProfile: updateProfile,
    loading,
  } = useUpdateCaregiverProfile();

  const [uploadPicture, { loading: uploadLoading }] = useUploadProfilePicture();
  const [deletePicture, { loading: deleteLoading }] = useDeleteProfilePicture();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState(DEFAULT_AVATAR);

  useEffect(() => {
  if (!caregiver) return;

  const nameParts =
    caregiver?.name?.split(" ") || [];

  setForm({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    email: caregiver?.email || "",
    phoneNumber: caregiver?.phoneNumber || "",
    gender: caregiver?.gender || "",
    address: caregiver?.address || "",
  });

  setPreviewImage(
    caregiver?.profilePicture?.trim()
      ? caregiver.profilePicture
      : DEFAULT_AVATAR
  );
}, [caregiver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  const payload = {
    name: `${form.firstName} ${form.lastName}`.trim(),
    phoneNumber: form.phoneNumber,
    gender: form.gender,
    address: form.address,
  };

  const result = await updateProfile(payload);

  if (
    result?.type ===
    "profile/updateProfile/fulfilled"
  ) {
    navigate("/api/dashboard/profile", { state: { successMessage: "Profile updated successfully!" } });
  }
};

  return (
    <div className="edit-profile-page">
      <button className="back-button" onClick={() => navigate("/api/dashboard/profile")} style={{ color: "#5EA5C0" }}>
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
        <div className="edit-profile-page-header">
          <AvatarEditor
            previewImage={previewImage}
            onPreviewChange={setPreviewImage}
            uploadPicture={uploadPicture}
            deletePicture={deletePicture}
            uploadLoading={uploadLoading}
            deleteLoading={deleteLoading}
          />

          <div className="edit-profile-page-user-info">
            <span className="edit-profile-page-user-name">{caregiver?.name}</span>
            <span className="edit-profile-page-user-email">{caregiver?.email}</span>
          </div>
        </div>

        <div className="edit-profile-page-form">
          <div className="edit-profile-page-field-group">
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label">First Name</label>
              <input className="edit-profile-page-input" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label">Last Name</label>
              <input className="edit-profile-page-input" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="edit-profile-page-field-group">
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Email
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Read Only
                </span>
              </label>
              <input className="edit-profile-page-input" name="email" value={form.email} disabled style={{ backgroundColor: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }} />
            </div>
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label">Phone Number</label>
              <input className="edit-profile-page-input" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="edit-profile-page-field-group">
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Gender
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '12px' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Read Only
                </span>
              </label>
              <input 
                className="edit-profile-page-input" 
                name="gender" 
                value={form.gender ? form.gender.charAt(0).toUpperCase() + form.gender.slice(1) : ""} 
                disabled 
                style={{ backgroundColor: '#f8fafc', color: '#64748b', cursor: 'not-allowed' }} 
              />
            </div>
            <div className="edit-profile-page-field">
              <label className="edit-profile-page-label">Address</label>
              <input className="edit-profile-page-input" name="address" value={form.address} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="edit-profile-page-buttons">
          <button className="edit-profile-page-save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="edit-profile-page-cancel-btn" onClick={() => navigate("/api/dashboard/profile")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;