import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="container h-full w-full flex">
      <Navbar/>
      <div className="container h-full w-full">
        holA
      </div>
    </div>
  );
}
