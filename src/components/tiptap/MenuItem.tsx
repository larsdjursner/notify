import { useEffect, useState } from "react"
import { useOverlayStore } from "./OverlayStore"
import { Item } from "./suggestion"

interface Props {
    item: Item
    initialIndex: number
}

export const MenuItem = ({ item, initialIndex }: Props) => {
    const { selected, executeCommandByTitle, setSelectedByTitle, getElements } =
        useOverlayStore()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        setIsSelected(item.title === getElements()[selected].title)
    }, [selected])

    return (
        <button
            className={`w-full h-full flex flex-col rounded-md py-1 px-2 ${
                isSelected ? "bg-slate-200" : "bg-white"
            }`}
            onClick={() => executeCommandByTitle(item.title)}
            onMouseOver={() => setSelectedByTitle(item.title)}
        >
            <p>{item.title}</p>
            <p className="text-sm text-slate-600">{item.subtitle}</p>
        </button>
    )
}
