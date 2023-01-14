import { useReducer, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormInput from "../../components/generic/FormInput"
import Throbber from "../../components/generic/Throbber"
import { useAuthStore } from "../../stores/authStore"
import { supabase } from "../../supabase"

interface State {
    email: string
    password: string
    cPassword: string
}

export default function SignUp() {
    const auth = useAuthStore()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (password !== repeatPassword) return

        setSubmitting(true)

        await supabase.auth
            .signUp({ email, password, options: { data: { confirm } } })
            .then(({ data, error }) => {
                if (error) {
                    setSubmitting(false)
                    alert("error")
                    return
                }
                const user = data.user

                if (user == null) {
                    setSubmitting(false)
                    alert("error")
                    return
                }

                auth.setAuth(user)
                setSubmitting(false)
                navigate("/page/new")
            })
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col gap-6 w-[40rem] p-4 shadow-lg rounded-lg">
                <p className="text-2xl font-semibold">Sign Up</p>
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

                <FormInput
                    value={repeatPassword}
                    required
                    password
                    text={"Repeat password"}
                    handleChange={(s) => setRepeatPassword(s)}
                />

                <button
                    className="grid grid-cols-3 w-full mx-0 shadow-lg py-4 rounded-md"
                    onClick={handleSubmit}
                >
                    <span />
                    <p>Sign up</p>
                    {submitting && <Throbber />}
                </button>

                <Link
                    to={"/signin"}
                    className="hover:underline text-blue-500 hover:text-blue-400 self-center"
                >
                    Already have an account? Sign in instead
                </Link>
            </div>
        </div>
    )
}
