import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div className="h-full w-full bg-slate-200 flex flex-col justify-center items-center">
            <p>notify stuff</p>
            <Link to="/signin">signin</Link>
            <Link to="/signup">signup</Link>
        </div>
    )
}
