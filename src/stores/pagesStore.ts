import create from "zustand"
import { addDeleteToast } from "../components/toast/ToastStore"
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
    resetCurrentPage: () => void
    removeById: (id: string, removeFromPages?: boolean) => void
    updateTitle: (title: string) => void
    updateContent: (content: Json) => void

    // Specific for the time component
    currentPageEdited: boolean

    // archived/deleted pages
    // archivedPages: PageTitle[]
    // setArchivedPages: (pages: PageTitle[]) => void
}

export const usePagesStore = create<PagesState>()((set, get) => ({
    pages: [],
    initPages(pages) {
        set({ pages })
    },
    reset() {
        set({ pages: [] })
    },
    resetCurrentPage() {
        set({ currentPage: null })
    },
    currentPage: null,
    setCurrentPage(currentPage) {
        set({ currentPage, currentPageEdited: false })
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
                currentPageEdited: true,
            }
        })
    },
    removeById(id: string, removeFromPages = true) {
        addDeleteToast(id)

        if (get().currentPage?.id === id) {
            set({ currentPage: null })
        }

        if (!removeFromPages) {
            return
        }

        set((state) => ({
            pages: state.pages.filter((p) => p.id !== id),
        }))
    },
    updateContent(content) {
        set((state) => {
            if (!state.currentPage) {
                return state
            }

            return {
                currentPage: { ...state.currentPage, content },
                currentPageEdited: true,
            }
        })
    },
    currentPageEdited: false,
}))
