import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import google from '../assets/google.png';
import { motion } from 'framer-motion'
import { db } from '../db/database';
import { addDoc, collection } from 'firebase/firestore';
export default function Register() {
    const { signup, getError, errorType, loginWithGoogle,user } = useAuth();
    const [rol, setRol] = useState('');
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        nombre: '',
        apellido: '',
    });

    const handleChange = ({ target: { name, value } }) => setUserData({ ...userData, [name]: value }) //actualizar estado

    const handleSubmit = async (e) => {
        console.log(rol)
        e.preventDefault();
        try {
            await signup(userData.email, userData.password);
            if (errorType != 'auth/email-already-in-use' || errorType != 'Email en uso' || errorType != 'Error desconocido') {
                console.log(userData)
                const docRef = await addDoc(collection(db, 'Usuario'), {
                    nombre: userData.nombre,
                    apellido: userData.apellido,
                    email: userData.email,
                    password: userData.password,
                    rol: rol,
                    uid: user.uid
                });
                console.log("Document written with ID: ", docRef.id);
            }
            navigate('/home');
        } catch (error) {
            getError(error)//mando a la funcion el error
        }
    }

    const navigate = useNavigate();

    const submit = () => {
        let error = { code: '' };
        getError(error)
        navigate('/Login');
    }

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
        navigate('/Home');
    }

    return (
        <div className='container mx-auto'>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                className='container mx-auto p-10 pt-4 pb-0'>
                <p className='text-center text-3xl text-slate-700 font-semibold'>Registro</p>
                {errorType &&
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        className='text-center text-lg text-rose-800 font-semibold'>
                        {errorType}
                    </motion.div>}
                <div className='justify-center'>
                    <label>Nombre</label>
                    <input type="text" name='nombre' placeholder='Ingrese Nombre' className='rounded-lg p-2 w-full border border-neutral-400' onChange={handleChange} />
                </div>
                <div className='justify-center'>
                    <label>Apellido</label>
                    <input type="text" name='apellido' placeholder='Ingrese Apellido' className='rounded-lg p-2 w-full border border-neutral-400' onChange={handleChange} />
                </div>
                <div className='justify-center'>
                    <label>Correo Electrónico</label>
                    <input type="text" name='email' placeholder='Ingrese correo electrónico' className='rounded-lg p-2 w-full border border-neutral-400' onChange={handleChange} />
                </div>
                <div >
                    <label>Contraseña</label>
                    <input type="password" name='password' placeholder='Ingrese contraseña' className='rounded-lg p-2 w-full border border-neutral-400' onChange={handleChange} />
                </div>
                <select name="Rol" onChange={(e) => setRol(e.target.value)}>
                    <option value="admin">Administrador</option>
                    <option value="enfermero" >Enfermero</option>
                    <option value="medico">Medico</option>
                </select>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='gap-4 flex justify-center mt-5 mb-5'>
                    <button onClick={handleSubmit}
                        className="text-lg text-white rounded-full 
                        bg-teal-600 w-4/6 h-10 font-semibold">
                        Crear Cuenta
                    </button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='gap-4 flex justify-center mt-5 mb-2'>
                    <button onClick={handleGoogleLogin}
                        className="rounded-full bg-white w-4/6 h-10
                        border border-neutral-400 flex
                        justify-center">
                        <img src={google} alt="google" height="20px" width="20px" className='mt-2' />
                        <p style={{ padding: '0px', fontSize: '18px', fontWeight: '300' }} className='mt-1'>Iniciar con Google</p>
                    </button>
                </motion.div>
                <div>
                    <p style={{ color: '#121212c4', fontSize: '18px', fontWeight: '400' }}>Ya tengo cuenta</p>
                    <p onClick={() => submit()} style={{ color: '#078282', fontSize: '18px', fontWeight: '600', cursor: 'pointer' }}>Iniciar Sesión</p>
                </div>
            </motion.div>
        </div>
    )
}