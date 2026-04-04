import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.png"; // Assuming standard path

const Navbar = () => {
    return (
        <nav className="landing-navbar">
            <div className="navbar-logo">
                <img src={logo} alt="MindMate" />
                <span>MindMate</span>
            </div>
            
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="active">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/features">Features</Link>
                </li>
                <li>
                    <Link to="/team">Team</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            <div className="navbar-actions">
                <Link to="/api/auth/login" className="btn-get-started">
                    Get Started
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;