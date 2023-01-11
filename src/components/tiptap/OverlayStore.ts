import { Range } from "@tiptap/react"
import { Editor } from "@tiptap/core"
import { SuggestionProps } from "@tiptap/suggestion"
import create from "zustand"
import { Overlay } from "./Overlay"

interface Position {
    left: number | undefined
    top: number | undefined
    height: number | undefined
}

interface OverlayState {
    elements: Array<any>
    editor: Editor | null
    range: Range | null
    overlayActive: boolean
    position: Position | undefined
    setPosition: (position: Position) => void
    setOverlayActive: (bool: boolean) => void
    setElements: (elements: Array<any>) => void
    setProps: (props: Pick<SuggestionProps, "editor" | "range">) => void
}

export const useOverlayStore = create<OverlayState>()((set) => ({
    elements: [],
    overlayActive: false,
    position: undefined,
    editor: null,
    range: null,
    setPosition: (position) => set({ position }),
    setOverlayActive: (bool) => set({ overlayActive: bool }),
    setElements: (elements) => set({ elements }),
    setProps: ({ editor, range }) => set({ editor, range }),
}))
