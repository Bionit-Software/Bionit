import NiceModal from "@ebay/nice-modal-react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
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
              path="/home"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NiceModal.Provider>
  );
}
