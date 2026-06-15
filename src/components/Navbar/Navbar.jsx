import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.webp";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const location = useLocation();

    // Check if the current route is auth-related
    const isAuthPage =
        location.pathname.includes("/login") ||
        location.pathname.includes("/signup");

    const handleScrollClick = (e, targetId) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 90;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        if (isAuthPage) return;

        const handleScroll = () => {
            const sections = ["home", "features", "story", "peace", "faq", "download"];
            let current = "home";

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section's top is near the top of the viewport
                    if (rect.top <= 120) {
                        current = section;
                    }
                }
            }
            
            // Check if we reached the bottom of the page
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
                current = "download";
            }

            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        // Fire once to set initial state
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isAuthPage]);

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

            {/* Only show the right side (links and button) if not an Auth page */}
            {!isAuthPage && (
                <div className={`navbar-right ${isMenuOpen ? "open" : ""}`}>
                    <ul className="navbar-links">
                        <li>
                            <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={(e) => handleScrollClick(e, 'home')}>Home</a>
                        </li>
                        <li>
                            <a href="#features" className={activeSection === "features" ? "active" : ""} onClick={(e) => handleScrollClick(e, 'features')}>Features</a>
                        </li>
                        <li>
                            <a href="#story" className={activeSection === "story" ? "active" : ""} onClick={(e) => handleScrollClick(e, 'story')}>About</a>
                        </li>
                        <li>
                            <a href="#peace" className={activeSection === "peace" ? "active" : ""} onClick={(e) => handleScrollClick(e, 'peace')}>App</a>
                        </li>
                        <li>
                            <a href="#faq" className={activeSection === "faq" ? "active" : ""} onClick={(e) => handleScrollClick(e, 'faq')}>FAQ</a>
                        </li>
                        <li>
                            <a href="#download" className={activeSection === "download" ? "active" : ""} onClick={(e) => handleScrollClick(e, 'download')}>Contact</a>
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
            )}
        </nav>
    );
};

export default Navbar;
