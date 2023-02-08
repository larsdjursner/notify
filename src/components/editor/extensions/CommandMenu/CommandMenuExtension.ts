import { Extension, Node } from '@tiptap/react'
import Suggestion, { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion'

// type CommandOptions = {
//     suggestion: Omit<SuggestionOptions, "editor">
// }

export const CommandMenuExtension = Extension.create({
    name: 'commandMenu',

    addOptions() {
        return {
            suggestion: {
                char: '/',
                command: ({ editor, range, props }: any) => {
                    props.command({ editor, range })
                },
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
})
