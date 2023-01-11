import { useOverlayStore } from "./OverlayStore"
export const Overlays = () => {
    const { elements, overlayActive, position, editor, range } =
        useOverlayStore()

    return overlayActive ? (
        <div
            className="absolute min-h-[2rem] max-h-[4rem] overflow-y-scroll overflow-x-hidden w-60 bg-white flex flex-col gap-2 shadow-xl border rounded-md px-4 py-2"
            style={{
                left: position?.left,
                top: position?.top,
                marginTop: position?.height,
            }}
        >
            {elements.map((e) => {
                return (
                    <button
                        key={e.title}
                        className="w-full h-full flex flex-col bg-white"
                        onClick={() => e.command({ editor, range })}
                    >
                        <p>{e.title}</p>
                        <p>{e.subtitle}</p>
                    </button>
                )
            })}
        </div>
    ) : null
}
