import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
import BaseDialog from "./BaseDialog";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { db, auth } from '../../db/database';
import { addDoc, collection } from 'firebase/firestore';
const RolSelectionDialog = NiceModal.create(({ name }) => {

  const modal = useModal();
  return (
    <BaseDialog isOpen={modal.visible} onClose={() => modal.hide()}>
      <div className="bg-cyan-300 p-12">
        <h1 className="text-3xl">
          Hola! Selecciona el rol que deseas utilizar
        </h1>
        <div className="flex flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => submit('admin')}
          >
            Administrador
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => submit('medico')}
          >
            Medico
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => submit('enfermero')}
          >
            Enfermero
          </button>
        </div>
        <button onClick={() => modal.hide()}>Close</button>
      </div>
    </BaseDialog>
  );
});

export { RolSelectionDialog };
