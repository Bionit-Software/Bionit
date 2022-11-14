import React from 'react'
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../db/database';

export default function useUsers() {
    const getUser = async () =>{
        const usuariosCollection = collection(db, "usuario");
        const turnosSnapshot = await getDocs(usuariosCollection);
        const usuariosList = turnosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          }));
          return usuariosList;
      }
  return { getUser }
}
