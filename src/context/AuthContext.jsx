import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../db/database";
const authContext = createContext();
/*Usar el context*/
export const useAuth = () => {
  const contextAuth = useContext(authContext);
  if (!contextAuth) throw new Error("No esta autenticado");
  return contextAuth;
};
/*Usar el context*/

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState("");
  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); //setea valores del usuario
      setLoading(false); //setea en falso el loading
    });
    return () => unsub();
  }, []);

  const getError = (error) => {
    //función para devolver los tipos errores
    switch (error.code) {
      case "auth/invalid-email":
        setErrorType("Correo electrónico invalido");
        break;
      case "auth/internal-error":
        setErrorType("No ingresó contraseña");
        break;
      case "auth/weak-password":
        setErrorType("Contraseña muy corta");
        break;
      case "auth/user-not-found":
        setErrorType("El usuario no existe/Registrate");
        break;
      case "auth/wrong-password":
        setErrorType("Contraseña incorrecta");
        break;
      case "auth/too-many-requests":
        setErrorType("Demasiados intentos, intente más tarde");
        break;
      case "auth/email-already-in-use":
        setErrorType("Email en uso");
        break;
      case "auth/empty-name":
        setErrorType("Ingrese su nombre");
        break;
      case "auth/empty-lastname":
        setErrorType("Ingrese su apellido");
        break;
      case "auth/empty-email":
        setErrorType("Ingrese su email");
        break;
      case "auth/empty-password":
        setErrorType("Ingrese su contraseña");
        break;
      case "":
        setErrorType("");
        break;
      default:
        setErrorType("");
        break;
    }
  };

  const data = {
    signup,
    login,
    logout,
    user,
    loading,
    getError,
    errorType,
  };
  return <authContext.Provider value={data}>{children}</authContext.Provider>;
};

export { AuthProvider };
export default authContext;
