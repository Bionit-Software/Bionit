import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../db/database";
const usePatients = () => {
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "paciente"),
      (querySnapshot) => {
        const patients = [];
        querySnapshot.forEach((doc) => {
          patients.push({ ...doc.data(), id: doc.id });
        });
        setPatients(patients);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return {
    patients,
    loading,
  };
};

export const useSinglePatient = (id) => {
  const [patient, setPatient] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const patientRef = doc(db, "paciente", id);
    const unsubscribe = onSnapshot(patientRef, (doc) => {
      setPatient({ id: doc.id, ...doc.data() });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);
  return { patient, loading };
};

export const deletePatient = async (id) => {
  await deleteDoc(doc(db, "paciente", id));
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

export default usePatients;
