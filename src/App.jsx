import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import "./index.css";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import { Notifications } from "./screens/Notifications";
import { Patients } from "./screens/Patients";
import Register from "./screens/Register";
import { Zones } from "./screens/Zones";
export default function App() {
  return (
    <NotificationsProvider>
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
              <Route
                path="/notifications"
                element={
                  <ProtectedRoutes>
                    <Notifications />
                  </ProtectedRoutes>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </NiceModal.Provider>
    </NotificationsProvider>
  );
}
