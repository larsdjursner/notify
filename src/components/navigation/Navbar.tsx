import { useAuthStore } from "../../stores/authStore"

export const Navbar = () => {
    const { logout } = useAuthStore()
    return (
        <div className="w-full h-12 bg-slate-200 border-b border-slate-300 flex justify-end">
            <button onClick={logout}>logout</button>
        </div>
    )
}
