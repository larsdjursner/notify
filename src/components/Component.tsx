import { Bars4Icon, PlusIcon } from "@heroicons/react/24/outline"
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { useEffect } from "react"

export const Component = (props: any) => {
    useEffect(() => {
        // console.log(props)

        return () => {}
    }, [])

    return (
        <NodeViewWrapper className="draggable-paragraph relative group">
            <div className="absolute -left-20 group-hover:visible flex gap-4">
                <div className="h-4 w-4" draggable="true" data-drag-handle>
                    <Bars4Icon className="h-4 w-4" />
                </div>
                <div className="h-4 w-4">
                    <PlusIcon className="h-4 w-4" />
                </div>
            </div>
            <NodeViewContent />
        </NodeViewWrapper>
    )
}
