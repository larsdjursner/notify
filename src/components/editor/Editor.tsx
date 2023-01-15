import Placeholder from "@tiptap/extension-placeholder"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { usePageStore } from "../../pages/Page"
import { CommandMenuExtension } from "./extensions/CommandMenuExtension"
import { CommandMenu } from "./extensions/CommandMenu"
import suggestion from "./extensions/suggestion"

interface Props {
    content: string
}

const Editor = (props: Props) => {
    const { updateContent } = usePageStore()

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
        content: props.content,
        editorProps: {
            attributes: {
                class: "prose focus:outline-none min-w-full",
            },
        },
        onCreate: ({ editor }) => {
            editor.commands.focus("start")
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
            <CommandMenu />
            <EditorContent className="my-4" editor={editor} />
        </div>
    )
}

export default Editor
