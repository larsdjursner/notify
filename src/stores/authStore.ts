import { type User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { supabase } from '../supabase'

type AuthState = {
    isAuth: boolean
    user: User | null
    getAuth: () => boolean
    setAuth: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    isAuth: false,
    user: null,
    getAuth: () => {
        return get().isAuth
    },
    setAuth: (user) => {
        set(() => ({ isAuth: true, user }))
    },
    logout: () => {
        void supabase.auth.signOut()
        set(() => ({ isAuth: false }))

        // destroy store
        useAuthStore.destroy()
    },
}))
