import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../db/database";
import { useEnfermeros } from "../../hooks/useUsers";
import BaseDialog from "./BaseDialog";
import { motion } from "framer-motion";

export const EnfermerosListDialog = NiceModal.create((props) => {
    const { enfermeros } = useEnfermeros();
    const [enfermeroZona, setEnfermeroZona] = React.useState("");
    const submitChange = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "zones", props.zone.id), {
                nurses: arrayUnion(enfermeroZona),
            });
            //buscar colleccion de usuario, filtrar por uid y agregarle el id de la zona al array de zonas
            const q = query(collection(db, "usuario"), where("uid", "==", enfermeroZona));
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

    const modal = useModal();
    return (
        <BaseDialog
            isOpen={modal.visible}
            onClose={() => {
                modal.hide();
            }}
        >
            <div className="bg-white w-full p-4 px-6 rounded-md container flex flex-col gap-6">
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
                        <div className="text-xl font-bold">Listado Enfermeros</div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <select onChange={(e) => setEnfermeroZona(e.target.value)} className="text-xl font-bold w-full">
                            <option value="">Selecciona un enfermero</option>
                            {enfermeros?.map((enfermero) => {
                                if (!props.zone.nurses.includes(enfermero.uid)) {
                                    return <option value={enfermero.uid}>{enfermero.nombre}</option>;
                                }
                            })}
                        </select>
                    </div>
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
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="gap-4 flex justify-center mt-5 mb-5"
                            >
                                <button
                                    onClick={submitChange}
                                    on
                                    className="text-lg text-white rounded-full 
               bg-teal-600 w-4/6 h-10 font-semibold"
                                >
                                    Añadir enfermero
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </BaseDialog >
    );
});
export default EnfermerosListDialog;

