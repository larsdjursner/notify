import { useParams } from 'react-router-dom'
import Banner from './Banner'
import usePage from '../../hooks/usePage'
import EditorContainer from './EditorContainer'
import { usePagesStore } from '../../stores/pagesStore'
import { useEffect, useCallback } from 'react'

export const Page = () => {
    const { id } = useParams()
    const { data, error, isError, isLoading } = usePage(id)
    // const { data, error, isError, isLoading d} = usePages(id)

    if (isError) return <p>{error.message}</p>

    const { setCurrentPage, resetCurrentPage } = usePagesStore()
    useEffect(() => {
        if (data === undefined) {
            return
        }
        setCurrentPage(data)
        return () => {
            resetCurrentPage()
        }
    }, [data])

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll p-10 flex justify-center relative bg-slate-50">
            {!isLoading && data?.archived && <Banner page={data} />}
            <div className="md:w-[50rem] w-full">
                {isLoading ? <p>...loading</p> : <EditorContainer page={data} />}
            </div>
        </div>
    )
}
