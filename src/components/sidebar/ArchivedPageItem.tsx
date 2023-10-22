import { ArrowUturnLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useDeletePage } from '../../hooks/api/useDeletePage'
import usePage from '../../hooks/api/use-page.query'
import { useRestorePage } from '../../hooks/api/useRestorePage'
import { Page } from '../../supabase'

interface Props {
    page: Page
    onClick: () => void
}

const ArchivedPageItem = ({ page, onClick }: Props) => {
    const restoreMutation = useRestorePage({ id: page.id })
    const deleteMutation = useDeletePage({
        id: page.id,
        softDelete: false,
        parent_id: page.parent_id,
    })

    const navigate = useNavigate()

    const handleDeletePermanently = async () => {
        try {
            await deleteMutation.mutateAsync()
            onClick()
            navigate('/page/new')
        } catch (error) {
            console.error(error)
        }
    }

    const handleRestore = async () => {
        try {
            await restoreMutation.mutateAsync()
            onClick()
            navigate(`/page/${page.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    const handleNavigate = () => {
        onClick()
        navigate(`/page/${page.id}`)
    }

    const name = page.title === '' ? 'Untitled' : page.title

    return (
        <button
            key={page.id}
            className="flex items-center gap-4 hover:bg-slate-200 py-1 px-2">
            <p
                className="truncate flex-1 text-start"
                onClick={handleNavigate}>
                {name}
            </p>
            <ArrowUturnLeftIcon
                onClick={handleRestore}
                className="h-4 w-4"
            />
            <TrashIcon
                onClick={handleDeletePermanently}
                className="h-4 w-4"
            />
        </button>
    )
}

export default ArchivedPageItem
