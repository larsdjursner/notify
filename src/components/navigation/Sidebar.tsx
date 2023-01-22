import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { addPage as addPageAPI, fetchPages } from "../../supabase"
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    PlusIcon,
} from "@heroicons/react/24/outline"
import { useAuthStore } from "../../stores/authStore"
import TrashFlyout from "../TrashFlyout"
import TooltipButton from "../generic/TooltipButton"
import ProfileFlyout from "../ProfileFlyout"
import PageItem from "./PageItem"

export const Sidebar = () => {
    const [shown, setShown] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const { pages, initPages, reset, addPage } = usePagesStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const handleAdd = () => {
        if (!user) return

        addPageAPI(user.id).then(({ data, error }) => {
            if (error) {
                console.log(error)
                return
            }
            const newPage = data[0]
            addPage(newPage)
            navigate(`/page/${newPage.id}`)
        })
    }

    const fetchPagesWithTitle = async () => {
        setIsLoading(true)
        fetchPages().then((res) => {
            if (!res) return

            initPages(res)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchPagesWithTitle()

        return () => {
            reset()
        }
    }, [])

    return (
        <>
            <div className="flex">
                {shown && (
                    <div className="w-60 h-full bg-slate-100 border-r border-r-slate-300 px-1 flex flex-col">
                        <ProfileFlyout />
                        {/* <span className="w-full h-1 bg-white rounded-full opacity-50" /> */}

                        <div className=" max-h-[35rem] min-h-[20rem] overflow-y-scroll bg-white my-4">
                            {!isLoading ? (
                                pages.map((page, i: number) => (
                                    <PageItem page={page} key={i} />
                                ))
                            ) : (
                                <p>Loading</p>
                            )}
                        </div>
                        <TooltipButton
                            button={
                                <button
                                    onClick={handleAdd}
                                    className="w-full h-8 flex justify-start items-center hover:bg-slate-200 rounded-sm px-4"
                                >
                                    <PlusIcon className="h-4 w-4 mr-4" />
                                    <p>Add page</p>
                                </button>
                            }
                            tooltip={"Add a new untitled document page"}
                        />

                        <TrashFlyout />
                        <span className="flex-1" />

                        <div className="w-full h-10 flex justify-end px-4">
                            <ChevronDoubleLeftIcon
                                className="h-6 w-6 cursor-pointer hover:scale-110"
                                onClick={() => setShown(false)}
                            />
                        </div>
                    </div>
                )}
            </div>
            {!shown && (
                <ChevronDoubleRightIcon
                    className="h-6 w-6 absolute bottom-5 left-5 cursor-pointer hover:scale-110 z-50"
                    onClick={() => setShown(true)}
                />
            )}
        </>
    )
}
