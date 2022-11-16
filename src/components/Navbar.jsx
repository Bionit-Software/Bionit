import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUsers";
import { motion } from "framer-motion";
export default function Navbar() {
    const { logout, user } = useAuth();
    const handleLogout = () => {
        logout();
    };
    const navigate = useNavigate();
    const { userData } = useUser(user.uid);
    return (
        <div className="container h-full w-2/12 p-2 shadow-lg">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 0.7,
                    delay: 0.6,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                className="container flex flex-col gap-6">
                <button
                    className="bg-gray-100 shadow-lg p-6 w-full"
                    onClick={() => {
                        navigate("/patients");
                    }}
                >
                    PACIENTES
                </button>
                {userData?.rol === "admin" ? (
                    <div className="container flex flex-col gap-6">
                        <button
                            className="bg-gray-100 shadow-lg p-6 w-full"
                            onClick={() => {
                                navigate("/zones");
                            }}
                        >
                            Zonas
                        </button>
                        <button
                            className="bg-gray-100 shadow-lg p-6 w-full"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>
                    </div>
                ) : null}
                <button
                    className="bg-gray-100 shadow-lg p-6 w-full"

                >
                    Simular Llamada
                </button>
                <button onClick={handleLogout} 
                    className="bg-red-500 shadow-lg shadow-red-500/50 text-white w-full 
                    font-semibold rounded-lg p-6 ">
                    Cerrar Sesión
                </button>
            </motion.div>
        </div>
    )
}
