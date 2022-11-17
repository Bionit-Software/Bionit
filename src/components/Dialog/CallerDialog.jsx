import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useNotifications } from "../../context/NotificationsContext";
import usePatientsFiles, {
  useSinglePatientFile,
} from "../../hooks/usePatients";
import { useSingleZone, useZones } from "../../hooks/useZones";
import BaseDialog from "./BaseDialog";

export const CallerDialog = NiceModal.create(({ type, user, onClose }) => {
  const modal = NiceModal.useModal();
  const [selectedPatientId, setSelectedPatientId] = React.useState("");
  const [selectedZoneId, setSelectedZoneId] = React.useState("");
  const [selectedOrigin, setSelectedOrigin] = React.useState("");
  const { files, loading } = usePatientsFiles();
  const { zones } = useZones();
  // const { file } = useSinglePatientFile(selectedPatientId);
  // const { zone } = useSingleZone(selectedZoneId);
  const { AddNewNotification } = useNotifications();

  const GetPatientName = (id) => {
    const patient = files.find((file) => file.id === id);
    return patient.paciente.nombre;
  };

  const GetZoneName = (id) => {
    const zone = zones.find((zone) => zone.id === id);
    return zone.name;
  };

  const handleCaller = () => {
    if (type === "emergencia") {
      if (selectedZoneId === "") {
        alert("Seleccione una zona");
        return;
      }
      modal.hide();
      onClose();
      AddNewNotification({
        type: "emergencia",
        user: user,
        zone: GetZoneName(selectedZoneId),
        zoneId: selectedZoneId,
      });
      setSelectedZoneId("");
    } else {
      if (selectedPatientId === "" || selectedZoneId === "") {
        alert("Por favor seleccione paciente y zona");
        return;
      }
      modal.hide();
      onClose();
      AddNewNotification({
        user: user,
        type: type,
        patient: GetPatientName(selectedPatientId),
        zone: GetZoneName(selectedZoneId),
        zoneId: selectedZoneId,
        origin: selectedOrigin,
      });
    }
    // console.log(GetPatientName(selectedPatientId));
  };

  if (type === "emergencia") {
    return (
      <BaseDialog
        isOpen={modal.visible}
        onClose={() => {
          modal.hide();
        }}
      >
        <div className="container flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <select
              className="w-full p-2 rounded-md shadow-md"
              value={selectedZoneId}
              onChange={(e) => {
                setSelectedZoneId(e.target.value);
              }}
            >
              <option value="" disabled defaultChecked>
                Zona del llamado
              </option>
              {zones?.map((zone) => {
                return (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                );
              })}
            </select>
            <button
              className="w-full p-2 rounded-md shadow-md bg-blue-500 text-white"
              onClick={handleCaller}
            >
              Simular
            </button>
          </div>
        </div>
      </BaseDialog>
    );
  }

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="z-10">
        <h1 className="text-lg font-medium">Llamado normal</h1>
        <select
          className="w-full p-2 rounded-md shadow-md"
          value={selectedPatientId}
          onChange={(e) => {
            setSelectedPatientId(e.target.value);
          }}
        >
          <option value="" disabled defaultChecked>
            Seleccione el paciente
          </option>
          {files?.map((file) => {
            return (
              <option key={file.id} value={file.id}>
                {file.paciente.nombre}
              </option>
            );
          })}
        </select>
        <select
          className="w-full p-2 rounded-md shadow-md"
          value={selectedZoneId}
          onChange={(e) => {
            setSelectedZoneId(e.target.value);
          }}
        >
          <option value="" disabled defaultChecked>
            Zona del llamado
          </option>
          {zones?.map((zone) => {
            return (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            );
          })}
        </select>

        <label>Origen del llamado</label>
        <input
          type="radio"
          value="Cama"
          name="Cama"
          onChange={(e) => setSelectedOrigin(e.target.value)}
          checked={selectedOrigin === "Cama"}
        />
        <input
          type="radio"
          value="Baño"
          name="Baño"
          onChange={(e) => setSelectedOrigin(e.target.value)}
          checked={selectedOrigin === "Baño"}
        />
        <button
          onClick={handleCaller}
          className="bg-gray-100 shadow-lg p-6 w-full"
        >
          Simular llamado
        </button>
        <ToastContainer />
      </div>
    </BaseDialog>
  );
});
