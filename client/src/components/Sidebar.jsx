import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TbReport } from "react-icons/tb"
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function Sidebar() {
    return (
        <div className="w-[280px] h-screen fixed left-0 bg-[#26134d] text-gray-200 flex flex-col pt-20">
            <h3 className="ml-10 text-2xl font-medium">Dashboard</h3>

            <div className="links mt-10 flex flex-col ml-10 gap-6">
                <Link className="flex items-center gap-2 text-lg">
                    <MdHome />
                    <span>Home</span>
                </Link>

                <Link className="flex items-center gap-2 text-lg">
                    <TbReport />
                    <span>Log a Period</span>
                </Link>
                 
                <Link className="flex items-center gap-2 text-lg">
                    <IoMdLogIn />
                    <span>My Logs</span>
                </Link>

                <Link className="flex items-center gap-2 text-lg">
                    <CgProfile />
                    <span>My Profile</span>
                </Link>

                <Link className="flex items-center gap-2 text-lg">
                    <IoMdLogOut />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    )
}