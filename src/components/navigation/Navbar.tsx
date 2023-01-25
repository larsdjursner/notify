import { TrashIcon } from "@heroicons/react/24/outline"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import EditDate from "./EditDate"

export const Navbar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { removeById } = usePagesStore()
    const currentPage = usePagesStore(
        useCallback((state) => state.currentPage, [id])
    )

    const handleDelete = () => {
        if (!currentPage?.id) return

        removeById(currentPage.id)
        navigate("/page/new")
    }

    return (
        <div className="w-full h-10 bg-white border-b border-slate-200 mt-2 ml-1">
            {currentPage ? (
                <div className="flex justify-between items-center px-10 py-2">
                    <p>
                        {currentPage.title === ""
                            ? "Untitled"
                            : currentPage.title}
                    </p>
                    <div className="flex gap-4">
                        <EditDate page={currentPage} />
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
