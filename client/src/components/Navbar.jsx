import { IoFlowerSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white opacity-100 lg:opacity-95 py-4 lg:py-6 px-8 lg:px-40 flex z-50 justify-between items-center border-b-[2px] border-gray-300">
      <div className="logo flex gap-[4px] text-2xl items-center">
        <IoFlowerSharp className="text-purple-900" />
        <span className="font-semibold text-purple-900">Celestia</span>
      </div>

      <div className="hidden lg:flex links text-gray-800 gap-10">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>
      </div>

      <div>
        <Link to="/dashboard" className="hidden lg:block">
          <Button>Get Started</Button>
        </Link>
      </div>
      <div
        onClick={toggleMenu}
        className=" block lg:hidden cursor-pointer text-gray-700 focus:outline-none"
        aria-label="Toggle Menu"
      >
        <button>
          {isOpen ? (
            <FaTimes size={24} className="cursor-pointer" />
          ) : (
            <FaBars size={24} className="cursor-pointer" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-white shadow-lg py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/register"
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
              <div className="pt-2">
                {/* {user ? (
                            <div className="flex justify-center">
                            <UserAvatar setShowLogoutModal={setShowLogoutModal} />
                            </div>
                        ) : (
                            <Button>
                            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            </Button>
                        )} */}
                <Link to="/dashboard" className="">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
