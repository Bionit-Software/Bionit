import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import { useZones } from "../../hooks/useZones";
import BaseDialog from "./BaseDialog";

export const AddZoneDialog = NiceModal.create((props) => {
  const [zoneName, setZoneName] = React.useState("");
  const [zoneDescription, setZoneDescription] = React.useState("");

  const { addZone } = useZones();

  const modal = useModal();

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="bg-gray-100 shadow-lg p-32 border-1 border-black"></div>
    </BaseDialog>
  );
});
