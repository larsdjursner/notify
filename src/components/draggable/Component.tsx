import { Bars4Icon, PlusIcon } from '@heroicons/react/24/outline'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

export const Component = () => {
    return (
        <NodeViewWrapper className="draggable-item relative group flex bg-slate-200  rounded-lg">
            <div className="absolute -left-10 top-0 bottom-0 group-hover:visible flex gap-4">
                {/* <div className="h-4 w-4 cursor-pointer self-center">
                    <PlusIcon className="h-4 w-4" />
                </div> */}
                <div
                    className="h-4 w-4 cursor-pointer self-center"
                    draggable="true"
                    data-drag-handle
                    contentEditable={false}
                    suppressContentEditableWarning={true}
                >
                    <Bars4Icon className="h-4 w-4" />
                </div>
            </div>
            <NodeViewContent />
        </NodeViewWrapper>
    )
}
