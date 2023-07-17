import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateComp() {
    const auth=localStorage.getItem('userInfo')
  return auth?<Outlet/>:<Navigate to='/'/>
}

export default PrivateComp