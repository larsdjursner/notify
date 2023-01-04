import { useCallback, useEffect, useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ChevronUpDownIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "./Button"
import { usePageStore } from "../pages/Page"
import Editor, { Doc } from "./Editor"

type Props = {
    id: string | number
    doc: Doc
    children?: JSX.Element | JSX.Element[]
}

export function SortableEditor(props: Props) {
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: props.id,
    })

    const { setDoc, addDoc } = usePageStore()

    const handleDocChange = useCallback((id: string, newDoc: string) => {
        setDoc(id, newDoc)
    }, [])

    const handleNewdoc = () => {
        addDoc()
    }

    return (
        <div
            ref={setNodeRef}
            className={`relative group flex m-2  ${
                isDragging ? "opacity-50 shadow-lg" : "opacity-100 shadow-none"
            }`}
        >
            <div className="absolute -left-10 flex items-center">
                <Button
                    className="invisible group-hover:visible"
                    onClick={handleNewdoc}
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="absolute right-4 z-20">
                <div {...attributes} {...listeners}>
                    {/* draghandle */}
                    <Button>
                        <ChevronUpDownIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Editor doc={props.doc} onChange={handleDocChange} />
        </div>
    )
}
