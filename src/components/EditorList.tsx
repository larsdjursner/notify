import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { usePageStore } from "../pages/Page"
import Editor, { Doc } from "./Editor"
import { SortableEditor } from "./SortableEditor"

export const EditorList = () => {
    const { docs, getDocs, reArrangeDocs, getDocById } = usePageStore()
    const [activeId, setActiveId] = useState<null | string | number>(null)

    function handleDragOver(event: DragEndEvent) {
        // console.log("handle drag end")
        const { active, over } = event
        if (over && active.id !== over.id) {
            const from = docs.findIndex((doc) => doc.id == active.id)
            const to = docs.findIndex((doc) => doc.id == over.id)

            const keys = arrayMove(docs, from, to)
            return reArrangeDocs(keys)
        }
    }

    useEffect(() => {
        console.log("docs rearranged")
    }, [docs])

    return (
        <DndContext
            onDragStart={(e) => setActiveId(e.active.id)}
            onDragOver={handleDragOver}
            onDragEnd={() => setActiveId(null)}
            collisionDetection={closestCorners}
        >
            <SortableContext items={docs}>
                {docs.map((doc: Doc) => (
                    <SortableEditor key={doc.id} id={doc.id} doc={doc} />
                ))}
            </SortableContext>
            {/* <DragOverlay></DragOverlay> */}
        </DndContext>
    )
}

{
    /* {activeId && */
}
// <div className="w-full  bg-slate-100 opacity-50  rounded-lg">
{
    /* {getDocById(activeId.toString())?.value} */
}
// </div>
{
    /* } */
}
