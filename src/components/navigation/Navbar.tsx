import { useEffect } from "react"
import { usePagesStore } from "../../stores/pagesStore"
import LastEditDate from "./LastEditDate"

export const Navbar = () => {
    const { currentPage } = usePagesStore()

    return (
        <div className="w-full h-12 bg-slate-200 border-b border-slate-300">
            {currentPage ? (
                <div className="flex justify-between items-center px-10 py-2">
                    <p>
                        {currentPage.title === ""
                            ? "Untitled"
                            : currentPage.title}
                    </p>
                    <LastEditDate _date={currentPage.updated_at} />
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}
