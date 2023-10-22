import { useNavigate, useParams } from 'react-router-dom'
import Banner from './Banner'
import usePage from '../../hooks/api/use-page.query'
import React, { useMemo } from 'react'
import BaseLayout from '../../components/layout/BaseLayout'
import dayjs from 'dayjs'
import Editor from '../../components/editor/Editor'
import { useUpdateContent } from '../../hooks/api/useUpdateContent'
import { type Json } from '../../types/schema'
import { useUpdatetitle } from '../../hooks/api/useUpdateTitle'

const Page: React.FC = () => {
    const { id } = useParams() as { id: string }
    const navigate = useNavigate()

    const { data: page, isLoading } = usePage(id)

    const createdAt = useMemo(() => {
        if (!page) {
            return ''
        }

        return dayjs(page.created_at).fromNow()
    }, [page?.created_at])

    const updateContent = useUpdateContent(id)
    const handleContentChange = debounce((content: Json) => {
        updateContent.mutate(content)
    })

    const updateTitle = useUpdatetitle(id, page?.parent_id)
    const handleTitleChange = (title: string) => {
        updateTitle.mutate(title)
    }

    const isLoadingPage = isLoading || !page

    return (
        <BaseLayout>
            <div className="w-full h-full max-h-full overflow-y-scroll p-10 flex justify-center relative ">
                {!isLoading && page?.archived && <Banner page={page} />}

                <div className="md:w-[50rem] w-full">
                    <div className="min-h-full w-full flex flex-col p-2 bg-white">
                        {/* skeleton */}
                        {isLoadingPage && (
                            <div className="w-full h-full animate-pulse flex flex-col gap-4">
                                <div className="w-96 h-12 rounded-xl bg-slate-100"></div>
                                <div className="w-40 h-6 rounded-xl bg-slate-100"></div>
                                <div className="w-full h-96 rounded-xl bg-slate-100"></div>
                            </div>
                        )}

                        {!isLoadingPage && (
                            <>
                                <input
                                    id="pageInput"
                                    placeholder="Untitled"
                                    className="h-16 w-full text-4xl mx-2 focus:outline-none"
                                    maxLength={32}
                                    value={page.title}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        handleTitleChange(e.target.value)
                                    }}
                                    disabled={page.archived}
                                />
                                <p className="text-slate-300 text-sm mx-2">{`Created ${createdAt}`}</p>

                                {/* <Editor
                                    editable={!page.archived}
                                    content={page.content}
                                    onUpdate={handleContentChange}
                                /> */}
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
