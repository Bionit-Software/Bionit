import NiceModal from "@ebay/nice-modal-react";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { deletePatient, useSinglePatientFile } from "../../hooks/usePatients";
import BaseDialog from "./BaseDialog";
import { EditPatientDialog } from "./EditPatientDialog";

/**
 * @requires fileId
 * @summary Dialog to show patient details
 */

const PatientDetailsDialog = NiceModal.create((props) => {
  const { fileId } = props;
  const modal = NiceModal.useModal();
  const { file } = useSinglePatientFile(fileId);

  const handleDeletePatient = () => {
    deletePatient(fileId);
    modal.remove();
  };

  const handleEditfile = () => {
    NiceModal.show(EditPatientDialog, { file: file });
  };

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="bg-white w-96 p-4 px-6 rounded-md">
        <h1>Ficha del paciente</h1>
        <button
          onClick={handleDeletePatient}
          className="bg-red-500 hover:bg-red-700 p-3 px-2 text-white font-medium"
        >
          Eliminar
        </button>
        <button
          onClick={handleEditfile}
          className="bg-amber-500 hover:bg-amber-700 p-3 px-2 text-white font-medium"
        >
          editar
        </button>
        <div className="flex flex-col gap-4 p-2 items-start">
          <span>Id: {file?.id}</span>
          <span>Nombre: {file?.paciente.nombre}</span>
          <span>Apellido: {file?.paciente.apellido}</span>
          <span>DNI: {file?.paciente.dni}</span>
          <span>Telefono: {file?.paciente.telefono}</span>
          <span>Direccion: {file?.paciente.direccion}</span>
          <span>Fecha de nacimiento: {file?.paciente.fechaNacimiento}</span>
          <span>Obra social: {file?.paciente.obraSocial}</span>
          <span>Sexo: {file?.paciente.sexo}</span>
          <span>Estado civil: {file?.paciente.estadoCivil}</span>
          <span>
            Antecedentes quirurgicos: {file?.paciente.antecedentesQuirurgicos}
          </span>
          <span>Alergias: {file?.paciente.alergias}</span>
          <span>Grupo Sanguineo: {file?.paciente.grupoSanguineo}</span>
        </div>
      </div>
    </BaseDialog>
  );
});
export default PatientDetailsDialog;
