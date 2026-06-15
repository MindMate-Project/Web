import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.webp";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f8f9fa", textAlign: "center", padding: "2rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <img src={logo} alt="Logo" style={{ width: "100px", marginBottom: "1rem" }} />
                <h1 style={{ fontSize: "2.5rem", color: "#0b236c", margin: 0 }}>404</h1>
                <h2 style={{ fontSize: "1.5rem", color: "#333", marginTop: "0.5rem" }}>Page Not Found</h2>
            </div>
            
            <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "400px" }}>
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            
            <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ padding: "0.75rem 1.5rem", backgroundColor: "#fff", color: "#0b236c", border: "1px solid #0b236c", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer" }}
                >
                    Go Back
                </button>
                <button 
                    onClick={() => navigate("/api/dashboard")} 
                    style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0b236c", color: "#fff", border: "none", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer" }}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default NotFound;
