import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../db/database";
const usePatients = () => {};

export const addPatient = async (patient) => {
  await addDoc(collection(db, "paciente"), {
    nombre: patient.nombre,
    apellido: patient.apellido,
    dni: patient.dni,
    telefono: patient.telefono,
    direccion: patient.direccion,
    fechaNacimiento: patient.fechaNacimiento,
    obraSocial: patient.obraSocial,
    sexo: patient.sexo,
    estadoCivil: patient.estadoCivil,
    antecedentesQuirurgicos: patient.antecedentesQuirurgicos,
    alergias: patient.alergias,
    grupoSanguineo: patient.grupoSanguineo,
  });
};

export default usePatients;
