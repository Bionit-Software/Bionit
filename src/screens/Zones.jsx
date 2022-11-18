import NiceModal from "@ebay/nice-modal-react";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { AddZoneDialog } from "../components/Dialog/AddZoneDialog";
import { EditZoneDialog } from "../components/Dialog/EditZoneDialog";
import { ZonesDetailsDialog } from "../components/Dialog/ZonesDetailsDialog";
import ListCard from "../components/ListCard";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { deleteZone, useZones } from "../hooks/useZones";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import Layout from "./Layout/Layout";

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
    <Layout>
      <div className="flex flex-col gap-4 justify-start">
        <PageTitle title="Gestion de zonas" />
        <Button onClick={handleAddZone}>Agregar zona</Button>
      </div>
      <div className="p-4 px-0 flex flex-col gap-6">
        {zones.length == 0 ? (
          <div>
            <h1 className="text-2xl font-bold text-white">
              No hay zonas registradas
            </h1>
          </div>
        ) : (
          <></>
        )}

        {zones?.map((zone) => {
          return (
            <ListCard key={zone.id} onClick={() => handleDetailsZone(zone)}>
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
                <Button
                  className="bg-red-500 w-10 rounded-lg h-10 flex justify-center items-center"
                  onClick={() => {
                    handleEditZone(zone.id);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  className="bg-red-500 w-10 rounded-lg h-10 flex justify-center items-center"
                  onClick={() => {
                    deleteZone(zone.id);
                  }}
                >
                  <TrashIcon />
                </Button>
              </div>
            </ListCard>
          );
        })}
      </div>
    </Layout>
  );
};

//Ou Men is navigei iau
