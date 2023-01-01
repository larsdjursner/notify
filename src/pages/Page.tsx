import { useCallback, useState } from "react"
import Editor from "../components/Editor"

export const Page = () => {
    const [doc, setDoc] = useState("markdown medium magoo")
    const handleDocChange = useCallback((newDoc: string) => {
        setDoc(newDoc)
    }, [])

    return (
        <div className="h-full w-full overflow-y-scroll">
            <div className=" flex gap-4 p-2">
                <button>::</button>
                <button>+</button>
                <Editor initialDoc={doc} onChange={handleDocChange} />
            </div>
        </div>
    )
}
