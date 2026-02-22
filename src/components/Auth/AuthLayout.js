import React from "react";
import LogoHeader from "./LogoHeader";
// import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <LogoHeader />        
      <div className="auth-content">
        {children}          
      </div>
    </div>
  );
};

export default AuthLayout;