import NiceModal from "@ebay/nice-modal-react";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { db } from "../db/database";
import { useUser } from "../hooks/useUsers";
import { NotificationsDialog } from "./Dialog/NotificationsDialog";

const NavLink = ({ text, link, onClick }) => {
  const navigate = useNavigate();

  return (
    <a
      className="font-semibold text-white text-2xl ml-4 cursor-pointer hover:text-primary w-fit"
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
        navigate(`/${link.toLowerCase()}`);
      }}
    >
      {text}
    </a>
  );
};

export default function Navbar() {
  const { logout, user } = useAuth();

  const handleNotification = () => {
    NiceModal.show(NotificationsDialog, { user: user });
  };

  const handleLogout = () => {
    logout();
  };

  const { userData } = useUser(user.uid);

  return (
    <div className="h-full w-2/12 bg-background p-2 shadow-lg px-6 py-4 flex flex-col justify-start">
      <div className="container mb-8 font-bold text-4xl text-white">Bionit</div>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="container flex flex-col gap-6"
      >
        {userData?.rol === "admin" ? (
          <div className="flex gap-4 flex-col">
            <span className="text-xl font-semibold text-light_grey">
              Analisis
            </span>

            <NavLink text="Dashboard" link="dashboard" />
          </div>
        ) : null}
        <div className="container gap-4 flex flex-col">
          <span className="text-xl font-semibold text-light_grey">Gestion</span>
          <div className="container flex flex-col gap-4">
            {userData?.rol === "admin" ? (
              <NavLink text="Zonas" link="zones" />
            ) : null}
            <NavLink text="Fichas" link="patients" />
            {userData?.rol === "admin" ? (
              <>
                <NavLink text="Notificaciones" link="notifications" />
              </>
            ) : null}
          </div>
        </div>
        <div className="container flex flex-col gap-4">
          <span className="text-xl font-semibold text-light_grey">
            Simulacion
          </span>
          <NavLink text="Llamado" onClick={handleNotification} />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 shadow-lg shadow-red-500/50 text-white w-full 
                    font-semibold rounded-lg p-6 "
        >
          Cerrar Sesión
        </button>
      </motion.div>
    </div>
  );
}
