// use-code-mirror.ts
import { useEffect, useRef, useState } from "react"
import { EditorView } from "codemirror"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { EditorState } from "@codemirror/state"
import { languages } from "@codemirror/language-data"
import { highlightActiveLine } from "@codemirror/view"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags } from "@lezer/highlight"

interface Props {
    initialDoc: string
    onChange?: (state: EditorState) => void
}

const theme = EditorView.theme({
    "&:focus": {
        outline: "none",
    },
})

const mdHighlighting = HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: "1.6em",
        fontWeight: "bold",
    },
    {
        tag: tags.heading2,
        fontSize: "1.4em",
        fontWeight: "bold",
    },
    {
        tag: tags.heading3,
        fontSize: "1.2em",
        fontWeight: "bold",
    },
])

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
                theme,
                syntaxHighlighting(mdHighlighting),
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
