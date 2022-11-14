import React from "react";

export const Patients = () => {
  const handleAddPatient = () => {
    console.log("Add patient");
  };
  return (
    <div className="flex flex-col gap-8">
      Patients
      <button onClick={handleAddPatient}>añadir paciente</button>
    </div>
  );
};
