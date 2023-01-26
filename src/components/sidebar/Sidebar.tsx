import { useState } from "react"
import { ChevronDoubleRightIcon, PlusIcon } from "@heroicons/react/24/outline"
import TrashFlyout from "../TrashFlyout"
import TooltipButton from "../generic/TooltipButton"
import ProfileFlyout from "../ProfileFlyout"
import Pages from "./Pages"
import { useAddPage } from "../../hooks/useAddPage"
import { useNavigate } from "react-router-dom"

export const Sidebar = () => {
    const [shown, setShown] = useState(true)
    const navigate = useNavigate()

    const mutation = useAddPage()
    const handleAdd = async () => {
        try {
            const page = await mutation?.mutateAsync()
            if (!page) return
            navigate(`/page/${page.id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex relative my-2">
                {shown && (
                    <div className="w-60 h-full bg-white border-r px-2 flex flex-col">
                        <ProfileFlyout />
                        <Pages />

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
