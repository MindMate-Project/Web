import React from "react";
import logo from "../../images/logo.png"; 
import "./LogoHeader.css";

const LogoHeader = () => {
  return (
    <div className="logo-header">
      <img src={logo} alt="MindMate Logo" className="logo-img" />
      <p className="logo-text">MindMate</p>
    </div>
  );
};

export default LogoHeader;