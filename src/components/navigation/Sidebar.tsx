import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { fetchPages } from "../../supabase"

export const Sidebar = () => {
    const [shown, setShown] = useState(true)
    const navigate = useNavigate()
    // const { pages, setPages } = usePagesStore()
    const [pages, setPages] = useState<any>([])

    useEffect(() => {
        fetchPages().then((res) => setPages(res))
    }, [])

    return (
        <div className="flex">
            {shown && (
                <div className=" w-60 h-full bg-slate-200 border-r border-r-slate-300">
                    <p>pages</p>
                    {pages.map((page: any, i: number) => (
                        <button
                            onClick={() => navigate(`/page/${page.id}`)}
                            key={i}
                        >
                            {page.title}
                        </button>
                    ))}
                </div>
            )}
            <div
                className="w-2 h-full bg-slate-300 flex flex-col"
                onClick={() => setShown(!shown)}
            />
        </div>
    )
}
