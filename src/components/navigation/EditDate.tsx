import { formatDistance, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { Page } from '../../supabase'

interface Props {
    page: Page
}

const EditDate = ({ page }: Props) => {
    const [formattedDate, setFormattedDate] = useState<string | null>(null)

    useEffect(() => {
        // init
        setFormattedDate(formatDistance(parseISO(page.updated_at), new Date(Date.now())))

        // keep updating
        const updateTime = setInterval(() => {
            setFormattedDate(formatDistance(parseISO(page.updated_at), new Date(Date.now())))
        }, 30 * 1000)

        return () => {
            setFormattedDate(null)
            clearInterval(updateTime)
        }
    }, [page.id])

    return <p className="text-slate-400">{formattedDate}</p>
}

export default EditDate
