import NiceModal from "@ebay/nice-modal-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RolSelectionDialog } from "../components/Dialog/RolSelectionDialog";
import { useAuth } from "../context/AuthContext";
import useUsers from "../hooks/useUsers";

export default function Home() {
  const { logout, user } = useAuth();
  const { getUser } = useUsers();
  useEffect( () => { 
    console.log(getUser())
  }, []);
  const navigate = useNavigate();

  const openModal = () => {
    NiceModal.show(RolSelectionDialog, {name:user.displayName});
  };

  const handleLogout = async () => {
    navigate("/Login");
    await logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={openModal}>dfs</button>
      <button
        onClick={() => {
          navigate("/zones");
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
