import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../db/database";

/**
 * @todo pantalla para emitir notificaciones desde cualquier usuario ,
 * @todo pantalla para ver las notificaciones de los usuarios
 */

export const useNotifications = () => {};

export const attendCall = async (notificationId, user) => {
  await updateDoc(doc(db, "notification", notificationId), {
    status: "attended",
    attendedAt: new Date(),
    attendedBy: user.uid,
  })
    .then(() => {
      console.log("notificacion atendida");
    })
    .catch((error) => {
      console.error("Error atendiendo notificacion: ", error);
    });
};

export const useNotificationManager = ({ user }) => {
  const [notificationID, setNotificationID] = React.useState("");

  const handleCall = async () => {
    await addNotificationDoc({
      type: "normal",
      status: "pending",
      from: user.uid,
      createdAt: new Date(),
    }).then((notificationId) => {
      console.log("notificacion añadida con id: ", notificationId);
      setNotificationID(notificationId);
    });

    toast(<Notification id={notificationID} />, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleClick = () => {
    console.log("se toco el container alert", notificationID);
    attendCall(notificationID, user);
  };

  return { handleCall, handleClick };
};

const Notification = ({ id }) => {
  return (
    <div className="container flex flex-col gap-2">
      <div className="containertext-white rounded-lg">
        <p className="font-semibold">Llamada entrante</p>
        <p>Nombre del paciente</p>
      </div>
      <div className="container flex gap-2 ">
        <span className="font-medium text-lg">Toque para atender</span>
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
