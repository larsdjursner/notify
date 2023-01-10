import { ReactNodeViewRenderer, mergeAttributes, Node } from "@tiptap/react"
import { Component } from "./Component"

export default Node.create({
    name: "draggableParagraph",
    priority: 1000,
    group: "block",
    topNode: true,
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
