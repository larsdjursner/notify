import { useEffect, useState } from "react"
import Editor from "../components/Editor"

import create from "zustand"

// export interface Doc {
//     id: string
//     value: string
// }
// interface PageState {
//     title: string
//     docs: Doc[]
//     getDocs: () => Doc[]
//     setTitle: (title: string) => void
//     addDoc: (id: string) => void
//     setDoc: (id: string, newDoc: string) => void
//     reset: () => void
//     reArrangeDocs: (docs: Doc[]) => void
//     setPage: (docs: Doc[]) => void
//     getDocById: (id: string) => Doc | undefined
// }

// export const usePageStore = create<PageState>()((set, get) => ({
//     title: "",
//     docs: [],
//     setTitle: (title) => set({ title: title }),
//     reArrangeDocs: (docs) => set({ docs: docs }),
//     setPage: (docs) => set({ docs: docs }),
//     reset: () => set({ docs: [] }),
//     getDocs: () => get().docs,
//     getDocById: (id) => get().docs.find((d) => d.id == id),
//     addDoc: (id) => {
//         set((state) => {
//             const generatedDoc = getInitialDoc()
//             const index = state.docs.findIndex((doc) => doc.id === id)

//             if (state.docs.length <= index + 1)
//                 return { docs: [...state.docs, generatedDoc] }

//             const head = state.docs.slice(0, index + 1)
//             const tail = state.docs.slice(index + 1, state.docs.length)
//             return { docs: [...head, generatedDoc, ...tail] }
//         })
//     },
//     setDoc(id, newValue) {
//         set((state) => {
//             // possibly cache the most recent doc within store as the event is fired alot
//             const updatedDocs = state.docs.map((doc) =>
//                 doc.id === id ? { ...doc, value: newValue } : doc
//             )
//             return {
//                 docs: updatedDocs,
//             }
//         })
//     },
// }))

interface Page {
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

    // useEffect(() => {
    //     console.log(pageStore.page.content)
    // }, [pageStore.page])

    return (
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
    )
}
