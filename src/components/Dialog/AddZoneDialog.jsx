import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import { addZone } from "../../hooks/useZones";
import BaseDialog from "./BaseDialog";

export const AddZoneDialog = NiceModal.create((props) => {
  const [zoneName, setZoneName] = React.useState("");
  const [zoneDescription, setZoneDescription] = React.useState("");

  const modal = useModal();

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="bg-background px-6 py-2 flex flex-col gap-12">
        <h1 className="text-white text-3xl font-bold">Zona</h1>
        <div className="flex gap-8 flex-col">
          <input
            value={zoneName}
            onChange={(e) => {
              setZoneName(e.target.value);
            }}
            placeholder="Nombre de la zona"
            className="bg-gray-200 rounded-lg px-4 py-2 text-black"
          />
          <input
            value={zoneDescription}
            onChange={(e) => {
              setZoneDescription(e.target.value);
            }}
            className="bg-gray-200 rounded-lg px-4 py-2 text-black"
            placeholder="Descripción de la zona"
          />
        </div>
        <button
          onClick={() => {
            addZone(zoneName, zoneDescription);
            modal.hide();
          }}
          className="bg-primary hover:bg-primary_hover transition-colors ease-in-out duration-150 w-fit px-16 py-3 text-white font-semibold text-xl rounded"
        >
          Agregar
        </button>
      </div>
    </BaseDialog>
  );
});
