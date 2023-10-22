import React from 'react'
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Landing from './pages/Landing'
import Page from './pages/Page/Page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewPage from './pages/NewPage'
import ErrorPage from './pages/ErrorPage'
import RouterWrapper from './components/routing/RouterWrapper'
import GuardedRoute from './components/routing/GuardedRoute'
import './lib/init-dayjs.ts'

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
