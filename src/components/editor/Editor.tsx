import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
// import Link from '@tiptap/extension-link'
// import { Subpage } from './extensions/Subpage/Subpage'
import TaskList from '@tiptap/extension-task-list'
import { type Content, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { useOnMount } from '../../hooks/use-on.mount'
import { type Json } from '../../types/database.types'

// import { CommandMenu } from './extensions/CommandMenu/CommandMenu'
// import { CommandMenuExtension } from './extensions/CommandMenu/CommandMenuExtension'
// import suggestion from './extensions/CommandMenu/suggestion'
// import { Document } from '@tiptap/extension-document'
// import { Heading } from '@tiptap/extension-heading'

type EditorProps = {
    editable: boolean
    content: Json | undefined
    onUpdate: (content: Json) => void
}

const Editor: React.FC<EditorProps> = ({ editable, content, onUpdate }) => {
    const editor = useEditor({
        content: content as Content,
        editorProps: {
            attributes: {
                class: 'prose focus:outline-none min-w-full my-2',
            },
        },
        onCreate: ({ editor }) => {
            console.log(editor.getJSON())
            editor.setEditable(editable)
        },
        onUpdate: ({ editor, transaction }) => {
            if (!transaction.docChanged) return

            onUpdate(editor.getJSON())
        },
        extensions: [
            // CustomParagraph,
            // DraggableItem,
            // Image,
            // Subpage,
            // Link.configure({
            //     HTMLAttributes: {
            //         class: "w-full cursor-pointer bg-red-200",
            //     },
            // }),
            StarterKit.configure({}),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            // CommandMenuExtension.configure({
            //     suggestion,
            // }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'Untitled'
                    }

                    if (node.type.name === 'paragraph') {
                        return 'Type "/" to see available commands'
                    }

                    return ''
                },
                showOnlyCurrent: true,
            }),
        ],
    })

    useEffect(() => {
        editor?.setEditable(editable)

        if (editable) {
            editor?.commands.focus('end')
        }
    }, [editable])

    // Ensure that the content is updated when the editor is created
    useEffect(() => {
        editor?.commands.setContent(content as Content)
    }, [content])

    // Ensure that editor is destroyed when component is unmounted
    useEffect(() => {
        return () => {
            editor?.destroy()
        }
    }, [])

    return (
        <div className="w-full p-2">
            {/* <CommandMenu /> */}
            <EditorContent
                className="my-4"
                editor={editor}
            />
        </div>
    )
}

export default Editor
