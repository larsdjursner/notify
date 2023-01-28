import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFetchArchivedPages from "../../hooks/useFetchArchivedPages"
import { usePagesStore } from "../../stores/pagesStore"
import { ArchivedPage, fetchDeletedPages, PageTitle } from "../../supabase"
import Flyout, { Direction } from "../generic/Flyout"
import TooltipButton from "../generic/TooltipButton"
import ArchivedPages from "./ArchivedPages"

const TrashFlyout = () => {
    // const {
    //     restorePageById,
    //     deletePermanently,
    //     archivedPages,
    //     setArchivedPages,
    // } = usePagesStore()
    const [open, setOpen] = useState(false)

    // const handleNavigate = (page: ArchivedPage) => {
    //     navigate(`/page/${page.id}`)
    //     setOpen(false)
    // }

    // const handleRestore = (_id: string | undefined) => {
    //     if (!_id) return

    //     restorePageById(_id)
    //     setOpen(false)
    // }

    // const handleDeletePermanently = (_id: string | undefined) => {
    //     if (!_id) return

    //     deletePermanently(_id)
    //     setOpen(false)
    // }
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
                open ? <ArchivedPages onClose={() => setOpen(false)} /> : <></>
            }
            direction={Direction.StickToX}
            open={open}
            setOpen={setOpen}
        />
    )
}

export default TrashFlyout
