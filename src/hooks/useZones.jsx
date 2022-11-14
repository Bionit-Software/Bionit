import { addDoc } from "firebase/firestore";
import React from "react";
import { db } from "../db/database";

export const useZones = () => {
  const addZone = async (zoneName, zoneDescription) => {
    await addDoc(db, "zones", {
      name: zoneName,
      description: zoneDescription,
    });
  };

  return { addZone };
};
