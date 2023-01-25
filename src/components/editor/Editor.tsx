import Placeholder from "@tiptap/extension-placeholder"
import { useEditor, EditorContent, Content } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { CommandMenuExtension } from "./extensions/CommandMenu/CommandMenuExtension"
import { CommandMenu } from "./extensions/CommandMenu/CommandMenu"
import suggestion from "./extensions/CommandMenu/suggestion"
import { Json } from "../../schema"
import { useEffect } from "react"
import Link from "@tiptap/extension-link"
import SubpageLink from "./extensions/Subpage/Subpage"

interface Props {
    editable: boolean
    content: Json | undefined
    onUpdate: (content: Json) => void
}

const Editor = ({ editable, content, onUpdate }: Props) => {
    const editor = useEditor({
        extensions: [
            // CustomParagraph,
            // DraggableItem,
            // Image,
            StarterKit,
            // Link.configure({
            //     HTMLAttributes: {
            //         class: "bg-red-400",
            //     },
            // }),
            // SubpageLink,
            CommandMenuExtension.configure({
                suggestion,
            }),
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
            }),
        ],
        content: content as Content,
        editorProps: {
            attributes: {
                class: "prose focus:outline-none min-w-full",
            },
        },
        onCreate: ({ editor }) => {
            editor.setEditable(editable)
        },
        onUpdate: ({ editor, transaction }) => {
            if (!transaction.docChanged) return
            onUpdate(editor.getJSON())
        },
        onDestroy: () => {
            editor?.destroy()
        },
    })

    useEffect(() => {
        editor?.setEditable(editable)
        if (editable) {
            editor?.commands.focus("end")
        }
    }, [editable])

    return (
        <div className="w-full p-2">
            <CommandMenu />
            <EditorContent className="my-4" editor={editor} />
        </div>
    )
}

export default Editor
