import create from "zustand"
import { addDeleteToast } from "../components/toast/ToastStore"
import { Json } from "../schema"
import {
    deleteById,
    deletePermanentlyById,
    Page,
    PageTitle,
    restorePage,
} from "../supabase"

interface State {
    pages: PageTitle[]
    currentPage: Page | null
    currentPageEdited: boolean
    isArchived: boolean
    archivedPages: PageTitle[]
}
interface Actions {
    initPages: (pages: PageTitle[]) => void
    addPage: (page: Page) => void
    reset: () => void
    setCurrentPage: (currentPage: Page) => void
    resetCurrentPage: () => void
    removeById: (id: string) => void
    updateTitle: (title: string) => void
    updateContent: (content: Json) => void
    restorePageById: (id: string) => void
    setIsArchived: (bool: boolean) => void
    deletePermanently: (id: string) => void
    setArchivedPages: (pages: PageTitle[]) => void
}

const initialState: State = {
    pages: [],
    currentPage: null,
    currentPageEdited: false,
    isArchived: false,
    archivedPages: [],
}

export const usePagesStore = create<State & Actions>()((set, get) => ({
    ...initialState,
    initPages(pages) {
        set({ pages })
    },
    reset() {
        set(initialState)
    },
    resetCurrentPage() {
        set({ currentPage: null })
    },
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
            console.log("updated shit")

            return {
                currentPage: {
                    ...state.currentPage,
                    content,
                    // updated_at: new Date(Date.now()).toISOString(),
                },
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
    setIsArchived: (bool) => {
        set({ isArchived: bool })
    },
    deletePermanently: async (id) => {
        const res = await deletePermanentlyById(id)
        if (!res) return

        if (id === get().currentPage?.id) {
            set({ currentPage: null })
        }
    },
    setArchivedPages: (pages) => {
        set({ archivedPages: pages })
    },
}))
