import usePages from '../../hooks/usePages'
import PageItem from './PageItem'

interface Props {
    parent_id: string
}

const Subpages = ({ parent_id }: Props) => {
    const { isLoading, data, error, isError } = usePages(parent_id)

    if (isError) return <span>{error.message}</span>

    return (
        <div className="pl-4 border-l border-slate-600">
            {isLoading ? (
                <span className="w-full text-sm text-slate-500">Loading...</span>
            ) : data.length > 0 ? (
                data.map((child) => (
                    <PageItem
                        page={child}
                        key={child.id}
                    />
                ))
            ) : (
                <span className="w-full text-sm text-slate-500">There are no pages inside</span>
            )}
        </div>
    )
}

export default Subpages
