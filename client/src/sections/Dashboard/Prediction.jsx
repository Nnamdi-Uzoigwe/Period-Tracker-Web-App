import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  format,
  isWithinInterval,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function Prediction() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthToShow, setMonthToShow] = useState(new Date());

  const fetchPrediction = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "https://period-tracker-web-app.onrender.com/api/prediction/latest",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("No prediction available");
      const data = await response.json();
      setPrediction(data);

      if (data?.nextPeriod) {
        const predictionDate = new Date(data.nextPeriod);
        setMonthToShow(predictionDate);
        setSelectedDate(predictionDate);
      }
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

  const fertileStart = new Date(prediction.fertileStart);
  const fertileEnd = new Date(prediction.fertileEnd);
  const ovulationDate = new Date(prediction.ovulationDate);
  const nextPeriod = new Date(prediction.nextPeriod);

  const isFertileDay = (date) =>
    isWithinInterval(date, { start: fertileStart, end: fertileEnd });
  const isOvulationDay = (date) => isSameDay(date, ovulationDate);
  const isPeriodDay = (date) => isSameDay(date, nextPeriod);

  const getModifiers = () => {
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(monthToShow),
      end: endOfMonth(monthToShow),
    });

    const fertileDays = daysInMonth.filter(isFertileDay);
    const ovulationDays = daysInMonth.filter(isOvulationDay);
    const periodDays = daysInMonth.filter(isPeriodDay);

    return {
      fertile: fertileDays,
      ovulation: ovulationDays,
      period: periodDays,
    };
  };

  const modifiers = getModifiers();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-purple-600">
          Cycle Predictions for Your New Phase
        </h2>
        <p className="text-purple-800">
          Thanks for Checking In - Here's Your Cycle Forecast
        </p>
      </div>

      <div className="bg-pink-50 border-l-4 border-pink-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <span className="text-pink-500 mr-2">🌸</span>
          <p className="text-gray-700">
            Hey there! While we do our best to predict your cycle, bodies don't
            always follow algorithms. The more you track, the smarter your
            predictions get!
          </p>
        </div>
      </div>

      {/* Custom Calendar using DayPicker */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100 max-w-3xl mx-auto">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={monthToShow}
          onMonthChange={setMonthToShow}
          modifiers={modifiers}
          modifiersClassNames={{
            fertile: "bg-red-100 text-red-800",
            ovulation: "bg-orange-100 text-orange-800",
            period: "bg-purple-100 text-purple-800",
          }}
          className="w-full custom-calendar"
        />
      </div>

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

      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          🌸 <strong>Fertile Window:</strong> You are most likely to be fertile
          from{" "}
          <span className="text-red-600 font-medium">
            {format(new Date(prediction.fertileStart), "MMMM d")}
          </span>{" "}
          to{" "}
          <span className="text-red-600 font-medium">
            {format(new Date(prediction.fertileEnd), "MMMM d")}
          </span>
          . During this time, your chances of conception are at their highest.
        </p>

        <p>
          🔶 <strong>Ovulation Day:</strong> Your estimated ovulation date is{" "}
          <span className="text-orange-600 font-medium">
            {format(new Date(prediction.ovulationDate), "MMMM d, yyyy")}
          </span>
          . Ovulation typically occurs around the middle of your cycle.
        </p>

        <p>
          💜 <strong>Next Period:</strong> Based on your cycle, your next period
          is expected to start on{" "}
          <span className="text-purple-600 font-medium">
            {format(new Date(prediction.nextPeriod), "MMMM d, yyyy")}
          </span>
          . Tracking this helps in managing your wellness and planning.
        </p>
      </div>

      <div className="mt-10">
        <Link to="/logs">
          <Button>View my logs</Button>
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-3">Cycle Timeline</h3>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute h-full bg-gray-100 w-full"></div>

          <div
            className="absolute h-full bg-red-400"
            style={{
              left: `${
                ((fertileStart.getTime() -
                  (nextPeriod.getTime() - prediction.cycleLength * 86400000)) /
                  (prediction.cycleLength * 86400000)) *
                100
              }%`,
              width: `${
                ((fertileEnd.getTime() - fertileStart.getTime()) /
                  (prediction.cycleLength * 86400000)) *
                100
              }%`,
            }}
          />

          <div
            className="absolute w-1 h-3 -mt-0.5 bg-orange-500 rounded-full"
            style={{
              left: `${
                ((ovulationDate.getTime() -
                  (nextPeriod.getTime() - prediction.cycleLength * 86400000)) /
                  (prediction.cycleLength * 86400000)) *
                100
              }%`,
            }}
          />

          <div className="absolute right-0 w-1 h-3 -mt-0.5 bg-purple-500 rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  );
}
