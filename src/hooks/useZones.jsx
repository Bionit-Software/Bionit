import { addDoc } from "firebase/firestore";
import React from "react";
import { db } from "../db/database";

export const useZones = () => {
  const addZone = async () => {
    await addDoc(db, "zones", {
      name: "zona 1",
      description: "zona 1",
      createdAt: new Date(),
    });
  };
};
