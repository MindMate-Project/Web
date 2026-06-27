import { useState, useEffect } from "react";
import "./Notification.css";

// =============================================================================
// TEMPORARY MOCK DATA — Remove once the real Notifications API is integrated.
// Replace `initialNotifications` with the API response and wire up the fetch
// inside the useEffect below (see the comment there).
// =============================================================================
const WELCOME_NOTIFICATION = {
  id: 1,
  type: "welcome",
  title: "Welcome to MindMate",
  message: "We're glad to have you here. Thank you for using MindMate.",
  timestamp: "10 days ago",
  date: "Jun 17, 2026",
  read: true,
};
// =============================================================================
// END TEMPORARY MOCK DATA
// =============================================================================

// Icon + colour config per notification type.
// Add more entries here as the backend introduces new notification types.
const typeConfig = {
  welcome: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    color: "#5BA8C9",
    bg: "#EAF7FD",
    label: "Welcome",
  },
  // TODO: Uncomment / extend these entries once the real API is in place and
  // the backend sends typed notifications.
  location: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "#5BA8C9",
    bg: "#EAF7FD",
    label: "Location",
  },
  medication: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
        <circle cx="18" cy="18" r="4" />
        <path d="M18 16v4M16 18h4" />
      </svg>
    ),
    color: "#22C55E",
    bg: "#F0FDF4",
    label: "Medication",
  },
  appointment: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    color: "#F97316",
    bg: "#FFF7ED",
    label: "Appointment",
  },
  emergency: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: "#EF4444",
    bg: "#FEF2F2",
    label: "Emergency",
  },
  caregiver: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    color: "#A855F7",
    bg: "#FAF5FF",
    label: "Caregiver",
  },
};

const FILTERS = ["all", "unread"];

export default function NotificationsPage() {
  // -------------------------------------------------------------------------
  // TEMPORARY: Seeded with only the welcome notification.
  // When the real API is ready, replace this initial value with [] and fetch
  // from the API inside the useEffect below.
  // -------------------------------------------------------------------------
  const [notifications, setNotifications] = useState([WELCOME_NOTIFICATION]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Page-entrance animation
    const t = setTimeout(() => setVisible(true), 80);

    // -----------------------------------------------------------------------
    // TODO: Replace the block below with a real API fetch when the backend
    // Notifications endpoint is available. Example:
    //
    //   fetch("/api/notifications", { headers: { Authorization: `Bearer ${token}` } })
    //     .then((res) => res.json())
    //     .then((data) => setNotifications(data))
    //     .catch((err) => console.error("Failed to load notifications:", err));
    //
    // Remove WELCOME_NOTIFICATION and the useState seed value above at that point.
    // -----------------------------------------------------------------------

    return () => clearTimeout(t);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "unread" && !n.read);
    return matchesSearch && matchesFilter;
  });

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <div className="np-root">
      <div className={`np-page ${visible ? "np-page--visible" : ""}`}>

        {/* ── Header ── */}
        <header className="np-header">
          <div className="np-header__left">
            <div className="np-bell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && (
                <span className="np-bell__badge">{unreadCount}</span>
              )}
            </div>
            <div>
              <h1 className="np-title">Notifications</h1>
              <p className="np-subtitle">Stay updated with your latest activities and alerts</p>
            </div>
          </div>

          <div className="np-header__right">
            {unreadCount > 0 && (
              <div className="np-badge">
                <span className="np-badge__dot" />
                {unreadCount} Unread
              </div>
            )}
            <button className="np-btn-mark" onClick={markAllRead}>
              <svg className="np-btn-mark__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Mark all as read
            </button>
          </div>
        </header>

        {/* ── Search + Filters ── */}
        <div className="np-controls">
          <div className="np-search">
            <svg className="np-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="np-search__input"
              placeholder="Search notifications…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="np-search__clear" onClick={() => setSearch("")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className="np-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`np-filter-btn ${activeFilter === f ? "np-filter-btn--active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "unread" && unreadCount > 0 && (
                  <span className="np-filter-count">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {search && (
          <p className="np-search__count">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
        )}

        {/* ── List ── */}
        <div className="np-list">
          {filtered.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            filtered.map((n, i) => (
              <NotificationCard
                key={n.id}
                notification={n}
                index={i}
                onRead={() => markRead(n.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ notification, index, onRead }) {
  const { type, title, message, timestamp, date, read } = notification;
  const cfg = typeConfig[type];

  const handleMarkRead = (e) => {
    e.stopPropagation();
    onRead();
  };

  return (
    <div
      className={`np-card np-card--${type} ${read ? "np-card--read" : "np-card--unread"}`}
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={onRead}
    >
      {/* Type icon */}
      <div className="np-card__icon" style={{ color: cfg.color, background: cfg.bg }}>
        {cfg.icon}
      </div>

      {/* Body */}
      <div className="np-card__body">
        <div className="np-card__meta">
          <span className="np-card__tag" style={{ color: cfg.color, background: cfg.bg }}>
            {cfg.label}
          </span>
          <span className="np-card__time">{timestamp}</span>
        </div>
        <h3 className="np-card__title">{title}</h3>
        <p className="np-card__message">{message}</p>
      </div>

      {/* Right column */}
      <div className="np-card__right">
        <span className="np-card__date">{date}</span>

        <div className="np-card__actions">
          {/* Individual mark-as-read — only shown on unread cards */}
          {!read && (
            <button
              className="np-card__mark-btn"
              onClick={handleMarkRead}
              title="Mark as read"
              aria-label="Mark as read"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </button>
          )}

          {/* Unread pulse dot */}
          {!read && <span className="np-card__dot" />}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="np-empty">
      <div className="np-empty__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>
      <h3 className="np-empty__title">
        {query ? `No results for "${query}"` : "No Notifications Yet"}
      </h3>
      <p className="np-empty__sub">
        {query
          ? "Try different keywords or clear your search."
          : "You're all caught up. New updates will appear here."}
      </p>
    </div>
  );
}