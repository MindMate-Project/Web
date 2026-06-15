import React from "react";
import "./Features.css";
import { FaMapMarkerAlt, FaBell, FaBrain, FaArrowRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";

import phoneMockup from "../../../../images/landing/features-phone.webp";

const Features = () => {
    return (
        <div className="features-section" id="features">
            <div className="features-header">
                <h2 className="features-title">
                    Powerful features designed for every<br/>moment of care
                </h2>
                <p className="features-subtitle">
                    From daily reminders to emergency response, MindMate combines intelligent tools that make caregiving safer,<br/>simpler, and more connected.
                </p>
            </div>

            <div className="features-columns">
                {/* Left Column */}
                <div className="feature-column">
                    <div className="feature-card content-card">
                        <div className="feature-icon-container">
                            <FaMapMarkerAlt className="feature-icon-svg icon-gps" />
                        </div>
                        <h3 className="feature-card-title">IoT-Powered Real-Time GPS Tracking</h3>
                        <p className="feature-card-desc">
                            Stay connected to your loved one's location at every moment through a smart wearable device that provides accurate live tracking and instant movement updates.
                        </p>
                    </div>
                    
                    <div className="feature-card content-card">
                        <div className="feature-icon-container">
                            <FaBell className="feature-icon-svg icon-bell" />
                        </div>
                        <h3 className="feature-card-title">Smart Reminder System</h3>
                        <p className="feature-card-desc">
                            From medications to doctor appointments, MindMate delivers structured and timely notifications that support daily routines and reduce the risk of missed tasks.
                        </p>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="feature-column middle-column">
                    <div className="feature-card mockup-card">
                        <img src={phoneMockup} alt="MindMate Dashboard" className="mockup-img" />
                    </div>

                    <div className="feature-card content-card">
                        <div className="feature-icon-container">
                            <MdDashboard className="feature-icon-svg icon-grid" />
                        </div>
                        <h3 className="feature-card-title">Memory Caregiver Web Dashboard</h3>
                        <p className="feature-card-desc">
                            A powerful web-based dashboard designed for caregivers to monitor patient status, manage alerts, review health insights, track movement history, and coordinate care efficiently from anywhere.
                        </p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="feature-column">
                    <div className="feature-card content-card">
                        <div className="feature-icon-container">
                            <BsPersonBoundingBox className="feature-icon-svg icon-face" />
                        </div>
                        <h3 className="feature-card-title">AI-Based Face Recognition</h3>
                        <p className="feature-card-desc">
                            Using intelligent facial recognition, MindMate identifies familiar people and instantly displays their name and relationship, helping patients feel more oriented and emotionally secure.
                        </p>
                    </div>

                    <div className="feature-card content-card">
                        <div className="feature-icon-container">
                            <FaBrain className="feature-icon-svg icon-brain" />
                        </div>
                        <h3 className="feature-card-title">Memory Assistant</h3>
                        <p className="feature-card-desc">
                            A multimedia memory bank filled with photos, videos, voices, and personal stories that acts as an interactive memory training companion, helping strengthen recognition and emotional connection.
                        </p>
                    </div>
                </div>
            </div>

            <div className="features-action">
                <button className="btn-explore-features">
                    Explore full Features <FaArrowRight className="btn-icon" />
                </button>
            </div>
        </div>
    );
};

export default Features;
