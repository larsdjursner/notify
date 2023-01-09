import { useCallback, useEffect } from "react"
import useCodeMirror from "../hooks/useCodeMirror"

interface Props {
    doc: Doc
    onChange: (id: string, doc: string) => void
}

export interface Doc {
    id: string
    value: string
}

const Editor = ({ doc, onChange }: Props) => {
    const handleChange = useCallback(
        (state: any) => onChange(doc.id, state.doc.toString()),
        [onChange]
    )
    const { ref, view } = useCodeMirror<HTMLDivElement>({
        initialDoc: doc.value,
        onChange: handleChange,
    })

    // useEffect(() => {
    //     if (view) {
    //         // Do nothing for now
    //         // console.log(initialDoc)
    //     }
    // }, [view])

    return <div className="flex-1 rounded-lg py-2 focus:none" ref={ref}></div>
}

export default Editor
