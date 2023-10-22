import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePage } from '../../hooks/api/useDeletePage'
import { useRestorePage } from '../../hooks/api/useRestorePage'
import { Page } from '../../supabase'

interface Props {
    page: Page
}
const Banner = ({ page }: Props) => {
    const navigate = useNavigate()
    const restoreMutation = useRestorePage({ id: page.id })
    const deleteMutation = useDeletePage({
        id: page.id,
        softDelete: false,
        parent_id: page.parent_id,
    })

    const handleDeletePermanently = async () => {
        try {
            await deleteMutation.mutateAsync()
            navigate('/page/new')
        } catch (error) {
            console.error(error)
        }
    }

    const handleRestore = async () => {
        try {
            await restoreMutation.mutateAsync()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="absolute top-0 w-full h-12 bg-red-400 text-white flex justify-center items-center gap-8">
            <p className="">This page is archived. To edit, restore the page.</p>
            <button
                className="rounded-lg border-2 border-white py-1 px-2 hover:bg-white hover:text-black"
                onClick={handleRestore}>
                Restore
            </button>
            <button
                className="rounded-lg border-2 border-white py-1 px-2 hover:bg-white hover:text-black"
                onClick={handleDeletePermanently}>
                Delete permanently
            </button>
        </div>
    )
}

export default Banner
