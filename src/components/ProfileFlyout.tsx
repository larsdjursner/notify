import { useAuthStore } from "../stores/authStore"
import Flyout, { Direction } from "./generic/Flyout"

const ProfileFlyout = () => {
    const { user, logout } = useAuthStore()
    return (
        <Flyout
            button={<button className="h-12 w-full">{user?.email}</button>}
            content={
                <div className="bg-white w-80 h-60 rounded-md">
                    <p>{user?.email}</p>
                    <button onClick={logout}> Logout </button>
                </div>
            }
            direction={Direction.BottomRight}
        />
    )
}

export default ProfileFlyout
