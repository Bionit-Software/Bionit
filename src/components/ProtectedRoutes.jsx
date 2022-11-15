import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};
