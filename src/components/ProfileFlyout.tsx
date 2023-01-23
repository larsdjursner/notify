import { SetStateAction, useState } from "react"
import { useAuthStore } from "../stores/authStore"
import Flyout, { Direction } from "./generic/Flyout"

const ProfileFlyout = () => {
    const { user, logout } = useAuthStore()
    const [open, setOpen] = useState(false)

    return (
        <Flyout
            button={<button className="h-12 w-full">{user?.email}</button>}
            content={
                <div className="bg-white w-80 rounded-md">
                    <p className="px-4 py-2">{user?.email}</p>
                    <button className="px-4 py-2" onClick={logout}>
                        Logout
                    </button>
                </div>
            }
            direction={Direction.StickToY}
            open={open}
            setOpen={setOpen}
        />
    )
}

export default ProfileFlyout