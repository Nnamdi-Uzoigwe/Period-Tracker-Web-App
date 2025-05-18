import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaBars } from "react-icons/fa";

export default function LogDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 fixed lg:relative z-50`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex flex-col flex-1">
        {/* Mobile Topbar */}
        <div className="lg:hidden w-full bg-purple-950">
          <button
            className="cursor-pointer p-4 text-2xl text-white"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
        <div className="max-w-2xl mx-auto p-6 w-full">Log Details</div>
      </div>
    </div>
  );
}
