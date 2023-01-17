import { useState } from "react"
import Toast from "../generic/Toast"
import { Navbar } from "../navigation/Navbar"
import { Sidebar } from "../navigation/Sidebar"

interface Props {
    children: JSX.Element | JSX.Element[] | string
}

const BaseLayout = ({ children }: Props) => {
    const [deleteToast, setDeleteToast] = useState(true)

    return (
        <>
            <Sidebar />
            <div className="h-full w-full flex flex-col">
                <Navbar />
                {children}
            </div>
            {deleteToast && <Toast toastList={[]} />}
        </>
    )
}

export default BaseLayout
