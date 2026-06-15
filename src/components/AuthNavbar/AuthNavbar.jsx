import React from "react";
import { Link } from "react-router-dom";
import "./AuthNavbar.css";
import logo from "../../images/logo.webp";
import { IoArrowBackOutline } from "react-icons/io5";

const AuthNavbar = () => {
    return (
        <nav className="auth-navbar">
            <Link to="/" className="auth-navbar-logo">
                <img src={logo} alt="MindMate Logo" />
                <span>MindMate</span>
            </Link>
            
            <Link to="/" className="auth-back-link">
                <IoArrowBackOutline /> Back to Home
            </Link>
        </nav>
    );
};

export default AuthNavbar;
