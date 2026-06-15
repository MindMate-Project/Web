import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DownloadFooter.css";
import { 
    IoCallOutline, 
    IoMailOutline, 
    IoLogoFacebook, 
    IoLogoTwitter, 
    IoLogoInstagram, 
    IoLogoYoutube,
    IoArrowForwardOutline,
    IoCheckmarkCircle
} from "react-icons/io5";

import appleBadge from "../../../../images/Apple.webp";
import googleBadge from "../../../../images/Google.webp";
import qrCode from "../../../../images/landing/download-qr.webp";
import logo from "../../../../images/logo.webp";

const DownloadFooter = () => {
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setIsModalOpen(true);
            setEmail(""); // Clear the input
            
            // Auto close modal after 6 seconds so the user has time to read
            setTimeout(() => {
                setIsModalOpen(false);
            }, 6000);
        }
    };

    return (
        <div className="download-footer-section" id="download">
            {/* Top Blue Section */}
            <div className="download-blue-bg">
                <div className="download-content-wrapper">
                    <div className="download-text-side">
                        <h2 className="download-title">
                            Download MindMate & Stay Connected to Every Memory
                        </h2>
                        <p className="download-subtitle">
                            Get MindMate on App Store & Google Play or scan the QR code to get started instantly.
                        </p>
                        <div className="get-app-container">
                            <p className="get-app-text">Get The App</p>
                            <div className="download-badges">
                                <img src={appleBadge} alt="App Store" className="store-badge-img" />
                                <img src={googleBadge} alt="Google Play" className="store-badge-img" />
                            </div>
                        </div>
                    </div>
                    <div className="download-qr-side">
                        <div className="qr-box">
                            <img src={qrCode} alt="QR Code" className="qr-code-img" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Black Section */}
            <div className="footer-black-bg">
                {/* Floating Contact Card */}
                <div className="contact-floating-card">
                    <div className="contact-item">
                        <div className="contact-icon-circle">
                            <IoMailOutline />
                        </div>
                        <span className="contact-text">info@mindmate.com</span>
                    </div>
                    <div className="contact-divider"></div>
                    <div className="contact-item">
                        <div className="contact-icon-circle">
                            <IoCallOutline />
                        </div>
                        <span className="contact-text">+20 10 2345 6789</span>
                    </div>
                </div>

                <div className="footer-columns">
                    <div className="footer-col brand-col">
                        <div className="footer-brand-header">
                            <img src={logo} alt="MindMate Logo" className="footer-brand-logo" />
                            <h3 className="footer-brand-title">MindMate</h3>
                        </div>
                        <p className="footer-brand-desc">
                            Empowering Alzheimer's patients and caregivers through intelligent monitoring, reminders, and compassionate support.
                        </p>
                        <div className="social-links">
                            <a href="#!" aria-label="Facebook"><IoLogoFacebook /></a>
                            <span className="social-divider">|</span>
                            <a href="#!" aria-label="Instagram"><IoLogoInstagram /></a>
                            <span className="social-divider">|</span>
                            <a href="#!" aria-label="Twitter"><IoLogoTwitter /></a>
                            <span className="social-divider">|</span>
                            <a href="#!" aria-label="YouTube"><IoLogoYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Link</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="https://github.com/orgs/MindMate-Project/people" target="_blank" rel="noopener noreferrer">Our Team</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col newsletter-col">
                        <h4 className="footer-col-title">NEWS LETTER</h4>
                        <p className="newsletter-text">
                            Subscribe our newsletter to get our latest update & news
                        </p>
                        <form className="newsletter-input-box" onSubmit={handleNewsletterSubmit}>
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" aria-label="Subscribe"><IoArrowForwardOutline /></button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom-line"></div>
                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} MindMate. All rights reserved.</p>
                    <p className="made-with-love">Made with ❤️ by the MindMate Team</p>
                </div>
            </div>

            {/* Newsletter Success Modal */}
            {isModalOpen && (
                <div className="newsletter-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="newsletter-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-icon-container">
                            <IoCheckmarkCircle className="modal-success-icon" />
                        </div>
                        <h3>Subscription Successful!</h3>
                        <p>Thank you for joining. You will now receive our latest updates and news directly to your inbox.</p>
                        <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>Awesome!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DownloadFooter;
