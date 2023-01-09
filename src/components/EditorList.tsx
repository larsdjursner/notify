// import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core"
// import { arrayMove, SortableContext } from "@dnd-kit/sortable"
// import { useState } from "react"
// import { usePageStore } from "../pages/Page"
// import { Doc } from "./Editor"
// import { SortableEditor } from "./SortableEditor"

// export const EditorList = () => {
//     const { docs, reArrangeDocs } = usePageStore()
//     const [activeId, setActiveId] = useState<null | string | number>(null)

//     function handleDragEnd(event: DragEndEvent) {
//         const { active, over } = event
//         if (over && active.id !== over.id) {
//             const from = docs.findIndex((doc) => doc.id == active.id)
//             const to = docs.findIndex((doc) => doc.id == over.id)

//             const keys = arrayMove(docs, from, to)
//             setActiveId(null)
//             return reArrangeDocs(keys)
//         }
//     }

//     return (
//         <DndContext
//             onDragStart={(e) => setActiveId(e.active.id)}
//             onDragEnd={handleDragEnd}
//             collisionDetection={closestCorners}
//         >
//             <SortableContext items={docs}>
//                 {docs.map((doc: Doc) => (
//                     <SortableEditor key={doc.id} id={doc.id} doc={doc} />
//                 ))}
//             </SortableContext>
//             {/* <DragOverlay>
//                 {activeId && <div className="w-full h-2 bg-teal-300"> hey</div>}
//             </DragOverlay> */}
//         </DndContext>
//     )
// }
