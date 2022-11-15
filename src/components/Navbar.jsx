import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUsers";

export default function Navbar() {
    const { logout, user } = useAuth();
    const handleLogout = () => {
        logout();
    };
    const navigate = useNavigate();
    const { userData } = useUser(user.uid);
    return (
        <div className="container h-full w-2/12 p-2">
            <div className="container flex flex-col gap-6">
                <button className="bg-gray-700 shadow-lg p-6 w-full container" onClick={handleLogout}>
                    <p>Logout</p>
                </button>
                <button
                    className="bg-gray-100 shadow-lg p-6 w-full"
                    onClick={() => {
                        navigate("/patients");
                    }}
                >
                    PACIENTES
                </button>
                <button
                    className="bg-gray-100 shadow-lg p-6 w-full"
                    onClick={() => {
                        navigate("/zones");
                    }}
                >
                    Zonas
                </button>
                {userData?.rol === "admin" ? (
                    <button
                        className="bg-gray-100 shadow-lg p-6 w-full"
                        onClick={() => navigate("/home/dashboard")}
                    >
                        Dashboard
                    </button>
                ) : null}
                <button
                className="bg-gray-100 shadow-lg p-6 w-full"
                
                >
                    Simular Llamada
                </button>
            </div>
        </div>
    )
}
