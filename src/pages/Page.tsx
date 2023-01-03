import { useCallback, useEffect, useState } from "react"
import Editor, { Doc } from "../components/Editor"
import { PlusIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"

import create from "zustand"
import { Button } from "../components/Button"
import { dragging, EditorList } from "../components/EditorList"

interface PageState {
    loading: boolean
    title: string
    docs: Doc[]
    // docs: Map<string, Doc>
    // docKeys: string[]
    getDocs: () => Doc[]
    setTitle: (title: string) => void
    addDoc: () => void
    setDoc: (id: string, newDoc: string) => void
    fetchPage: () => void
    reset: () => void
    // getDocKeys: () => Array<string>
    reArrangeDocs: (docs: Doc[]) => void
    // getNextDoc: (id: string) => string | null
}

const getInitialDoc = () => {
    const id = Math.random().toString()
    return {
        id: id,
        value: "",
    } as Doc
}

const getMocks = () => {
    const mocks = [
        {
            id: "0",
            value: "# Lorem Ipsum \n ## Dolorean Dynamite \n ### Hey everybody \n \n  yoyooyooosdof \n ## Lorem \n *Iuspomsodmsodms* asd asdasldhkasldhasdlasdh asdasdlkhasldashldahsdlashdaskjdgaskdh asdhjkajksd ",
        } as Doc,
    ]

    return mocks
}

const timeout = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const usePageStore = create<PageState>()((set, get) => ({
    loading: true,
    title: "",
    docs: [],
    // docs: new Map<string, Doc>(),
    // docKeys: [],
    setTitle: (title) => set({ title: title }),
    reArrangeDocs: (docs) => set({ docs: docs }),
    getDocs: () => get().docs,
    // fetchPage: async () => {
    //     // for now its mocked
    //     await timeout(1000).then(() => {
    //         // getMocks().map((mock) => get().setDoc(mock.id, mock.value))
    //         // get().addDoc()
    //     }).then(() => )
    // },
    fetchPage: async () => {
        // await timeout(1000).then(() => {
        //     console.log("called")
        set((state) => {
            const initialDoc = getMocks()
            return { docs: [...state.docs, ...initialDoc, getInitialDoc()] }
        })
        // })
    },
    addDoc: () => {
        set((state) => {
            const generatedDoc = getInitialDoc()
            // needs to take an index into account
            return { docs: [...state.docs, generatedDoc] }
            // const updatedDocs = new Map(state.docs)
            // updatedDocs.set(generatedDoc.id, generatedDoc)
            // update keys
            // const updatedKeys = Array.from(updatedDocs.keys())
            // return { docs: updatedDocs, docKeys: updatedKeys }
        })
    },
    setDoc(id, newValue) {
        set((state) => {
            const updatedDocs = state.docs.map((doc) =>
                doc.id === id ? { ...doc, value: newValue } : doc
            )
            return {
                docs: updatedDocs,
            }
            // const updatedDoc: Doc = { id: id, value: newDoc }
            // const updatedDocs = new Map(state.docs)
            // updatedDocs.set(updatedDoc.id, updatedDoc)
            // return { docs: updatedDocs }
        })
    },
    reset: () => {
        console.log("called reset")
        set(() => {
            return { docs: [] }
        })
    },
}))

export const Page = () => {
    const [loading, setLoading] = useState(true)
    const pageStore = usePageStore()

    const handleDocChange = useCallback((id: string, newDoc: string) => {
        pageStore.setDoc(id, newDoc)
    }, [])

    useEffect(() => {
        ;(async () => {
            await pageStore.fetchPage()
        })().then(() => setLoading(false))

        // pageStore.fetchPage()
        // setLoading(false)

        return () => {
            pageStore.reset()
            // pageStore.docs = new Map<string, Doc>()
            // pageStore.docKeys = []
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
            {/* {loading ? <p>....loading</p> : lines()} */}

            {/* {dragging()} */}
            {EditorList()}
            {/* {loading ? <p>....loading</p> : EditorList()} */}
        </div>
    )
}
