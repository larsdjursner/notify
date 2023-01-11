import { useEffect, useState } from "react"
import { useOverlayStore } from "./OverlayStore"
import { Item } from "./suggestion"

interface Props {
    item: Item
    index: number
}

export const MenuItem = ({ item, index }: Props) => {
    const { selected, executeCommandByIndex, setSelected } = useOverlayStore()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        setIsSelected(index === selected)
    }, [selected])
    return (
        <button
            autoFocus={isSelected}
            className={`w-full h-full flex flex-col rounded-md py-1 px-2 ${
                isSelected ? "bg-slate-200" : "bg-white"
            }`}
            onClick={() => executeCommandByIndex(index)}
            onMouseOver={() => setSelected(index)}
        >
            <p>{item.title}</p>
            <p className="text-sm text-slate-600">{item.subtitle}</p>
        </button>
    )
}
