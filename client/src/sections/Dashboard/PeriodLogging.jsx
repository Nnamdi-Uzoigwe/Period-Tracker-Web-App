import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import { FaBars } from "react-icons/fa6";

export default function PeriodLogging() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    cycleLength: "",
    periodLength: "",
    flowIntensity: "medium",
    symptoms: [],
    notes: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        symptoms: checked
          ? [...prev.symptoms, value]
          : prev.symptoms.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log("formdata:", formData);
    try {
      const response = await fetch("http://localhost:7000/api/cycles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit period data.");
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success("Period logged successfully!", {
        position: "top-center",
        autoClose: "2000",
      });
      // Reset the form after submission
      setFormData({
        startDate: "",
        endDate: "",
        cycleLength: "",
        periodLength: "",
        flowIntensity: "medium",
        symptoms: [],
        notes: "",
      });
      setTimeout(() => {
        navigate("/prediction");
      }, 3000);
    } catch (error) {
      console.error("Error submitting period data:", error.message);
      toast.error(error, {
        position: "top-center",
        autoClose: "2000",
      });
    }
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
        <div className="max-w-2xl mx-auto p-6 w-full bg-white">
          <h1 className="text-gray-600 text-[30px] font-semibold">Welcome, <span className="text-purple-600">XXX!</span></h1>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            Log Your Period
          </h2>
          <div className="p-3 bg-purple-50 border-l-4 border-purple-300 rounded-r-lg mb-6">
            <p className="text-sm text-gray-700">
              Record your cycle dates, flow, and symptoms to predict future
              periods and track patterns.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Period Dates */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Start date of your last period
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border-[2px] border-gray-400 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 border-[2px] border-gray-400 rounded"
                required
              />
            </div>

            {/* New: Cycle Length (days between periods) */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Cycle Length (days between periods)
              </label>
              <input
                type="number"
                name="cycleLength"
                value={formData.cycleLength}
                onChange={handleChange}
                min="21"
                max="45"
                className="w-full p-2 border-[2px] border-gray-400 rounded"
                placeholder="e.g., 28"
              />
            </div>

            {/* New: Period Length (days of bleeding) */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Period Length (days of bleeding)
              </label>
              <input
                type="number"
                name="periodLength"
                value={formData.periodLength}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full p-2 border-[2px] border-gray-400 rounded"
                placeholder="e.g., 5"
              />
            </div>

            {/* Flow Intensity */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Flow Intensity</label>
              <select
                name="flowIntensity"
                value={formData.flowIntensity}
                onChange={handleChange}
                className="w-full p-2 border-[2px] border-gray-400 rounded"
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            {/* Symptoms (Checkboxes) */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Symptoms</label>
              <div className="space-y-2">
                {[
                  "Cramps",
                  "Bloating",
                  "Headache",
                  "Fatigue",
                  "Mood Swings",
                ].map((symptom) => (
                  <label key={symptom} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={symptom}
                      checked={formData.symptoms.includes(symptom)}
                      onChange={handleChange}
                      className="rounded text-purple-600"
                    />
                    <span>{symptom}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border-[2px] border-gray-400 rounded"
                placeholder="Any additional details..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
            >
              Log Period
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
