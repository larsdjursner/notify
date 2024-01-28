import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import GuardedRoute from './components/routing/GuardedRoute'
import RouterWrapper from './components/routing/RouterWrapper'
import './lib/init-dayjs.ts'
import ErrorPage from './pages/ErrorPage'
import Landing from './pages/Landing'
import NewPage from './pages/NewPage'
import Page from './pages/Page/Page'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'

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
                id: 'landing',
                path: '',
                Component: Landing,
            },
            {
                id: 'signup',
                path: 'signup',
                Component: SignUp,
            },
            {
                id: 'signin',
                path: 'signin',
                Component: SignIn,
            },
            {
                Component: GuardedRoute,
                path: 'app',
                children: [
                    {
                        id: 'page',
                        path: 'page/:id',
                        Component: Page,
                    },
                    {
                        id: 'new-page',
                        path: 'new',
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
