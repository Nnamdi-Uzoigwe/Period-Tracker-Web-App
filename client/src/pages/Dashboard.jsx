import Sidebar from "../components/Sidebar";
import PeriodLogging from "./PeriodLogging";

export default function Dashboard() {
    return (
        <div className="flex">
            <Sidebar />

            <div className="right ml-[300px]">
                <PeriodLogging />
            </div>
        </div>
    )
}