import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/Button";
import { toast } from "react-toastify";


const LogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token missing");
        }

        const response = await fetch(
          `https://period-tracker-web-app.onrender.com/api/cycles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setLog(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load log details");

        if (err.message.includes("401")) {
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogDetails();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(
          `https://period-tracker-web-app.onrender.com/api/cycles/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to delete log");
        }
        toast.success("Log deleted successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/logs");
        }, 3000);
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Failed to delete log", {
          position: "top-center",
          autoClose: 2000,
        });
        setError(err.message || "Failed to delete log");
      }
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Back to Logs
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!log) {
    return (
      <DashboardLayout>
        <div className="p-4 text-center">
          <p>Log not found</p>
          <button
            onClick={() => navigate("/logs")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            View All Logs
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const startDate = new Date(log.startDate);
  const endDate = new Date(log.endDate);
  const cycleEndDate = new Date(startDate);
  cycleEndDate.setDate(startDate.getDate() + log.cycleLength);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-800">
            Period Log Details
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm lg:text-lg text-purple-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Logs
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-purple-800 mb-2">
                  Period Date
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Started:</span>{" "}
                  {format(startDate, "MMMM do, yyyy")}
                </p>

                <p className="text-gray-600">
                  <span className="font-medium">Duration:</span>{" "}
                  {log.periodLength} days
                </p>
              </div>

              <div className="border-b pb-4">
                <h2 className="text-lg font-semibold text-purple-800 mb-2">
                  Cycle Information
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Cycle Length:</span>{" "}
                  {log.cycleLength} days
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Expected Next Period:</span>{" "}
                  {format(cycleEndDate, "MMMM do, yyyy")}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Flow:</span>{" "}
                  <span className="capitalize">{log.flowIntensity}</span>
                </p>
              </div>
            </div>

            {log.symptoms?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-purple-800 mb-2">
                  Symptoms
                </h2>
                <div className="flex flex-wrap gap-2">
                  {log.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {log.notes && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Notes
                </h2>
                <p className="text-gray-600 whitespace-pre-line">{log.notes}</p>
              </div>
            )}

            <div className="text-sm text-gray-500 mt-6 pt-4 border-t">
              <p>
                Logged on{" "}
                {format(new Date(log.createdAt), "MMMM do, yyyy 'at' h:mm a")}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end space-x-4 mt-8">
              <Link to={`/prediction/${log._id}`}>
                <Button className="px-4 cursor-pointer py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Prediction
                </Button>
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LogDetails;
