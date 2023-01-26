import Suggestion, {
    SuggestionKeyDownProps,
    SuggestionProps,
} from "@tiptap/suggestion"

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
        title: "subpage",
        subtitle: "subpage",
        command: ({ editor, range }) => {
            // const content = "<p>hey</p>"
            const url = "77c822d6-7515-4bf2-a53b-7a0e0eb65254"
            // editor
            //     .chain()
            //     .focus()
            //     .deleteRange(range)
            //     .insertContent(content)
            //     .setTextSelection(range)
            //     .run()
            // editor.commands.setLink({ href: "www.google.dk" }).valueOf
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .extendMarkRange("link")
                .setLink({ href: url, target: "_self" })
                .insertContent("Untitled")
                .run()
        },
    },
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
    },
    startOfLine: true,
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
                if (top === 0) return

                setPosition({ left, top, height })
                setElements(items)
                setProps({ editor, range })
                setOverlayActive(true)
            },
            onExit: () => {
                setOverlayActive(false)
                setSelected(0)
                useCommandStore.destroy()
            },
            onKeyDown: ({ event, range, view }: SuggestionKeyDownProps) => {
                // Needs to stop the querying
                if (event.key === "Escape") {
                    event.preventDefault()
                    setSelected(0)
                    setOverlayActive(false)
                    useCommandStore.destroy()

                    return false
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
