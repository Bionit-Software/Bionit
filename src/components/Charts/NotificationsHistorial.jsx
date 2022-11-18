import { motion } from "framer-motion";
import React from "react";
import { useSingleNotification } from "../../context/NotificationsContext";
import { useSingleZone, useZones } from "../../hooks/useZones";
import { DialogInput } from "../DialogInput";

export default function NotificationsHistorial() {
  const [selectedZoneId, setSelectedZoneId] = React.useState(null);
  const { zones } = useZones();
  const { zone } = useSingleZone(selectedZoneId);
  return (
    <div className="bg-background p-8 rounded-xl h-96 overflow-hidden">
      <h1 className="text-white font-bold text-xl mb-4">
        Historial de llamados
      </h1>
      <div>
        <select
          value={selectedZoneId}
          onChange={(e) => setSelectedZoneId(e.target.value)}
          className="text-lg font-medium p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4 w-fit"
        >
          <option value="" defaultChecked>
            Selecciona una zona
          </option>
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>
      {zone && (
        <div className="mt-4 overflow-y-scroll flex flex-col gap-4 h-60 p-8 justify-start items-center">
          {zone.notificationsCount > 0 && (
            <>
              {zone.notifications.map((notification) => {
                return (
                  <NotificationHistory notificationPackage={notification} />
                );
              })}
            </>
          )}
          {zone.notificationsCount === 0 && (
            <p className="text-white font-medium text-lg">
              No hay llamados registrados
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const NotificationHistory = ({ notificationPackage }) => {
  const { notification } = useSingleNotification(
    notificationPackage.notificationId
  );
  //   console.log("single notification", notificationPackage);
  return (
    <motion.div className="flex flex-col gap-2 bg-neutral-800 border-2 border-white border-opacity-40 px-4 py-6 rounded-lg">
      <div className="flex flex-row gap-2">
        <>
          {notification?.type === "emergencia" ? (
            <p className="text-white font-bold text-xl">
              Se recibio un llamado de emergencia el{" "}
              {notification?.createdAt.toDate().toLocaleDateString()}
            </p>
          ) : (
            notification?.type === "normal" && (
              <p className="text-white font-bold text-xl">
                Se recibio un llamado normal{" "}
                {notification?.createdAt.toDate().toLocaleDateString()}
              </p>
            )
          )}
        </>
      </div>
    </motion.div>
  );
};
