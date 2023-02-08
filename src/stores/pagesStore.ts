import create from 'zustand'
import { addDeleteToast } from '../components/toast/ToastStore'
import { Page } from '../supabase'

interface State {
    currentPage: Page | null
}
interface Actions {
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
