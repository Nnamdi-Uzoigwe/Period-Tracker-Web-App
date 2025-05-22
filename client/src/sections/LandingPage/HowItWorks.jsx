import img1 from "/profile.png"
import img2 from "/womanCalendar.png"
import img3 from "/data.png"
import Button from "../../components/Button"
import { Link } from "react-router-dom"

export default function HowItWorks() {
    const worksArray = [
        {
            id: 1,
            imgName: img1,
            caption: "Create an account",
            description: "Sign up quickly and securely to begin tracking your cycle and symptoms.",
            button: "Create"
        },
        {
            id: 2,
            imgName: img2,
            caption: "Log your period date",
            description: "Easily input your last period date and symptoms to personalize your cycle tracking.",
            button: "Log Period"
        },
        {
            id: 3,
            imgName: img3,
            caption: "Get predictions for your next cycle",
            description: "Smart forecasts for your next period, ovulation, and symptoms—so you're always prepared.",
            button: "Get Prediction"
        }
    ]

    return (
        <div className="bg-gray-100 px-8 lg:px-40 py-20">
            <h2 className="text-[30px] font-semibold mb-10 text-gray-700 underline text-center lg:text-left">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {worksArray.map((item) => (
                    <div className="bg-white rounded-lg px-4 py-6 flex flex-col items-center" key={item.id}>
                        <img src={item.imgName} alt="" className="w-[200px] h-[150px]" />

                        <h3 className="text-xl text-center text-gray-700 font-medium my-2">{item.caption}</h3>
                        <p className="text-center text-sm text-gray-600 mb-4">
                            {item.description}
                        </p>
                        <Button><Link to={item.button === "Create" ? "/register" : "/dashboard"}>{item.button}</Link></Button>
                    </div>
                ))}
            </div>
        </div>
    )
}