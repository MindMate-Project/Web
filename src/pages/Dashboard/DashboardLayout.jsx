import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./DashboardLayout.css";

import logo from "./../../images/logo.png";
import dashboard from "./../../images/dashboard.svg";
import patients from "./../../images/patients.svg";
import location from "./../../images/location.svg";
import reminder from "./../../images/reminder.svg";
import memoryBank from "./../../images/memory bank.svg";
import CarePerson from "../../images/DashbordPerson.jpg";
function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
    } else {
        user = { name: "Guest", role: "Caregiver" };
    }

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="layout">
            {/* Sidebar */}
            <aside
                className={`dashboard__sidebar ${isSidebarOpen ? "open" : ""}`}
            >
                <div className="dashboard__logo">
                    <img src={logo} alt="MindMate Logo" />
                    <span>MindMate</span>
                </div>

                <nav className="dashboard__nav">
                    <ul>
                        <li>
                            <NavLink
                                to="/api/dashboard/"
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
                className={`dashboard__overlay ${isSidebarOpen ? "show" : ""}`}
                onClick={closeSidebar}
                aria-label="Close sidebar"
            />

            {/* Right Side (Header + Page Content) */}
            <div className="dashboard__main">
                {/* Constant Header */}
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

                        <div>
                            <h2>Hello, {user.name} ! </h2>

                            <p>Ready to take care of your patients today</p>
                        </div>
                    </div>

                    <div className="dashboard__profile">
                        <img src={CarePerson} alt="profile" />
                        <div>
                            <strong>{user.name}</strong>
                            <span>{user.role}</span>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="dashboard__content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
