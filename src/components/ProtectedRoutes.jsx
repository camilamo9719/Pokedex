import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    
    const trainer = useSelector(state => state.trainer)

    {/* Para que funcione la ruta protegida de la pokedex */}
    if(trainer) {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoutes