import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function PredictionDetail() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthToShow, setMonthToShow] = useState(new Date());
  const { id } = useParams();

  const fetchPrediction = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `https://period-tracker-web-app.onrender.com/api/prediction/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch prediction");
      const data = await response.json();
      setPrediction(data);

      if (data?.nextPeriod) {
        const predictionDate = new Date(data.nextPeriod);
        setMonthToShow(predictionDate);
        setSelectedDate(predictionDate);
      }
    } catch (err) {
      toast.error("Failed to fetch prediction for log");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </DashboardLayout>
    );
  }

   if (!prediction) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold">No prediction found</h2>
          <p className="text-gray-600">No prediction found for this cycle log</p>
        </div>
      </DashboardLayout>
    );
  }


 if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </DashboardLayout>
    );
  }


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
          Cycle Prediction Details
        </h2>
        <p className="text-purple-800">Here's your prediction for this specific log</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100 max-w-3xl ">
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
          className="flex justify-center"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
          <h3 className="font-medium text-red-800">Fertile Window</h3>
          <p className="text-sm text-red-600">
            {format(fertileStart, "MMM d")} - {format(fertileEnd, "MMM d")}
          </p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <h3 className="font-medium text-orange-800">Ovulation</h3>
          <p className="text-sm text-orange-600">
            {format(ovulationDate, "MMM d, yyyy")}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
          <h3 className="font-medium text-purple-800">Next Period</h3>
          <p className="text-sm text-purple-600">
            {format(nextPeriod, "MMM d, yyyy")}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          🌸 <strong>Fertile Window:</strong> You are most fertile from {" "}
          <span className="text-red-600 font-medium">
            {format(fertileStart, "MMMM d")}
          </span>{" "}
          to {" "}
          <span className="text-red-600 font-medium">
            {format(fertileEnd, "MMMM d")}
          </span>
          .
        </p>

        <p>
          🔶 <strong>Ovulation Day:</strong> Estimated ovulation is on {" "}
          <span className="text-orange-600 font-medium">
            {format(ovulationDate, "MMMM d, yyyy")}
          </span>
          .
        </p>

        <p>
          💜 <strong>Next Period:</strong> Expected period begins on {" "}
          <span className="text-purple-600 font-medium">
            {format(nextPeriod, "MMMM d, yyyy")}
          </span>
          .
        </p>
      </div>

      <div className="mt-10">
        <Link to="/logs">
          <Button>Back to logs</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
}