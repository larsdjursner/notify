import { useState } from "react"

export type Top = {
    className: "top-5 left-1/2"
}

export type Bottom = {
    className: "bottom-5 left-1/2"
}

export type BottomRight = {
    className: "bottom-5 right-5"
}

interface Props {
    position?: Bottom | BottomRight | Top
    toastList: any[]
}

const Toast = ({ toastList, position }: Props) => {
    const [list, setList] = useState([])

    return (
        <div className={`absolute z-50 bottom-5 left-1/2`}>
            <div className="bg-slate-800">
                <p> HEY</p>
            </div>
        </div>
    )
}
export default Toast
