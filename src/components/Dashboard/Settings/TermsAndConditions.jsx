import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TermsAndConditions.css";
import cuateImage from "../../../images/landing/Support/cuate.webp";
import { IoChevronBack, IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5";

const TermsAndConditions = () => {
    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleAgreement = () => {
        setIsAgreed(!isAgreed);
    };

    return (
        <div className="settings-terms-layout">
            <div className="settings-terms-container">

                <div className="settings-terms-back-wrapper">
                    <Link
                        to="/api/dashboard/settings"
                        className="settings-terms-back-btn"
                    >
                        <IoChevronBack />
                        Back to Settings
                    </Link>
                </div>

                <div className="settings-terms-header">
                    <div className="settings-terms-header-text">
                        <h1 className="settings-terms-title">Terms & Conditions</h1>
                        <p className="settings-terms-updated">Last updated: 12 February 2026</p>

                        <div className="settings-terms-intro">
                            <p>
                                Welcome to the Alzheimer Assistant Application. By accessing or using this application, you agree to be bound by these Terms & Conditions. Please read them carefully before using the platform.
                            </p>
                            <p>
                                This application is designed to support patients with Alzheimer's disease and assist caregivers in monitoring, communication, and safety management.
                            </p>
                        </div>
                    </div>

                    <div className="settings-terms-image">
                        <img src={cuateImage} alt="Terms & Conditions Illustration" />
                    </div>
                </div>

                <div className="settings-terms-content">
                    <section className="settings-terms-section">
                        <h2>1. Introduction</h2>
                        <p>Welcome to the Alzheimer Assistant Application. By accessing or using this application, you agree to be bound by these Terms & Conditions. Please read them carefully before using the platform.</p>
                        <p>This application is designed to support patients with Alzheimer's disease and assist caregivers in monitoring, communication, and safety management.</p>
                    </section>

                    <section className="settings-terms-section">
                        <h2>2. Acceptance of Terms</h2>
                        <p>By creating an account or using any feature of the application, you confirm that:</p>
                        <ul>
                            <li>You have read and understood these Terms & Conditions.</li>
                            <li>You agree to comply with all rules and policies stated here.</li>
                            <li>If you do not agree, you must not use the application.</li>
                        </ul>
                    </section>

                    <section className="settings-terms-section">
                        <h2>3. Medical Disclaimer</h2>
                        <p>The application is a supportive tool and does not replace professional medical advice, diagnosis, or treatment.</p>
                        <ul>
                            <li>In case of emergency, users must contact medical professionals or emergency services immediately.</li>
                            <li>The applications and recommendations are not guaranteed to be medically accurate in all situations.</li>
                        </ul>
                    </section>

                    <section className="settings-terms-section">
                        <h2>4. User Responsibilities</h2>
                        <p>Users agree to:</p>
                        <ul>
                            <li>Provide accurate and up-to-date information.</li>
                            <li>Maintain confidentiality of login credentials.</li>
                            <li>Use the application only for its intended purpose.</li>
                            <li>Ensure that patient data entered is truthful and authorized.</li>
                        </ul>
                        <p>Misuse of the application may result in account suspension or termination.</p>
                    </section>

                    <section className="settings-terms-section">
                        <h2>5. Patient Data & Privacy</h2>
                        <p>By using this application, you acknowledge that:</p>
                        <ul>
                            <li>The application collects sensitive data such as location (GPS), health information, and emergency contacts.</li>
                            <li>Data is securely stored and encrypted.</li>
                            <li>Access is restricted to authorized caregivers, doctors, and system administrators.</li>
                            <li>Data is used only to improve patient safety and system functionality.</li>
                        </ul>
                        <p>For more details, please refer to the Privacy Policy.</p>
                    </section>

                    <section className="settings-terms-section">
                        <h2>6. Device Usage (Tracking Hardware)</h2>
                        <p>If a tracking device is used:</p>
                        <ul>
                            <li>The device must be properly assigned to the correct patient.</li>
                            <li>The device should remain charged and functional at all times.</li>
                            <li>The application is not responsible for failures caused by hardware misuse or disconnection.</li>
                        </ul>
                    </section>

                    <section className="settings-terms-section">
                        <h2>7. Emergency Features</h2>
                        <p>The application provides emergency alerts and SOS features:</p>
                        <ul>
                            <li>Alerts are sent to caregivers or authorized contacts.</li>
                            <li>The system attempts to share real-time location during emergencies.</li>
                            <li>Delivery of alerts depends on network availability and cannot be guaranteed in all cases.</li>
                        </ul>
                    </section>

                    <section className="settings-terms-section">
                        <h2>8. Limitations of Liability</h2>
                        <p>The developers of this application are not responsible for:</p>
                        <ul>
                            <li>Any direct or indirect damages resulting from misuse of the app.</li>
                            <li>Delays or failures in notifications or location tracking.</li>
                            <li>Decisions made based solely on application data without medical consultation.</li>
                        </ul>
                    </section>

                    <section className="settings-terms-section">
                        <h2>9. Account Suspension and Termination</h2>
                        <p>We reserve the right to suspend or terminate accounts if:</p>
                        <ul>
                            <li>There is a violation of these Terms & Conditions.</li>
                            <li>Misuse or abuse of the system is detected.</li>
                            <li>False or harmful information is provided intentionally.</li>
                        </ul>
                    </section>

                    <section className="settings-terms-section">
                        <h2>10. Contact Information</h2>
                        <p>For any questions or concerns regarding these Terms & Conditions:</p>
                        <ul>
                            <li><strong>Email:</strong> support@alzheimerassistant.app</li>
                            <li><strong>Support Team:</strong> Available through the app Help section.</li>
                        </ul>
                    </section>

                    <div className="settings-terms-agreement">
                        <p className="settings-terms-confirmation">
                            By using this application, you confirm that you fully agree to these Terms & Conditions.
                        </p>
                        <div
                            className={`settings-terms-checkbox ${isAgreed ? 'settings-terms-checkbox--agreed' : ''}`}
                            onClick={toggleAgreement}
                        >
                            <div className="settings-terms-checkbox-icon">
                                {isAgreed
                                    ? <IoCheckmarkCircle className="settings-terms-icon--checked" />
                                    : <IoEllipseOutline className="settings-terms-icon--unchecked" />
                                }
                            </div>
                            <span className="settings-terms-checkbox-label">I agree to the Terms & Conditions</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TermsAndConditions;