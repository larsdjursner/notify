import { useCallback, useEffect, useState } from "react"
import Editor, { Doc } from "../components/Editor"

import create from "zustand"

interface PageState {
    docs: Map<string, Doc>
    addDoc: () => void
    setDoc: (id: string, newDoc: string) => void
    fetchPage: () => void
    getDocKeys: () => Array<string>
}

const getInitialDoc = () => {
    const id = Math.random().toString()
    return {
        id: id,
        value: "",
    } as Doc
}

export const usePageStore = create<PageState>()((set, get) => ({
    docs: new Map<string, Doc>(),
    fetchPage: async () => {
        // for now just add a default doc
        await get().addDoc()
    },
    getDocKeys() {
        return Array.from(this.docs.keys())
    },
    addDoc: () => {
        set((state) => {
            const generatedDoc = getInitialDoc()
            const updatedDocs = new Map(state.docs)
            updatedDocs.set(generatedDoc.id, generatedDoc)
            return { docs: updatedDocs }
        })
    },
    setDoc(id, newDoc) {
        set((state) => {
            const updatedDoc: Doc = { id: id, value: newDoc }
            const updatedDocs = new Map(state.docs)
            updatedDocs.set(updatedDoc.id, updatedDoc)
            return { docs: updatedDocs }
        })
    },
}))

export const Page = () => {
    const pageStore = usePageStore()

    const handleDocChange = useCallback((id: string, newDoc: string) => {
        pageStore.setDoc(id, newDoc)
    }, [])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            await pageStore.fetchPage()
        })().then(() => setLoading(false))

        return () => {
            pageStore.docs = new Map<string, Doc>()
        }
    }, [])

    const lines = () => {
        return pageStore.getDocKeys().map((key) => {
            return (
                <div className="flex gap-4 p-2 items-start" key={key}>
                    <button>::</button>
                    <button onClick={pageStore.addDoc}>+</button>
                    <Editor
                        doc={pageStore.docs.get(key)!}
                        onChange={handleDocChange}
                    />
                </div>
            )
        })
    }

    return (
        <div className="h-full w-full overflow-y-scroll">
            {loading ? <p>loading</p> : lines()}
        </div>
    )
}
