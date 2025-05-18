import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TbReport } from "react-icons/tb"
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaHistory, FaTimes } from "react-icons/fa"; 


export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
    return (
        <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block w-[300px] min-h-screen fixed left-0 bg-[#26134d] text-gray-200 flex flex-col pt-20`}>
            <h3 className="ml-10 text-2xl font-medium">Dashboard</h3>

            <div className="links mt-10 flex flex-col ml-10 gap-6">
                <Link to="/" className="flex items-center gap-2 text-lg">
                    <MdHome />
                    <span>Home</span>
                </Link>

                <Link to="/period-log" className="flex items-center gap-2 text-lg">
                    <TbReport />
                    <span>Log a Period</span>
                </Link>
                 
                <Link to="/logs" className="flex items-center gap-2 text-lg">
                    <IoMdLogIn />
                    <span>My Logs</span>
                </Link>

                <Link to="/log-history" className="flex items-center gap-2 text-lg">
                    <FaHistory />
                    <span>Log History</span>
                </Link>

                <Link to="/profile" className="flex items-center gap-2 text-lg">
                    <CgProfile />
                    <span>My Profile</span>
                </Link>

                <Link className="flex items-center gap-2 text-lg">
                    <IoMdLogOut />
                    <span>Logout</span>
                </Link>
            </div>

            {/* Overlay for mobile */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-40 bg-[#26134d] bg-opacity-50 md:hidden`}
        onClick={toggleSidebar}
      >
        <button
          className="cursor-pointer absolute top-4 left-4 text-white text-3xl z-50"
          onClick={(e) => {
            e.stopPropagation()
            toggleSidebar()
          }}
          >
          <FaTimes />
        </button>
        {/* <div className="absolute top-4 border-2 border-gray-400 rounded-full right-4" onClick={(e) => e.stopPropagation()}>
          {user ? <UserAvatar setShowLogoutModal={setShowLogoutModal} /> : null}
        </div> */}

        <div className="flex flex-col items-center justify-center h-full space-y-4 z-50">
          <Link
              to="/"
              className="text-xl text-white"
          >
            Home
          </Link>
          <Link
            to="/period-log"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Log a Period
          </Link>
          <Link
            to="/report-scam"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            My Logs
          </Link>
          <Link
            to="/profile"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            My Profile
          </Link>
          
        </div>
        </div>
        </div>
    )
}