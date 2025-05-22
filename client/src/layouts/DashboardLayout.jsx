import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import UserAvatar from "../components/UserAvatar";
import LogoutModal from "../components/LogoutModal";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const initials = sessionStorage.getItem("userInitials");
    const email = sessionStorage.getItem("userEmail");

    if (initials && email) {
      setUser({
        initials,
        email,
      });
    }
  }, []);

  const navLinks = [
    { to: "/", icon: <MdHome />, text: "Home" },
    { to: "/period-log", icon: <TbReport />, text: "Log Period" },
    { to: "/logs", icon: <FaHistory />, text: "My Logs" },
    { to: "/profile", icon: <CgProfile />, text: "Profile" },
    { to: "/logout", icon: <IoMdLogOut />, text: "Logout" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-[250px] xl:w-[300px] bg-[#2f115d] text-white border-r border-bg-[#2f115d]">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center ml-4 px-4 mb-8">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              {user && (
                <div className="ml-auto" onClick={() => setShowLogoutModal(true)}>
                  <UserAvatar /> 
                </div>
              )}
            </div>
            <nav className="flex-1 px-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to === '/logout' ? '#' : link.to}
                  className="flex items-center px-4 py-3 text-md font-medium transition-colors"
                  onClick={(e) => {
                    if(link.to === '/logout') {
                      e.stopPropagation()
                      setShowLogoutModal(true)
                    }
                  }}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  {link.text}
                </Link>
              ))}
            </nav>
            {showLogoutModal && (
              <LogoutModal onClose={() => setShowLogoutModal(false)} />
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-full transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden transition-transform duration-300 ease-in-out bg-[#2f115d] text-white`}
      >
        <div className="flex items-center justify-between p-5 border-b border-bg-[#2f115d]">
          {/* <h1 className="text-xl font-bold">Dashboard</h1> */}
          {user && (
            <div onClick={() => setShowLogoutModal(true)}>
              <UserAvatar />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:text-gray-300"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to === "/logout" ? "#" : link.to}
              onClick={(e) => {
                if (link.to === "/logout") {
                  e.preventDefault();
                  setShowLogoutModal(true);
                } else {
                  setSidebarOpen(false);
                }
              }}
              className="flex items-center px-4 py-3 my-1 text-md font-medium rounded-md transition-colors"
            >
              <span className="mr-3 text-lg">{link.icon}</span>
              {link.text}
            </Link>
          ))}
        </nav>

        {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        )}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-[#2f115d] py-2  shadow-sm z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-600"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-medium text-white">Dashboard</h2>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
