import { create } from 'zustand'
// import { addDeleteToast } from '../components/toast/ToastStore'
import { type Page } from '../supabase'

type State = {
    currentPage: Page | null
}
type Actions = {
    setCurrentPage: (currentPage: Page) => void
    resetCurrentPage: () => void
    getCurrentPage: () => Page | null
}

const initialState: State = {
    currentPage: null,
}

export const usePagesStore = create<State & Actions>()((set, get) => ({
    ...initialState,

    resetCurrentPage() {
        set({ currentPage: null })
    },
    setCurrentPage(currentPage) {
        set({ currentPage })
    },
    getCurrentPage() {
        return get().currentPage
    },
}))
