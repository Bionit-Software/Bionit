import React from "react";
import Navbar from "../../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full h-full flex">
      <Navbar />
      <div className="w-full h-full p-8 py-4">{children}</div>
    </div>
  );
}
