import { useEffect } from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    Outlet,
    useNavigate,
    useLocation,
} from "react-router-dom"
import BaseLayout from "./components/layout/BaseLayout"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Landing from "./pages/Landing"
import { Page } from "./pages/Page"
import { useAuthStore } from "./stores/authStore"
import { supabase } from "./supabase"

const ProtectedRoute = ({ redirectPath = "/" }: { redirectPath?: string }) => {
    const { getAuth } = useAuthStore()

    if (!getAuth()) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet />
}

const NewPage = () => {
    return <div>new page!</div>
}

const RouterWrapper = ({
    children,
}: {
    children: JSX.Element | JSX.Element[]
}) => {
    const { setAuth } = useAuthStore()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const regularRoutes = ["/", "/signup", "/signin"]

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setAuth(session.user)
                navigate(
                    regularRoutes.includes(pathname) ? "/page/new" : pathname
                )
            }
        })
    }, [])

    return (
        <div className="h-screen w-screen flex max-h-screen max-w-screen">
            {children}
        </div>
    )
}

function App() {
    return (
        <Router>
            <RouterWrapper>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/page/:id"
                            element={
                                <BaseLayout>
                                    <Page />
                                </BaseLayout>
                            }
                        />
                        <Route
                            path="/page/new"
                            element={
                                <BaseLayout>
                                    <NewPage />
                                </BaseLayout>
                            }
                        />
                    </Route>

                    <Route
                        path="/*"
                        element={<div>error page not found</div>}
                    />
                </Routes>
            </RouterWrapper>
        </Router>
    )
}

export default App
