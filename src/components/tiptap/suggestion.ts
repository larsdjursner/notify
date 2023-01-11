import { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion"
import { useOverlayStore } from "./OverlayStore"
const { setOverlayActive, setPosition, setElements, setProps } =
    useOverlayStore.getState()

export default {
    items: ({ query }: SuggestionProps) => {
        return [
            {
                title: "heading 1",
                subtitle: "h1",
                command: ({ editor, range }: SuggestionProps) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 1 })
                        .run()
                },
            },
            {
                title: "heading 2",
                subtitle: "h2",
                command: ({ editor, range }: SuggestionProps) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 2 })
                        .run()
                },
            },
            {
                title: "heading 3",
                subtitle: "h3",
                command: ({ editor, range }: SuggestionProps) => {
                    editor
                        .chain()
                        .focus()
                        .deleteRange(range)
                        .setNode("heading", { level: 3 })
                        .run()
                },
            },
        ]
            .filter((item) =>
                item.title.toLowerCase().startsWith(query.toLowerCase())
            )
            .slice(0, 10)
    },

    render: () => {
        return {
            onStart: ({
                editor,
                range,
                clientRect,
                items,
            }: SuggestionProps) => {
                if (!clientRect || clientRect === undefined) return
                const rect = clientRect()
                if (!rect) return

                const { left, top, height } = rect
                setPosition({ left, top, height })
                setElements(items)
                setProps({ editor, range })
                setOverlayActive(true)
            },
            onExit: () => {
                // maybe just destroy the whole store at that point
                setOverlayActive(false)
            },
            onKeyDown: (props: SuggestionKeyDownProps) => {
                // Needs to stop the querying
                if (props.event.key === "Escape") {
                    setOverlayActive(false)
                    return true
                }
            },
            onUpdate: (props: SuggestionProps) => {
                setElements(props.items)
            },
        }
    },
}
