import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetProfile from "../../hook/profile/useGetProfile";

import "./DashboardLayout.css";

import logo from "./../../images/logo.webp";
import dashboard from "./../../images/dashboard.svg";
import patients from "./../../images/patients.svg";
import location from "./../../images/location.svg";
import reminder from "./../../images/reminder.svg";
import memoryBank from "./../../images/memory bank.svg";

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigate = useNavigate();

    useGetProfile();

    const { profile } = useSelector(
        (state) => state.profileReducer
    );

    let user = localStorage.getItem("user");

    if (user) {
        user = JSON.parse(user);
    } else {
        user = {
            name: "Guest",
            role: "Caregiver",
        };
    }

    const toggleSidebar = () =>
        setIsSidebarOpen((prev) => !prev);

    const closeSidebar = () =>
        setIsSidebarOpen(false);

    return (
        <div className="dashboardLayout">
            {/* Sidebar */}
            <aside
                className={`dashboard__sidebar ${
                    isSidebarOpen ? "open" : ""
                }`}
            >
                <div className="dashboard__logo">
                    <img src={logo} alt="MindMate Logo" />
                    <span>MindMate</span>
                </div>

                <nav className="dashboard__nav">
                    <ul>
                        <li>
                            <NavLink
                                to="/api/dashboard"
                                end
                                className="nav-link"
                                onClick={closeSidebar}
                            >
                                <img src={dashboard} alt="" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/api/dashboard/patients"
                                className="nav-link"
                                onClick={closeSidebar}
                            >
                                <img src={patients} alt="" />
                                <span>Patients</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/api/dashboard/location"
                                className="nav-link"
                                onClick={closeSidebar}
                            >
                                <img src={location} alt="" />
                                <span>Live Location</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/api/dashboard/reminders"
                                className="nav-link"
                                onClick={closeSidebar}
                            >
                                <img src={reminder} alt="" />
                                <span>Reminders</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/api/dashboard/memory-bank"
                                className="nav-link"
                                onClick={closeSidebar}
                            >
                                <img src={memoryBank} alt="" />
                                <span>Memory Bank</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            <button
                type="button"
                className={`dashboard__overlay ${
                    isSidebarOpen ? "show" : ""
                }`}
                onClick={closeSidebar}
                aria-label="Close sidebar"
            />

            {/* Main */}
            <div className="dashboard__main">
                <header className="dashboard__header">
                    <div className="dashboard__header-left">
                        <button
                            type="button"
                            className="dashboard__menu-btn"
                            onClick={toggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        <div className="dashboard__header-text">
                            <h2>
                                Hello,{" "}
                                {profile?.name || user.name}
                            </h2>
                            <p>
                                Ready to take care of your
                                patients today
                            </p>
                        </div>
                    </div>

                    <div className="dashboard__profile-actions">
                        <button
                            className="dashboard__action-btn"
                            aria-label="Settings"
                            onClick={() =>
                                navigate("/api/dashboard/settings")
                            }
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#5C6B8A"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </button>

                        <button
                            className="dashboard__action-btn dashboard__action-btn--notify"
                            aria-label="Notifications"
                            onClick={() =>
                                navigate(
                                    "/api/dashboard/notification"
                                )
                            }
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FF5C5C"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>

                            <span className="dashboard__notify-badge"></span>
                        </button>

                        <div
                            className="dashboard__profile-avatar"
                            onClick={() =>
                                navigate(
                                    "/api/dashboard/profile"
                                )
                            }
                        >
                            <img
                                src={
                                    profile?.profilePicture?.trim()
                                        ? profile.profilePicture
                                        : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                }
                                alt="profile"
                            />
                        </div>
                    </div>
                </header>

                <main className="dashboard__content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;