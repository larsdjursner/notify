import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchArchivedPages from '../../hooks/api/useFetchArchivedPages'
import { Page } from '../../supabase'
import ArchivedPageItem from './ArchivedPageItem'

interface Props {
    onClose: () => void
}

const ArchivedPages = ({ onClose }: Props) => {
    const [query, setQuery] = useState('')
    const { isLoading, isError, data, error } = useFetchArchivedPages(query)

    if (isError) return <span>{error.message}</span>

    return (
        <div className=" w-96 h-80 flex flex-col items-start">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search"
                className="w-full h-12 p-2 mb-4"
            />
            <div className="h-full w-full overflow-y-scroll flex flex-col">
                {isLoading ? (
                    <p>...loading</p>
                ) : (
                    data.map((page) => (
                        <ArchivedPageItem
                            key={page.id}
                            page={page}
                            onClick={onClose}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default ArchivedPages
