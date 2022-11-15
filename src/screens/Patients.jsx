import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { AddPatientDialog } from "../components/Dialog/AddPatientDialog";

export const Patients = () => {
  const handleAddPatient = () => {
    //Open add patient dialog
    NiceModal.show(AddPatientDialog, {});
  };
  return (
    <div className="flex flex-col gap-8">
      Patients
      <button onClick={handleAddPatient}>añadir paciente</button>
    </div>
  );
};
