import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Check if the current route is auth-related
    const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/signup");

    return (
        <nav className="main-navbar">
            <div className="navbar-logo">
                <img src={logo} alt="MindMate" />
                <span>MindMate</span>
            </div>

            {/* Hide hamburger menu on Auth pages since there are no links to toggle */}
            {!isAuthPage && (
                <button
                    className="navbar-toggle-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
                    <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
                    <span className={`bar ${isMenuOpen ? "open" : ""}`}></span>
                </button>
            )}

            {/* If Auth page, remove the "open" class requirement and slide-out behavior */}
            <div className={`navbar-right ${isMenuOpen && !isAuthPage ? "open" : ""} ${isAuthPage ? "navbar-right-auth" : ""}`}>
                {!isAuthPage && (
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
                )}

                <div className="navbar-actions">
                    {isAuthPage ? (
                        <Link
                            to="/"
                            className="btn-get-started btn-go-back"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Go Back
                        </Link>
                    ) : (
                        <Link
                            to="/api/auth/login"
                            className="btn-get-started"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
