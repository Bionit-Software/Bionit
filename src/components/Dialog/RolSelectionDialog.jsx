import React from "react";
import BaseDialog from "./BaseDialog";

export const RolSelectionDialog = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <BaseDialog
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="bg-white rounded-lg p-4">
        <p className="text-center text-2xl text-slate-700 font-semibold">
          Selecciona tu rol
        </p>
        <div className="flex justify-center">
          <button className="bg-teal-600 text-white rounded-lg p-2 w-4/6 mt-5">
            Soy un cliente
          </button>
        </div>
        <div className="flex justify-center">
          <button className="bg-teal-600 text-white rounded-lg p-2 w-4/6 mt-5">
            Soy un profesional
          </button>
        </div>
      </div>
    </BaseDialog>
  );
};
