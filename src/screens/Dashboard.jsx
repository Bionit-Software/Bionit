import { arrayUnion, updateDoc } from "firebase/firestore";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="container h-full w-full flex">
      <Navbar />
      <div className="container h-full w-10/12">Dashboard</div>
    </div>
  );
}
