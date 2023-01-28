import { TrashIcon } from "@heroicons/react/24/outline"
import { useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDeletePage } from "../../hooks/useDeletePage"
import usePage from "../../hooks/usePage"
import { usePagesStore } from "../../stores/pagesStore"
import EditDate from "./EditDate"

export const Navbar = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, error, isError, isLoading } = usePage(id)

    if (isError) return <p>{error.message}</p>
    if (data === undefined) return <p>undefined</p>

    // const deleteMutation = useDeletePage(data.id, data.parent_id)
    // const handleDelete = async () => {
    //     try {
    //         deleteMutation?.mutateAsync()
    //         navigate("/page/new")
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return (
        <div className="w-full h-12 bg-white pt-2 px-2 border-b border-slate-200 shadow-lg">
            <div className="flex justify-between items-center px-10 py-2">
                {isLoading ? (
                    <p>...loading</p>
                ) : (
                    <>
                        <p>{data.title === "" ? "Untitled" : data.title}</p>
                        <div className="flex gap-4">
                            <EditDate page={data} />
                            {/* <button onClick={handleDelete}> */}
                            <TrashIcon className="h-4 w-4" />
                            {/* </button> */}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
