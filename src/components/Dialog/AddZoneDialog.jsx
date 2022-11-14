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
      <div className="bg-gray-100 shadow-lg p-32 border-1 border-black">
        <input
          value={zoneName}
          onChange={(e) => {
            setZoneName(e.target.value);
          }}
          placeholder="Nombre de la zona"
        />
        <input
          value={zoneDescription}
          onChange={(e) => {
            setZoneDescription(e.target.value);
          }}
          placeholder="Descripción de la zona"
        />
        <button
          onClick={() => {
            addZone(zoneName, zoneDescription);
            modal.hide();
          }}
        >
          Agregar
        </button>
      </div>
    </BaseDialog>
  );
});
