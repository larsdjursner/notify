import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent, type Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CommandMenuExtension } from './extensions/CommandMenu/CommandMenuExtension'
import { CommandMenu } from './extensions/CommandMenu/CommandMenu'
import suggestion from './extensions/CommandMenu/suggestion'
import { type Json } from '../../types/database.types'
import React, { useEffect } from 'react'
import Link from '@tiptap/extension-link'
import { Subpage } from './extensions/Subpage/Subpage'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'

type EditorProps = {
    editable: boolean
    content: Json | undefined
    onUpdate: (content: Json) => void
}

const Editor: React.FC<EditorProps> = ({ editable, content, onUpdate }) => {
    const editor = useEditor({
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
            CommandMenuExtension.configure({
                suggestion,
            }),
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
                showOnlyCurrent: false,
            }),
        ],
        content: content as Content,
        editorProps: {
            attributes: {
                class: 'prose focus:outline-none min-w-full my-2',
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
            editor?.commands.focus('end')
        }
    }, [editable])

    return (
        <div className="w-full p-2">
            <CommandMenu />
            <EditorContent
                className="my-4"
                editor={editor}
            />
        </div>
    )
}

export default Editor
