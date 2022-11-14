import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { AddZoneDialog } from "../components/Dialog/AddZoneDialog";

export const Zones = () => {
  const handleAddZone = () => {
    NiceModal.show(AddZoneDialog, { title: "Add Zone" });
  };
  return (
    <div>
      Zones
      <button onClick={handleAddZone}>añadir zona</button>
    </div>
  );
};

//Ou Men is navigei iau
