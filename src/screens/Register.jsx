import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../db/database";
import Bionit  from "../assets/Bionit.png";
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
          console.log(a)
          if (rol === "enfermero") {
            addDoc(collection(db, "usuario"), {
              uid: a.user.uid,
              nombre: userData.nombre,
              apellido: userData.apellido,
              email: userData.email,
              rol: rol,
              zonesId: [],
            });
          } else {
            addDoc(collection(db, "usuario"), {
              email: userData.email,
              nombre: userData.nombre,
              apellido: userData.apellido,
              rol: rol,
              uid: a.user.uid,
            });
          }
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
    <div className="w-screen h-screen tracking-wide text-lg grid grid-cols-2 background-gradient">
      <div></div>
      <div className="ml-auto font-semibold pr-12 pl-12">
        <div className="text-white text-6xl flex justify-end gap-6 mb-20 pt-4">
          <p className="text-right">Bionit</p>
          <img src={Bionit} alt="" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="container"
        >
          <p className="text-center text-4xl text-white font-semibold mb-8">
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
              className="text-center text-xl text-rose-800 font-semibold"
            >
              {errorType}
            </motion.div>
          )}
          <div className="justify-center flex gap-5 text-white mb-8">
            <div>
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ingrese Nombre..."
                className="rounded-full bg-input h-12 pl-4 w-full "
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                placeholder="Ingrese Apellido..."
                className="rounded-full bg-input h-12 pl-4 w-full "
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="justify-center text-white mb-8">
            <label>Correo Electrónico</label>
            <input
              type="text"
              name="email"
              placeholder="Ingrese Correo Electrónico..."
              className="rounded-full bg-input h-12 pl-4 w-full "
              onChange={handleChange}
            />
          </div>
          <div className="text-white mb-8">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese Contraseña..."
              className="rounded-full bg-input h-12 pl-4 w-full "
              onChange={handleChange}
            />
          </div>
          <div className="text-gray-400">
            <label className="text-white">Rol</label>
            <select
              style={{ color: "757575" }}
              className="rounded-full w-full h-12 pl-4 pr-4 bg-input  font-semibold  "
              name="rol"
              onChange={(e) => setRol(e.target.value)}
            >
              <option value=""> Seleccione Rol...</option>
              <option value="admin">Administrador</option>
              <option value="enfermero">Enfermero</option>
              <option value="medico">Medico</option>
            </select>
          </div>

          {rol === "" && (
            <div className="flex justify-center mt-10 mb-5">
              <button className="text-xl text-white rounded-full bg-light_grey w-full h-12 font-semibold cursor-not-allowed">
                Seleccione Rol...
              </button>
            </div>
          )}
          {rol !== "" && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="gap-4 flex justify-center mt-10 mb-5"
            >
              <button
                onClick={handleSubmit}
                className="text-xl text-white rounded-full btn-gradient w-full h-12 font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
              >
                Crear Cuenta
              </button>
            </motion.div>
          )}
          <div className="flex justify-center gap-4 text-white mt-12 mb-5">
            <p>
              Ya tengo cuenta
            </p>
            <p
              className="text-primary"
              onClick={() => submitIniciar()}
              style={{
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
    </div>
  );
}
