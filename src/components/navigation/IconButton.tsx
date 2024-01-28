import React from 'react'

type IconButtonProps = {
    icon: React.ReactNode
    onClick: React.MouseEventHandler<HTMLDivElement>
}
const IconButton = ({ icon, onClick }: IconButtonProps) => {
    return (
        <div
            className="h-6 w-6 hover:bg-slate-200 flex justify-center items-center rounded-md"
            onClick={onClick}>
            {icon}
        </div>
    )
}

export default IconButton
