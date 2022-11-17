import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import BaseDialog from "./BaseDialog";
import { CallerDialog } from "./CallerDialog";

export const NotificationsDialog = NiceModal.create((props) => {
  const modal = NiceModal.useModal();

  const handleCallerButton = (type) => {
    NiceModal.show(CallerDialog, {
      type: type,
      user: props.user,
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <BaseDialog
      isOpen={modal.visible}
      onClose={() => {
        modal.hide();
      }}
    >
      <div className="container flex flex-col gap-6">
        Elija el llamado a realizar
        <button
          className="bg-gray-100 shadow-lg p-6 w-full"
          onClick={() => {
            handleCallerButton("normal");
          }}
        >
          Llamado normal
        </button>
        <button
          className="bg-gray-100 shadow-lg p-6 w-full"
          onClick={() => {
            handleCallerButton("emergencia");
          }}
        >
          Llamado emergencia
        </button>
      </div>
    </BaseDialog>
  );
});
