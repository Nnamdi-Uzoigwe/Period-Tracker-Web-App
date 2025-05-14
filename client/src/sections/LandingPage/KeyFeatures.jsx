import { FaSeedling } from "react-icons/fa6"
import { IoCalendarNumberSharp } from "react-icons/io5"
import { TbMoodCheck } from "react-icons/tb";
import { PiLockFill } from "react-icons/pi";

export default function KeyFeatures() {
    const featuresArray = [
        {
            id: 1,
            caption: "Cycle Prediction",
            description: "Get accurate forecasts for your next period, so you're never caught off guard.",
            iconName: <IoCalendarNumberSharp className="text-[30px] text-gray-800" />
        },
        {
            id: 2,
            caption: "Fertile Window",
            description: "Track your ovulation and fertile days—whether you're planning or avoiding pregnancy",
            iconName: <FaSeedling className="text-[30px] text-gray-800" />
        },
        {
            id: 3,
            caption: "Symptom Tracking",
            description: "Log cramps, moods, and flow patterns to understand your body better.",
            iconName: <TbMoodCheck className="text-[30px] text-gray-800" />
        },
        {
            id: 4,
            caption: "Secure & Private",
            description: "Your data is encrypted and never shared. Period tracking should be safe and stigma-free!",
            iconName: <PiLockFill className="text-[30px] text-gray-800" />
        }
    ]
    return (
        <div className="px-8 lg:px-40 py-20">
            <h3 className="text-[30px] font-semibold mb-10 text-gray-700 underline text-center lg:text-left">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-4">
                {featuresArray.map((item) => (
                    <div className="bg-gray-200 flex flex-col p-4 items-center justify-center h-[300px] w-[300px] clip-hexagon">
                        <div>{item.iconName}</div>
                        <h3 className="text-xl text-[#6835ba] font-medium my-2">{item.caption}</h3>
                        <p className="text-center text-sm text-gray-600 mb-4 w-[60%] font-semibold">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}