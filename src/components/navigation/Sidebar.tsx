import { useState } from "react"

export const Sidebar = () => {
    const [shown, setShown] = useState(false)

    return (
        <div className="flex">
            {shown && (
                <div className=" w-60 h-full bg-slate-200 border-r border-r-slate-300"></div>
            )}
            <div
                className="w-2 h-full bg-slate-300"
                onClick={() => setShown(!shown)}
            ></div>
        </div>
    )
}
