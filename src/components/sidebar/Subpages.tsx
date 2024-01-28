import usePage from '../../hooks/api/use-page.query'
import PageListItem from './PageListItem'

type SubpagesProps = {
    pageId: string
}

const Subpages = ({ pageId }: SubpagesProps) => {
    const { data: page, isLoading, isError } = usePage(pageId)

    const isEmpty = (page?.subpages ?? []).length === 0

    const inner = () => {
        if (isError) {
            return <span>An error occured</span>
        }
        if (isLoading) {
            return <span className="w-full text-sm text-slate-500">Loading...</span>
        }
        if (isEmpty) {
            return <span className="w-full text-sm text-slate-500">There are no pages inside</span>
        }

        return page?.subpages.map((subpage) => (
            <PageListItem
                page={subpage}
                key={subpage.id}
            />
        ))
    }

    return <div className="pl-4 border-l border-slate-600">{inner()}</div>
}

export default Subpages
