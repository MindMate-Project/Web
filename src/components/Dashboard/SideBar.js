import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import logo from "./../../images/logo.png";
import dashboard from "./../../images/dashboard.svg";
import patients from "./../../images/patients.svg";
import location from "./../../images/location.svg";
import reminder from "./../../images/reminder.svg";
import memoryBank from "./../../images/memory bank.svg";

export default function Sidebar() {
  return (
    <aside className="dashboard__sidebar">
      <div className="dashboard__logo">
        <img src={logo} alt="MindMate" />
        <span>MindMate</span>
      </div>

      <nav className="dashboard__nav">
        <ul>
          <li>
            <NavLink to="/api/dashboard">
              <img src={dashboard} alt="" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/api/dashboard/patients">
              <img src={patients} alt="" />
              <span>Patients</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/api/dashboard/live-location">
              <img src={location} alt="" />
              <span>Live Location</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/api/dashboard/reminders">
              <img src={reminder} alt="" />
              <span>Reminders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/api/dashboard/memory-bank">
              <img src={memoryBank} alt="" />
              <span>Memory Bank</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}