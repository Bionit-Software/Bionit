import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useUser } from '../hooks/useUsers';

export default function Login() {
    const { login, getError, errorType, user } = useAuth();

    const [userr, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [user])

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => setUser({ ...userr, [name]: value }) //actualizar estado

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userr.email, userr.password).then((a) => {
                // useUser(a.user.uid);
                useUser(a.user.uid);
            });
                
            navigate('/home');
        } catch (error) {
            getError(error)//mando el error por parametro
        }
    }

    const submitRegister = () => {
        let error = {code:''};
        getError(error)
        navigate('/Register');
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
                className='container mx-auto p-10 pt-4'>
                <p className='text-center text-3xl text-slate-700 font-semibold'>Inicio de Sesión</p>
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
                    <label>Correo Electrónico</label>
                    <input type="text" name='email' placeholder='Ingrese correo electrónico' className='rounded-lg p-2 w-full border border-neutral-400' onChange={handleChange} />
                </div>
                <div >
                    <label>Contraseña</label>
                    <input type="password" name='password' placeholder='Ingrese contraseña' className='rounded-lg p-2 w-full border border-neutral-400' onChange={handleChange} />
                </div>
                <motion.div className='gap-4 flex justify-center mt-10 mb-5'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                    <button onClick={handleSubmit}
                        className="text-lg text-white rounded-full 
                    bg-teal-600 w-4/6 h-10 font-semibold">
                        Iniciar sesión
                    </button>
                </motion.div>
                <div className="gap-4 justify-items-center flex justify-center ">
                    <p style={{ color: '#121212c4', fontSize: '18px', fontWeight: '400' }}>No tenés cuenta?</p>
                    <p onClick={() => submitRegister()} style={{ color: '#078282', fontSize: '18px', fontWeight: '600', cursor: 'pointer' }}>Registrate</p>
                </div>
            </motion.div>
        </div>
    )
}