import Button from "../../components/Button";

export default function Subscribe() {
    return (
        <div className="px-8 lg:px-40 py-20 bg-gray-200">
            <div className="flex flex-col lg:flex-row text-gray-700 justify-between items-center">
                <div className="text-left mb-4 lg:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
                    <p className="mb-2">
                        Get the latest tips and insights on cycle tracking. No spam, ever.
                    </p>
                </div>

                <form className="flex flex-col lg:flex-row gap-3 items-center">
                    <input
                        type="text"
                        placeholder="Enter your email..."
                        className="border-2 border-gray-500 p-3 w-[350px] rounded-lg"     
                    />
                    <button className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white py-3 px-8 rounded-md w-full lg:w-fit">Submit</button>
                </form>
            </div>
        </div>
    )
}