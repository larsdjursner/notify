import React from "react"
import { useOverlayStore } from "./OverlayStore"
export const Overlays = () => {
    const { elements, overlayActive, coords } = useOverlayStore()

    return overlayActive ? (
        <div
            className="absolute min-h-[10rem] min-w-[10rem] mt-20 bg-red-200"
            style={{ left: coords?.x, top: coords?.y }}
        >
            {elements.map((e) => {
                return <div key={e.title}>{e.title}</div>
            })}
        </div>
    ) : null
}
