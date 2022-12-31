import create from "zustand"

interface PagesState {
    pages: Array<Object>
    currentPageId: number
    setcurrentPageId: (id: number) => void
}

export const usePagesStore = create<PagesState>()((set) => ({
    pages: [],
    currentPageId: 0,
    setcurrentPageId: (id: number) => {
        set({ currentPageId: id })
    },
}))
