import React from "react";
import { useAuth } from "../context/AuthContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useUser, useUsers } from "../hooks/useUsers";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import Dashboard from "./Dashboard";

export default function Home() {
  const { logout, user } = useAuth();
  console.log(user);
  const handleLogout = () => {
    logout();
  };
  const navigate = useNavigate();
  const { userData } = useUser(user.uid);
  console.log(userData?.rol)
  return (
    <div>
      <button className="bg-gray-100 shadow-lg p-6 mx-4"
      onClick={handleLogout}>Logout</button>
      {userData?.rol === "admin" ? (
        <button className="bg-gray-100 shadow-lg p-6 mx-4"
        onClick={() => navigate("/home/dashboard")}>
          Dashboard
        </button>
      ) : null}
      <button
        className="bg-gray-100 shadow-lg p-6 mx-4"
        onClick={() => {
          navigate("/patients");
        }}
      >
        PACIENTES
      </button>
    </div>
  );
}
