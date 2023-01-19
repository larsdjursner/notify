import { useEffect, useRef, useState } from "react"

export const Direction = {
    Right: "left-60 top-0",
    TopRight: "left-60 bottom-0",
    Left: "right-60 top-0",
    BottomRight: "top-12 left-5",
} as const

export type Direction = typeof Direction[keyof typeof Direction]

interface Props {
    button: JSX.Element
    content: JSX.Element | JSX.Element[] | string
    direction: Direction
}

const Flyout = (props: Props) => {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLDivElement>(null)
    // const container = useRef<HTMLDivElement>(null)
    const [direction, setDirection] = useState(props.direction)

    useEffect(() => {
        const domrect = anchor.current?.getBoundingClientRect()
        if (!domrect) return
        // const breakpointX = window.innerWidth / 2
        const breakpointY = window.innerHeight / 2

        if (breakpointY < domrect?.y) {
            setDirection(Direction.TopRight)
        }
    }, [open])

    return (
        <>
            <div
                ref={anchor}
                className={`relative ${open && "bg-slate-200"}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                {props.button}
                <div
                    // ref={container}
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute ${direction} z-40 shadow-xl bg-white rounded-md border border-slate-200 scale-0 
                        transition-all duration-100 origin-bottom-left
                        ${open && "scale-100"}
                        `}
                >
                    {props.content}
                </div>
            </div>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 z-30"
                />
            )}
        </>
    )
}

export default Flyout
