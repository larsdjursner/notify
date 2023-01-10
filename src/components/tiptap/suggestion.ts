import { useOverlayStore } from "./OverlayStore"
const { setOverlayActive, setCoords, setElements } = useOverlayStore.getState()

export default {
    items: ({ query }: { query: string }) => {
        return [
            { title: "heading", subtitle: "farts", command: () => {} },
            { title: "bulletlist", subtitle: "farts", command: () => {} },
            { title: "enumeratedlist", subtitle: "farts", command: () => {} },
            { title: "link", subtitle: "farts", command: () => {} },
        ]
            .filter((item: any) =>
                item.title.toLowerCase().startsWith(query.toLowerCase())
            )
            .slice(0, 10)
    },

    render: () => {
        return {
            onStart: (props: any) => {
                let editor = props.editor
                let range = props.editor
                let location = props.clientRect()
                setOverlayActive(true)
                setCoords({ x: location.x, y: location.y })
                setElements(props.items)
            },
            onExit: () => {
                // maybe just destroy the whole store at that point
                setOverlayActive(false)
            },
            onKeyDown: (props: any) => {
                // Needs to stop the querying
                if (props.event.key === "Escape") {
                    setOverlayActive(false)
                    return true
                }
            },
            onUpdate: (props: any) => {
                setElements(props.items)
            },
        }
    },
}
