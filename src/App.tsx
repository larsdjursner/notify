import { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    Outlet,
} from "react-router-dom"
import { Navbar } from "./components/navigation/Navbar"
import { Sidebar } from "./components/navigation/Sidebar"
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

const BaseLayout = ({
    children,
}: {
    children: JSX.Element | JSX.Element[]
}) => {
    return (
        <>
            <Sidebar />
            <div className="h-full w-full flex flex-col">
                <Navbar />
                {children}
            </div>
        </>
    )
}

const NewPage = () => {
    return <div>new page!</div>
}

function App() {
    // const [session, setSession] = useState(null)

    // useEffect(() => {
    //     supabase.auth.getSession().then(({ data: { session } }) => {
    //         // console.log(session)
    //         // setSession(session)
    //     })

    //     supabase.auth.onAuthStateChange((_event, session) => {
    //         // console.log(_event, session)
    //         // setSession(session)
    //     })

    // }, [])
    return (
        <Router>
            <div className="h-screen w-screen flex max-h-screen max-w-screen">
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
                </Routes>
            </div>
        </Router>
    )
}

export default App
