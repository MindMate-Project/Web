import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const NewPasswordRoute = () => {
    // Check if the user successfully verified their reset code
    const isCodeVerified = localStorage.getItem("reset-code-verified");

    // If they haven't verified the code, redirect to start of the flow
    if (isCodeVerified !== "true") {
        return <Navigate to="/api/auth/forgot-password" replace />;
    }

    // If they successfully verified the code, allow them to set a new password
    return <Outlet />;
};

export default NewPasswordRoute;
