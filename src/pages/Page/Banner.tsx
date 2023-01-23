import { useParams } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"

const Banner = () => {
    const { id } = useParams()
    const { restorePageById, deletePermanently } = usePagesStore()

    const handleDeletePermanently = async (_id: string | undefined) => {
        if (!_id) return

        deletePermanently(_id)
    }

    const handleRestore = (_id: string | undefined): void => {
        if (!_id) return

        restorePageById(_id)
    }

    return (
        <div className="absolute top-0 w-full h-12 bg-red-400 text-white flex justify-center items-center gap-8">
            <p className="">
                This page is archived. To edit, restore the page.
            </p>
            <button
                className="rounded-lg border-2 border-white py-1 px-2 hover:bg-white hover:text-black"
                onClick={() => handleRestore(id)}
            >
                Restore
            </button>
            <button
                className="rounded-lg border-2 border-white py-1 px-2 hover:bg-white hover:text-black"
                onClick={() => handleDeletePermanently(id)}
            >
                Delete permanently
            </button>
        </div>
    )
}

export default Banner
