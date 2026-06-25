import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Icon = {
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const supportItems = [
  {
    id: "privacy",
    icon: "Shield",
    title: "Privacy Policy",
    description: "Learn how we collect, use, and protect your personal data.",
    href: "/api/dashboard/settings/privacy-policy",
  },
  {
    id: "terms",
    icon: "FileText",
    title: "Terms & Conditions",
    description: "Read the terms governing your use of MindMate.",
    href: "/api/dashboard/settings/terms-and-conditions",
  },
];

function SettingsRow({ icon, title, description, onClick, variant = "default", disabled, badge }) {
  const IconComp = Icon[icon];
  return (
    <button
      className={`sp-row sp-row--${variant} ${disabled ? "sp-row--disabled" : ""}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type="button"
    >
      <div className={`sp-row__icon-wrap sp-row__icon-wrap--${variant}`}>
        {IconComp && <IconComp />}
      </div>
      <div className="sp-row__body">
        <span className="sp-row__title">{title}</span>
        <span className="sp-row__desc">{description}</span>
      </div>
      <div className="sp-row__right">
        {badge && <span className="sp-row__badge">{badge}</span>}
        {!disabled && (
          <span className="sp-row__chevron">
            <Icon.Chevron />
          </span>
        )}
      </div>
    </button>
  );
}

function Modal({ open, onClose, onConfirm, title, message, confirmLabel, confirmVariant = "danger", icon }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  const IconComp = icon ? Icon[icon] : null;

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <div className={`sp-modal sp-modal--${confirmVariant}`} onClick={(e) => e.stopPropagation()}>
        <button className="sp-modal__close" onClick={onClose} aria-label="Close">
          <Icon.X />
        </button>
        {IconComp && (
          <div className={`sp-modal__icon sp-modal__icon--${confirmVariant}`}>
            <IconComp />
          </div>
        )}
        <h3 className="sp-modal__title">{title}</h3>
        <p className="sp-modal__message">{message}</p>
        <div className="sp-modal__actions">
          <button className="sp-modal__btn sp-modal__btn--cancel" onClick={onClose}>
            Cancel
          </button>
          <button className={`sp-modal__btn sp-modal__btn--${confirmVariant}`} onClick={onConfirm}>
            {confirmVariant === "danger" ? <Icon.Trash /> : <Icon.LogOut />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    setLogoutModal(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedPatientId");
    navigate("/api/auth/login");
  };

  return (
    <div className="sp-root">
      <div className={`sp-page ${visible ? "sp-page--visible" : ""}`}>

        <header className="sp-header">
          <h1 className="sp-title">Settings</h1>
          <p className="sp-subtitle">Manage your account, preferences, and application settings.</p>
        </header>

        {/* Support & Legal */}
        <section className="sp-section" style={{ animationDelay: "60ms" }}>
          <div className="sp-section__meta">
            <span className="sp-section__eyebrow">Support &amp; Legal</span>
          </div>
          <div className="sp-card">
            {supportItems.map((item, i) => (
              <div key={item.id}>
                <SettingsRow
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onClick={() => navigate(item.href)}
                />
                {i < supportItems.length - 1 && <div className="sp-divider" />}
              </div>
            ))}
          </div>
        </section>

        {/* Account */}
        <section className="sp-section" style={{ animationDelay: "120ms" }}>
          <div className="sp-section__meta">
            <span className="sp-section__eyebrow">Account</span>
          </div>
          <div className="sp-card">
            <SettingsRow
              icon="LogOut"
              title="Log Out"
              description="Sign out from your account securely on this device."
              onClick={() => setLogoutModal(true)}
              variant="logout"
            />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="sp-section" style={{ animationDelay: "180ms" }}>
          <div className="sp-section__meta">
            <span className="sp-section__eyebrow sp-section__eyebrow--danger">Danger Zone</span>
            <p className="sp-section__danger-note">These actions are permanent and cannot be undone.</p>
          </div>
          <div className="sp-card sp-card--danger">
            <SettingsRow
              icon="Trash"
              title="Delete Account"
              description="Permanently remove your account and all associated health data."
              variant="danger"
              badge="Coming Soon"
              disabled
            />
          </div>
        </section>

        <footer className="sp-footer">
          <span>MindMate</span>
          <span className="sp-footer__dot" />
          <span>Version 1.0.0</span>
          <span className="sp-footer__dot" />
          <span>© {new Date().getFullYear()} MindMate Inc.</span>
        </footer>
      </div>

      <Modal
        open={logoutModal}
        onClose={() => setLogoutModal(false)}
        onConfirm={handleLogout}
        title="Log out of MindMate?"
        message="You'll be signed out of this device. Your data stays safe and accessible when you log back in."
        confirmLabel="Log Out"
        confirmVariant="warning"
        icon="LogOut"
      />

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => setDeleteModal(false)}
        title="Delete your account?"
        message="This will permanently delete your account, all caregiver connections, and health records. This cannot be undone."
        confirmLabel="Delete Account"
        confirmVariant="danger"
        icon="AlertTriangle"
      />
    </div>
  );
}