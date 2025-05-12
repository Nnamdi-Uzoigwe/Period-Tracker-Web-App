import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div className="grid grid-cols-2">
            <img src="/login.png" alt="" className="" />

            <div className="flex flex-col h-screen p-4 items-center justify-center border-l-2 border-gray-300">
                <h4 className="text-gray-600 text-3xl font-semibold mb-10">Create an Account</h4>

                <form>
                    <div>
                        <p className="text-lg font-medium mb-2">Your Name</p>
                        <input type="text" placeholder="Enter your email..." className="border-[2px] border-gray-400 rounded w-[400px] p-3" />
                    </div>
                    <div className="my-4">
                        <p className="text-lg font-medium mb-2">Your Email</p>
                        <input type="text" placeholder="Enter your name..." className="border-[2px] border-gray-400 rounded w-[400px] p-3" />
                    </div>
                    <div className="mb-6">
                        <p className="text-lg font-medium mb-2">Your Password</p>
                        <input type="password" placeholder="Enter your email..." className="border-[2px] border-gray-400 rounded w-[400px] p-3" />
                    </div>

                    <input type="submit" value="Register" className="bg-[#ff6c61] px-4 py-3 mt-2 cursor-pointer text-md w-full hover:bg-[#ff7361ec] rounded text-white" />
                </form>

                <p className="mt-10">Already have an account? <Link to="/signin" className="text-[#f74c40]">Login here</Link></p>
            </div>
        </div>
    )
}