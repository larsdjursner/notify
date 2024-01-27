import Toast, { Position } from '../toast/ToastList'
import { Navbar } from '../navigation/Navbar'
import { Sidebar } from '../sidebar/Sidebar'
import React from 'react'

type BaseLayoutProps = {
    children: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <>
            <Sidebar />
            <div className="h-full w-full flex flex-col">
                <Navbar />
                {children}
            </div>
            {/* <Toast position={Position.Bottom} /> */}
        </>
    )
}

export default BaseLayout
