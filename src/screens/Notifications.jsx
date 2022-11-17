import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";

export const Notifications = () => {
  const { notifications, ResolveNotification } = useNotifications();
  const { user } = useAuth();
  const handleMarkAsDone = (id) => {
    ResolveNotification(user, id);
  };
  return (
    <div className="container h-full w-full flex">
      <Navbar />
      <div className="mx-auto">
        {notifications.map((notification) => {
          if (
            notification.status == "pending" &&
            notification.type == "emergencia"
          ) {
            return (
              <div className="bg-blue-400 w-full ">
                <h1 className="text-white text-lg">Alerta azul</h1>
                <h2>Llamada desde zona: {notification.zone}</h2>
                <button
                  onClick={() => {
                    handleMarkAsDone(notification.id);
                  }}
                >
                  Marcar como atendida
                </button>
              </div>
            );
          } else if (
            notification.status == "pending" &&
            notification.type == "normal"
          ) {
            return (
              <div className="bg-blue-400 w-full ">
                <h1 className="text-white text-lg">Llamado recibido</h1>
                <h2>Paciente: {notification.patient}</h2>
                <h2>Origen: {notification.origin}</h2>
                <h2>Llamada desde zona: {notification.zone}</h2>
                <button
                  onClick={() => {
                    handleMarkAsDone(notification.id);
                  }}
                >
                  Marcar como atendida
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
