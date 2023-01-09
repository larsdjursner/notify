import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World!</p>",
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-md xl:prose-lg m-2 focus:outline-none",
            },
        },
        onUpdate: (props) => {
            console.log(props.editor.getJSON())
        },
    })

    const Overlay = () => {
        const [isOverlay, setIsOverlay] = useState(false)

        return (
            <div className="relative">
                <button onClick={() => setIsOverlay(!isOverlay)}>
                    show menu
                </button>
                {isOverlay && (
                    <div className="absolute bg-white z-20 border border-rounded">
                        <ol>
                            <li>hey</li>
                            <li>hey</li>
                            <li>hey</li>
                            <li>hey</li>
                        </ol>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {/* <Overlay /> */}
            <EditorContent editor={editor} />
        </div>
    )
}

export default Editor
