import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protectedroute = ({ component: Component }) => {
    const { loginStatus } = useSelector((state) => state.login)

    if (!loginStatus) {
        return <Navigate to={"/"} />
    }
    return <Component />
}

export default Protectedroute