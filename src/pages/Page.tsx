import { useEffect, useState } from "react"
import Editor from "../components/editor/Editor"
import create from "zustand"
import { supabase } from "../supabase"
import { usePagesStore } from "../stores/pagesStore"
import { useParams } from "react-router-dom"

export interface Page {
    title: string
    content: string
}
interface PageState {
    page: Page
    updateTitle: (title: string) => void
    updateContent: (content: string) => void
}
export const usePageStore = create<PageState>()((set, get) => ({
    page: {
        title: "",
        content: "",
    },
    updateTitle: (title) => {
        set((state) => ({ page: { ...state.page, title } }))
    },
    updateContent: (content) => {
        set((state) => ({ page: { ...state.page, content } }))
    },
}))

export const Page = () => {
    const [loading, setLoading] = useState(true)
    const pageStore = usePageStore()
    const { id } = useParams()

    useEffect(() => {
        ;(async () => {
            pageStore.updateTitle("My favourite document")
            pageStore.updateContent(
                // `<div data-type="draggable-item"><p>This is rather confusing \n \n hey hey.</p></div><p>This is a boring item.</p><div data-type="draggable-item"><p>Followed by a fancy draggable item.</p></div><div data-type="draggable-item"><p>Followed by a fancy draggable item.</p></div>`
                ``
            )
        })().then(() => setLoading(false))
        return () => {}
    }, [])

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll pt-10 flex justify-center">
            <div className="h-full w-[50rem]">
                <div className="min-h-full w-full flex flex-col shadow-sm p-2">
                    <input
                        placeholder="Untitled"
                        className="h-20 w-full text-4xl mx-2 focus:outline-none"
                        maxLength={32}
                        value={pageStore.page.title}
                        onChange={(e) => pageStore.updateTitle(e.target.value)}
                    />

                    <span className="h-1 w-full bg-slate-50" />
                    {loading ? (
                        <p>....loading</p>
                    ) : (
                        <Editor content={pageStore.page.content} />
                    )}
                </div>
            </div>
        </div>
    )
}
