import React from "react";
import Sidebar from "./SideBar";
import Header from "./Dash-Header";

export default function DashboardLayout({ children, userName, logOut }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header userName={userName} logOut={logOut} />
        <div className="dashboard__content">
          {children}
        </div>
      </div>
    </div>
  );
}