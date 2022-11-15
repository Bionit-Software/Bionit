import NiceModal from "@ebay/nice-modal-react";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { deletePatient, useSinglePatient } from "../../hooks/usePatients";
import BaseDialog from "./BaseDialog";

/**
 *
 */

const PatientDetailsDialog = NiceModal.create((props) => {
  const { patientId } = props;
  const modal = NiceModal.useModal();
  const { patient } = useSinglePatient(patientId);

  const handleDeletePatient = () => {
    deletePatient(patientId);
    modal.remove();
  };

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="bg-white w-80 p-4 px-6 rounded-md">
        <h1>Ficha del paciente</h1>
        <button
          onClick={handleDeletePatient}
          className="bg-red-500 hover:bg-red-700 p-3 px-2 text-white font-medium"
        >
          Eliminar
        </button>
        <button className="bg-amber-500 hover:bg-amber-700 p-3 px-2 text-white font-medium">
          editar
        </button>
        <div className="flex flex-col gap-4 p-2 items-start">
          <span>Nombre: {patient?.nombre}</span>
          <span>Apellido: {patient?.apellido}</span>
          <span>DNI: {patient?.dni}</span>
          <span>Telefono: {patient?.telefono}</span>
          <span>Direccion: {patient?.direccion}</span>
          <span>Fecha de nacimiento: {patient?.fechaNacimiento}</span>
          <span>Obra social: {patient?.obraSocial}</span>
          <span>Sexo: {patient?.sexo}</span>
          <span>Estado civil: {patient?.estadoCivil}</span>
          <span>
            Antecedentes quirurgicos: {patient?.antecedentesQuirurgicos}
          </span>
          <span>Alergias: {patient?.alergias}</span>
          <span>Grupo Sanguineo: {patient?.grupoSanguineo}</span>
        </div>
      </div>
    </BaseDialog>
  );
});
export default PatientDetailsDialog;
