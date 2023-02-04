import usePages from "../../hooks/usePages"
import PageItem from "./PageItem"

interface Props {}

const Pages = (props: Props) => {
    const { isLoading, isError, data, error } = usePages()

    if (isError) return <span>{error.message}</span>

    return (
        <>
            <p className="w-full align-bottom pt-4 px-4 underline decoration-teal-700/60 decoration-2 underline-offset-2">
                My pages
            </p>
            {isLoading ? (
                <span>...Loading</span>
            ) : (
                <div className="w-full relative overflow-y-scroll max-h-full">
                    {data?.map((page) => (
                        <PageItem page={page} key={page.id} />
                    ))}
                </div>
            )}
        </>
    )
}

export default Pages
