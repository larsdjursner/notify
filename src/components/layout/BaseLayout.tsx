import { useState } from "react"
import Toast, { Position } from "../toast/ToastList"
import { Navbar } from "../navigation/Navbar"
import { Sidebar } from "../sidebar/Sidebar"
import useToastStore from "../toast/ToastStore"

interface Props {
    children: JSX.Element | JSX.Element[] | string
}

const BaseLayout = ({ children }: Props) => {
    return (
        <div className="h-full w-full flex flex-col">
            <Navbar />
            <div className="h-full w-full flex">
                <Sidebar />
                {children}
            </div>
            <Toast position={Position.Bottom} />
        </div>
    )
}

export default BaseLayout
