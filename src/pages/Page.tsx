import { useEffect, useState } from "react"
import Editor from "../components/editor/Editor"
import { fetchPageById, updateContentById, updateTitleById } from "../supabase"
import { usePagesStore } from "../stores/pagesStore"
import { useParams } from "react-router-dom"
import { Json } from "../schema"

export const Page = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const { setCurrentPage, currentPage, updateTitle, updateContent } =
        usePagesStore()

    const handleFetchPage = async (_id: string) => {
        setIsLoading(true)

        fetchPageById(_id).then((res) => {
            if (!res) return

            const currentPage = res[0]
            setCurrentPage(currentPage)
            setIsLoading(false)
        })
    }

    const handleTitleChange = (title: string) => {
        if (!id) return

        updateTitle(title)
        updateTitleById(id, title)
    }

    const handleContentChange = (content: Json) => {
        if (!id) return

        updateContent(content)
        updateContentById(id, content).then(({ data, error }) => {})
    }

    useEffect(() => {
        if (!id) {
            return
        }

        handleFetchPage(id)

        return () => {}
    }, [id])

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll pt-10 flex justify-center">
            <div className="h-full w-[50rem]">
                {!isLoading ? (
                    <div className="min-h-full w-full flex flex-col shadow-sm p-2">
                        <input
                            id="pageInput"
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
