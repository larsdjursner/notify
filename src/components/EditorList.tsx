import { DndContext, DragEndEvent } from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { usePageStore } from "../pages/Page"
import { SortableItem } from "./SortableItem"

export const EditorList = () => {
    const { docs, getDocs, reArrangeDocs } = usePageStore()
    const [items, setItems] = useState(docs)
    // const [items, setItems] = useState()

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            // setItems((items) => {
            // const from = items.indexOf(active)
            // const to = items.indexOf(over.id.toString())
            const from = items.findIndex((doc) => doc.id == active.id)
            const to = items.findIndex((doc) => doc.id == over.id)

            const keys = arrayMove(items, from, to)
            return reArrangeDocs(keys)
        }
    }

    useEffect(() => {
        setItems(docs)
    }, [docs])

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(({ id, value }) => (
                    <SortableItem key={id} id={id}>
                        <div className="w-full py-2">
                            <div className="bg-red-200 ">
                                <p className="text-xl">{id}</p>
                                <p className="text-sm">{value}</p>
                            </div>
                        </div>
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    )
}

// const lines = () => {
//     return pageStore.getDocKeys().map((key) => (
//         <div className="relative p-2 group flex" key={key}>
//             <div className="absolute -left-20 flex items-center">
//                 <Button className="invisible group-hover:visible">
//                     <ChevronUpDownIcon className="h-4 w-4" />
//                 </Button>
//                 <Button className="invisible group-hover:visible">
//                     <PlusIcon onClick={pageStore.addDoc} className="h-4 w-4" />
//                 </Button>
//             </div>
//             <Editor doc={pageStore.docs.get(key)!} onChange={handleDocChange} />
//         </div>
//     ))
// }
export const dragging = () => {
    const [items, setItems] = useState(["1", "2", "3", "4"])

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            setItems((items) => {
                const from = items.indexOf(active.id.toString())
                const to = items.indexOf(over.id.toString())

                return arrayMove(items, from, to)
            })
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {/* {pageStore.getDocKeys().map((id) => ( */}
                {items.map((id) => (
                    <SortableItem key={id} id={id}>
                        <div className="w-full py-2">
                            <div className="bg-red-200 ">
                                <p className="text-xl">{id}</p>
                            </div>
                        </div>
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    )
}
