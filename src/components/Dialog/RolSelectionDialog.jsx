import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BaseDialog from "./BaseDialog";

const RolSelectionDialog = NiceModal.create(({ name }) => {
  // Use a hook to manage the modal state
  const modal = useModal();
  return (
    <BaseDialog isOpen={modal.visible} onClose={() => modal.hide()}>
      <div className="bg-cyan-300 p-12">
        <h1 className="text-3xl">Hi {name}</h1>
        <button onClick={() => modal.hide()}>Close</button>
      </div>
    </BaseDialog>
  );
});

export { RolSelectionDialog };
