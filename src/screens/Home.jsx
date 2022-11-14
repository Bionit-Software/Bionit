import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();
  
  const handleLogout = async () => {
      navigate('/Login')
      await logout();
  } 

  return (
    <div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
