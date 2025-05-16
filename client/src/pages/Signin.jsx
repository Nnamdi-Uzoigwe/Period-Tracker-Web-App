import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(
        "https://period-tracker-web-app.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error("Incorrect name or password", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <img src="/login.png" alt="" className="hidden lg:block" />

      <div className="flex flex-col h-screen p-4 items-center justify-center border-l-2 border-gray-300">
        <h4 className="text-gray-600 text-3xl font-semibold mb-10">Sign in</h4>

        <form>
          <div>
            <p className="text-lg font-medium mb-2">Your Email</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Enter your email..."
              className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3"
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <p className="text-lg font-medium mb-2">Your Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your email..."
              className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3"
              onChange={handleChange}
            />
          </div>

          <button
            className="mt-3 bg-purple-500 px-4 py-3 cursor-pointer text-md flex items-center justify-center w-full hover:bg-purple-600 rounded text-white"
            onClick={handleLogin}
          >
            {loading ? (
              <span className="flex gap-2">
                Logging in
                <Spinner />
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <p className="mt-10">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 block lg:inline">
            Create an account here
          </Link>
        </p>
      </div>
    </div>
  );
}
