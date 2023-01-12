import create from "zustand"
import { Page } from "../pages/Page"

interface PagesState {
    pages: Page[]
    currentPageId: number
    setcurrentPageId: (id: number) => void
    setPages: (pages: Page[]) => void
}

export const usePagesStore = create<PagesState>()((set) => ({
    pages: [],
    currentPageId: 0,
    setcurrentPageId: (id: number) => {
        set({ currentPageId: id })
    },
    getCurrentPage: () => {},
    setPages: (pages) => set({ pages }),
}))
