import { TrashIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { deleteById } from "../../supabase"
import LastEditDate from "./LastEditDate"

export const Navbar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { removeById } = usePagesStore()
    const currentPage = usePagesStore(
        useCallback((state) => state.currentPage, [id])
    )

    const unsub = usePagesStore.subscribe(
        (state) => state.currentPage
        // (curr, prev) => console.log(curr, prev)
    )
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
                        {/* last edit */}
                        <div>{currentPage.updated_at}</div>
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
