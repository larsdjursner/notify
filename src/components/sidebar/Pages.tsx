import usePages from '../../hooks/api/use-pages.query'
import PageItem from './PageListItem'

type PagesProps = {}

const Pages = ({}: PagesProps) => {
    const { data: pages, isLoading, isError } = usePages()

    const isEmpty = (pages ?? []).length === 0

    const inner = () => {
        if (isError) {
            return <span>Error fetching subpages</span>
        }
        if (isLoading) {
            return <span className="w-full text-sm text-slate-500">Loading...</span>
        }
        if (isEmpty) {
            return <span className="w-full text-sm text-slate-500">There are no pages inside</span>
        }

        return pages?.map((page) => (
            <PageItem
                page={page}
                key={page.id}
            />
        ))
    }

    return (
        <>
            <p className="w-full align-bottom pt-4 px-4 underline decoration-teal-700/60 decoration-2 underline-offset-2">
                My pages
            </p>
            <div className="w-full relative overflow-y-scroll max-h-full overflow-x-hidden">
                {inner()}
            </div>
        </>
    )
}

export default Pages
