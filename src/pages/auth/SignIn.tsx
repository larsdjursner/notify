import { useReducer, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormInput from "../../components/generic/FormInput"
import Throbber from "../../components/generic/Throbber"
import { useAuthStore } from "../../stores/authStore"

interface State {
    email: string
    password: string
    cPassword: string
}

export default function SignIn() {
    const auth = useAuthStore()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async () => {
        // setSubmitting(true)
        // const state = { email, password }
        // console.log(state)
        // setSubmitting(true)
        auth.setToken("")
        navigate("/page/new")
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col gap-6 w-[40rem] p-4 shadow-lg rounded-lg">
                <p className="text-2xl font-semibold">Sign In</p>
                <span className="w-full border-t" />

                <FormInput
                    value={email}
                    required
                    text={"Email"}
                    handleChange={(s) => setEmail(s)}
                />

                <FormInput
                    value={password}
                    required
                    password
                    text={"Password"}
                    handleChange={(s) => setPassword(s)}
                />

                <button
                    className="grid grid-cols-3 w-full mx-0 shadow-lg py-4 rounded-md"
                    onClick={handleSubmit}
                >
                    <span />
                    <p>Sign in</p>
                    {submitting && <Throbber />}
                </button>

                <Link
                    to={"/signin"}
                    className="hover:underline text-blue-500 hover:text-blue-400 self-center"
                >
                    Don't have an account? Sign up instead
                </Link>
            </div>
        </div>
    )
}
