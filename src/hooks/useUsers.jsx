import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/database";

export function useUser(id) {
  const [userData, setUser] = React.useState(null);
  console.log(id);
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
// export function useUser(id) {
//     const [user, setUser] = React.useState({});
//     console.log(user)
// React.useEffect(() => {
//    export const useUser = async (id) => {
//     const [user, setUser] = React.useState({});
//         const colRef = collection(db, "usuario");
//         const docsSnap = await getDocs(colRef);
//         docsSnap.forEach((doc) => {
//             const data = doc.data();
//             console.log(data.uid);
//             console.log(id, "cortina plana que viene de allá");
//             if (data.uid === id) {
//                 console.log('este es el usuario nasi', data);
//                 setUser(data);
//             }
//         });
//         return { user };
//     };
//     return () => {
//         messi();
//     };
// }, []);
// }
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
