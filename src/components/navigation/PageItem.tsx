import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { deleteById, PageTitle } from "../../supabase"

interface Props {
    page: PageTitle
}

const PageItem = ({ page }: Props) => {
    const navigate = useNavigate()
    const { removeById } = usePagesStore()

    const handleDelete = () => {
        removeById(page.id)
        navigate("/page/new")
    }

    const handleOptions = () => {}
    return (
        <button
            onClick={() => navigate(`/page/${page.id}`)}
            className={`w-full h-10 py-1 flex justify-between px-4 group hover:bg-slate-200 items-center`}
        >
            <p className="truncate">
                {page.title === "" ? "Untitled" : page.title}
            </p>

            <div onClick={(e) => e.stopPropagation()} className="flex gap-2">
                <EllipsisHorizontalIcon
                    onClick={handleOptions}
                    className="h-5 w-5 invisible group-hover:visible "
                />
                <TrashIcon
                    onClick={handleDelete}
                    className="h-4 w-4 invisible group-hover:visible "
                />
            </div>
        </button>
    )
}

export default PageItem
