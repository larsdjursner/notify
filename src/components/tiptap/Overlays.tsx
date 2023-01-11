import React, { useCallback, useEffect, useRef } from "react"
import { MenuItem } from "./MenuItem"
import { useOverlayStore } from "./OverlayStore"
export const Overlays = () => {
    const { elements, overlayActive, position, setOverlayActive, selected } =
        useOverlayStore()

    // TODO handle when cursor is in lower half of page

    const itemsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, elements.length)
    }, [elements])

    useEffect(() => {
        if (selected < itemsRef.current.length)
            itemsRef.current[selected].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
    }, [selected])

    return overlayActive ? (
        <>
            <div
                className="absolute w-full h-screen top-0 left-0"
                onClick={() => setOverlayActive(false)}
            />
            <div
                className="absolute min-h-[2rem] max-h-[14rem] overflow-y-scroll overflow-x-hidden w-60 bg-white flex flex-col gap-2 shadow-xl border rounded-md px-4 py-2"
                style={{
                    left: position?.left,
                    top: position?.top,
                    marginTop: position?.height,
                }}
            >
                {elements.map((item, i) => {
                    return (
                        <div
                            key={i}
                            ref={(el) => el && (itemsRef.current[i] = el)}
                        >
                            <MenuItem item={item} initialIndex={i} />
                        </div>
                    )
                })}
            </div>
        </>
    ) : null
}
