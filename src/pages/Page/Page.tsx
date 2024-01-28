import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '../../components/editor/Editor'
import BaseLayout from '../../components/layout/BaseLayout'
import TitleInput from '../../components/page/TitleInput'
import usePage from '../../hooks/api/use-page.query'
import { useUpdatePageContent } from '../../hooks/api/use-update-page-content.mutation'
import { useUpdatePageTitle } from '../../hooks/api/use-update-page-title.mutation'
import { debounce } from '../../lib/debounce'
import { type Json } from '../../types/database.types'

const Page: React.FC = () => {
    const { id } = useParams()

    if (!id) {
        return null
    }

    const { data: page, isLoading } = usePage(id)

    const updateContent = useUpdatePageContent(id)
    const handleContentChange = debounce((content: Json) => {
        updateContent.mutate(content)
    })

    // TODO FIX order of updates
    const updateTitle = useUpdatePageTitle(id)
    const handleTitleChange = (title: string) => {
        updateTitle.mutate(title)
    }

    const inner = () => {
        if (isLoading) {
            return <Skeleton />
        }

        if (!page) {
            return 'Error loading page'
        }

        return (
            <>
                <TitleInput
                    value={page.title}
                    onChange={handleTitleChange}
                    disabled={page.archived}
                />
                <Editor
                    content={page.content}
                    onUpdate={handleContentChange}
                    editable={!page.archived}
                />
            </>
        )
    }

    return (
        <BaseLayout>
            <div className="w-full h-full max-h-full overflow-y-scroll p-10 flex justify-center relative">
                {/* {!isLoading && page?.archived && <Banner page={page} />} */}

                <div className="md:w-[50rem] w-full">
                    <div className="min-h-full w-full flex flex-col p-2 bg-white">{inner()}</div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default Page

const Skeleton = () => {
    return (
        <div className="w-full h-full animate-pulse flex flex-col gap-4">
            <div className="w-96 h-12 rounded-xl bg-gray-100"></div>
            <div className="w-full h-96 rounded-xl bg-gray-100"></div>
        </div>
    )
}
