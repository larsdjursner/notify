import { TrashIcon } from "@heroicons/react/24/outline"
import Flyout, { Direction } from "./generic/Flyout"
import TooltipButton from "./generic/TooltipButton"

const TrashFlyout = () => {
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
                <div className="w-72 h-72">
                    "collection of all deleted content so far"
                    <ul>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                        <li>a</li>
                    </ul>
                </div>
            }
            direction={Direction.Right}
        />
    )
}

export default TrashFlyout
