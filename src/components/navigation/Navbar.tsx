import { TrashIcon } from "@heroicons/react/24/outline"
import { useNavigate, useParams } from "react-router-dom"
import { useDeletePage } from "../../hooks/useDeletePage"
import usePage from "../../hooks/usePage"
import { Page } from "../../supabase"
import EditDate from "./EditDate"

export const Navbar = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, error, isError, isLoading } = usePage(id)

    if (isError) return <p>{error.message}</p>

    return (
        <div className="w-full h-12 bg-white pt-2 px-2 border-b border-slate-200 shadow-lg">
            <div className="flex justify-between items-center px-10 py-1">
                {isLoading ? (
                    <p>...loading</p>
                ) : (
                    <>
                        <p>{data?.title === "" ? "Untitled" : data.title}</p>
                        <div className="flex gap-4">
                            <EditDate page={data} />
                            <DeleteButton
                                page={data}
                                onSuccess={() => navigate("/page/new")}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const DeleteButton = ({
    page,
    onSuccess,
}: {
    page: Page
    onSuccess: () => void
}) => {
    const deleteMutation = useDeletePage({
        id: page.id,
        parent_id: page.parent_id,
        softDelete: !page.archived,
    })

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync()
            onSuccess()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button onClick={handleDelete}>
            <TrashIcon className="h-4 w-4" />
        </button>
    )
}
