import { useEffect, useState } from 'react'
import { PageDeleteToast } from './PageDeleteToast'
import useToastStore from './ToastStore'

export const Position = {
    Bottom: 'bottom-5 flex justify-center w-full',
    Top: 'top-5 flex justify-center w-full',
    BottomRight: 'bottom-5 right-5',
} as const

export type Position = (typeof Position)[keyof typeof Position]

interface Props {
    position: Position
}

const Toast = ({ position }: Props) => {
    const { toastList, resetToasts } = useToastStore()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (toastList.length > 0) {
            setVisible(true)
        }

        return () => {
            setVisible(false)
        }
    }, [toastList])

    if (!visible) {
        return null
    }

    return (
        <div className={`absolute z-50 ${position} `}>
            <div className="w-64 h-full flex flex-col justify-end">
                {visible &&
                    toastList.map((toast, i) => (
                        <PageDeleteToast
                            key={i}
                            {...toast}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Toast
