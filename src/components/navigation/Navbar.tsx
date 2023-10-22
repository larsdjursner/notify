import { useParams } from 'react-router-dom'
import usePage from '../../hooks/api/use-page.query'
import dayjs from 'dayjs'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'

export const Navbar = () => {
    const { id } = useParams() as { id: string }

    const { data: page, isLoading } = usePage(id)

    const title = (() => {
        if (isLoading) {
            return ''
        }

        if (page?.title === '') {
            return 'Untitled'
        }

        return page?.title
    })()

    const date = useMemo(() => {
        if (!page) {
            return ''
        }

        return dayjs(page.updated_at).fromNow()
    }, [page?.updated_at])

    const handleDelete = () => {}

    return (
        <div className="w-full h-14 bg-white flex items-center justify-between px-10">
            <p className="">{title}</p>
            <div className="flex gap-4">
                <p className="">{date}</p>
                <button onClick={handleDelete}>
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
