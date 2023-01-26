import {
    ChevronRightIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline"
import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "../../stores/authStore"
import { usePagesStore } from "../../stores/pagesStore"
import { addPage, fetchSubpagesByParentId, PageTitle } from "../../supabase"
import IconButton from "./IconButton"

interface Props {
    page: PageTitle
}

const PageItem = ({ page }: Props) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { removeById } = usePagesStore()
    const currentPage = usePagesStore(
        useCallback((state) => state.currentPage, [id])
    )
    const { user } = useAuthStore()

    const [children, setChildren] = useState<PageTitle[]>([])
    const [open, setOpen] = useState(false)

    const handleDelete = (id: string) => {
        removeById(id)
        navigate("/page/new")
    }
    const handleOpen = (id: string) => {
        fetchSubpagesByParentId(id).then((res) => {
            if (!res) return
            setChildren(res)
            setOpen((prev) => !prev)
        })
    }

    const handleAddSubpage = (id: string) => {
        if (!user) return
        addPage(user.id, id).then(({ data, error }) => {
            if (!data || error) return

            setChildren((prev) => [...prev, ...data])
        })
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
                        handleOpen(page.id)
                    }}
                />

                <p className="truncate text-sm">
                    {page.title === "" ? "Untitled" : page.title}
                </p>

                <span className="flex-1" />

                <IconButton
                    icon={
                        <TrashIcon className="h-4 w-4 invisible group-hover:visible" />
                    }
                    onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(page.id)
                    }}
                />
                <IconButton
                    icon={
                        <PlusIcon className="h-4 w-4 invisible group-hover:visible" />
                    }
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddSubpage(page.id)
                    }}
                />
            </button>
            {open &&
                (children.length > 0 ? (
                    <div className="pl-4">
                        {children.map((child) => (
                            <PageItem page={child} key={child.id} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full pl-10 text-sm text-slate-500">
                        There are no pages inside
                    </div>
                ))}
        </div>
    )
}

export default PageItem
