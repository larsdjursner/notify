import { useEffect, useState } from "react"

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

const LastEditDate = ({ _date }: { _date: string }) => {
    const date = new Date(_date)
    const now = new Date()

    const [time, setTime] = useState("Edited just now")

    useEffect(() => {
        const msDiff = now.getTime() - date.getTime()
        const minDiff = msDiff / 1000 / 60

        // different year
        if (date.getFullYear() < now.getFullYear()) {
            const formattedDate = `${date.getDate()} ${monthToString(
                date.getMonth()
            )} ${date.getFullYear()}`
            setTime("Last editted " + formattedDate)
            return
        }

        if (date.getMonth() === now.getMonth()) {
            // today
            if (now.getDate() - date.getDate() < 1) {
                setTime(`Edited ${Math.floor(minDiff)} minutes ago`)
                return
            }

            if (now.getDate() - date.getDate() < 1) {
                setTime(
                    `Edited yesterday at ${date.getHours()}:${date.getMinutes()}`
                )
                return
            }
        }

        const formattedDate = `${date.getDate()} ${monthToString(
            date.getMonth()
        )}`
        setTime("Last editted " + formattedDate)

        return () => {}
    }, [])

    return <p>{`${time}`}</p>
}

export default LastEditDate
