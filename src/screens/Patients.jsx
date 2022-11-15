import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddPatientDialog } from "../components/Dialog/AddPatientDialog";
import PatientDetailsDialog from "../components/Dialog/PatientDetailsDialog";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import usePatientsFiles from "../hooks/usePatients";

export const Patients = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleAddPatient = () => {
    //Open add patient dialog
    NiceModal.show(AddPatientDialog, { userId: user.uid });
  };
  const handlePatientDetailsClick = (file) => {
    NiceModal.show(PatientDetailsDialog, { fileId: file.id });
  };

  const { files, loading } = usePatientsFiles();
  return (
    <div className="container h-full w-full flex">
      <Navbar />
      <div className="container h-full w-full">
        <div className="flex flex-col gap-8">
          Fichas de pacientes
          <button onClick={handleAddPatient}>añadir paciente</button>
          <div className="flex flex-col gap-4 p-4 justify-start items-start">
            {loading ? (
              <div>Loading...</div>
            ) : (
              patients.map((patient) => {
                return (
                  <div
                    className="flex flex-col gap-4 bg-gray-100 shadow-lg p-12 w-full text-lg font-medium"
                    key={patient.id}
                    onClick={() => handlePatientDetailsClick(patient)}
                  >
                    <div>Nombre: {patient.nombre}</div>
                    <div>Apellido: {patient.apellido}</div>
                    <div>DNI: {patient.dni}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
