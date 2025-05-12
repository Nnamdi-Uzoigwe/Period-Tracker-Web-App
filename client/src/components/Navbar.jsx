import { IoFlowerSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full bg-white opacity-95 py-6 px-8 lg:px-40 flex z-50 justify-between items-center border-b-[2px] border-gray-300">
            <div className="logo flex gap-[4px] text-2xl items-center">
                <IoFlowerSharp className="text-[#ff6c61]" />
                <span className="font-semibold text-blue-950">FlowTrack</span>
            </div>

            <div className="hidden lg:flex links text-gray-700 gap-10">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/register">Register</Link>
            </div>

            <div>
                <Link to="/dashboard">
                    <Button>Get Started</Button>
                </Link>
            </div>
        </div>
    )
}