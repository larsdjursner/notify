import { useEffect, useState } from "react"
import { DeleteToast } from "./ToastStore"

export const PageDeleteToast = ({ delay, text, undo, id }: DeleteToast) => {
    const [visible, setVisible] = useState(true)
    const handleUndo = () => {
        setVisible(false)
        undo()
    }

    useEffect(() => {
        console.log(id)

        setTimeout(() => {
            console.log("removed", id)
            setVisible(false)
        }, delay)
    }, [])

    if (!visible) {
        return null
    }

    return (
        <div className="h-12 w-full px-4 my-1 rounded-lg bg-slate-600 text-white flex py-2 items-center gap-10 justify-between">
            <p>{text}</p>
            <button className=" hover:underline" onClick={handleUndo}>
                Undo
            </button>
        </div>
    )
}
