import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import Button from "../Button";
import ModalTitle from "../ModalTitle";
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
        <ModalTitle title="Elija el llamado a realizar" />
        <div className="flex flex-col gap-6 items-center justify-center">
          <Button
            onClick={() => {
              handleCallerButton("normal");
            }}
          >
            Llamado normal
          </Button>
          <Button
            onClick={() => {
              handleCallerButton("emergencia");
            }}
          >
            Llamado emergencia
          </Button>
        </div>
      </div>
    </BaseDialog>
  );
});
