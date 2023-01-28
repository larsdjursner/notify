import { format, parseISO } from "date-fns"
import { useEffect } from "react"
import Editor from "../../components/editor/Editor"
import { useUpdateContent } from "../../hooks/useUpdateContent"
import { useUpdatetitle } from "../../hooks/useUpdateTitle"
import { Json } from "../../schema"
import { usePagesStore } from "../../stores/pagesStore"
import { Page } from "../../supabase"

interface Props {
    page: Page
}

const EditorContainer = ({ page }: Props) => {
    const { setCurrentPage } = usePagesStore()

    useEffect(() => {
        setCurrentPage(page)
    }, [page])

    const updateContent = useUpdateContent(page.id)
    const handleContentChange = (content: Json) => {
        updateContent.mutate(content)
    }

    const updateTitle = useUpdatetitle(page.id)
    const handleTitleChange = (title: string) => {
        updateTitle.mutate(title)
    }

    return (
        <div className="min-h-full w-full flex flex-col shadow-sm p-2">
            <input
                id="pageInput"
                placeholder="Untitled"
                className="h-16 w-full text-4xl mx-2 focus:outline-none"
                maxLength={32}
                value={page.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                disabled={page.archived}
            />

            <p className="text-slate-300 text-sm mx-2">{`Created ${format(
                parseISO(page.created_at),
                "Do MMMM, yyyy"
            )}`}</p>
            {/* by ${user?.email}`} */}

            <Editor
                editable={!page.archived}
                content={page.content}
                onUpdate={(content) => handleContentChange(content)}
            />
        </div>
    )
}

export default EditorContainer
