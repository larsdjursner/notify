import { useEffect } from "react"
import { usePagesStore } from "../../stores/pagesStore"

export const Navbar = () => {
    const { currentPage } = usePagesStore()

    useEffect(() => {}, [])

    return (
        <div className="w-full h-12 bg-slate-200 border-b border-slate-300 flex justify-between">
            <p>{currentPage?.title}</p>
            <p>{`Edited at ${currentPage?.updated_at}`}</p>
        </div>
    )
}
