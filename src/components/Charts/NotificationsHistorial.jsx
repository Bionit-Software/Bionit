import React from "react";
import { useSingleNotification } from "../../context/NotificationsContext";
import { useSingleZone, useZones } from "../../hooks/useZones";
import { DialogInput } from "../DialogInput";

export default function NotificationsHistorial() {
  const [selectedZoneId, setSelectedZoneId] = React.useState(null);
  const { zones } = useZones();
  const { zone } = useSingleZone(selectedZoneId);
  return (
    <div className="bg-background p-8 rounded-xl grow">
      <h1 className="text-white font-bold text-xl mb-4">
        Historial de llamados
      </h1>
      <div>
        <select
          value={selectedZoneId}
          onChange={(e) => setSelectedZoneId(e.target.value)}
          className="text-lg font-medium p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4 w-fit"
        >
          <option value="" disabled defaultChecked>
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
        <div className="mt-4">
          {zone.notificationsCount === 0 && (
            <p className="text-white font-medium text-lg">
              No hay llamados registrados
            </p>
          )}
          {zone.notificationsCount > 0 && (
            <div className="flex flex-col gap-4">
              {zone.notifications.map((notification) => {
                return (
                  <NotificationHistory notificationPackage={notification} />
                );
              })}
            </div>
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <p className="text-white font-medium text-lg">
          {console.log(notification)}
        </p>
        <p className="text-white font-medium text-lg"></p>
      </div>
    </div>
  );
};
