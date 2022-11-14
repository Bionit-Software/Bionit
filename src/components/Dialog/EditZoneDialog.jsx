import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import { useZones } from "../../hooks/useZones";
import BaseDialog from "./BaseDialog";

export const EditZoneDialog = NiceModal.create(({ zoneId }) => {
  const [zoneName, setZoneName] = React.useState("");
  const [zoneDescription, setZoneDescription] = React.useState("");

  const { editZone } = useZones();

  const modal = useModal();
  const handleSubmit = (e) => {
    e.preventDefault();
    editZone(zoneId, zoneName, zoneDescription);
    modal.hide();
  };
  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div>
        <div className="flex justify-between">
          <div className="font-bold">Editar Zona</div>
          <input
            value={zoneName}
            onChange={(e) => {
              setZoneName(e.target.value);
            }}
          />
          <input
            value={zoneDescription}
            onChange={(e) => {
              setZoneDescription(e.target.value);
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </BaseDialog>
  );
});
