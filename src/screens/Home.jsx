import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RolSelectionDialog } from "../components/Dialog/RolSelectionDialog";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const openModal = () => {
    NiceModal.show(RolSelectionDialog, { name: "name" });
  };

  const handleLogout = async () => {
    navigate("/Login");
    await logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={openModal}>dfs</button>
    </div>
  );
}
