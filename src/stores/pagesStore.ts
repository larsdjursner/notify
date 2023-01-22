import create from "zustand"
import { addDeleteToast } from "../components/toast/ToastStore"
import { Json } from "../schema"
import { deleteById, Page, PageTitle, restorePage } from "../supabase"

interface PagesState {
    pages: PageTitle[]
    initPages: (pages: PageTitle[]) => void
    addPage: (page: Page) => void
    reset: () => void

    // seperate state for page?
    currentPage: Page | null
    setCurrentPage: (currentPage: Page) => void
    resetCurrentPage: () => void
    removeById: (id: string) => void
    updateTitle: (title: string) => void
    updateContent: (content: Json) => void

    // Specific for the time component
    currentPageEdited: boolean

    restorePageById: (id: string) => void

    // archived/deleted pages
    isArchived: boolean
    setIsArchived: (bool: boolean) => void
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
    removeById(id) {
        if (get().currentPage?.id === id) {
            set({ currentPage: null })
        }

        set((state) => ({
            pages: state.pages.filter((p) => p.id !== id),
        }))

        deleteById(id).then(({ data, error }) => {
            if (error) {
                console.log(error)
                return
            }

            if (!data) {
                return
            }

            addDeleteToast(id, () => {
                restorePage(id).then((res) => {
                    if (!res || res.error) return
                    const page = res.data[0]
                    set((state) => ({
                        pages: [
                            ...state.pages,
                            { id: page.id, title: page.title },
                        ],
                    }))
                })
            })
        })
    },
    restorePageById: async (id) => {
        const res = await restorePage(id).then((res) => {
            if (!res || !res.data) return
            return res.data[0]
        })

        if (!res) return

        const page: PageTitle = { id: res.id, title: res.title }
        set((state) => ({ pages: [...state.pages, page] }))

        if (id === get().currentPage?.id) {
            set({ isArchived: false })
        }
    },

    currentPageEdited: false,

    isArchived: false,
    setIsArchived: (bool) => {
        set({ isArchived: bool })
    },
}))
