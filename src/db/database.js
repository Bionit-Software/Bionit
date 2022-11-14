
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdydJLUqlCWoqaptqi1dGbQ4QNlBSPBMY",
    authDomain: "olimpiadas-inet22.firebaseapp.com",
    projectId: "olimpiadas-inet22",
    storageBucket: "olimpiadas-inet22.appspot.com",
    messagingSenderId: "79050420288",
    appId: "1:79050420288:web:511abf2fff6a74e0f6afa5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app) 
