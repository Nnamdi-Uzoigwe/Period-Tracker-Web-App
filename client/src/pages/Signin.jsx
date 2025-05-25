import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { handleLoginSuccess } from "../components/UserAvatar";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
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
        handleLoginSuccess({
          email: data.user?.email || formData.email,
          username: data.user?.username || formData.email.split("@")[0],
        });
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error("Incorrect email or password", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An error occurred during login", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email first", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setOtpLoading(true);
    try {
      const response = await fetch(
        "https://period-tracker-web-app.onrender.com/api/auth/send-reset-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent to your email!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        toast.error(data.message || "Failed to send OTP", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error("OTP sending error:", err);
      toast.error("Failed to send OTP", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <img src="/login.png" alt="" className="hidden lg:block" />

      <div className="flex flex-col h-screen p-4 items-center justify-center border-l-2 border-gray-300">
        <h4 className="text-purple-950 text-3xl font-semibold mb-10">Sign in</h4>

        <form className="w-full max-w-[400px]">
          <div>
            <p className="text-lg font-medium mb-2">Your Email</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Enter your email..."
              className="border-[2px] border-gray-400 rounded w-full p-3"
              onChange={handleChange}
            />
          </div>
          <div className="my-4">
            <p className="text-lg font-medium mb-2">Your Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password..."
              className="border-[2px] border-gray-400 rounded w-full p-3"
              onChange={handleChange}
            />
          </div>

          <button
            className="mt-8 bg-purple-500 px-4 py-3 cursor-pointer text-md flex items-center justify-center w-full hover:bg-purple-600 rounded text-white"
            onClick={handleLogin}
            disabled={loading}
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
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between w-full max-w-[400px]">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={otpLoading}
              className="cursor-pointer text-purple-600 hover:text-purple-800 text-[15px] font-medium"
            >
              {otpLoading ? (
                <span className="flex items-center justify-center gap-2">
                  Sending OTP <Spinner size="small" />
                </span>
              ) : (
                "Forgot Password?"
              )}
            </button>
          <p className="text-sm mt-4 lg:mt-0">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 block">
              Create an account here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
