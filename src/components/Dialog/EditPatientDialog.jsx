import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { editPatient } from "../../hooks/usePatients";
import { useEnfermeros } from "../../hooks/useUsers";
import { useZones } from "../../hooks/useZones";
import Button from "../Button";
import Chip from "../Chip";
import { DialogInput } from "../DialogInput";
import BaseDialog from "./BaseDialog";

export const EditPatientDialog = NiceModal.create(({ file }) => {
  const [patient, setPatient] = React.useState({
    paciente: file.paciente,
    zona: { id: file.zona.id },
    enfermero: { id: file.enfermero.id },
    createdBy: file.createdBy,
    createdAt: file.createdAt,
  });
  const [selectedNurseId, setSelectedNurseId] = React.useState(
    file.enfermero.id
  );
  const { zones } = useZones();
  const { enfermeros } = useEnfermeros();
  const [selectedZoneId, setSelectedZoneId] = React.useState(file.zona.id);

  const modal = NiceModal.useModal();
  const handleEditPatient = async () => {
    if (
      !patient.paciente.nombre ||
      !patient.paciente.apellido ||
      !patient.paciente.dni ||
      !patient.paciente.telefono ||
      !patient.paciente.direccion ||
      !patient.paciente.fechaNacimiento
    ) {
      alert("Por favor rellene los campos obligatorios");
      return;
    }
    await editPatient(
      {
        ...patient,
        zona: { id: selectedZoneId },
        enfermero: { id: selectedNurseId },
      },
      file.id
    );
    modal.hide();
  };
  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="flex flex-col rounded-md p-2 gap-2 flex-wrap h-11/12 w-full min-w-full max-w-full z-10">
        <h1 className="text-white text-2xl font-bold">Editar paciente</h1>
        <div className="flex flex-row w-96 gap-4 flex-wrap h-1/12 max-h-96">
          <DialogInput
            label="Nombre"
            value={patient.paciente.nombre}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  nombre: e.target.value,
                },
              });
            }}
          />

          <DialogInput
            label="Apellido"
            value={patient.paciente.apellido}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  apellido: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="DNI"
            value={patient.paciente.dni}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  dni: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="Telefono"
            value={patient.paciente.telefono}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: { ...patient.paciente, telefono: e.target.value },
              });
            }}
          />
          <DialogInput
            label="Direccion"
            value={patient.paciente.direccion}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  direccion: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="Fecha de nacimiento"
            value={patient.paciente.fechaNacimiento}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  fechaNacimiento: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="Obra social"
            value={patient.paciente.obraSocial}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  obraSocial: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="Sexo"
            value={patient.paciente.sexo}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: { ...patient.paciente, sexo: e.target.value },
              });
            }}
          />
          <DialogInput
            label={"Estado Civil"}
            value={patient.paciente.estadoCivil}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  estadoCivil: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="Antecedentes quirurgicos"
            value={patient.paciente.antecedentesQuirurgicos}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  antecedentesQuirurgicos: e.target.value,
                },
              });
            }}
          />
          <DialogInput
            label="Alergias"
            value={patient.paciente.alergias}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: { ...patient.paciente, alergias: e.target.value },
              });
            }}
          />
          <DialogInput
            label={"Grupo sanguineo"}
            value={patient.paciente.grupoSanguineo}
            onChange={(e) => {
              setPatient({
                ...patient,
                paciente: {
                  ...patient.paciente,
                  grupoSanguineo: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="flex flex-col py-2 gap-3">
          <Chip>Nueva zona</Chip>
          <select
            className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
            value={selectedZoneId}
            onChange={(e) => setSelectedZoneId(e.target.value)}
          >
            <option value="" disabled defaultChecked>
              Seleccione una zona
            </option>
            {zones.map((zone) => {
              return (
                <option value={zone.id} key={zone.id}>
                  {zone.name}
                </option>
              );
            })}
          </select>
          <Chip>Nuevo enfermero</Chip>

          <select
            className="text-lg font-medium w-full p-2 bg-background text-white border-2 border-primary border-opacity-60 rounded-lg px-4"
            value={selectedNurseId}
            onChange={(e) => setSelectedNurseId(e.target.value)}
          >
            <option value="" disabled defaultChecked>
              Seleccione un enfermero
            </option>
            {enfermeros.map((enfermero) => {
              return (
                <option value={enfermero.id} key={enfermero.id}>
                  {enfermero.nombre} {enfermero.apellido}
                </option>
              );
            })}
          </select>
        </div>
        <Button onClick={handleEditPatient}>Guardar</Button>
      </div>
    </BaseDialog>
  );
});
