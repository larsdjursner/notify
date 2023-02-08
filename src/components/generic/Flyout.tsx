import { useEffect, useRef, useState } from 'react'

export const Direction = {
    StickToY: '1',
    StickToX: '2',
} as const

export type Direction = (typeof Direction)[keyof typeof Direction]

interface Props {
    button: JSX.Element
    content: JSX.Element | JSX.Element[] | string
    direction: Direction
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const computeStyle = (dir: Direction, domRect: DOMRect) => {
    const breakpointX = window.innerWidth / 2
    const breakpointY = window.innerHeight / 2
    if (dir === Direction.StickToX) {
        if (domRect.x < breakpointX) {
            if (domRect.y < breakpointY) {
                return 'left-60 top-0 origin-top-left'
            } else {
                return 'left-60 bottom-0 origin-bottom-left'
            }
        } else {
            if (domRect.y < breakpointY) {
                return 'right-60 top-0 origin-top-right'
            } else {
                return 'right-60 bottom-0 origin-bottom-right'
            }
        }
    } else {
        if (domRect.x < breakpointX) {
            if (domRect.y < breakpointY) {
                return 'left-5 top-12 origin-top-left'
            } else {
                return 'left-5 bottom-12 origin-bottom-left'
            }
        } else {
            if (domRect.y < breakpointY) {
                return 'right-5 top-12 origin-top-right'
            } else {
                return 'right-5 bottom-12 origin-bottom-right'
            }
        }
    }
}

const Flyout = (props: Props) => {
    const anchor = useRef<HTMLDivElement>(null)
    const [direction, setDirection] = useState('')

    useEffect(() => {
        const domrect = anchor.current?.getBoundingClientRect()
        if (!domrect) return

        const style = computeStyle(props.direction, domrect)
        setDirection(style)
    }, [props.open])

    return (
        <>
            <div
                ref={anchor}
                className={`relative ${props.open && 'bg-slate-200'}`}
                onClick={() => props.setOpen((prev) => !prev)}
            >
                {props.button}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute ${direction} z-50 shadow-xl bg-white rounded-md border border-slate-200 scale-0 
                        transition-all duration-100 
                        ${props.open && 'scale-100'}
                        `}
                >
                    {props.content}
                </div>
            </div>
            {props.open && (
                <div
                    onClick={() => props.setOpen(false)}
                    className="absolute inset-0 z-30"
                />
            )}
        </>
    )
}

export default Flyout
