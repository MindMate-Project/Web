import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page-container">
            <Navbar />
            
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-logo-text">MindMate</h1>
                    <h2 className="hero-title">Smart care, safer lives, stronger connections.</h2>
                    <p className="hero-description">
                        MindMate is an intelligent Alzheimer's care assistant designed to support patients and empower caregivers through real-time tracking, smart reminders, health monitoring, and instant communication tools.
                    </p>
                    
                    <div className="hero-badges">
                        {/* Placeholder for App Store and Google Play images */}
                        <img 
                            src="https://placehold.co/180x60/000000/FFFFFF?text=App+Store" 
                            alt="Download on the App Store" 
                            className="store-badge" 
                        />
                        <img 
                            src="https://placehold.co/180x60/000000/FFFFFF?text=Google+Play" 
                            alt="Get it on Google Play" 
                            className="store-badge" 
                        />
                    </div>
                </div>

                <div className="hero-mockups-container">
                    <div className="hero-mockups">
                        {/* Left Phone Mockup */}
                        <div className="mockup-side left">
                            <img 
                                src="https://placehold.co/240x480/FFFFFF/9f9f9f?text=Left+Phone" 
                                alt="App Screenshot Left" 
                            />
                        </div>

                        {/* Center Phone Mockup */}
                        <div className="mockup-center">
                            <img 
                                src="https://placehold.co/280x560/FFFFFF/9f9f9f?text=Center+Phone" 
                                alt="App Screenshot Center" 
                            />
                        </div>

                        {/* Right Phone Mockup */}
                        <div className="mockup-side right">
                            <img 
                                src="https://placehold.co/240x480/FFFFFF/9f9f9f?text=Right+Phone" 
                                alt="App Screenshot Right" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;