import { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion"
import { useCommandStore } from "./CommandMenuStore"
const {
    setOverlayActive,
    setPosition,
    setElements,
    setProps,
    up,
    down,
    executeCommandBySelected,
    setSelected,
} = useCommandStore.getState()

export interface Item {
    title: string
    subtitle: string | undefined | null
    command: (props: Pick<SuggestionProps, "editor" | "range">) => void
}

const items: Item[] = [
    {
        title: "Heading 1",
        subtitle: "h1",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .run()
        },
    },
    {
        title: "Heading 2",
        subtitle: "h2",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .run()
        },
    },
    {
        title: "Heading 3",
        subtitle: "h3",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 3 })
                .run()
        },
    },
    {
        title: "Bullet list",
        subtitle: "unordered",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
    },
    {
        title: "Enumerated list",
        subtitle: "ordered",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
    },
    {
        title: "Divider",
        subtitle: "divide blocks",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run()
        },
    },
    {
        title: "Block qoute",
        subtitle: "quote some stuff",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run()
        },
    },
    {
        title: "Bold",
        subtitle: "bold",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBold().run()
        },
    },
]

export default {
    items: ({ query }: SuggestionProps) => {
        return items.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )
        // .slice(0, 10)
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
                setSelected(0)
            },
            onKeyDown: ({ event, range, view }: SuggestionKeyDownProps) => {
                // Needs to stop the querying
                if (event.key === "Escape") {
                    event.preventDefault()
                    setOverlayActive(false)
                    return true
                }

                if (event.key === "ArrowDown") {
                    event.preventDefault()
                    down()
                    return true
                }

                if (event.key === "ArrowUp") {
                    event.preventDefault()
                    up()
                    return true
                }

                if (event.key === "Enter") {
                    event.preventDefault()
                    executeCommandBySelected()
                    return true
                }

                return false
            },
            onUpdate: (props: SuggestionProps) => {
                setElements(props.items)
            },
        }
    },
}
