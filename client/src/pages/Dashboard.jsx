import Sidebar from "../components/Sidebar";
import PeriodLogging from "./PeriodLogging";

export default function Dashboard() {
    return (
        <div className="flex">
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            <div className="right mt-20 ml-0 lg:ml-[300px] flex flex-col justify-center">
                <h1 className=" text-2xl font-semibold mt-0 ml-5 lg:ml-[320px] text-purple-700">Welcome to Celestia, XXX!</h1>
                <PeriodLogging />
            </div>
        </div>
    )
}