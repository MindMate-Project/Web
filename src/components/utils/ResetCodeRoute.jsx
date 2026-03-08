import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ResetCodeRoute = () => {
    // Check if the user has requested a password reset by finding their email
    const email = localStorage.getItem("user-email");

    // If there is no email in localStorage, they skipped the first step
    if (!email) {
        return <Navigate to="/api/auth/forgot-password" replace />;
    }

    // If the email exists, allow them to verify the code
    return <Outlet />;
};

export default ResetCodeRoute;
