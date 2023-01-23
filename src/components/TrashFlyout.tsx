import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../stores/pagesStore"
import { fetchDeletedPages, PageTitle } from "../supabase"
import Flyout, { Direction } from "./generic/Flyout"
import TooltipButton from "./generic/TooltipButton"

const TrashFlyout = () => {
    const {
        restorePageById,
        deletePermanently,
        archivedPages,
        setArchivedPages,
    } = usePagesStore()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetchDeletedPages().then((res) => {
            if (!res) return
            setArchivedPages(res)
        })

        return () => {
            setArchivedPages([])
        }
    }, [open])

    const handleNavigate = (page: PageTitle) => {
        navigate(`/page/${page.id}`)
        setOpen(false)
    }

    const handleRestore = (_id: string | undefined) => {
        if (!_id) return

        restorePageById(_id)
        setOpen(false)
    }

    const handleDeletePermanently = (_id: string | undefined) => {
        if (!_id) return

        deletePermanently(_id)
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
                    <input
                        placeholder="search"
                        className="w-full h-12 p-2 mb-4"
                    />
                    <div className="h-full w-full overflow-y-scroll flex flex-col">
                        {archivedPages.map((page, i) => (
                            <button
                                key={i}
                                className="flex items-center gap-4 hover:bg-slate-200 py-1 px-2"
                            >
                                <p
                                    className="truncate flex-1 text-start"
                                    onClick={() => handleNavigate(page)}
                                >
                                    {page.title === ""
                                        ? "Untitled"
                                        : page.title}
                                </p>
                                <ArrowUturnLeftIcon
                                    onClick={() => handleRestore(page.id)}
                                    className="h-4 w-4"
                                />
                                <TrashIcon
                                    onClick={() =>
                                        handleDeletePermanently(page.id)
                                    }
                                    className="h-4 w-4"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            }
            direction={Direction.StickToX}
            open={open}
            setOpen={setOpen}
        />
    )
}

export default TrashFlyout
