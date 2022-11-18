import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../db/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUsers";
import Bionit from "../assets/Bionit.png";

export default function Login() {
  const { login, getError, errorType, user } = useAuth();
  const [userr, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      onSnapshot(
        query(collection(db, "usuario"), where("uid", "==", user.uid)),
        (querySnapshot) => {
          const data = querySnapshot.docs[0].data();
          console.log(data)
          if (data.rol === "admin") {
            console.log()
            navigate("/dashboard");
          } else if (data.rol === "enfermero" || data.rol === "doctor") {
            navigate("/patients");
          }

        }
      );
    }
  }, [user]);

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...userr, [name]: value }); //actualizar estado

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userr.email, userr.password).then((a) => {
        useUser(a.user.uid);
      });
    } catch (error) {
      getError(error); //mando el error por parametro
    }
  };

  const submitRegister = () => {
    let error = { code: "" };
    getError(error);
    navigate("/register");
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
          className="container mr-12 pr-8"
        >
          <p className="text-center text-4xl text-white font-semibold mb-8">
            Inicio de sesión
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
          <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="gap-4 flex justify-center mt-10 mb-5"
            >
              <button
                onClick={handleSubmit}
                className="text-xl text-white rounded-full btn-gradient w-full h-12 font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
              >
                Iniciar Sesión
              </button>
            </motion.div>
          <div className="flex justify-center gap-4 text-white mt-12 mb-5">
            <p>
              No tenes cuenta?
            </p>
            <p
              className="text-primary"
              onClick={() => submitRegister()}
              style={{
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Registrate
            </p>
          </div>
        </motion.div>
      </div>
    </div>

  );
}
