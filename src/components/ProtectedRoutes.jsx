import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Route, Routes,useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export const ProtectedRoutes = ({ children }) => {
    const {user} = useAuth();
    if (user) {
        return children;
    }
    return <Navigate to='/login' />;
};
