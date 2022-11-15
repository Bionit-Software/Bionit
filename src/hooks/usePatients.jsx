import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../db/database";
const usePatientsFiles = () => {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ficha"), (querySnapshot) => {
      const patientsFiles = [];
      querySnapshot.forEach((doc) => {
        patientsFiles.push({ ...doc.data(), id: doc.id });
      });
      setFiles(patientsFiles);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return {
    files,
    loading,
  };
};

export const useSinglePatientFile = (id) => {
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const patientRef = doc(db, "ficha", id);
    const unsubscribe = onSnapshot(patientRef, (doc) => {
      setFile({ id: doc.id, ...doc.data() });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);
  return { file, loading };
};

export const deletePatient = async (id) => {
  await deleteDoc(doc(db, "ficha", id));
};

export const editPatient = async (
  patient,
  id,
  selectedZoneId,
  selectedNurseId
) => {
  // console.log(patient, id);
  await updateDoc(doc(db, "ficha", id), patient);
};

export const addPatient = async (patient, zonaId, enfermeroId, userId) => {
  await addDoc(collection(db, "ficha"), {
    paciente: {
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
    },
    zona: { id: zonaId },
    enfermero: { id: enfermeroId },
    createdBy: userId,
    createdAt: new Date(),
  });
};

export default usePatientsFiles;
