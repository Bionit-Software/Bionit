import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../db/database";
export default function Register() {
  const { getError, errorType } = useAuth();
  const [rol, setRol] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setUserData({ ...userData, [name]: value }); //actualizar estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        userData.nombre !== "" &&
        userData.apellido !== "" &&
        userData.email !== "" &&
        userData.password !== ""
      ) {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((a) => {
          addDoc(collection(db, "usuario"), {
            email: userData.email,
            nombre: userData.nombre,
            apellido: userData.apellido,
            rol: rol,
            uid: a.user.uid,
          });
          navigate("/patients");
        });
      } else {
        if (userData.nombre === "") {
          let error = { code: "auth/empty-name" };
          getError(error);
        } else {
          let error = { code: "auth/empty-lastname" };
          getError(error);
        }
        if (userData.email === "") {
          let error = { code: "auth/empty-email" };
          getError(error);
        } else {
          let error = { code: "auth/empty-password" };
          getError(error);
        }
      }
    } catch (error) {
      getError(error);
    }
  };

  const navigate = useNavigate();

  const submitIniciar = () => {
    let error = { code: "" };
    getError(error);
    navigate("/login");
  };

  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="container mx-auto p-10 pt-4 pb-0"
      >
        <p className="text-center text-3xl text-slate-700 font-semibold">
          Registro
        </p>
        {errorType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="text-center text-lg text-rose-800 font-semibold"
          >
            {errorType}
          </motion.div>
        )}
        <div className="justify-center">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ingrese Nombre"
            className="rounded-lg p-2 w-full border border-neutral-400"
            onChange={handleChange}
          />
        </div>
        <div className="justify-center">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Ingrese Apellido"
            className="rounded-lg p-2 w-full border border-neutral-400"
            onChange={handleChange}
          />
        </div>
        <div className="justify-center">
          <label>Correo Electrónico</label>
          <input
            type="text"
            name="email"
            placeholder="Ingrese correo electrónico"
            className="rounded-lg p-2 w-full border border-neutral-400"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese contraseña"
            className="rounded-lg p-2 w-full border border-neutral-400"
            onChange={handleChange}
          />
        </div>
        <select
          className="rounded-lg w-full mt-5 h-10 font-semibold border border-neutral-400"
          name="Rol"
          onChange={(e) => setRol(e.target.value)}
        >
          <option value=""> Seleccione Rol...</option>
          <option value="admin">Administrador</option>
          <option value="enfermero">Enfermero</option>
          <option value="medico">Medico</option>
        </select>
        {rol === "" && (
          <div className="gap-4 flex justify-center mt-5 mb-5">
            <div
              className="text-lg text-white rounded-full pt-1
                         bg-slate-300 w-4/6 h-10 font-semibold cursor-default"
            >
              Seleccione Rol...
            </div>
          </div>
        )}
        {rol !== "" && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="gap-4 flex justify-center mt-5 mb-5"
          >
            <button
              onClick={handleSubmit}
              className="text-lg text-white rounded-full 
                             bg-teal-600 w-4/6 h-10 font-semibold"
            >
              Crear Cuenta
            </button>
          </motion.div>
        )}
        <div className="flex justify-center gap-4">
          <p
            style={{ color: "#121212c4", fontSize: "18px", fontWeight: "400" }}
          >
            Ya tengo cuenta
          </p>
          <p
            onClick={() => submitIniciar()}
            style={{
              color: "#078282",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Iniciar Sesión
          </p>
        </div>
      </motion.div>
    </div>
  );
}
