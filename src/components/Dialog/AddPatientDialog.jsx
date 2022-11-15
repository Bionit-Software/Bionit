import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { addPatient } from "../../hooks/usePatients";
import BaseDialog from "./BaseDialog";
export const AddPatientDialog = NiceModal.create(() => {
  const [patient, setPatient] = React.useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    obraSocial: "",
    sexo: "",
    estadoCivil: "",
    antecedentesQuirurgicos: "",
    alergias: "",
    grupoSanguineo: "",
  });

  const modal = NiceModal.useModal();

  const handleAddPatient = async () => {
    await addPatient(patient);
  };

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="flex flex-col gap-8">
        Patients
        <input
          type="text"
          value={patient.nombre}
          onChange={(e) => {
            setPatient({ ...patient, nombre: e.target.value });
          }}
        />{" "}
        <input
          type="text"
          value={patient.apellido}
          onChange={(e) => {
            setPatient({ ...patient, apellido: e.target.value });
          }}
        />{" "}
        <input
          type="text"
          value={patient.dni}
          onChange={(e) => {
            setPatient({ ...patient, dni: e.target.value });
          }}
        />{" "}
        <input
          type="text"
          value={patient.telefono}
          onChange={(e) => {
            setPatient({ ...patient, telefono: e.target.value });
          }}
        />{" "}
        <input
          type="text"
          value={patient.direccion}
          onChange={(e) => {
            setPatient({ ...patient, direccion: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.fechaNacimiento}
          onChange={(e) => {
            setPatient({ ...patient, fechaNacimiento: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.obraSocial}
          onChange={(e) => {
            setPatient({ ...patient, obraSocial: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.sexo}
          onChange={(e) => {
            setPatient({ ...patient, sexo: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.estadoCivil}
          onChange={(e) => {
            setPatient({ ...patient, estadoCivil: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.antecedentesQuirurgicos}
          onChange={(e) => {
            setPatient({ ...patient, antecedentesQuirurgicos: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.alergias}
          onChange={(e) => {
            setPatient({ ...patient, alergias: e.target.value });
          }}
        />
        <input
          type="text"
          value={patient.grupoSanguineo}
          onChange={(e) => {
            setPatient({ ...patient, grupoSanguineo: e.target.value });
          }}
        />
        <button onClick={handleAddPatient}>añadir paciente</button>
      </div>
    </BaseDialog>
  );
});
