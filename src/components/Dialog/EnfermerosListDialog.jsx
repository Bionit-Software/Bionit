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
import {
  eliminarEnfermero,
  eliminarEnfermeroZona,
  useEnfermeros,
} from "../../hooks/useUsers";
import TrashIcon from "../../icons/TrashIcon";
import BaseDialog from "./BaseDialog";
export const EnfermerosListDialog = NiceModal.create((props) => {
  const { enfermeros } = useEnfermeros();
  const [enfermeroZona, setEnfermeroZona] = React.useState("");
  const submitChange = async (zona) => {
    // console.log(zona,'arriba')
    try {
      await updateDoc(doc(db, "zones", zona), {
        nurses: arrayUnion(enfermeroZona),
      });
      //buscar colleccion de usuario, filtrar por uid y agregarle el id de la zona al array de zonas
      const q = query(
        collection(db, "usuario"),
        where("uid", "==", enfermeroZona)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docc) => {
        updateDoc(doc(db, "usuario", docc.id), {
          zonesId: arrayUnion(props.zone.id),
        });
        console.log(docc.id, " => ", docc.data());
      });
      modal.hide();
    } catch (error) {
      console.log(error); //mando el error por parametro
    }
  };

  const eliminarEnfermeroB = async (zona, id, uid) => {
    console.log(zona, "zona");
    console.log(id, "id");
    await updateDoc(doc(db, "usuario", id), {
      zonesId: arrayRemove(zona),
    }).then(() => {
      updateDoc(doc(db, "zones", zona), {
        nurses: arrayRemove(uid),
      });
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
      <div className=" p-4 px-6 rounded-md container flex flex-col gap-6">
        <div className="text-3xl font-bold text-white">
          Enfermeros de la zona
        </div>

        <div className="container flex flex-col gap-16 bg-background ">
          <div className="border-2 border-opacity-60 border-white h-52 rounded-lg overflow-y-scroll">
            {enfermeros?.map((enfermero) => {
              if (props.zone.nurses.includes(enfermero.uid)) {
                return (
                  <div
                    key={enfermero.uid}
                    className=" flex justify-around items-center"
                  >
                    <div className="container h-full flex gap-10 p-4 items-center">
                      <h2 className="font-bold text-white">
                        {enfermero.nombre} {enfermero.apellido}
                      </h2>
                    </div>
                    <div className="flex p-4">
                      <span
                        onClick={() =>
                          eliminarEnfermeroB(
                            props.zone.id,
                            enfermero.id,
                            enfermero.uid
                          )
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
              onChange={(e) => setEnfermeroZona(e.target.value)}
              className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
            >
              <option value="">Selecciona un enfermero</option>
              {enfermeros?.map((enfermero) => {
                if (!props.zone.nurses.includes(enfermero.uid)) {
                  return (
                    <option value={enfermero.uid} className="bg-gray-400">
                      {enfermero.nombre}
                    </option>
                  );
                }
              })}
            </select>
            <div className="items-center w-full">
              {enfermeroZona === "" && (
                <div className="gap-4 flex justify-center mt-5 mb-5">
                  <div
                    className="text-lg text-white rounded-full bg-gray-400 cursor-not-allowed
                          w-4/6 h-10 font-semibold
                         align-middle flex justify-center items-center"
                  >
                    Seleccione Enfermero...
                  </div>
                </div>
              )}
              {enfermeroZona !== "" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="gap-4 flex justify-start mt-5 mb-5"
                >
                  <button
                    onClick={() => submitChange(props.zone.id)}
                    className="text-lg text-white rounded-lg  
               bg-primary hover:bg-primary_hover w-4/6 h-10 font-semibold"
                  >
                    Añadir enfermero
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
export default EnfermerosListDialog;
