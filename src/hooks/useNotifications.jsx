import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../db/database";

/**
 * @todo pantalla para emitir notificaciones desde cualquier usuario ,
 * @todo pantalla para ver las notificaciones de los usuarios
 */

export const useNotifications = () => {};

export const useNotificationManager = ({ user }) => {
  const [notificationID, setNotificationID] = React.useState("");
  const handleCall = () => {
    addNotificationDoc({
      type: "normal",
      status: "pending",
      from: user.uid,
      createdAt: new Date(),
    }).then((notificationId) => {
      console.log("notificacion añadida con id: ", notificationId);
      setNotificationID(notificationId);
    });

    toast(<Notification id={notificationID} />, {
      onClose: (props) => {
        console.log("notificacion cerrada", props);
      },
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return { handleCall };
};

const Notification = ({ id }) => {
  console.log(id);
  return (
    <div className="container flex flex-col gap-2">
      <div className="container bg-red-500 text-white p-2 rounded-lg">
        <p className="font-semibold">Llamada entrante</p>
        <p>Nombre del paciente</p>
      </div>
      <div className="container flex gap-2">
        <button className="bg-green-500 text-white p-2 rounded-lg">
          Aceptar
        </button>
        <button className="bg-red-500 text-white p-2 rounded-lg">
          Rechazar
        </button>
      </div>
    </div>
  );
};

export const addNotificationDoc = (notification) => {
  const docRef = addDoc(collection(db, "notification"), notification)
    .then((docRef) => {
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error añadiendo notificacion documento: ", error);
    });
  return docRef;
};
