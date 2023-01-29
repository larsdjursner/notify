import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Flyout, { Direction } from "../generic/Flyout"
import TooltipButton from "../generic/TooltipButton"
import ArchivedPages from "./ArchivedPages"

const TrashFlyout = () => {
    const [open, setOpen] = useState(false)

    return (
        <Flyout
            button={
                <TooltipButton
                    button={
                        <button className="flex justify-start items-center w-full h-8 hover:bg-slate-200 rounded-sm px-4">
                            <TrashIcon className="h-4 w-4 mr-4" />
                            <p>Trash</p>
                        </button>
                    }
                    tooltip={"View recently deleted document pages"}
                />
            }
            content={
                open ? <ArchivedPages onClose={() => setOpen(false)} /> : <></>
            }
            direction={Direction.StickToX}
            open={open}
            setOpen={setOpen}
        />
    )
}

export default TrashFlyout
