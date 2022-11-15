import React from 'react'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  return (
    <div className="container h-full w-full flex">
      <Navbar/>
      <div className="container h-full w-10/12">
        Dashboard
      </div>
    </div>
  )
}
