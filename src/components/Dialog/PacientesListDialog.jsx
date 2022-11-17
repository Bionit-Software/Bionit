import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { db } from "../../db/database";
import usePatientsFiles, {
  useSinglePatientFile,
} from "../../hooks/usePatients";
import TrashIcon from "../../icons/TrashIcon";
import BaseDialog from "./BaseDialog";
export const PacientesListDialog = NiceModal.create((props) => {
  const { files } = usePatientsFiles();
  console.log(files);
  const [pacienteZona, setPacienteZona] = React.useState("");
  const submitChange = async (zona) => {
    // console.log(zona,'arriba')
    try {
      await updateDoc(doc(db, "zones", zona), {
        patients: arrayUnion(pacienteZona),
      });

      modal.hide();
    } catch (error) {
      console.log(error); //mando el error por parametro
    }
  };
  const eliminarPaciente = async (zona, id) => {
    console.log(zona, "zona");
    console.log(id, "id");
    await updateDoc(doc(db, "zones", zona), {
      patients: arrayRemove(id),
    });
    modal.hide();
  };
  const modal = useModal();
  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="p-4 px-6 rounded-md container flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-white">Listado pacientes</h1>

        <div className="container flex flex-col gap-16 bg-background ">
          <div className="border-2 border-opacity-60 border-white h-52 rounded-lg overflow-y-scroll">
            {files?.map((paciente) => {
              if (props.zone.patients.includes(paciente.id)) {
                return (
                  <div
                    key={paciente.id}
                    className=" flex justify-around items-center"
                  >
                    <div className="container h-full flex gap-10 p-4 items-center">
                      <h2 className="font-bold text-white">
                        {paciente.paciente.nombre} {paciente.paciente.apellido}
                      </h2>
                    </div>
                    <div className="flex p-4">
                      <span
                        onClick={() =>
                          eliminarPaciente(props.zone.id, paciente.id)
                        }
                        className="bg-red-500 hover:bg-red-700 text-white rounded-md px-4 py-2"
                      >
                        <TrashIcon />
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex justify-between items-start  gap-6 w-full flex-col">
            <h2 className="text-white text-2xl font-bold">
              Añadir un enfermero
            </h2>
            <select
              onChange={(e) => setPacienteZona(e.target.value)}
              className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
            >
              <option value="">Selecciona un Paciente...</option>
              {files?.map((paciente) => {
                if (!props.zone.patients.includes(paciente.id)) {
                  return (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.paciente.nombre}
                    </option>
                  );
                }
              })}
            </select>
            <div className="items-center w-full">
              {pacienteZona === "" && (
                <div className="gap-4 flex justify-center mt-5 mb-5">
                  <div
                    className="text-lg text-white rounded-full bg-gray-400 cursor-not-allowed
                          w-4/6 h-10 font-semibold
                          align-middle flex justify-center items-center"
                  >
                    Seleccione Paciente...
                  </div>
                </div>
              )}
              {pacienteZona !== "" && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="gap-4 flex justify-center mt-5 mb-5"
                >
                  <button
                    onClick={() => submitChange(props.zone.id)}
                    className="text-lg text-white rounded-lg  
               bg-primary hover:bg-primary_hover w-4/6 h-10 font-semibold"
                  >
                    Añadir Paciente
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseDialog>
  );
});
export default PacientesListDialog;
