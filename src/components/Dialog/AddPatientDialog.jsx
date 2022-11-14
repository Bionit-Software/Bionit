import NiceModal from "@ebay/nice-modal-react";
import React from "react";
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
        />        <input
        type="text"
        value={patient.apellido}
        onChange={(e) => {
          setPatient({ ...patient, apellido: e.target.value });
        }}
      />        <input
      type="text"
      value={patient.dni}
      onChange={(e) => {
        setPatient({ ...patient, dni: e.target.value });
      }}
    />        <input
    type="text"
    value={patient.telefono}
    onChange={(e) => {
      setPatient({ ...patient, telefono: e.target.value });
    }}
  />        <input
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
            setPatient({ ...patient, : e.target.value });
          }}
        />
        <button onClick={handleAddPatient}>añadir paciente</button>
      </div>
    </BaseDialog>
  );
});
