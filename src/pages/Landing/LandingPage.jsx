import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./LandingPage.css";

import appleBadge from "../../images/Apple.png";
import googleBadge from "../../images/Google.png";
import leftMobile from "../../images/LeftMobile.png";
import mainMobile from "../../images/MainMobile.png";
import rightMobile from "../../images/rightmobile.png";

const LandingPage = () => {
    return (
        <div className="landing-page-container">
            <Navbar />

            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-logo-text">MindMate</h1>
                    <h2 className="hero-title">
                        Smart care, safer lives, stronger connections.
                    </h2>
                    <p className="hero-description">
                        MindMate is an intelligent Alzheimer's care assistant
                        designed to support patients and empower caregivers
                        through real-time tracking, smart reminders, health
                        monitoring, and instant communication tools.
                    </p>

                    <div className="hero-badges">
                        <img
                            src={appleBadge}
                            alt="Download on the App Store"
                            className="store-badge"
                        />
                        <img
                            src={googleBadge}
                            alt="Get it on Google Play"
                            className="store-badge"
                        />
                    </div>
                </div>

                <div className="hero-mockups-container">
                    <div className="hero-mockups">
                        {/* Left Phone Mockup */}
                        <div className="mockup-side left">
                            <img src={leftMobile} alt="App Screenshot Left" />
                        </div>

                        {/* Center Phone Mockup */}
                        <div className="mockup-center">
                            <img src={mainMobile} alt="App Screenshot Center" />
                        </div>

                        {/* Right Phone Mockup */}
                        <div className="mockup-side right">
                            <img src={rightMobile} alt="App Screenshot Right" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
