import { TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchDeletedPages, PageTitle } from "../supabase"
import Flyout, { Direction } from "./generic/Flyout"
import TooltipButton from "./generic/TooltipButton"

const TrashFlyout = () => {
    const [deletedPages, setDeletedPages] = useState<PageTitle[]>([])
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetchDeletedPages().then((res) => {
            if (!res) return
            setDeletedPages(res)
        })
        return () => {}
    }, [open])

    const handleNavigate = (page: PageTitle) => {
        navigate(`/page/${page.id}`)
        setOpen(false)
    }
    return (
        <Flyout
            button={
                <TooltipButton
                    button={
                        <button className="flex justify-start items-center w-full h-8 hover:bg-slate-200 rounded-sm px-4">
                            <TrashIcon className="h-4 w-4 mr-4" />
                            <p>Trash</p>
                        </button>
                    }
                    tooltip={"View recently deleted document pages"}
                />
            }
            content={
                <div className="w-72 h-72 flex flex-col items-start">
                    <input placeholder="search" className="w-full h-12" />
                    {deletedPages.map((page, i) => (
                        <button onClick={() => handleNavigate(page)} key={i}>
                            <p className="truncate">
                                {page.title === "" ? "Untitled" : page.title}
                            </p>
                        </button>
                    ))}
                </div>
            }
            direction={Direction.StickToX}
            open={open}
            setOpen={setOpen}
        />
    )
}

export default TrashFlyout
