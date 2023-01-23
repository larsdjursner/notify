interface Props {
    icon: JSX.Element
    onClick: React.MouseEventHandler<HTMLDivElement>
}
const IconButton = ({ icon, onClick }: Props) => {
    return (
        <div
            className="h-6 w-6 hover:bg-slate-200 flex justify-center items-center rounded-md"
            onClick={onClick}
        >
            {icon}
        </div>
    )
}

export default IconButton
