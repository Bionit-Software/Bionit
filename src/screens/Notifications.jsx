import React from "react";
import Navbar from "../components/Navbar";
import { useNotifications } from "../context/NotificationsContext";

export const Notifications = () => {
  const { notifications } = useNotifications();
  return (
    <div className="container h-full w-full flex">
      <Navbar />
      <div className="mx-auto">
        {notifications.map((notification) => {
          if (notification.status !== "attended") {
            return (
              <div className="bg-gray-200">
                <h1>Llamado desde </h1>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
