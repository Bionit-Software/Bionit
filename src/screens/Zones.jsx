import NiceModal from "@ebay/nice-modal-react";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddZoneDialog } from "../components/Dialog/AddZoneDialog";
import { EditZoneDialog } from "../components/Dialog/EditZoneDialog";
import { ZonesDetailsDialog } from "../components/Dialog/ZonesDetailsDialog";
import Navbar from "../components/Navbar";
import { deleteZone, useZones } from "../hooks/useZones";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";

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
    <div className="w-full h-full flex">
      <Navbar />
      <div className="h-full w-full p-8 py-4">
        <div className="flex flex-col gap-4 justify-start">
          <h1 className="font-extrabold text-3xl text-white">
            Gestion de zonas
          </h1>
          <button
            onClick={handleAddZone}
            className="bg-primary hover:bg-primary_hover transition-colors ease-in-out duration-150 w-fit px-16 py-3 text-white font-semibold text-xl rounded"
          >
            Añadir zona
          </button>
        </div>
        <div className="p-4 px-0 flex flex-col gap-6">
          {zones?.map((zone) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                key={zone.id}
                className="bg-gray-100 shadow-lg flex justify-around card-gradient rounded-lg h-20 px-8 items-center"
              >
                <div
                  className="container h-full flex gap-10 p-4 items-center"
                  onClick={() => {
                    handleDetailsZone(zone);
                  }}
                >
                  <h2 className="font-semibold text-xl text-white">
                    {zone.name}
                  </h2>
                </div>
                <div className="flex gap-6 p-4">
                  <button
                    className="bg-orange-400 w-10 h-10 flex items-center justify-center rounded"
                    onClick={() => {
                      handleEditZone(zone.id);
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="bg-red-500 w-10 rounded-lg h-10 flex justify-center items-center"
                    onClick={() => {
                      deleteZone(zone.id);
                    }}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

//Ou Men is navigei iau
