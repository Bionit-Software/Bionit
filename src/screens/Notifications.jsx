import React from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationsContext";
import Layout from "./Layout/Layout";

const NotificacionCard = ({ notification, onClick, warning }) => {
  return (
    <div className="card-gradient w-full p-6 flex flex-col gap-6 rounded-lg">
      <div className="flex gap-4 items-center">
        <h1 className="text-white text-2xl font-bold ">Llamado recibido</h1>
        {warning && (
          <span className="bg-blue-600 rounded-xl p-2 px-4 text-white font-bold text-md">
            Alerta azul
          </span>
        )}
      </div>
      <div>
        {!warning && (
          <>
            <h2 className="text-white text-lg font-semibold">
              Paciente: {notification.patient}
            </h2>
            <h2 className="text-white text-lg font-semibold">
              Origen: {notification.origin}
            </h2>
          </>
        )}
        <h2 className="text-white text-lg font-semibold">
          Zona de origen: {notification.zone}
        </h2>
      </div>
      <Button
        onClick={onClick}
        className="bg-primary p-4 py-1 rounded-xl text-white font-bold text-md"
      >
        Marcar como atendida
      </Button>
    </div>
  );
};

export const Notifications = () => {
  const { notifications, ResolveNotification } = useNotifications();
  const { user } = useAuth();
  const handleMarkAsDone = (id) => {
    ResolveNotification(user, id);
  };
  return (
    <Layout>
      <PageTitle title="Notificaciones de llamados" />
      <div
        className="px-10 
      py-6
      w-full
      h-full
      flex
      flex-col
      
      overflow-y-scroll "
      >
        {notifications.map((notification) => {
          if (
            notification.status == "pending" &&
            notification.type == "emergencia"
          ) {
            return (
              <NotificacionCard
                key={notification.id}
                notification={notification}
                onClick={() => handleMarkAsDone(notification.id)}
                warning
              />
            );
          } else if (
            notification.status == "pending" &&
            notification.type == "normal"
          ) {
            return (
              <NotificacionCard
                key={notification.id}
                notification={notification}
                onClick={() => handleMarkAsDone(notification.id)}
              />
            );
          }
        })}
      </div>
    </Layout>
  );
};
