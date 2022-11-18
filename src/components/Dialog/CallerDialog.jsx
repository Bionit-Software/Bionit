import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useNotifications } from "../../context/NotificationsContext";
import usePatientsFiles, {
  useSinglePatientFile,
} from "../../hooks/usePatients";
import { useSingleZone, useZones } from "../../hooks/useZones";
import Button from "../Button";
import Chip from "../Chip";
import ModalTitle from "../ModalTitle";
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
          <ModalTitle title="Elija la zona del llamado" />
          <div className="flex flex-col gap-4">
            <select
              className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
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
            <Button onClick={handleCaller}>Simular</Button>
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
      <div className="z-10 flex flex-col gap-6">
        <ModalTitle title={"Llamado normal"} />
        <select
          className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
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
          className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
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

        <Chip>Origen del llamado</Chip>
        <div className="flex gap-10">
          <label className="text-sm text-white font-bold">Cama</label>
          <input
            type="radio"
            value="Cama"
            name="Cama"
            onChange={(e) => setSelectedOrigin(e.target.value)}
            checked={selectedOrigin === "Cama"}
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="" className="text-sm text-white font-bold">
            Baño
          </label>
          <input
            type="radio"
            value="Baño"
            name="Baño"
            onChange={(e) => setSelectedOrigin(e.target.value)}
            checked={selectedOrigin === "Baño"}
          />
        </div>
        <Button onClick={handleCaller}>Simular llamado</Button>
        <ToastContainer />
      </div>
    </BaseDialog>
  );
});
