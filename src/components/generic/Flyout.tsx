import { useState } from "react"

export const Direction = {
    Right: "left-56",
    Left: "right-56",
    BottomRight: "top-10 left-0",
} as const

export type Direction = typeof Direction[keyof typeof Direction]

interface Props {
    button: JSX.Element
    content: JSX.Element | JSX.Element[] | string
    direction: Direction
}

const Flyout = (props: Props) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                className={`relative`}
                onClick={() => setOpen((prev) => !prev)}
            >
                {props.button}
                {open && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-40 ${props.direction}`}
                    >
                        {props.content}
                    </div>
                )}
            </div>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 z-30 bg-slate-800 opacity-10"
                />
            )}
        </>
    )
}

export default Flyout
