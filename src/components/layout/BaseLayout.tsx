import { useState } from "react"
import Toast, { Position } from "../toast/ToastList"
import { Navbar } from "../navigation/Navbar"
import { Sidebar } from "../navigation/Sidebar"
import useToastStore from "../toast/ToastStore"

interface Props {
    children: JSX.Element | JSX.Element[] | string
}

const BaseLayout = ({ children }: Props) => {
    return (
        <>
            <Sidebar />
            <div className="h-full w-full flex flex-col">
                <Navbar />
                {children}
            </div>
            <Toast position={Position.Bottom} />
        </>
    )
}

export default BaseLayout
