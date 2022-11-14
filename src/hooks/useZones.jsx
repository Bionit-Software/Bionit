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

export const useZones = () => {
  const [zones, setZones] = React.useState([]);
  const addZone = async (zoneName, zoneDescription) => {
    await addDoc(collection(db, "zones"), {
      name: zoneName,
      description: zoneDescription,
      patients: [],
      nurses: [],
    });
  };
  const deleteZone = async (zoneId) => {
    await deleteDoc(doc(db, "zones", zoneId));
  };

  const editZone = async (zoneId, zoneName, zoneDescription) => {
    await updateDoc(doc(db, "zones", zoneId), {
      name: zoneName,
      description: zoneDescription,
    });
  };

  React.useEffect(() => {
    onSnapshot(collection(db, "zones"), (querySnapshot) => {
      const zones = [];
      querySnapshot.forEach((doc) => {
        zones.push({ id: doc.id, ...doc.data() });
      });
      setZones(zones);
    });
  }, []);

  return { zones, addZone, deleteZone, editZone };
};
