import React from 'react'
import { useParams } from 'react-router-dom'
import Editor from '../../components/editor/Editor'
import BaseLayout from '../../components/layout/BaseLayout'
import usePage from '../../hooks/api/use-page.query'
import { useUpdatePageContent } from '../../hooks/api/use-update-page-content.mutation'
import { useUpdatePageTitle } from '../../hooks/api/use-update-page-title.mutation'
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

    const updateTitle = useUpdatePageTitle(id)
    const handleTitleChange = (title: string) => {
        updateTitle.mutate(title)
    }

    const isLoadingPage = isLoading || !page

    return (
        <BaseLayout>
            <div className="w-full h-full max-h-full overflow-y-scroll p-10 flex justify-center relative ">
                {/* {!isLoading && page?.archived && <Banner page={page} />} */}

                <div className="md:w-[50rem] w-full">
                    <div className="min-h-full w-full flex flex-col p-2 bg-white">
                        {isLoadingPage && <Skeleton />}

                        {!isLoadingPage && (
                            <>
                                <input
                                    id="pageInput"
                                    placeholder="Untitled"
                                    className="h-16 w-full text-5xl mx-2 focus:outline-none"
                                    maxLength={32}
                                    value={page.title}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        handleTitleChange(e.target.value)
                                    }}
                                    disabled={page.archived}
                                />
                                <Editor
                                    editable={!page.archived}
                                    content={page.content}
                                    onUpdate={handleContentChange}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default Page

// convert to hook
export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}

const Skeleton = () => {
    return (
        <div className="w-full h-full animate-pulse flex flex-col gap-4">
            <div className="w-96 h-12 rounded-xl bg-gray-100"></div>
            <div className="w-full h-96 rounded-xl bg-gray-100"></div>
        </div>
    )
}
