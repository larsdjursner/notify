import { useEffect, useRef } from 'react'
import { CommandItem } from './CommandItem'
import { useCommandStore } from './CommandMenuStore'

export const CommandMenu = () => {
    const { elements, overlayActive, position, setOverlayActive, selected } = useCommandStore()

    // TODO handle when cursor is in lower half of page

    const itemsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, elements.length)
    }, [elements])

    useEffect(() => {
        if (selected < itemsRef.current.length)
            itemsRef.current[selected].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
    }, [selected])

    return overlayActive ? (
        <>
            <div
                className="absolute w-full h-screen top-0 left-0"
                onClick={() => setOverlayActive(false)}
            />
            <div
                className="absolute min-h-[2rem] z-50 max-h-[14rem] overflow-y-scroll overflow-x-hidden w-80 bg-white flex flex-col gap-2 shadow-xl border rounded-md px-4 py-2"
                style={{
                    top: position?.top,
                }}
            >
                {elements.length > 0 ? (
                    elements.map((item, i) => {
                        return (
                            <div
                                key={i}
                                ref={(el) => el && (itemsRef.current[i] = el)}
                            >
                                <CommandItem item={item} />
                            </div>
                        )
                    })
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </>
    ) : null
}
