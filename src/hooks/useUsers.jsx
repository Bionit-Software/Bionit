import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../db/database";

export function useUser(id) {
  const [userData, setUser] = React.useState(null);
  React.useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "usuario"), where("uid", "==", id)),
      (querySnapshot) => {
        setUser(querySnapshot.docs[0].data());
      }
    );
    return () => {
      unsub();
    };
  }, [id]);
  return { userData };
}

export default function useUsers() {
  const getUser = async () => {
    const usuariosCollection = collection(db, "usuario");
    const turnosSnapshot = await getDocs(usuariosCollection);
    const usuariosList = turnosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return usuariosList;
  };
  return { getUser };
}

export const useEnfermeros = () => {
  const [enfermeros, setEnfermeros] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "usuario"), where("rol", "==", "enfermero")),
      (querySnapshot) => {
        const enfermeros = [];
        querySnapshot.forEach((doc) => {
          enfermeros.push({ ...doc.data(), id: doc.id });
        });
        setEnfermeros(enfermeros);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);
  return { enfermeros, loading };
};
