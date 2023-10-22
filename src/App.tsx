import React, { useEffect } from 'react'
import {
    Navigate,
    Outlet,
    useNavigate,
    useLocation,
    createBrowserRouter,
    type RouteObject,
    RouterProvider,
} from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Landing from './pages/Landing'
import { Page } from './pages/Page/Page'
import { useAuthStore } from './stores/authStore'
import { supabase } from './supabase'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewPage from './pages/NewPage'
import ErrorPage from './pages/ErrorPage'

const App: React.FC = () => {
    const queryClient = new QueryClient()
    const router = createBrowserRouter(routes, {})

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

export default App

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

const RouterWrapper: React.FC = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuthStore()
    const { pathname } = useLocation()

    const regularRoutes = ['/', '/signup', '/signin']

    useEffect(() => {
        void supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user == null) {
                return
            }

            setAuth(session.user)
            navigate(regularRoutes.includes(pathname) ? '/page/new' : pathname)
        })
    }, [])

    return <div className="h-screen w-screen flex max-h-screen max-w-screen">{<Outlet />}</div>
}

const routes: RouteObject[] = [
    {
        path: '/',
        Component: RouterWrapper,
        children: [
            {
                path: '',
                Component: Landing,
            },
            {
                path: 'signup',
                Component: SignUp,
            },
            {
                path: 'signin',
                Component: SignIn,
            },
            {
                Component: GuardedRoute,
                children: [
                    {
                        path: 'page/:id',
                        Component: Page,
                    },
                    {
                        path: 'page/new',
                        Component: NewPage,
                    },
                ],
            },
            {
                path: '*',
                Component: ErrorPage,
            },
        ],
    },
]
