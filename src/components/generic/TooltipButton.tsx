interface Props {
    button: JSX.Element
    tooltip: string
}

const TooltipButton = (props: Props) => {
    return (
        <div className="relative group">
            {props.button}
            <div className="absolute inset-y-1 flex items-center z-50 left-56 rounded-md shadow-lg group-hover:scale-100 scale-0 text-white bg-slate-800 w-auto text-sm min-w-max px-4 transition-all duration-100 origin-left">
                {props.tooltip}
            </div>
        </div>
    )
}

export default TooltipButton
