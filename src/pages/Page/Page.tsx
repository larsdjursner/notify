import { useParams } from "react-router-dom"
import Banner from "./Banner"
import usePage from "../../hooks/usePage"
import EditorContainer from "./EditorContainer"

export const Page = () => {
    const { id } = useParams()
    const { data, error, isError, isLoading } = usePage(id)

    if (isError) return <p>{error.message}</p>

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll p-10 flex justify-center relative bg-slate-50">
            {data?.archived && <Banner />}
            <div className="h-full w-[50rem] bg-white rounded-md">
                {isLoading ? (
                    <p>...loading</p>
                ) : (
                    <EditorContainer page={data} />
                )}
            </div>
        </div>
    )
}
