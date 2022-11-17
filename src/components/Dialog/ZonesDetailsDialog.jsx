import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { db } from "../../db/database";
import { useEnfermeros } from "../../hooks/useUsers";
import BaseDialog from "./BaseDialog";
import EnfermerosListDialog from "./EnfermerosListDialog";
import PacientesListDialog from "./PacientesListDialog";

export const ZonesDetailsDialog = NiceModal.create((props) => {
  const { enfermeros } = useEnfermeros();
  const [enfermeroZona, setEnfermeroZona] = React.useState("");

  const modal = useModal();
  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="p-4 px-6 rounded-md flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Detalles de la zona
          </div>
        </div>
        <div className="container flex flex-col gap-4">
          <div className="flex  gap-4 items-center text-white">
            <div className="text-xl font-bold">Nombre: </div>
            <div className="text-xl font-semibold">{props.zone.name}</div>
          </div>
          <div className="flex justify-between items-center flex-wrap text-white">
            <div className="text-xl font-bold">Descripción:</div>
            <div className="text-xl font-semibold">
              {props.zone.description}
            </div>
          </div>
          <div className="flex flex-row w-full items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                NiceModal.show(EnfermerosListDialog, { zone: props.zone });
                modal.hide();
              }}
              on
              className="text-lg text-white rounded-lg
               bg-primary hover:bg-primary_hover w-4/6 h-10 font-semibold"
            >
              Añadir enfermero
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                NiceModal.show(PacientesListDialog, { zone: props.zone });
                modal.hide();
              }}
              on
              className="text-lg text-white rounded-lg
              bg-primary hover:bg-primary_hover w-4/6 h-10 font-semibold"
            >
              Añadir paciente
            </motion.button>
          </div>
        </div>
      </div>
    </BaseDialog>
  );
});
export default ZonesDetailsDialog;
