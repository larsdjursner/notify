import { DocumentIcon } from '@heroicons/react/24/outline'
import { NodeViewWrapper } from '@tiptap/react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddPage } from '../../../../hooks/useAddPage'
import { usePagesStore } from '../../../../stores/pagesStore'
import { Page } from '../../../../supabase'
import { Subpage } from './Subpage'
const SubpageWrapper = () => {
    const { id } = useParams()
    const pagesStore = usePagesStore()

    const mutation = useAddPage(id)

    const content = useMemo(() => {
        // mutation?.mutate()

        return (
            <div className="bg-slate-50h-full w-full">
                <p>cheese</p>
                {/* {mutation?.isLoading ? (
                    <p>...loading</p>
                ) : (
                    <SubpageReference page={mutation?.data} />
                )} */}
            </div>
        )
    }, [])

    return <NodeViewWrapper as="div">{content}</NodeViewWrapper>
}
export default SubpageWrapper

const SubpageReference = ({ page }: { page: Page | undefined }) => {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(`/page/${page?.id}`)}
            className="bg-slate-50 flex w-40 items-center"
        >
            <DocumentIcon className="h-4 w-4" />
            <p>{page?.title}</p>
        </button>
    )
}
