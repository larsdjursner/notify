import { ReactNodeViewRenderer, mergeAttributes, Node } from "@tiptap/react"
import { Component } from "./Component"

export default Node.create({
    name: "draggableItem",
    priority: 1000,
    group: "block",
    content: "block+",
    draggable: true,

    parseHTML() {
        return [{ tag: "div[data-type='draggable-item']" }]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, {
                "data-type": "draggable-item",
            }),
            0,
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component)
    },
})
