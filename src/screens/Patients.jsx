import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { AddPatientDialog } from "../components/Dialog/AddPatientDialog";
import PatientDetailsDialog from "../components/Dialog/PatientDetailsDialog";
import ListCard from "../components/ListCard";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useAuth } from "../context/AuthContext";
import usePatientsFiles from "../hooks/usePatients";
import Layout from "./Layout/Layout";

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
    <Layout>
      <div className="flex flex-col gap-8">
        <PageTitle title="Fichas de pacientes" />
        <Button onClick={handleAddPatient}>Añadir paciente</Button>
        <div className="p-4 px-0 flex flex-col gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            files.map((file) => {
              return (
                <ListCard
                  key={file.id}
                  onClick={() => handlePatientDetailsClick(file)}
                >
                  <span className="text-white text-2xl font-bold ">
                    {file.paciente.nombre} {file.paciente.apellido}
                  </span>
                </ListCard>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};
