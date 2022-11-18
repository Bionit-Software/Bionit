import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { db } from "../db/database";
import GetDateDiffInSeconds from "../helpers/getDateDiff";
import { useSinglePatientFile } from "../hooks/usePatients";

const NotificationsContext = React.createContext();

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

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = React.useState([]);
  const [attendedNotifications, setAttendedNotifications] = React.useState([]);
  const [unattendedNotifications, setUnattendedNotifications] = React.useState(
    []
  );
  const ResolveNotification = async (user, notificationId) => {
    await updateDoc(doc(db, "notification", notificationId), {
      status: "attended",
      attendedAt: new Date(),
      attendedBy: user.uid,
    })
      .then(() => {
        getDoc(doc(db, "notification", notificationId)).then((docReference) => {
          console.log("holi");
          const attendedAt = docReference.data().attendedAt;
          const createdAt = docReference.data().createdAt;

          //update the notificationn docuemnt
          updateDoc(doc(db, "notification", notificationId), {
            diffTime: GetDateDiffInSeconds(createdAt, attendedAt),
          });
        });
      })
      .catch((error) => {
        console.error("Error atendiendo notificacion: ", error);
      });
  };

  const InstanceNewNotification = (InstancePackage) => {
    if (InstancePackage.type === "normal") {
      toast(
        <div className="flex gap-4 flex-col">
          {InstancePackage.message}
          <button
            onClick={() =>
              ResolveNotification(
                InstancePackage.user,
                InstancePackage.notificationId
              )
            }
          >
            Atender
          </button>
        </div>,
        {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else if (InstancePackage.type === "emergencia") {
      toast.error(
        <div className="flex gap-4 flex-col">
          {InstancePackage.message}
          <button
            onClick={() =>
              ResolveNotification(
                InstancePackage.user,
                InstancePackage.notificationId
              )
            }
          >
            Atender
          </button>
        </div>,
        {
          position: "top-center",
          autoClose: 10000,
          type: "warning",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const AddNewNotification = async (NotificationPackage) => {
    await addNotificationDoc({
      type: NotificationPackage.type,
      status: "pending",
      from: NotificationPackage.user.uid,
      createdAt: new Date(),
      ...(NotificationPackage.type === "emergencia" && {
        zone: NotificationPackage.zone,
        zoneId: NotificationPackage.zoneId,
      }),
      ...(NotificationPackage.type === "normal" && {
        patient: NotificationPackage.patient,
        zone: NotificationPackage.zone,
        zoneId: NotificationPackage.zoneId,
        origin: NotificationPackage.origin,
      }),
    })
      .then((id) => {
        if (NotificationPackage.type === "normal") {
          InstanceNewNotification({
            type: NotificationPackage.type,
            user: NotificationPackage.user,
            notificationId: id,
            message: `Llamado de ${NotificationPackage.patient} en ${NotificationPackage.zone} desde ${NotificationPackage.origin}`,
          });
        } else if (NotificationPackage.type === "emergencia") {
          console.log("Saludos desde add new noti, el tipo es emergencia breo");
          InstanceNewNotification({
            type: NotificationPackage.type,
            user: NotificationPackage.user,
            notificationId: id,
            message: `Alerta azul en zona: ${NotificationPackage.zone}`,
          });
        }
        updateDoc(doc(db, "zones", NotificationPackage.zoneId), {
          notifications: arrayUnion({
            type: NotificationPackage.type,
            notificationId: id,
          }),
        });
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error añadiendo notificacion: ", error);
      });
  };

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notification"), (query) => {
      const docs = [];
      const attendedNotification = [];
      const notAttendedNotification = [];
      query.forEach((doc) => {
        if (doc.data().status === "attended") {
          attendedNotification.push(doc.data());
        } else if (doc.data().status === "pending") {
          notAttendedNotification.push(doc.data());
        }

        docs.push({ ...doc.data(), id: doc.id });
      });
      setNotifications(docs);
      setAttendedNotifications(attendedNotification);
      setUnattendedNotifications(notAttendedNotification);
    });
    return unsubscribe;
  }, []);

  const UpdateNotificationStatus = async (notificationId, newStatus) => {
    await updateDoc(doc(db, "notification", notificationId), {
      status: newStatus,
      attendedAt: new Date(),
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        InstanceNewNotification,
        AddNewNotification,
        notifications,
        attendedNotifications,
        unattendedNotifications,
        UpdateNotificationStatus,
        ResolveNotification,
      }}
    >
      {children}
      <ToastContainer />
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = React.useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications debe estar dentro del provider");
  }
  return context;
};
