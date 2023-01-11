import { ReactNode } from "react"

interface Props {
    className?: string
    onClick?: () => void
    children?: ReactNode
}

export const Button = ({ children, className, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center ${className}`}
        >
            {children}
        </button>
    )
}
