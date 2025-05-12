import Button from "../../components/Button";

export default function Subscribe() {
    return (
        <div className="px-8 lg:px-40 py-20 bg-gray-200">
            <div className="flex flex-col lg:flex-row text-gray-700 justify-between items-center">
                <div className="text-center lg:text-left">
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
                    <Button>Submit</Button>
                </form>
            </div>
        </div>
    )
}