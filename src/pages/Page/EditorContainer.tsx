import { format, parseISO } from 'date-fns'
import Editor from '../../components/editor/Editor'
import { useUpdateContent } from '../../hooks/api/useUpdateContent'
import { useUpdatetitle } from '../../hooks/api/useUpdateTitle'
import { type Json } from '../../types/schema'
import { type Page } from '../../supabase'

type Props = {
    page: Page
}

const EditorContainer = ({ page }: Props) => {
    const updateContent = useUpdateContent(page.id)
    const handleContentChange = debounce((content: Json) => {
        updateContent.mutate(content)
    })

    const updateTitle = useUpdatetitle(page.id, page.parent_id)
    const handleTitleChange = (title: string) => {
        updateTitle.mutate(title)
    }

    return (
        <div className="min-h-full w-full flex flex-col shadow-sm p-2 bg-white rounded-md border border-slate-100">
            <input
                id="pageInput"
                placeholder="Untitled"
                className="h-16 w-full text-4xl mx-2 focus:outline-none"
                maxLength={32}
                value={page.title}
                onChange={(e) => {
                    handleTitleChange(e.target.value)
                }}
                disabled={page.archived}
            />

            <p className="text-slate-300 text-sm mx-2">{`Created ${format(
                parseISO(page.created_at),
                'Do MMMM, yyyy',
            )}`}</p>
            {/* by ${user?.email}`} */}

            <Editor
                editable={!page.archived}
                content={page.content}
                onUpdate={handleContentChange}
            />
        </div>
    )
}

export default EditorContainer

// convert to hook
export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}
