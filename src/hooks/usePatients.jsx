import { addDoc, deleteDoc, updateDoc } from "firebase/database";
import { collection } from "firebase/firestore";
import React from "react";
import { db } from "../db/database";
const usePatients = () => {};

export const addPatient = async () => {
  await addDoc(collection(db, "paciente"), {
    nombre: "nombre",
    apellido: "apellido",
    dni: "dni",
    telefono: "telefono",
    direccion: "direccion",
    fechaNacimiento: "fechaNacimiento",
    obraSocial: "obraSocial",
    sexo: "sexo",
    estadoCivil: "estadoCivil",
    antecedentesQuirurgicos: "antecedentesQuirurgicos",
    alergias: "alergias",
    grupoSanguineo: "grupoSanguineo",
  });
};
export default usePatients;
