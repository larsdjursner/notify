import create from "zustand"
import { Json } from "../schema"
import { Page, PageTitle } from "../supabase"

interface PagesState {
    pages: PageTitle[]
    initPages: (pages: PageTitle[]) => void
    addPage: (page: Page) => void
    reset: () => void

    // seperate state for page?
    currentPage: Page | null
    setCurrentPage: (currentPage: Page) => void
    updateTitle: (title: string) => void
    updateContent: (content: Json) => void
}

export const usePagesStore = create<PagesState>()((set) => ({
    pages: [],
    initPages(pages) {
        set({ pages })
    },
    reset() {
        set({ pages: [] })
    },
    currentPage: null,
    setCurrentPage(currentPage) {
        set({ currentPage })
    },
    addPage(page) {
        const _page: PageTitle = { id: page.id, title: page.title }
        set((state) => ({ pages: [...state.pages, _page] }))
    },
    updateTitle(title) {
        set((state) => {
            if (!state.currentPage) {
                return state
            }

            const updated = { ...state.currentPage, title }

            return {
                currentPage: updated,
                pages: [
                    ...state.pages.map((page) =>
                        page.id === updated.id ? updated : page
                    ),
                ],
            }
        })
    },
    updateContent(content) {
        set((state) => {
            if (!state.currentPage) {
                return state
            }

            return {
                currentPage: { ...state.currentPage, content },
            }
        })
    },
}))
