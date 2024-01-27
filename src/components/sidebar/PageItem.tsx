import {
    ChevronRightIcon,
    DocumentIcon,
    DocumentTextIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddPage } from '../../hooks/api/useAddPage'
import { useDeletePage } from '../../hooks/api/useDeletePage'
import { Page } from '../../supabase'
import IconButton from '../navigation/IconButton'
import Subpages from './Subpages'

interface Props {
    page: Page
}

const PageItem = ({ page }: Props) => {
    const navigate = useNavigate()
    const { id } = useParams()

    const isCurrent = id === page.id
    const [open, setOpen] = useState(false)

    const deleteMutation = useDeletePage({
        id: page.id,
        parent_id: page.parent_id,
    })
    const handleDelete = async () => {
        try {
            await deleteMutation?.mutateAsync()
            navigate('/page/new')
        } catch (error) {
            console.error(error)
        }
    }

    const addMutation = useAddPage(page.id)
    const handleAdd = async () => {
        try {
            const page = await addMutation?.mutateAsync()
            if (!page) return

            setOpen(true)
            navigate(`/page/${page.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={`flex flex-col`}>
            <button
                onClick={() => navigate(`/page/${page.id}`)}
                className={`w-full py-2 flex justify-start gap-2 items-center pl-2 pr-4 group hover:bg-slate-50 
                ${isCurrent || open ? 'bg-slate-50' : 'bg-white'}
                `}>
                <IconButton
                    icon={
                        <ChevronRightIcon
                            className={`h-4 w-4 ${
                                open ? 'rotate-90' : 'rotate-0'
                            } transition-all duration-100 delay-100`}
                        />
                    }
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen((prev) => !prev)
                    }}
                />

                {/* title */}
                <div className="flex gap-2 items-center">
                    {!page.content ? (
                        <DocumentIcon className="h-4 w-4" />
                    ) : (
                        <DocumentTextIcon className="h-4 w-4" />
                    )}
                    <p className="truncate text-sm">
                        {page.title === '' ? 'Untitled' : page.title}
                    </p>
                </div>

                <span className="flex-1" />

                <IconButton
                    icon={<TrashIcon className="h-4 w-4 invisible group-hover:visible" />}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleDelete()
                    }}
                />
                <IconButton
                    icon={<PlusIcon className="h-4 w-4 invisible group-hover:visible" />}
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAdd()
                    }}
                />
            </button>
            {open && <Subpages parent_id={page.id} />}
        </div>
    )
}

export default PageItem
