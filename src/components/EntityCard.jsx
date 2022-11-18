import React from "react";
import usePatientsFiles from "../hooks/usePatients";
import { useEnfermeros } from "../hooks/useUsers";
import { useZones } from "../hooks/useZones";

export default function EntityCard({ entity }) {
  const { zones } = useZones();
  const { files } = usePatientsFiles();
  const { enfermeros } = useEnfermeros();
  return (
    <div className="bg-background p-6 rounded-xl shadow-md w-full flex flex-row gap-4 items-center">
      <h1 className="text-white font-bold text-sm p-2 bg-primary w-fit py-1 px-2 rounded-lg cursor-default">
        {entity.charAt(0).toUpperCase()}
        {entity.slice(1)}
      </h1>
      <span className="text-white text-xl font-bold">
        {entity === "zonas"
          ? zones.length
          : entity === "fichas"
          ? files.length
          : entity === "enfermeros"
          ? enfermeros.length
          : null}
      </span>
    </div>
  );
}
