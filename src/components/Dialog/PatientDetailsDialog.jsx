import NiceModal from "@ebay/nice-modal-react";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { deletePatient, useSinglePatientFile } from "../../hooks/usePatients";
import Chip from "../Chip";
// import DeleteIcon from "../../icons/DeleteIcon.jsx";
// import EditIcon from "../../icons/EditIcon.jsx";
import Button from "../Button";
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
      <div className="p-1 2 h-1/12 px-6 rounded-md">
        <h1 className="text-white text-2xl font-bold">Ficha del paciente</h1>
        <div className="flex ">
          <Button onClick={handleDeletePatient}>Eliminar</Button>
          <Button onClick={handleEditfile}>Editar</Button>
        </div>
        <div className="flex flex-col gap-4 p-2 items-start">
          <Chip>Id: {file?.id}</Chip>
          <Chip>Nombre: {file?.paciente.nombre}</Chip>
          <Chip>Apellido: {file?.paciente.apellido}</Chip>
          <Chip>DNI: {file?.paciente.dni}</Chip>
          <Chip>Telefono: {file?.paciente.telefono}</Chip>
          <Chip>Direccion: {file?.paciente.direccion}</Chip>
          <Chip>Fecha de nacimiento: {file?.paciente.fechaNacimiento}</Chip>
          <Chip>Obra social: {file?.paciente.obraSocial}</Chip>
          <Chip>Sexo: {file?.paciente.sexo}</Chip>
          <Chip>Estado civil: {file?.paciente.estadoCivil}</Chip>
          <Chip>
            Antecedentes quirurgicos: {file?.paciente.antecedentesQuirurgicos}
          </Chip>
          <Chip>Alergias: {file?.paciente.alergias}</Chip>
          <Chip>Grupo Sanguineo: {file?.paciente.grupoSanguineo}</Chip>
        </div>
      </div>
    </BaseDialog>
  );
});
export default PatientDetailsDialog;
