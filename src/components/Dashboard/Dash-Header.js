import React from "react";
import DashboardPerson from "./../../images/DashbordPerson.jpg";
import "./Dash-header.css";

export default function Header({ userName, logOut }) {
  return (
    <header className="dashboard__header">
      <div className="dashboard__greeting">
        <h2>Hello, {userName}!</h2>
        <p>Ready to take care of your patients today</p>
      </div>

      <div className="dashboard__user">
        <img src={DashboardPerson} alt="user" />
        <div>
          <strong>{userName}</strong>
          <span>Caregiver</span>
        </div>
        <button
          className="dashboard__logout"
          type="button"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </header>
  );
}