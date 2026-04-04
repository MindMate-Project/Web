import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="main-navbar">
            <div className="navbar-logo">
                <img src={logo} alt="MindMate" />
                <span>MindMate</span>
            </div>

            <button
                className="navbar-toggle-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
                <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
                <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
            </button>

            <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
                <ul className="navbar-links">
                    <li>
                        <Link
                            to="/"
                            className="active"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            Team
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <Link
                        to="/api/auth/login"
                        className="btn-get-started"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
