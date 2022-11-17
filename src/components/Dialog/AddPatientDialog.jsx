import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { addPatient } from "../../hooks/usePatients";
import { useEnfermeros } from "../../hooks/useUsers";
import { useZones } from "../../hooks/useZones";
import Button from "../Button";
import Chip from "../Chip";
import { DialogInput } from "../DialogInput";
import BaseDialog from "./BaseDialog";

export const AddPatientDialog = NiceModal.create(({ userId }) => {
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
  const [selectedZoneId, setSelectedZoneId] = React.useState("");
  const [selectedNurseId, setSelectedNurseId] = React.useState("");
  const modal = NiceModal.useModal();
  const { zones } = useZones();
  const { enfermeros } = useEnfermeros();
  //AÑadir ficha del paciente
  const handleAddPatientFile = async () => {
    if (
      !patient.nombre ||
      !patient.apellido ||
      !patient.dni ||
      !patient.telefono ||
      !patient.direccion ||
      !patient.fechaNacimiento ||
      !selectedNurseId ||
      !selectedZoneId
    ) {
      alert("Por favor rellene los campos obligatorios");
      return;
    }

    await addPatient(patient, selectedZoneId, selectedNurseId, userId);
    modal.hide();
    setPatient({
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
    setSelectedNurseId("");
    setSelectedZoneId("");
  };

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="flex flex-col rounded-md p-2 gap-2 flex-wrap h-11/12 w-full min-w-full max-w-full z-10">
        <h1 className="text-white text-2xl font-bold">Añadir paciente</h1>

        <div className="flex flex-row w-96 gap-4 flex-wrap h-1/12 max-h-96">
          <DialogInput
            label="Nombre"
            value={patient.nombre}
            onChange={(e) => {
              setPatient({ ...patient, nombre: e.target.value });
            }}
          />
          <DialogInput
            label="Apellido"
            value={patient.apellido}
            onChange={(e) => {
              setPatient({ ...patient, apellido: e.target.value });
            }}
          />
          <DialogInput
            label="DNI"
            value={patient.dni}
            onChange={(e) => {
              setPatient({ ...patient, dni: e.target.value });
            }}
          />
          <DialogInput
            label="Teléfono"
            value={patient.telefono}
            onChange={(e) => {
              setPatient({ ...patient, telefono: e.target.value });
            }}
          />
          <DialogInput
            label="Dirección"
            value={patient.direccion}
            onChange={(e) => {
              setPatient({ ...patient, direccion: e.target.value });
            }}
          />
          <DialogInput
            label="Fecha de nacimiento"
            value={patient.fechaNacimiento}
            onChange={(e) => {
              setPatient({ ...patient, fechaNacimiento: e.target.value });
            }}
          />
          <DialogInput
            label="Obra social"
            value={patient.obraSocial}
            onChange={(e) => {
              setPatient({ ...patient, obraSocial: e.target.value });
            }}
          />
          <DialogInput
            label="Sexo"
            value={patient.sexo}
            onChange={(e) => {
              setPatient({ ...patient, sexo: e.target.value });
            }}
          />
          <DialogInput
            label="Estado civil"
            value={patient.estadoCivil}
            onChange={(e) => {
              setPatient({ ...patient, estadoCivil: e.target.value });
            }}
          />
          <DialogInput
            label="Antecedentes quirúrgicos"
            value={patient.antecedentesQuirurgicos}
            onChange={(e) => {
              setPatient({
                ...patient,
                antecedentesQuirurgicos: e.target.value,
              });
            }}
          />
          <DialogInput
            label="Alergias"
            value={patient.alergias}
            onChange={(e) => {
              setPatient({ ...patient, alergias: e.target.value });
            }}
          />
          <DialogInput
            label="Grupo sanguíneo"
            value={patient.grupoSanguineo}
            onChange={(e) => {
              setPatient({ ...patient, grupoSanguineo: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col py-2 gap-3">
          <Chip>Seleccione la zona del paciente</Chip>
          <select
            className="border border-gray-300 rounded-md p-2"
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

          <Chip>Seleccione el enfermero encargado</Chip>
          <select
            className="border border-gray-300 rounded-md p-2"
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

        <Button onClick={handleAddPatientFile}>Crear</Button>
      </div>
    </BaseDialog>
  );
});
