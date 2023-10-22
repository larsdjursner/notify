import { Range } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { SuggestionProps } from '@tiptap/suggestion'
import create from 'zustand'
import { Item } from './suggestion'
import { useAddPage } from '../../../../hooks/api/useAddPage'

interface Position {
    left: number | undefined
    top: number | undefined
    height: number | undefined
}

interface CommandMenuState {
    elements: Item[]
    editor: Editor | null
    range: Range | null
    overlayActive: boolean
    position: Position | undefined
    selected: number
    up: () => void
    down: () => void
    setPosition: (position: Position) => void
    setOverlayActive: (bool: boolean) => void
    setElements: (elements: Array<any>) => void
    setProps: (props: Pick<SuggestionProps, 'editor' | 'range'>) => void
    setSelected: (selected: number) => void
    setSelectedByTitle: (title: string) => void
    executeCommandByTitle: (title: string) => void
    executeCommandByIndex: (index: number) => void
    executeCommandBySelected: () => void
    getElements: () => Item[]
}

export const useCommandStore = create<CommandMenuState>()((set, get) => ({
    elements: [],
    selected: 0,
    overlayActive: false,
    position: undefined,
    editor: null,
    range: null,
    setPosition: (position) => set({ position }),
    setOverlayActive: (bool) => set({ overlayActive: bool }),
    setElements: (elements) => set({ elements }),
    setProps: ({ editor, range }) => set({ editor, range }),
    getElements: () => {
        return get().elements
    },
    up: () =>
        set((state) => {
            return {
                selected: (state.selected + state.elements.length - 1) % state.elements.length,
            }
        }),
    down: () =>
        set((state) => {
            return {
                selected: (state.selected + 1) % state.elements.length,
            }
        }),
    setSelected: (selected) => set({ selected }),
    executeCommandByIndex: (index) => {
        const { elements, editor, range } = get()
        if (!(index < elements.length) || !editor || !range) return

        const item = get().elements[index]
        item.command({ editor, range })
    },
    executeCommandBySelected: () => {
        const element = get().getElements().at(get().selected)
        if (element === undefined) return

        if (element.title === 'Subpage') {
            console.log('hey')
        }
        get().executeCommandByIndex(get().selected)
    },
    setSelectedByTitle: (title) =>
        set((state) => {
            const idx = state.elements.findIndex((el) => el.title === title)
            if (idx == -1) return state
            return {
                selected: idx,
            }
        }),
    executeCommandByTitle: (title) => {
        if (get().elements[get().selected].title === title) get().executeCommandBySelected()
    },
}))
