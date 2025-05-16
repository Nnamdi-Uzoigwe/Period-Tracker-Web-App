import Sidebar from "../components/Sidebar";
import PeriodLogging from "./PeriodLogging";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Hamburger icon for mobile */}
        <button
          className="lg:hidden p-4 text-2xl text-white bg-[#26134d]"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <div className="right mt-20 ml-0 lg:ml-[310px] flex flex-col justify-center">
          <h1 className=" text-2xl font-semibold mt-0 ml-5 lg:ml-[320px] text-gray-500">
            Welcome to Celestia, <span className="text-purple-700">XXX!</span>
          </h1>
          <PeriodLogging />
        </div>
      </div>
    </div>
  );
}
