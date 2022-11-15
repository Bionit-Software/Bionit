import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React, { useEffect } from "react";
import BaseDialog from "./BaseDialog";

/**
 * @requires fileId
 * @summary Dialog to show patient details
 */

export const ZonesDetailsDialog = NiceModal.create((props) => {
  const modal = useModal();
  console.log(props.zoneId.id,"hola");
  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="bg-white w-full p-4 px-6 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Detalles de la zona</div>
          <button
            className="text-gray-400"
            onClick={() => {
              modal.hide();
            }}
          >
            X
          </button>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Nombre zona</div>
            <div className="text-gray-400">{props.zoneId.name}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Id</div>
            <div className="text-gray-400">{props.zoneId.id}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Descripción</div>
            <div className="text-gray-400">{props.zoneId.description}</div>
          </div>
        </div>
      </div>
    </BaseDialog >
  );
});
export default ZonesDetailsDialog;
