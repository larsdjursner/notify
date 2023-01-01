import { useCallback, useEffect } from "react"
import useCodeMirror from "../hooks/useCodeMirror"

interface Props {}

interface Props {
    initialDoc: string
    onChange: (doc: string) => void
}

const Editor = ({ initialDoc, onChange }: Props) => {
    const handleChange = useCallback(
        (state: any) => onChange(state.doc.toString()),
        [onChange]
    )
    const { ref, view } = useCodeMirror<HTMLDivElement>({
        initialDoc: initialDoc,
        onChange: handleChange,
    })

    useEffect(() => {
        if (view) {
            // Do nothing for now
            console.log(initialDoc)
        }
    }, [view])

    return (
        <div
            className="flex-1 rounded-lg bg-white shadow-inner"
            ref={ref}
        ></div>
    )
}

export default Editor
