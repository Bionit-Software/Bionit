import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import BaseDialog from "./BaseDialog";

export const EditPatientDialog = NiceModal.create(({ file }) => {
  const [patient, setPatient] = React.useState({
    paciente: file.paciente,
    zona: { id: file.zona.id },
    enfermero: { id: file.enfermero.id },
    createdBy: file.userId,
    createdAt: file.createdAt,
  });
  const modal = NiceModal.useModal();
  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="bg-white w-80 p-4 px-6 rounded-md">
        <h1>Editar paciente</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={patient.paciente.nombre}
              onChange={(e) => {
                setPatient({
                  ...patient,
                  paciente: { ...patient.paciente, nombre: e.target.value },
                });
              }}
            />
          </div>
        </div>
      </div>
    </BaseDialog>
  );
});
