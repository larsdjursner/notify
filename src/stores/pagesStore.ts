import create from "zustand"
import { Json } from "../schema"
import { Page, PageTitle } from "../supabase"

interface PagesState {
    loaded: boolean
    pages: PageTitle[]
    setLoaded: (loaded: boolean) => void
    initPages: (pages: PageTitle[]) => void
    reset: () => void

    // seperate state for page?
    pageLoaded: boolean
    setPageLoaded: (pageLoaded: boolean) => void
    currentPage: Page | null
    setCurrentPage: (currentPage: Page) => void
    updateTitle: (title: string) => void
    updateContent: (content: Json) => void
}

export const usePagesStore = create<PagesState>()((set) => ({
    loaded: false,
    pages: [],
    setLoaded(loaded) {
        set({ loaded })
    },
    initPages(pages) {
        set({ pages, loaded: true })
    },
    reset() {
        set({ pages: [], loaded: true })
    },
    pageLoaded: false,
    setPageLoaded(pageLoaded) {
        set({ pageLoaded })
    },
    currentPage: null,
    setCurrentPage(currentPage) {
        set({ currentPage, pageLoaded: true })
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
