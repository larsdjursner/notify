import { useEffect, useRef } from "react"
import { MenuItem } from "./MenuItem"
import { useOverlayStore } from "./OverlayStore"
export const Overlays = () => {
    const {
        elements,
        overlayActive,
        position,
        setOverlayActive,
        selected,
        setSelected,
        executeCommandByIndex,
    } = useOverlayStore()

    const current = useRef<HTMLDivElement>(null)

    useEffect(() => {}, [selected])
    // TODO handle when cursor is in lower half of page
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
                        <MenuItem key={i} item={item} index={i} />
                        // <button
                        //     key={e.title}
                        //     className={`w-full h-full flex flex-col  ${
                        //         i === selected ? "bg-slate-200" : "bg-white"
                        //     }`}
                        //     onClick={() => executeCommandByIndex(i)}
                        //     onMouseOver={() => setSelected(i)}
                        // >
                        //     <p>{e.title}</p>
                        //     <p className="text-sm text-slate-600">
                        //         {e.subtitle}
                        //     </p>
                        // </button>
                    )
                })}
            </div>
        </>
    ) : null
}
