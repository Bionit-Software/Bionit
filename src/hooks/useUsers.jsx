import React from "react";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../db/database";

export function useUsers(id) {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        const unsub = onSnapshot(collection(db, "usuario"), (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            setUsers(users);
        });
        return () => {
            unsub();
        };
    }, []);
    return { users };
}

export function useUser(id) {
    const [userData, setUser] = React.useState(null);
    console.log(id)
    React.useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "usuario"), where("uid", "==", id)), (querySnapshot) => {
            setUser(querySnapshot.docs[0].data())
        })
        return ()=>{
            unsub()
        }
    }, [id]);    
    return { userData };
}
