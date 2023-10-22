import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

type GuardedRouteProps = {
    redirectPath?: string
}
const GuardedRoute: React.FC<GuardedRouteProps> = ({ redirectPath = '/' }) => {
    const { getAuth } = useAuthStore()

    if (!getAuth()) {
        return (
            <Navigate
                to={redirectPath}
                replace
            />
        )
    }

    return <Outlet />
}

export default GuardedRoute
