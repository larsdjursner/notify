import { CommandProps, Extension } from "@tiptap/react"
import Suggestion, {
    SuggestionOptions,
    SuggestionProps,
} from "@tiptap/suggestion"

export const CommandMenuExtension = Extension.create({
    name: "commandMenu",

    addOptions() {
        return {
            suggestion: {
                char: "/",
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