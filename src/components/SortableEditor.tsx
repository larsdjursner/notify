import { useCallback, useEffect } from "react"
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
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id })

    const { setDoc, addDoc } = usePageStore()

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleDocChange = useCallback((id: string, newDoc: string) => {
        setDoc(id, newDoc)
    }, [])

    const handleNewdoc = () => {
        console.log("called")
        addDoc()
    }

    useEffect(() => {
        console.log(transform)
    }, [transform])

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
            <div className="relative p-2 group flex">
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
                <Editor doc={props.doc} onChange={handleDocChange} />
            </div>
        </div>
    )
}
