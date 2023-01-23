import {
    ArrowRightIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/24/outline"
import { MouseEvent, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { deleteById, PageTitle } from "../../supabase"
import Flyout, { Direction } from "../generic/Flyout"
import IconButton from "./IconButton"

interface Props {
    page: PageTitle
}

const PageItem = ({ page }: Props) => {
    const navigate = useNavigate()
    const { removeById, currentPage } = usePagesStore()
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        removeById(page.id)
        navigate("/page/new")
    }

    const isCurrent = currentPage?.id === page.id
    return (
        <div className="flex flex-col">
            <button
                onClick={() => navigate(`/page/${page.id}`)}
                className={`w-full py-2 flex justify-start gap-2 items-center pl-2 pr-4 group hover:bg-slate-50 
                ${isCurrent || open ? "bg-slate-50" : "bg-white"}
                `}
            >
                <IconButton
                    icon={
                        <ChevronRightIcon
                            className={`h-4 w-4 ${
                                open ? "rotate-90" : "rotate-0"
                            } transition-all duration-100 delay-100`}
                        />
                    }
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen((prev) => !prev)
                    }}
                />

                <p className="truncate text-sm">
                    {page.title === "" ? "Untitled" : page.title}
                </p>

                <span className="flex-1" />

                <IconButton
                    icon={
                        <TrashIcon className="h-4 w-4 invisible group-hover:visible " />
                    }
                    onClick={handleDelete}
                />
            </button>
            {open && (
                <div className="w-full pl-10 text-sm text-slate-500">
                    There are no pages inside
                </div>
            )}
        </div>
    )
}

export default PageItem
