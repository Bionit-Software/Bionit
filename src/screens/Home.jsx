import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUser, useUsers } from "../hooks/useUsers";

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
      <button onClick={handleLogout}>Logout</button>
      <button
        onClick={() => {
          navigate("/zones");
        }}
      >
        {userData?.rol}
        ZONAS
      </button>
      <button
        onClick={() => {
          navigate("/admin");
        }}
      >
        ZONAS
      </button>
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
