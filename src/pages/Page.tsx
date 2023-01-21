import { useEffect, useState } from "react"
import Editor from "../components/editor/Editor"
import {
    deletePermanentlyById,
    fetchDeletedPageById,
    fetchPageById,
    restorePage,
    updateContentById,
    updateTitleById,
} from "../supabase"
import { usePagesStore } from "../stores/pagesStore"
import { useNavigate, useParams } from "react-router-dom"
import { Json } from "../schema"

export const Page = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { setCurrentPage, currentPage, updateTitle, updateContent } =
        usePagesStore()

    const [isDeleted, setIsDeleted] = useState(false)

    const handleFetchPage = async (_id: string) => {
        setIsLoading(true)

        fetchPageById(_id).then((res) => {
            if (!res) {
                // Ideally navigate to a not found page
                navigate("/page/new")
                return
            }

            if (res.length === 0) {
                setIsDeleted(true)
                handleFetchDeletedPage(_id)
                return
            }

            const currentPage = res[0]
            setCurrentPage(currentPage)
            setIsLoading(false)
        })
    }

    const handleFetchDeletedPage = async (_id: string) => {
        fetchDeletedPageById(_id).then((res) => {
            if (!res || res.length === 0) {
                // Ideally navigate to a not found page
                navigate("/page/new")
                return
            }

            const currentPage = res[0]
            setCurrentPage(currentPage)
            setIsLoading(false)
        })
    }

    const handleDeletePermanently = async (_id: string | undefined) => {
        if (!_id) return

        deletePermanentlyById(_id)
            .then((res) => {
                console.log(res)
                navigate("/page/new")
            })
            .catch((err) => console.log(err))
    }

    const handleTitleChange = (title: string) => {
        if (!id) return

        updateTitle(title)
        updateTitleById(id, title)
    }

    const handleContentChange = (content: Json) => {
        if (!id) return

        updateContent(content)
        updateContentById(id, content)
        // .then(({ data, error }) => {})
    }

    useEffect(() => {
        if (!id) {
            return
        }

        handleFetchPage(id)
        // .then((res) => console.log(res))

        return () => {
            setIsDeleted(false)
        }
    }, [id])

    const handleRestore = (_id: string | undefined): void => {
        if (!_id) return

        restorePage(_id)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll pt-10 flex justify-center relative">
            {isDeleted && (
                <div className="absolute top-0 w-full h-12 bg-red-400 text-white flex justify-center items-center gap-8">
                    <p className="">
                        This page is archived. To edit, restore the page.{" "}
                    </p>
                    <button
                        className="rounded-lg border-2 border-white py-1 px-2 hover:bg-white hover:text-black"
                        onClick={() => handleRestore(id)}
                    >
                        Restore
                    </button>
                    <button
                        className="rounded-lg border-2 border-white py-1 px-2 hover:bg-white hover:text-black"
                        onClick={() => handleDeletePermanently(id)}
                    >
                        Delete permanently
                    </button>
                </div>
            )}
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
                            disabled={isDeleted}
                        />

                        <span className="h-1 w-full bg-slate-50" />

                        <Editor
                            editable={!isDeleted}
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
