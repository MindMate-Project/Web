import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    // Check if the user is authenticated by looking for the token in localStorage
    const token = localStorage.getItem("token");

    // If there is no token, redirect to the login page
    if (!token) {
        return <Navigate to="/api/auth/login" replace />;
    }

    // If the token exists, render the child routes (the dashboard)
    return <Outlet />;
};

export default ProtectedRoute;
