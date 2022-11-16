import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Zones } from "./screens/Zones";
import { Patients } from "./screens/Patients";
export default function App() {
  return (
    <NiceModal.Provider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/patients/*"
              element={
                <ProtectedRoutes>
                  <Patients />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/zones"
              element={
                <ProtectedRoutes>
                  <Zones />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NiceModal.Provider>
  );
}

