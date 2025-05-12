import Sidebar from "../components/Sidebar";
import PeriodLogging from "./PeriodLogging";

export default function Dashboard() {
    return (
        <div className="flex">
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            <div className="right mt-20 ml-0 lg:ml-[300px] flex justify-center">
                <PeriodLogging />
            </div>
        </div>
    )
}