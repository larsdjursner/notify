import { useEffect, useState } from 'react'
import { useCommandStore } from './CommandMenuStore'
import { Item } from './suggestion'

interface Props {
    item: Item
}

export const CommandItem = ({ item }: Props) => {
    const { selected, executeCommandByTitle, setSelectedByTitle, getElements } = useCommandStore()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        setIsSelected(item.title === getElements()[selected].title)
    }, [selected])

    return (
        <button
            className={`w-full h-full flex flex-col rounded-md py-1 px-2 ${
                isSelected ? 'bg-slate-200' : 'bg-white'
            }`}
            onClick={() => executeCommandByTitle(item.title)}
            onMouseOver={() => setSelectedByTitle(item.title)}
        >
            <p>{item.title}</p>
            <p className="text-sm text-slate-600">{item.subtitle}</p>
        </button>
    )
}
