import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { addPage as addPageAPI, fetchPages } from "../../supabase"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useAuthStore } from "../../stores/authStore"
import TrashFlyout from "../TrashFlyout"
import TooltipButton from "../generic/TooltipButton"

export const Sidebar = () => {
    const [shown, setShown] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const { logout } = useAuthStore()
    const { pages, initPages, reset, addPage } = usePagesStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const handleAdd = () => {
        if (!user) return

        addPageAPI(user.id).then(({ data, error }) => {
            if (error) {
                console.log(error)
                return
            }
            const newPage = data[0]
            addPage(newPage)
            navigate(`/page/${newPage.id}`)
        })
    }

    const fetchPagesWithTitle = async () => {
        setIsLoading(true)
        fetchPages().then((res) => {
            if (!res) return

            initPages(res)
            setIsLoading(false)
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
                <div className="w-60 h-full bg-slate-100 border-r border-r-slate-300 px-4 flex flex-col">
                    <button className="h-12" onClick={logout}>
                        logout
                    </button>

                    <span className="w-full h-1 bg-white rounded-full opacity-50" />
                    {!isLoading ? (
                        pages.map((page, i: number) => (
                            <button
                                onClick={() => navigate(`/page/${page.id}`)}
                                key={i}
                                className={`w-full h-8 flex justify-start`}
                            >
                                <p className="truncate">
                                    {page.title === ""
                                        ? "Untitled"
                                        : page.title}
                                </p>
                            </button>
                        ))
                    ) : (
                        <p>Loading</p>
                    )}
                    <span className="w-full h-1 bg-white rounded-full opacity-50" />

                    <TooltipButton
                        button={
                            <button
                                onClick={handleAdd}
                                className="w-full h-8 flex justify-start items-center hover:bg-slate-200 rounded-sm"
                            >
                                <PlusIcon className="h-4 w-4 mr-4" />
                                <p>Add page</p>
                            </button>
                        }
                        tooltip={"Add a new untitled document page"}
                    />

                    <TrashFlyout />
                </div>
            )}
            <button
                className="w-2 h-full bg-slate-300 flex flex-col"
                onClick={() => setShown(!shown)}
            />
        </div>
    )
}
