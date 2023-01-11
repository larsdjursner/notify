import Placeholder from "@tiptap/extension-placeholder"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useRef, useState } from "react"
import { usePageStore } from "../pages/Page"
import DraggableItem from "./draggable/DraggableItem"
import { Overlay } from "./tiptap/Overlay"
import { Overlays } from "./tiptap/Overlays"
import { useOverlayStore } from "./tiptap/OverlayStore"
import suggestion from "./tiptap/suggestion"

interface Props {
    content: string
}

const Editor = (props: Props) => {
    const { updateContent } = usePageStore()
    const { position, elements, overlayActive } = useOverlayStore()
    const [selected, setSelected] = useState()

    const editor = useEditor({
        extensions: [
            // CustomParagraph,
            StarterKit,
            DraggableItem,
            Overlay.configure({
                suggestion,
            }),
            // Image,
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === "heading") {
                        return "What's the title?"
                    }

                    if (node.type.name === "paragraph") {
                        return 'Type "/" to see available commands'
                    }

                    return ""
                },
                showOnlyCurrent: true,
                // emptyEditorClass:
                //     "first:before:text-gray-200 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0",
                // emptyNodeClass:
                //     "first:before:text-gray-200 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0",
            }),
        ],
        content: props.content,
        editorProps: {
            attributes: {
                class: "prose focus:outline-none min-w-full",
            },
        },
        onUpdate: ({ editor }) => {
            updateContent(editor.getHTML())
        },
        onDestroy: () => {
            editor?.destroy()
        },
    })

    return (
        <div className="w-full p-2">
            <Overlays />
            <EditorContent className="my-4" editor={editor} />
        </div>
    )
}

export default Editor
