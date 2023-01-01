// use-code-mirror.ts
import { useEffect, useRef, useState } from "react"
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { EditorState } from "@codemirror/state"
import { languages } from "@codemirror/language-data"
import { highlightActiveLine } from "@codemirror/view"

interface Props {
    initialDoc: string
    onChange?: (state: EditorState) => void
}

export default function useCodeMirror<T extends Element>({
    initialDoc,
    onChange,
}: Props) {
    const ref = useRef<T>(null)
    const [view, setView] = useState<EditorView | null>()

    useEffect(() => {
        if (!ref.current) return

        const initialState = EditorState.create({
            doc: initialDoc,
            extensions: [
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                    addKeymap: true,
                }),
                highlightActiveLine(),
                EditorView.updateListener.of((update) => {
                    if (update.changes) {
                        onChange && onChange(update.state)
                    }
                }),
            ],
        })

        const view = new EditorView({
            state: initialState,
            parent: ref.current,
        })

        setView(view)

        /**
         * Make sure to destroy the codemirror instance
         * when our components are unmounted.
         */
        return () => {
            view.destroy()
            setView(null)
        }
        // }, [])
    }, [ref])

    return { ref, view }
}
