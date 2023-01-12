import { User } from "@supabase/supabase-js"
import create from "zustand"
import { supabase } from "../supabase"

interface AuthState {
    isAuth: boolean
    user: User | null
    getAuth: () => boolean
    setAuth: (token: string, user: User) => void
    getToken: () => string
    logout: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    isAuth: false,
    user: null,
    getAuth: () => {
        return get().isAuth
    },
    setAuth: (token, user) => {
        // localStorage.setItem("jwt", token)
        set(() => ({ isAuth: true, user }))
    },
    logout: () => {
        supabase.auth.signOut()
        localStorage.removeItem("jwt")
        set(() => ({ isAuth: false }))
    },
    getToken: () => {
        const token = localStorage.getItem("jwt")

        if (token == null) {
            get().logout()
        }

        return token!
    },
}))
