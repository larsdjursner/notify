import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { fetchPages } from "../../supabase"
import { PlusIcon } from "@heroicons/react/24/outline"

export const Sidebar = () => {
    const [shown, setShown] = useState(true)
    const { loaded, pages, initPages, setLoaded, reset } = usePagesStore()
    const navigate = useNavigate()

    const fetchPagesWithTitle = async () => {
        setLoaded(false)

        fetchPages().then((res) => {
            if (!res) return

            initPages(res)
        })
    }

    useEffect(() => {
        fetchPagesWithTitle()

        return () => {
            reset()
        }
    }, [])

    return (
        <div className="flex">
            {shown && (
                <div className=" w-60 h-full bg-slate-100 border-r border-r-slate-300 py-10 px-4 flex flex-col overflow-hidden ">
                    <span className="w-full h-1 bg-white rounded-full opacity-50" />
                    {loaded ? (
                        pages!.map((page, i: number) => (
                            <button
                                onClick={() => navigate(`/page/${page.id}`)}
                                key={i}
                                className="w-full h-8 flex justify-start"
                            >
                                <p className="truncate">{page.title}</p>
                            </button>
                        ))
                    ) : (
                        <p>Loading</p>
                    )}
                    <span className="w-full h-1 bg-white rounded-full opacity-50" />

                    <button className="w-full h-8 flex justify-start items-center">
                        <PlusIcon className="h-4 w-4 mr-4" />
                        <p>Add page</p>
                    </button>
                </div>
            )}
            <button
                className="w-2 h-full bg-slate-300 flex flex-col"
                onClick={() => setShown(!shown)}
            />
        </div>
    )
}
