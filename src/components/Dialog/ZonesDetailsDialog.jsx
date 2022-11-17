import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React, { useEffect } from "react";
import { db } from "../../db/database";
import { useEnfermeros } from "../../hooks/useUsers";
import BaseDialog from "./BaseDialog";
import { motion } from "framer-motion";
import EnfermerosListDialog from "./EnfermerosListDialog";

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
      <div className="bg-white container h-full p-4 px-6 rounded-md flex flex-col gap-6">
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
        <div className="container flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Nombre zona</div>
            <div className="text-gray-400">{props.zone.name}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Id</div>
            <div className="text-gray-400">{props.zone.id}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Descripción</div>
            <div className="text-gray-400">{props.zone.description}</div>
          </div>
          <div className="items-center w-full">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="gap-4 flex justify-center mt-5 mb-5"
              >
                <button
                  onClick={() => {
                    NiceModal.show(EnfermerosListDialog, { zone: props.zone })
                    modal.hide();
                  }}
                  on
                  className="text-lg text-white rounded-full 
               bg-teal-600 w-4/6 h-10 font-semibold"
                >
                  Añadir enfermero
                </button>
              </motion.div>
          </div>
        </div>
      </div>
    </BaseDialog >
  );
});
export default ZonesDetailsDialog;
