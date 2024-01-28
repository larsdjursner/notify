import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import SubpageWrapper from './SubpageWrapper'

export type SubPageOptions = {
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    type Commands<ReturnType> = {
        /**
         * @description Add a reference to another page.
         */
        SubPage: {
            setSubpage: () => ReturnType
        }
    }
}

export const Subpage = Node.create<SubPageOptions>({
    name: 'Subpage',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            user_id: {
                default: '',
            },
            parent_id: {
                default: '',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div.SubPage',
            },
        ]
    },

    renderHTML({ HTMLAttributes }: any) {
        return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'SubPage',
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(SubpageWrapper)
    },

    addCommands() {
        return {
            setSubpage:
                () =>
                ({ commands }: any) => {
                    return commands.insertContent({
                        type: this.name,
                    })
                },
        }
    },
})
