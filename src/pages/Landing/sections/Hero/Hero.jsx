import React, { useState, useEffect } from "react";
import "./Hero.css";

import appleBadge from "../../../../images/Apple.webp";
import googleBadge from "../../../../images/Google.webp";
import leftMobile from "../../../../images/landing/hero-left-phone.webp";
import mainMobile from "../../../../images/landing/hero-middle-phone.webp";
import rightMobile from "../../../../images/landing/hero-right-phone.webp";

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const mobileImages = [leftMobile, mainMobile, rightMobile];
    
    // Auto-cycle the images on mobile every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="hero-section" id="home">
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
                {/* Mobile Carousel Dots */}
                <div className="mobile-carousel-dots">
                    {[0, 1, 2].map(index => (
                        <div 
                            key={index} 
                            className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>

                <div className="hero-mockups">
                    {/* Desktop View: Shows all three naturally */}
                    <div className="mockup-side left">
                        <img src={leftMobile} alt="App Screenshot Left" />
                    </div>
                    <div className="mockup-center desktop-center">
                        <img src={mainMobile} alt="App Screenshot Center" />
                    </div>
                    <div className="mockup-side right">
                        <img src={rightMobile} alt="App Screenshot Right" />
                    </div>

                    {/* Mobile View: Shows only the active image */}
                    <div className="mockup-center mobile-center">
                        <img 
                            src={mobileImages[activeIndex]} 
                            alt="App Screenshot Mobile" 
                            className="mobile-carousel-img"
                            data-index={activeIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
