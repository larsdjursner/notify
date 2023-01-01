import { ReactNode } from "react"

interface Props {
    className?: string
    children: ReactNode
}

export const Button = ({ children, className }: Props) => {
    return (
        <button
            className={`h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center ${className}`}
        >
            {children}
        </button>
    )
}
