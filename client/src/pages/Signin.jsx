import { Link } from "react-router-dom"

export default function Signin() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <img src="/login.png" alt="" className="hidden lg:block" />

            <div className="flex flex-col h-screen p-4 items-center justify-center border-l-2 border-gray-300">
                <h4 className="text-gray-600 text-3xl font-semibold mb-10">Sign in</h4>

                <form>
                    <div>
                        <p className="text-lg font-medium mb-2">Your Email</p>
                        <input type="text" placeholder="Enter your email..." className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3" />
                    </div>
                    <div className="my-4">
                        <p className="text-lg font-medium mb-2">Your Password</p>
                        <input type="password" placeholder="Enter your email..." className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3" />
                    </div>

                    <input type="submit" value="Login" className="mt-3 bg-purple-500 px-4 py-3 cursor-pointer text-md w-full hover:bg-purple-600 rounded text-white" />
                </form>

                <p className="mt-10">Don't have an account? <Link to="/register" className="text-purple-600 block lg:inline">Create an account here</Link></p>
            </div>
        </div>
    )
}