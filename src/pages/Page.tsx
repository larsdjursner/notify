import { useEffect, useState } from "react"
import { Doc } from "../components/Editor"

import create from "zustand"
import { EditorList } from "../components/EditorList"

interface PageState {
    title: string
    docs: Doc[]
    getDocs: () => Doc[]
    setTitle: (title: string) => void
    addDoc: () => void
    setDoc: (id: string, newDoc: string) => void
    reset: () => void
    reArrangeDocs: (docs: Doc[]) => void
    setPage: (docs: Doc[]) => void
}

const getInitialDoc = () => {
    const id = Math.random().toString()
    return {
        id: id,
        value: "",
    } as Doc
}

const getMocks = async (): Promise<Doc[]> => {
    const mocks = [
        {
            id: "0",
            value: "# Lorem Ipsum \n ## Dolorean Dynamite \n ### Hey everybody \n \n  yoyooyooosdof \n ## Lorem \n *Iuspomsodmsodms* asd asdasldhkasldhasdlasdh asdasdlkhasldashldahsdlashdaskjdgaskdh asdhjkajksd ",
        } as Doc,
        {
            id: "1",
            value: "",
        } as Doc,
        {
            id: "2",
            value: "### Hey ",
        } as Doc,
        {
            id: "3",
            value: "",
        } as Doc,
    ]

    await timeout(1000)
    return mocks
}

const timeout = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const usePageStore = create<PageState>()((set, get) => ({
    title: "",
    docs: [],
    setTitle: (title) => set({ title: title }),
    reArrangeDocs: (docs) => set({ docs: docs }),
    setPage: (docs) => set({ docs: docs }),
    reset: () => set({ docs: [] }),
    getDocs: () => get().docs,
    addDoc: () => {
        set((state) => {
            const generatedDoc = getInitialDoc()
            // needs to take an index into account
            return { docs: [...state.docs, generatedDoc] }
        })
    },
    setDoc(id, newValue) {
        set((state) => {
            // possibly cache the most recent doc within store as the event is fired alot
            const updatedDocs = state.docs.map((doc) =>
                doc.id === id ? { ...doc, value: newValue } : doc
            )
            return {
                docs: updatedDocs,
            }
        })
    },
}))

export const Page = () => {
    const [loading, setLoading] = useState(true)
    const pageStore = usePageStore()

    useEffect(() => {
        ;(async () => {
            await getMocks().then((res) => pageStore.setPage(res))
        })().then(() => setLoading(false))

        return () => {
            pageStore.reset()
        }
    }, [])

    return (
        <div className="h-full w-full flex flex-col">
            <input
                placeholder="Untitled"
                className="h-20 w-full text-4xl focus:outline-none"
                maxLength={32}
                value={pageStore.title}
                onChange={(e) => pageStore.setTitle(e.target.value)}
            />

            <span className="h-1 w-full bg-slate-50" />
            {loading ? <p>....loading</p> : <EditorList />}
        </div>
    )
}
