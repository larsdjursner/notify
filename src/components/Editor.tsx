import Image from "@tiptap/extension-image"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import { useEditor, EditorContent, Node } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useRef, useState } from "react"
import { usePageStore } from "../pages/Page"
import DraggableParagraph from "./DraggableParagraph"

interface Props {
    content: string
}

const Editor = (props: Props) => {
    const { updateContent } = usePageStore()
    const [showOverlay, setShowOverlay] = useState(false)
    const anchorNode = useRef<Element | null>(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            DraggableParagraph,
            Image,
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
            handleKeyDown: (view, event) => {
                if (
                    event.key === "/" &&
                    event.currentTarget instanceof Element
                ) {
                    // console.log("///")
                    setShowOverlay(true)
                    // console.log(view.props)
                    anchorNode.current = event.currentTarget
                    console.log("it works", anchorNode.current)
                }
            },
        },
        onUpdate: ({ editor }) => {
            updateContent(editor.getHTML())
        },
    })

    const Overlay = ({
        show,
        anchornode,
    }: {
        show: boolean
        anchornode: Element | null
    }) => {
        return (
            <div className="relative">
                {/* <button onClick={() => setIsOverlay(!isOverlay)}>
                    show menu
                </button> */}
                {show && (
                    <div className="absolute bg-white z-20 border border-rounded">
                        <ol>
                            <li>hey</li>
                            <li>hey</li>
                            <li>hey</li>
                            <li>hey</li>
                        </ol>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full p-2">
            <EditorContent editor={editor} />
        </div>
    )
}

export default Editor
