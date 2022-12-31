import { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { Page } from "./pages/Page"

function App() {
    return (
        <div className="h-screen w-screen flex">
            <Sidebar />
            <div className="h-full w-full flex flex-col">
                <Navbar />
                <div className="w-full h-full pt-10 flex justify-center">
                    <div className="h-full w-[50rem] bg-slate-50">
                        <Page />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
