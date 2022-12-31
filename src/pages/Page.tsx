import { useState } from "react"

export const Page = () => {
    const [doc, setDoc] = useState("markdown medium magoo")
    return <div className="h-full w-full overflow-y-scroll"></div>
}
