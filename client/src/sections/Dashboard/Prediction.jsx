// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import { format, isWithinInterval, eachDayOfInterval, isSameDay } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";

// // Updated day component with circled dates
// const CircledDay = ({ date, prediction }) => {
//   if (!prediction) return <div>{date.getDate()}</div>;

//   const fertileStart = new Date(prediction.fertileStart);
//   const fertileEnd = new Date(prediction.fertileEnd);
//   const ovulationDate = new Date(prediction.ovulationDate);
//   const nextPeriod = new Date(prediction.nextPeriod);

//   const isFertile = isWithinInterval(date, { start: fertileStart, end: fertileEnd });
//   const isOvulation = isSameDay(date, ovulationDate);
//   const isPeriod = isSameDay(date, nextPeriod);

//   // Determine circle color
//   let circleClass = "";
//   if (isFertile) circleClass = "bg-red-400";
//   if (isOvulation) circleClass = "border-orange-400";
//   if (isPeriod) circleClass = "border-purple-400";

//   return (
//     <div className={`relative ${circleClass ? "p-1" : ""}`}>
//       {date.getDate()}
//       {circleClass && (
//         <div className={`absolute inset-0 rounded-full border-2 ${circleClass}`}></div>
//       )}
//     </div>
//   );
// };

// export default function Prediction() {
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const fetchPrediction = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await fetch("http://localhost:7000/api/prediction/latest", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("No prediction available");
//       setPrediction(await response.json());
//     } catch (err) {
//       toast.error("Failed to fetch prediction");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrediction();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!prediction) return <p className="text-center mt-10">No prediction data</p>;

//   // Generate all dates in the current cycle for the mini calendar
//   const cycleStart = new Date(prediction.nextPeriod);
//   cycleStart.setDate(cycleStart.getDate() - prediction.cycleLength);

//   return (
//     <div className="p-6 max-w-3xl mx-auto mt-[80px]">
//       <h2 className="text-2xl font-bold mb-6 text-purple-600">Your Cycle Overview</h2>

//       {/* Modern Date Picker with Circled Dates */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
//         <DatePicker
//           selected={selectedDate}
//           onChange={setSelectedDate}
//           inline
//           renderDayContents={(day, date) => (
//             <CircledDay date={date} prediction={prediction} />
//           )}
//           calendarClassName="!border-0"
//           dayClassName={() => "!w-10 !h-10 hover:bg-gray-50"}
//         />
//       </div>

//       {/* Key Dates Card */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
//           <h3 className="font-medium text-red-800">Fertile Window</h3>
//           <p className="text-sm text-red-600">
//             {format(new Date(prediction.fertileStart), "MMM d")} -{" "}
//             {format(new Date(prediction.fertileEnd), "MMM d")}
//           </p>
//         </div>

//         <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
//           <h3 className="font-medium text-orange-800">Ovulation</h3>
//           <p className="text-sm text-orange-600">
//             {format(new Date(prediction.ovulationDate), "MMM d, yyyy")}
//           </p>
//         </div>

//         <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
//           <h3 className="font-medium text-purple-800">Next Period</h3>
//           <p className="text-sm text-purple-600">
//             {format(new Date(prediction.nextPeriod), "MMM d, yyyy")}
//           </p>
//         </div>
//       </div>

//       {/* Timeline Visualization */}
//       <div className="mt-8">
//         <h3 className="font-medium mb-3">Cycle Timeline</h3>
//         <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
//           {/* Full Cycle Background */}
//           <div className="absolute h-full bg-gray-100 w-full"></div>

//           {/* Fertile Window */}
//           {prediction.fertileStart && prediction.fertileEnd && (
//             <div
//               className="absolute h-full bg-red-400"
//               style={{
//                 left: `${(
//                   (new Date(prediction.fertileStart).getTime() - cycleStart.getTime()) /
//                   (new Date(prediction.nextPeriod).getTime() - cycleStart.getTime()) * 100
//                 )}%`,
//                 width: `${(
//                   (new Date(prediction.fertileEnd).getTime() - new Date(prediction.fertileStart).getTime()) /
//                   (new Date(prediction.nextPeriod).getTime() - cycleStart.getTime()) * 100
//                 )}%`
//               }}
//             />
//           )}

//           {/* Ovulation Day Indicator */}
//           {prediction.ovulationDate && (
//             <div
//               className="absolute w-1 h-3 -mt-0.5 bg-orange-500 rounded-full"
//               style={{
//                 left: `${(
//                   (new Date(prediction.ovulationDate).getTime() - cycleStart.getTime()) /
//                   (new Date(prediction.nextPeriod).getTime() - cycleStart.getTime()) * 100
//                 )}%`
//               }}
//             />
//           )}

//           {/* Next Period Indicator */}
//           <div className="absolute right-0 w-1 h-3 -mt-0.5 bg-purple-500 rounded-full" />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Sidebar from "../../components/Sidebar";
import { FaBars } from "react-icons/fa";
import {
  format,
  isWithinInterval,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Custom day component with background colors
const HighlightedDay = ({ date, prediction }) => {
  if (!prediction) return <div className="day-number">{date.getDate()}</div>;

  const fertileStart = new Date(prediction.fertileStart);
  const fertileEnd = new Date(prediction.fertileEnd);
  const ovulationDate = new Date(prediction.ovulationDate);
  const nextPeriod = new Date(prediction.nextPeriod);

  const isFertile = isWithinInterval(date, {
    start: fertileStart,
    end: fertileEnd,
  });
  const isOvulation = isSameDay(date, ovulationDate);
  const isPeriod = isSameDay(date, nextPeriod);

  // Determine background color
  let bgClass = "hover:bg-gray-50"; // Default hover
  if (isFertile) bgClass = "bg-red-100 text-red-800 hover:bg-red-200";
  if (isOvulation)
    bgClass = "bg-orange-100 text-orange-800 hover:bg-orange-200";
  if (isPeriod) bgClass = "bg-purple-100 text-purple-800 hover:bg-purple-200";

  return <div className={`day-cell ${bgClass}`}>{date.getDate()}</div>;
};

export default function Prediction() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchPrediction = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:7000/api/prediction/latest",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("No prediction available");
      setPrediction(await response.json());
    } catch (err) {
      toast.error("Failed to fetch prediction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!prediction)
    return <p className="text-center mt-10">No prediction data</p>;

  // Generate all dates in the current cycle
  const cycleStart = new Date(prediction.nextPeriod);
  cycleStart.setDate(cycleStart.getDate() - prediction.cycleLength);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 fixed lg:relative z-50`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div className="flex flex-col flex-1">
        {/* Mobile Topbar */}
        <div className="lg:hidden w-full bg-purple-950">
          <button
            className="cursor-pointer p-4 text-2xl text-white"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
        <div className="p-6 max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">
            Your Cycle Overview
          </h2>

          {/* Calendar with Background Highlights */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              inline
              renderDayContents={(day, date) => (
                <HighlightedDay date={date} prediction={prediction} />
              )}
              calendarClassName="custom-calendar"
            />
          </div>

          {/* Key Dates Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
              <h3 className="font-medium text-red-800">Fertile Window</h3>
              <p className="text-sm text-red-600">
                {format(new Date(prediction.fertileStart), "MMM d")} -{" "}
                {format(new Date(prediction.fertileEnd), "MMM d")}
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
              <h3 className="font-medium text-orange-800">Ovulation</h3>
              <p className="text-sm text-orange-600">
                {format(new Date(prediction.ovulationDate), "MMM d, yyyy")}
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <h3 className="font-medium text-purple-800">Next Period</h3>
              <p className="text-sm text-purple-600">
                {format(new Date(prediction.nextPeriod), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="mt-8">
            <h3 className="font-medium mb-3">Cycle Timeline</h3>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute h-full bg-gray-100 w-full"></div>

              {prediction.fertileStart && prediction.fertileEnd && (
                <div
                  className="absolute h-full bg-red-400"
                  style={{
                    left: `${
                      ((new Date(prediction.fertileStart).getTime() -
                        cycleStart.getTime()) /
                        (new Date(prediction.nextPeriod).getTime() -
                          cycleStart.getTime())) *
                      100
                    }%`,
                    width: `${
                      ((new Date(prediction.fertileEnd).getTime() -
                        new Date(prediction.fertileStart).getTime()) /
                        (new Date(prediction.nextPeriod).getTime() -
                          cycleStart.getTime())) *
                      100
                    }%`,
                  }}
                />
              )}

              {prediction.ovulationDate && (
                <div
                  className="absolute w-1 h-3 -mt-0.5 bg-orange-500 rounded-full"
                  style={{
                    left: `${
                      ((new Date(prediction.ovulationDate).getTime() -
                        cycleStart.getTime()) /
                        (new Date(prediction.nextPeriod).getTime() -
                          cycleStart.getTime())) *
                      100
                    }%`,
                  }}
                />
              )}

              <div className="absolute right-0 w-1 h-3 -mt-0.5 bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import { format, isWithinInterval, eachDayOfInterval } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";

// // Custom styled day component
// const DayWithDot = ({ date, prediction }) => {
//   if (!prediction) return <div>{date.getDate()}</div>;

//   const fertileStart = new Date(prediction.fertileStart);
//   const fertileEnd = new Date(prediction.fertileEnd);
//   const ovulationDate = new Date(prediction.ovulationDate);
//   const nextPeriod = new Date(prediction.nextPeriod);

//   const isFertile = isWithinInterval(date, { start: fertileStart, end: fertileEnd });
//   const isOvulation = format(date, "yyyy-MM-dd") === format(ovulationDate, "yyyy-MM-dd");
//   const isPeriod = format(date, "yyyy-MM-dd") === format(nextPeriod, "yyyy-MM-dd");

//   return (
//     <div className="relative">
//       {date.getDate()}
//       <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex justify-center">
//         {isFertile && <div className="h-1 w-1 rounded-full bg-red-500"></div>}
//         {isOvulation && <div className="h-1 w-1 rounded-full bg-orange-500"></div>}
//         {isPeriod && <div className="h-1 w-1 rounded-full bg-purple-500"></div>}
//       </div>
//     </div>
//   );
// };

// export default function Prediction() {
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const fetchPrediction = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await fetch("http://localhost:7000/api/prediction/latest", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("No prediction available");
//       setPrediction(await response.json());
//     } catch (err) {
//       toast.error("Failed to fetch prediction");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchPrediction(); }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!prediction) return <p className="text-center mt-10">No prediction data</p>;

//   // Generate all dates in the current cycle for the mini calendar
//   const cycleStart = new Date(prediction.nextPeriod);
//   cycleStart.setDate(cycleStart.getDate() - prediction.cycleLength);
//   const cycleDates = eachDayOfInterval({ start: cycleStart, end: new Date(prediction.nextPeriod) });

//   return (
//     <div className="p-6 max-w-3xl mx-auto mt-[80px]">
//       <h2 className="text-2xl font-bold mb-6 text-purple-600">Your Cycle Overview</h2>

//       {/* Modern Date Picker */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
//         <DatePicker
//           selected={selectedDate}
//           onChange={setSelectedDate}
//           inline
//           renderDayContents={(day, date) => (
//             <DayWithDot date={date} prediction={prediction} />
//           )}
//           calendarClassName="!border-0"
//           dayClassName={() => "!w-10 !h-10 hover:bg-gray-50 rounded-full"}
//         />
//       </div>

//       {/* Key Dates Card */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
//           <h3 className="font-medium text-red-800">Fertile Window</h3>
//           <p className="text-sm text-red-600">
//             {format(new Date(prediction.fertileStart), "MMM d")} -{" "}
//             {format(new Date(prediction.fertileEnd), "MMM d")}
//           </p>
//         </div>

//         <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
//           <h3 className="font-medium text-orange-800">Ovulation</h3>
//           <p className="text-sm text-orange-600">
//             {format(new Date(prediction.ovulationDate), "MMM d, yyyy")}
//           </p>
//         </div>

//         <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
//           <h3 className="font-medium text-purple-800">Next Period</h3>
//           <p className="text-sm text-purple-600">
//             {format(new Date(prediction.nextPeriod), "MMM d, yyyy")}
//           </p>
//         </div>
//       </div>

//       {/* Timeline Visualization (Bonus)
//       <div className="mt-8">
//         <h3 className="font-medium mb-3">Cycle Timeline</h3>
//         <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className="absolute h-full bg-purple-400"
//             style={{
//               left: "0%",
//               width: `${(prediction.cycleLength - prediction.periodLength) / prediction.cycleLength * 100}%`,
//             }}
//           />
//           <div
//             className="absolute h-full bg-red-400"
//             style={{
//               left: `${((new Date(prediction.fertileStart) - cycleStart) / (new Date(prediction.nextPeriod) - cycleStart) * 100}%`,
//               width: `${(new Date(prediction.fertileEnd) - new Date(prediction.fertileStart)) / (new Date(prediction.nextPeriod) - cycleStart) * 100}%`,
//             }}
//           />
//           <div
//             className="absolute w-1 h-3 -mt-0.5 bg-orange-500 rounded-full"
//             style={{
//               left: `${((new Date(prediction.ovulationDate) - cycleStart) / (new Date(prediction.nextPeriod) - cycleStart) * 100}%`,
//             }}
//           />
//         </div>
//       </div> */}
//       {/* Timeline Visualization */}
// <div className="mt-8">
//   <h3 className="font-medium mb-3">Cycle Timeline</h3>
//   <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
//     {/* Full Cycle Background */}
//     <div className="absolute h-full bg-gray-100 w-full"></div>

//     {/* Fertile Window */}
//     {prediction.fertileStart && prediction.fertileEnd && (
//       <div
//         className="absolute h-full bg-red-400"
//         style={{
//           left: `${((new Date(prediction.fertileStart).getTime() - cycleStart.getTime()) /
//                  (new Date(prediction.nextPeriod).getTime() - cycleStart.getTime())) * 100}%`,
//           width: `${((new Date(prediction.fertileEnd).getTime() - new Date(prediction.fertileStart).getTime()) /
//                   (new Date(prediction.nextPeriod).getTime() - cycleStart.getTime())) * 100}%`
//         }}
//       />
//     )}

//     {/* Ovulation Day Indicator */}
//     {prediction.ovulationDate && (
//       <div
//         className="absolute w-1 h-3 -mt-0.5 bg-orange-500 rounded-full"
//         style={{
//           left: `${((new Date(prediction.ovulationDate).getTime() - cycleStart.getTime()) /
//                  (new Date(prediction.nextPeriod).getTime() - cycleStart.getTime())) * 100}%`
//         }}
//       />
//     )}

//     {/* Next Period Indicator */}
//     <div className="absolute right-0 w-1 h-3 -mt-0.5 bg-purple-500 rounded-full" />
//   </div>
// </div>
//     </div>
//   );
// }
