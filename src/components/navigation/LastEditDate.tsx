import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"

const LastEditDate = ({ _date }: { _date: string }) => {
    const { currentPage, currentPageEdited } = usePagesStore()
    const [time, setTime] = useState("")

    useEffect(() => {
        // init
        const formatted = formatTime(_date)
        setTime(formatted)

        // keep updating
        const updateTime = setInterval(() => {
            const formatted = formatTime(_date)
            setTime(formatted)
        }, 60 * 1000)

        return () => {
            setTime("")
            clearInterval(updateTime)
        }
    }, [currentPage?.id])

    if (currentPageEdited) {
        return null
    }

    return <p className=" text-gray-400">{`${time}`}</p>
}

export const formatTime = (_date: string) => {
    const date = new Date(_date)
    const now = new Date()

    const msDiff = now.getTime() - date.getTime()
    const minDiff = msDiff / 1000 / 60

    // different year
    if (date.getFullYear() < now.getFullYear()) {
        const formattedDate = `${date.getDate()} ${monthToString(
            date.getMonth()
        )} ${date.getFullYear()}`
        return "Last edited " + formattedDate
    }

    // smae year same month
    if (date.getMonth() === now.getMonth()) {
        // today
        if (now.getDate() - date.getDate() < 1) {
            if (now.getHours() - date.getHours() <= 1) {
                if (Math.floor(minDiff) == 0) {
                    return "Edited just now"
                }
                return `Edited ${Math.floor(minDiff)} minutes ago`
            }

            return `Edited ${Math.floor(minDiff / 60)} hours ago`
        }

        // yesterday
        if (now.getDate() - date.getDate() <= 1) {
            return `Edited yesterday at ${date.getHours()}:${date.getMinutes()}`
        }
    }

    const formattedDate = `${date.getDate()} ${monthToString(date.getMonth())}`
    return "Last edited " + formattedDate
}

const monthToString = (index: number) => {
    const arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    return arr[index % arr.length]
}

export default LastEditDate
