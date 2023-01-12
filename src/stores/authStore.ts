import create from "zustand"

interface AuthState {
    isAuth: boolean
    getAuth: () => boolean
    setToken: (token: string) => void
    getToken: () => string
    logout: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    isAuth: false,
    getAuth: () => {
        return get().isAuth
    },
    setToken: (token) => {
        set(() => ({ isAuth: true }))
    },
    logout: () => {
        set(() => ({ isAuth: false }))
    },
    getToken: () => "token",
}))
