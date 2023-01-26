import Editor from "../../components/editor/Editor"
import { Page } from "../../supabase"

interface Props {
    page: Page
}

const EditorContainer = ({ page }: Props) => {
    return (
        <div className="min-h-full w-full flex flex-col shadow-sm p-2">
            {page.id}
            <input
                id="pageInput"
                placeholder="Untitled"
                className="h-16 w-full text-4xl mx-2 focus:outline-none"
                maxLength={32}
                // value={data.title}
                // onChange={(e) => handleTitleChange(e.target.value)}
                // disabled={isArchived}
            />

            {/* <p className="text-slate-300 text-sm mx-2">{`Created ${format( 
                              parseISO(currentPage.created_at),
                             "Do MMMM, yyyy"
                        )} by ${user?.email}`}</p> */}

            <Editor
                editable={true}
                content={page.content}
                onUpdate={() => {}}
            />
        </div>
    )
}

export default EditorContainer
