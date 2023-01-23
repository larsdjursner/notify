import { TrashIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { deleteById } from "../../supabase"
import LastEditDate from "./LastEditDate"

export const Navbar = () => {
    const { currentPage, removeById } = usePagesStore()
    const navigate = useNavigate()

    const handleDelete = () => {
        if (!currentPage?.id) return

        removeById(currentPage.id)
        navigate("/page/new")
    }

    return (
        <div className="w-full h-12 bg-slate-50 border-b border-slate-100">
            {currentPage ? (
                <div className="flex justify-between items-center px-10 py-2">
                    <p>
                        {currentPage.title === ""
                            ? "Untitled"
                            : currentPage.title}
                    </p>
                    <div className="flex gap-4">
                        {/* <LastEditDate _date={currentPage.updated_at} /> */}
                        <button onClick={handleDelete}>
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}
