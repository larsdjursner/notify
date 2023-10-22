import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { supabase } from '../../supabase'

const REGULAR_ROUTES = ['/', '/signup', '/signin']

const RouterWrapper: React.FC = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuthStore()
    const { pathname } = useLocation()

    useEffect(() => {
        void supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user == null) {
                return
            }

            setAuth(session.user)
            navigate(REGULAR_ROUTES.includes(pathname) ? '/page/new' : pathname)
        })
    }, [])

    return <div className="h-screen w-screen flex max-h-screen max-w-screen">{<Outlet />}</div>
}

export default RouterWrapper
