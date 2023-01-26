import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePagesStore } from "../../stores/pagesStore"
import { addPage as addPageAPI, fetchPages } from "../../supabase"
import { ChevronDoubleRightIcon, PlusIcon } from "@heroicons/react/24/outline"
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
            <div className="flex relative my-2">
                {/* <p className="w-full cursor-pointer"></p> */}
                {shown && (
                    <div className="w-60 h-full bg-white border-r px-2 flex flex-col">
                        <ProfileFlyout />
                        {/* <span className="border-t rounded-full" /> */}

                        <p className="w-full align-bottom pt-4 px-4 underline decoration-teal-700/60 decoration-2 underline-offset-2">
                            My pages
                        </p>
                        <div className="w-full relative overflow-y-scroll max-h-full">
                            {!isLoading ? (
                                pages.map((page, i: number) => (
                                    <PageItem page={page} key={page.id} />
                                ))
                            ) : (
                                <p>Loading</p>
                            )}
                        </div>

                        <span className="border-t rounded-full" />

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
                    </div>
                )}
                <ChevronDoubleRightIcon
                    className={`h-6 w-6 absolute bottom-5 -right-10 cursor-pointer hover:scale-110 z-50 
                        ${
                            shown ? "rotate-180" : "rotate-0"
                        } transition-all duration-100 delay-100`}
                    onClick={() => setShown((prev) => !prev)}
                />
            </div>
        </>
    )
}
