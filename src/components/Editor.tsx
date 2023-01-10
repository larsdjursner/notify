import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import {
    useEditor,
    EditorContent,
    ReactNodeViewRenderer,
    mergeAttributes,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useRef, useState } from "react"
import { usePageStore } from "../pages/Page"
import Commands from "./Commands"

interface Props {
    content: string
}

import Paragraph from "@tiptap/extension-paragraph"
import { Component } from "./draggable/Component"
import DraggableItem from "./draggable/DraggableItem"

// const CustomParagraph = Paragraph.extend({
//     draggable: true,
//     name: "draggable-paragraph",

//     parseHTML() {
//         return [{ tag: "p[data-type='draggable-paragraph']" }]
//     },

//     renderHTML({ HTMLAttributes }) {
//         return [
//             "p",
//             mergeAttributes(HTMLAttributes, {
//                 "data-type": "draggable-paragraph",
//             }),
//             0,
//         ]
//     },
//     addNodeView() {
//         return ReactNodeViewRenderer(Component)
//     },
// })

const Editor = (props: Props) => {
    const { updateContent } = usePageStore()

    const editor = useEditor({
        extensions: [
            // CustomParagraph,
            StarterKit,
            DraggableItem,
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
    })

    return (
        <div className="w-full p-2">
            <EditorContent editor={editor} />
        </div>
    )
}

export default Editor
