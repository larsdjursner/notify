import create from "zustand"
import { Overlay } from "./Overlay"

interface Coords {
    x: number
    y: number
}

interface OverlayState {
    elements: Array<any>
    overlayActive: boolean
    coords: Coords | null
    setCoords: (coords: Coords) => void
    setOverlayActive: (bool: boolean) => void
    setElements: (elements: Array<any>) => void
}

export const useOverlayStore = create<OverlayState>()((set) => ({
    elements: [],
    overlayActive: false,
    coords: null,
    setCoords: (coords) => set({ coords }),
    setOverlayActive: (bool) => set({ overlayActive: bool }),
    setElements: (elements) => set({ elements }),
}))
