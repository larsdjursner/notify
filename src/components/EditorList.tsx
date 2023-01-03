import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { usePageStore } from "../pages/Page"
import { Doc } from "./Editor"
import { SortableEditor } from "./SortableEditor"

export const EditorList = () => {
    const { getDocs, reArrangeDocs } = usePageStore()

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const items = getDocs()
            const from = items.findIndex((doc) => doc.id == active.id)
            const to = items.findIndex((doc) => doc.id == over.id)

            const keys = arrayMove(items, from, to)
            return reArrangeDocs(keys)
        }
    }

    return (
        <DndContext onDragOver={handleDragOver}>
            <SortableContext
                items={getDocs()}
                strategy={verticalListSortingStrategy}
            >
                {getDocs().map((doc: Doc) => (
                    <SortableEditor key={doc.id} id={doc.id} doc={doc} />
                ))}
            </SortableContext>
        </DndContext>
    )
}
