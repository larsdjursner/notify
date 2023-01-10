import { ReactNodeViewRenderer, mergeAttributes, Node } from "@tiptap/react"
import { Component } from "./Component"

export default Node.create({
    name: "draggableParagraph",
    group: "block",
    content: "block+",
    draggable: true,

    parseHTML() {
        return [{ tag: "div[data-type='draggable-paragraph']" }]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, {
                "data-type": "draggable-paragraph",
            }),
            0,
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component)
    },
})
