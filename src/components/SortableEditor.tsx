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
    const { attributes, listeners, setNodeRef, isDragging, isOver } =
        useSortable({
            id: props.id,
        })

    const { setDoc, addDoc } = usePageStore()
    const [over, setOver] = useState(false)
    const handleDocChange = useCallback((id: string, newDoc: string) => {
        setDoc(id, newDoc)
    }, [])

    const handleNewdoc = () => {
        addDoc(props.doc.id)
    }

    useEffect(() => {
        setOver(isOver && !isDragging)
    }, [isOver])

    return (
        <div
            className={`relative group flex flex-col m-2 rounded-lg  ${
                isDragging
                    ? "opacity-50 shadow-xl bg-blue-200"
                    : "opacity-100 shadow-sm"
            }`}
        >
            <div className="absolute -left-20 flex items-center">
                <Button
                    className="invisible group-hover:visible"
                    onClick={handleNewdoc}
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>

                <div {...attributes} {...listeners}>
                    {/* draghandle */}
                    <Button className="invisible group-hover:visible">
                        <ChevronUpDownIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {/* <div className="absolute right-4 z-20"></div> */}
            <div
                ref={setNodeRef}
                className={`w-full h-2 bg-slate-200 ${
                    over ? "bg-red-400" : "bg-slate-200"
                }`}
            ></div>
            <Editor doc={props.doc} onChange={handleDocChange} />
        </div>
    )
}
