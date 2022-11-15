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