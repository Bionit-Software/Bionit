import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddZoneDialog } from "../components/Dialog/AddZoneDialog";
import { EditZoneDialog } from "../components/Dialog/EditZoneDialog";
import { deleteZone, useZones } from "../hooks/useZones";

export const Zones = () => {
  const navigate = useNavigate();
  const handleAddZone = () => {
    NiceModal.show(AddZoneDialog, {});
  };

  const handleEditZone = (id) => {
    NiceModal.show(EditZoneDialog, { zoneId: id });
  };
  const { zones } = useZones();

  return (
    <div>
      Zones
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Atras
      </button>
      <button onClick={handleAddZone}>añadir zona</button>
      <div className="p-4 mx-8 flex flex-col gap-4">
        {zones?.map((zone) => {
          return (
            <div key={zone.id} className="bg-gray-100 shadow-lg p-4">
              <div className="flex justify-between">
                <div className="font-bold">{zone.name}</div>
                <div className="text-gray-400">{zone.id}</div>
                <button
                  onClick={() => {
                    deleteZone(zone.id);
                  }}
                >
                  eliminar
                </button>
                <button
                  onClick={() => {
                    handleEditZone(zone.id);
                  }}
                >
                  editar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//Ou Men is navigei iau
