import { useCallback, useEffect, useState } from "react"
import Editor, { Doc } from "../components/Editor"
import { PlusIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"

import create from "zustand"
import { Button } from "../components/Button"

interface PageState {
    title: string
    docs: Map<string, Doc>
    setTitle: (title: string) => void
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
    title: "",
    docs: new Map<string, Doc>(),
    setTitle: (title) => {
        set(() => {
            return { title: title }
        })
    },
    fetchPage: async () => {
        // for now its mocked
        await timeout(1000).then(() => {
            getMocks().map((mock) => get().setDoc(mock.id, mock.value))
            get().addDoc()
        })
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
    const [loading, setLoading] = useState(true)
    const pageStore = usePageStore()

    const handleDocChange = useCallback((id: string, newDoc: string) => {
        pageStore.setDoc(id, newDoc)
    }, [])

    useEffect(() => {
        ;(async () => {
            await pageStore.fetchPage()
        })().then(() => setLoading(false))

        return () => {
            pageStore.docs = new Map<string, Doc>()
        }
    }, [])

    const lines = () => {
        return pageStore.getDocKeys().map((key) => (
            <div className="relative p-2 group flex" key={key}>
                <div className="absolute -left-20 flex items-center">
                    <Button className="invisible group-hover:visible">
                        <ChevronUpDownIcon className="h-4 w-4" />
                    </Button>
                    <Button className="invisible group-hover:visible">
                        <PlusIcon
                            onClick={pageStore.addDoc}
                            className="h-4 w-4"
                        />
                    </Button>
                </div>
                <Editor
                    doc={pageStore.docs.get(key)!}
                    onChange={handleDocChange}
                />
            </div>
        ))
    }

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
            {loading ? <p>....loading</p> : lines()}
        </div>
    )
}
