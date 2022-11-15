import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { addPatient } from "../../hooks/usePatients";
import { useEnfermeros } from "../../hooks/useUsers";
import { useZones } from "../../hooks/useZones";
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
      <div
        className="flex
      items-center justify-center
       bg-white flex-wrap py-3 rounded-md
         px-3 h-9/12 md:w-8/12 sm:bg-red-400 w-11/12 gap-2 "
      >
        <div>
          <label>Seleccione la zona del paciente</label>
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
        </div>

        <label>Seleccione el enfermero encargado</label>
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
            setPatient({ ...patient, antecedentesQuirurgicos: e.target.value });
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

        <div className="w-full flex items-center justify-center">
          <button
            className="bg-blue-500 text-white w-10/12 p-2 rounded-md"
            onClick={handleAddPatientFile}
          >
            Crear
          </button>
        </div>
      </div>
    </BaseDialog>
  );
});
