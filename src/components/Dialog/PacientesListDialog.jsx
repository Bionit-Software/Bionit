import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where, deleteField, arrayRemove } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../db/database";
import BaseDialog from "./BaseDialog";
import { motion } from "framer-motion";
import usePatientsFiles, { useSinglePatientFile } from "../../hooks/usePatients";
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
            <div className="bg-white w-full p-4 px-6 rounded-md container flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">Listado pacientes</div>
                    <button
                        className="text-gray-400"
                        onClick={() => {
                            modal.hide();
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="flex justify-between items-center w-full">
                    <select onChange={(e) => setPacienteZona(e.target.value)} className="text-xl font-bold w-full">
                        <option value="">Selecciona un Paciente...</option>
                        {files?.map((paciente) => {
                            if (!props.zone.patients.includes(paciente.id)) {
                                return <option value={paciente.id}>{paciente.paciente.nombre}</option>;
                            }
                        })}
                    </select>
                </div>
                <div className="container flex flex-col gap-4">
                    {files?.map((paciente) => {
                        if (props.zone.patients.includes(paciente.id)) {
                            return (
                                <div key={paciente.id} className="bg-gray-100 shadow-lg flex justify-araund">
                                    <div className="container h-full flex gap-10 p-4">
                                        <div className="font-bold">{paciente.paciente.nombre}</div>
                                        <div className="text-gray-400">{paciente.paciente.apellido}</div>
                                    </div>
                                    <div className="flex gap-4 p-4">
                                        <button
                                            onClick={() => eliminarPaciente(props.zone.id, paciente.id)}
                                            className="bg-red-500 text-white rounded-md px-4 py-2"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    })}
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
                                    on
                                    className="text-lg text-white rounded-full 
                                     bg-green-600 w-4/6 h-10 font-semibold"
                                >
                                    Añadir Paciente
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </BaseDialog >
    );
});
export default PacientesListDialog;

