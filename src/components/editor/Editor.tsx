import Placeholder from "@tiptap/extension-placeholder"
import { useEditor, EditorContent, Content } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { CommandMenuExtension } from "./extensions/CommandMenuExtension"
import { CommandMenu } from "./extensions/CommandMenu"
import suggestion from "./extensions/suggestion"
import { updateContentById } from "../../supabase"
import { Json } from "../../schema"

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
            // editor.commands.focus("start")
            editor.commands.focus("end")
            editor.setEditable(editable)
        },
        onUpdate: ({ editor }) => {
            onUpdate(editor.getJSON())
        },
        onDestroy: () => {
            editor?.destroy()
        },
    })

    return (
        <div className="w-full p-2">
            <CommandMenu />
            <EditorContent className="my-4" editor={editor} />
        </div>
    )
}

export default Editor
