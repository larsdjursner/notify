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
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id })

    const { setDoc, addDoc } = usePageStore()

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    const handleDocChange = useCallback((id: string, newDoc: string) => {
        setDoc(id, newDoc)
    }, [])

    const handleNewdoc = () => {
        addDoc()
    }

    return (
        <div ref={setNodeRef} style={style}>
            <div className="relative p-2 group flex ">
                <div className="absolute -left-10 flex items-center">
                    <Button
                        className="invisible group-hover:visible"
                        onClick={handleNewdoc}
                    >
                        <PlusIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="absolute right-4 z-10">
                    <div {...attributes} {...listeners}>
                        {/* draghandle */}
                        <Button>
                            <ChevronUpDownIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Editor doc={props.doc} onChange={handleDocChange} />
            </div>
        </div>
    )
}
