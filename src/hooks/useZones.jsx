import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { db } from "../db/database";

export function useZones() {
  const [zones, setZones] = React.useState([]);
  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "zones"), (querySnapshot) => {
      const zones = [];
      querySnapshot.forEach((doc) => {
        zones.push({
          totalPoblation: doc.data().nurses.length + doc.data().patients.length,
          id: doc.id,
          ...doc.data(),
        });
      });
      setZones(zones);
    });
    return () => {
      unsub();
    };
  }, []);

  return { zones };
}

export function useSingleZone(id) {
  const [zone, setZone] = React.useState(null);
  React.useEffect(() => {
    if (id) {
      const unsub = onSnapshot(doc(db, "zones", id), (doc) => {
        setZone({
          id: doc.id,
          notificationsCount: doc.data().notifications.length,
          ...doc.data(),
        });
      });

      return () => {
        unsub();
      };
    }
  }, [id]);
  return { zone };
}

export const addZone = async (zoneName, zoneDescription) => {
  await addDoc(collection(db, "zones"), {
    name: zoneName,
    description: zoneDescription,
    patients: [],
    nurses: [],
  });
};

export const deleteZone = async (zoneId) => {
  await deleteDoc(doc(db, "zones", zoneId));
};

export const editZone = async (zoneId, zoneName, zoneDescription) => {
  await updateDoc(doc(db, "zones", zoneId), {
    name: zoneName,
    description: zoneDescription,
  });
};
