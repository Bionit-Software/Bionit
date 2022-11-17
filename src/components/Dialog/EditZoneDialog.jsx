import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import { editZone } from "../../hooks/useZones";
import BaseDialog from "./BaseDialog";

export const EditZoneDialog = NiceModal.create(({ zoneId }) => {
  const [zoneName, setZoneName] = React.useState("");
  const [zoneDescription, setZoneDescription] = React.useState("");

  const modal = useModal();
  const handleSubmit = (e) => {
    e.preventDefault();
    editZone(zoneId, zoneName, zoneDescription);
    setZoneDescription("");
    setZoneName("");
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
        <div className="bg-background px-6 py-2 flex flex-col gap-12">
          <h1 className="text-white text-3xl font-bold ">Editar Zona</h1>
          <div className="flex gap-8 flex-col">
            <input
              value={zoneName}
              onChange={(e) => {
                setZoneName(e.target.value);
              }}
              className="bg-gray-200 rounded-lg px-4 py-2 text-black"
              placeholder="Nuevo nombre de la zona"
            />
            <input
              value={zoneDescription}
              onChange={(e) => {
                setZoneDescription(e.target.value);
              }}
              className="bg-gray-200 rounded-lg px-4 py-2 text-black"
              placeholder="Nueva descripcion de la zona"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary_hover transition-colors ease-in-out duration-150 w-fit px-16 py-3 text-white font-semibold text-xl rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </BaseDialog>
  );
});
