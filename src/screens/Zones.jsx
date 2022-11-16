import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddZoneDialog } from "../components/Dialog/AddZoneDialog";
import { EditZoneDialog } from "../components/Dialog/EditZoneDialog";
import { ZonesDetailsDialog } from "../components/Dialog/ZonesDetailsDialog";
import Navbar from "../components/Navbar";
import { deleteZone, useZones } from "../hooks/useZones";

export const Zones = () => {
  const navigate = useNavigate();
  const handleAddZone = () => {
    NiceModal.show(AddZoneDialog, {});
  };

  const handleEditZone = (id) => {
    NiceModal.show(EditZoneDialog, { zoneId: id });
  };

  const handleDetailsZone = (zone) => {
    NiceModal.show(ZonesDetailsDialog, { zone: zone });

  };
  const { zones } = useZones();

  return (

  <div className="container h-full flex">
    <Navbar/>
    <div className="container h-full w-full">
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
            <div key={zone.id} className="bg-gray-100 shadow-lg flex justify-araund">
              <div className="container h-full flex gap-10 p-4" onClick={() => {handleDetailsZone(zone)}}>
                <div className="font-bold">{zone.name}</div>
                <div className="text-gray-400">{zone.id}</div>
              </div>
              <div className="flex gap-4 p-4">
                <button onClick={() => {handleEditZone(zone.id)}}>Editar</button>
                <button onClick={() => {deleteZone(zone.id)}}>Eliminar</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  );
};

//Ou Men is navigei iau
