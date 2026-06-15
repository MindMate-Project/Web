import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../images/404-error.webp";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-image-wrapper">
                <img src={errorImage} alt="404 Error - Page Not Found" className="notfound-image" />
            </div>
            
            <h1 className="notfound-title">Oops! This Page Seems Lost</h1>
            
            <p className="notfound-subtitle">
                The page you're looking for doesn't exist or may have been moved.<br />
                Let's help you get back on track
            </p>
            
            <Link to="/" className="notfound-btn">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
