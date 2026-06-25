import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";
import panaImage from "../../../images/landing/Support/pana.webp";
import { IoMailOutline, IoCallOutline, IoChevronBack } from "react-icons/io5";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="settings-policy-layout">
            <div className="settings-policy-container">

                <div className="settings-policy-back-wrapper">
                    <Link
                        to="/api/dashboard/settings"
                        className="settings-policy-back-btn"
                    >
                        <IoChevronBack />
                        Back to Settings
                    </Link>
                </div>

                <div className="settings-policy-header">
                    <div className="settings-policy-header-text">
                        <h1 className="settings-policy-title">Privacy Policy</h1>
                        <p className="settings-policy-updated">Last updated: 12 February 2026</p>

                        <div className="settings-policy-intro">
                            <p>
                                Your privacy matters to us. The Alzheimer Assistant application is committed to protecting the personal information of every patient, caregiver, and healthcare professional who uses our platform. Because our services involve sensitive health and location information, we prioritize transparency, security, and responsible data handling in every aspect of the application.
                            </p>
                            <p>
                                This Privacy Policy explains what information we collect, why we collect it, how it is used, and the measures we take to keep it safe while providing our services.
                            </p>
                        </div>
                    </div>

                    <div className="settings-policy-image">
                        <img src={panaImage} alt="Privacy Policy Illustration" />
                    </div>
                </div>

                <div className="settings-policy-contacts">
                    <div className="settings-policy-contact-card">
                        <div className="contact-icon">
                            <IoMailOutline />
                        </div>
                        <div className="contact-info">
                            <span className="contact-label">Contact Email</span>
                            <a href="mailto:support@gmail.com" className="contact-value">support@gmail.com</a>
                        </div>
                    </div>
                    <div className="settings-policy-contact-card">
                        <div className="contact-icon">
                            <IoCallOutline />
                        </div>
                        <div className="contact-info">
                            <span className="contact-label">Contact Number</span>
                            <a href="tel:+021234567890" className="contact-value">+02 - 1234567890</a>
                        </div>
                    </div>
                </div>

                <div className="settings-policy-content">
                    <section className="settings-policy-section">
                        <h2>Information We Collect</h2>
                        <p>To provide our services effectively, we may collect different types of information from users, including:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, profile photo, and account credentials.</li>
                            <li><strong>Health Information:</strong> Medical notes, medication schedules, reminders, symptoms, emergency contacts, and caregiver information.</li>
                            <li><strong>Location Data:</strong> Real-time and historical GPS location data collected to monitor patient safety and assist in emergency situations.</li>
                            <li><strong>Device Information:</strong> Device type, operating system, IP address, application version, and usage logs.</li>
                            <li><strong>Usage Data:</strong> Information about how users interact with the application, including accessed features, session duration, and notification history.</li>
                        </ul>
                    </section>

                    <section className="settings-policy-section">
                        <h2>How We Use Your Information</h2>
                        <p>We use the collected information to:</p>
                        <ul>
                            <li>Provide and maintain the application's core services.</li>
                            <li>Manage patient and caregiver accounts.</li>
                            <li>Send medication, appointment, and daily activity reminders.</li>
                            <li>Enable real-time location tracking with user authorization.</li>
                            <li>Detect emergencies and notify caregivers when necessary.</li>
                            <li>Improve application performance and user experience.</li>
                            <li>Provide customer support and resolve technical issues.</li>
                            <li>Enhance security and prevent unauthorized access.</li>
                        </ul>
                    </section>

                    <section className="settings-policy-section">
                        <h2>Location Services</h2>
                        <p>The Alzheimer Assistant application requests access to location services to improve patient safety. With user permission, location data may be used to:</p>
                        <ul>
                            <li>Display the patient's current location to authorized caregivers.</li>
                            <li>Store location history when enabled.</li>
                            <li>Detect wandering or leaving predefined safe zones.</li>
                            <li>Assist caregivers during emergency situations.</li>
                        </ul>
                        <p>Location tracking is only activated after the required permissions have been granted.</p>
                    </section>

                    <section className="settings-policy-section">
                        <h2>Data Sharing</h2>
                        <p>We value your privacy and do not sell your personal information. Your information may only be shared with:</p>
                        <ul>
                            <li>Authorized caregivers connected to the patient's account.</li>
                            <li>Healthcare professionals when access has been granted.</li>
                            <li>Emergency contacts during emergency situations.</li>
                            <li>Trusted service providers who help operate the application while maintaining strict confidentiality.</li>
                            <li>Government authorities only when required by applicable laws or legal obligations.</li>
                        </ul>
                    </section>

                    <section className="settings-policy-section">
                        <h2>Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect user information from unauthorized access, disclosure, alteration, or destruction. These measures include:</p>
                        <ul>
                            <li>Secure authentication procedures.</li>
                            <li>Encrypted communication between devices and servers.</li>
                            <li>Role-based access control.</li>
                            <li>Regular security monitoring.</li>
                            <li>Secure cloud storage practices.</li>
                        </ul>
                        <p>Although we strive to protect all personal information, no electronic system can guarantee absolute security.</p>
                    </section>

                    <section className="settings-policy-section">
                        <h2>Your Rights</h2>
                        <p>Depending on your location and applicable laws, you may have the right to:</p>
                        <ul>
                            <li>Access your personal information.</li>
                            <li>Update or correct inaccurate information.</li>
                            <li>Request deletion of your account and associated data.</li>
                            <li>Withdraw permissions such as location access.</li>
                            <li>Request a copy of your stored personal information.</li>
                            <li>Opt-out of non-essential communications or notifications.</li>
                        </ul>
                    </section>

                    <section className="settings-policy-section">
                        <h2>Cookies and Analytics</h2>
                        <p>Our web platform may use cookies and similar technologies to improve functionality, remember user preferences, analyze application performance, and enhance the overall user experience.</p>
                        <p>Users may control cookie preferences through their browser settings.</p>
                    </section>

                    <section className="settings-policy-section">
                        <h2>Contact Us</h2>
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact the Alzheimer Assistant development team through the contact information provided within the application or on the official project website.</p>
                    </section>

                    <div className="settings-policy-footer">
                        <p>Last Updated: June 2026</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;