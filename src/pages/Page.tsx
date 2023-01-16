import React, { useEffect, useState } from "react"
import Editor from "../components/editor/Editor"
import {
    fetchPageById,
    supabase,
    updateContentById,
    updateTitleById,
} from "../supabase"
import { usePagesStore } from "../stores/pagesStore"
import { useNavigate, useParams } from "react-router-dom"
import { Content } from "@tiptap/react"

import { Page as PageType } from "../supabase"
import { Json } from "../schema"

export const Page = () => {
    // const [loaded, setLoaded] = useState(true)
    const navigate = useNavigate()
    // const [page, setPage] = useState<PageType>()
    const { id } = useParams()
    const {
        pageLoaded,
        setCurrentPage,
        currentPage,
        updateTitle,
        setPageLoaded,
        updateContent,
    } = usePagesStore()

    const handleFetchPage = async (_id: string) => {
        setPageLoaded(false)

        fetchPageById(_id).then((res) => {
            if (!res) return

            const currentPage = res[0]
            setCurrentPage(currentPage)
        })
    }

    useEffect(() => {
        if (!id) {
            return
        }

        handleFetchPage(id)

        return () => {}
    }, [id])

    const handleTitleChange = (title: string) => {
        if (!id) return

        updateTitle(title)
        updateTitleById(id, title)
    }

    const handleContentChange = (content: Json) => {
        if (!id) return

        updateContent(content)
        updateContentById(id, content)
    }

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll pt-10 flex justify-center">
            <div className="h-full w-[50rem]">
                {pageLoaded ? (
                    <div className="min-h-full w-full flex flex-col shadow-sm p-2">
                        <input
                            placeholder="Untitled"
                            className="h-20 w-full text-4xl mx-2 focus:outline-none"
                            maxLength={32}
                            value={currentPage?.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />

                        <span className="h-1 w-full bg-slate-50" />

                        <Editor
                            content={currentPage?.content}
                            onUpdate={handleContentChange}
                        />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}
