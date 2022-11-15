import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
    const {user} = useAuth();
    if (user) {
        return children;
    }
    return <Navigate to='/login' />;
};
