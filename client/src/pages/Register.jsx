
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      const response = await fetch("https://period-tracker-web-app.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('newUserName', data.user.name);
        toast.success("Registration Successful!", {
                    position: "top-center",
                    autoClose: 2000,
        })
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } else {
        toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
        })
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
      })
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <img src="/login.png" alt="" className="hidden lg:block" />

      <div className="flex flex-col h-screen p-4 items-center justify-center border-l-2 border-gray-300">
        <h4 className="text-purple-950 text-3xl font-semibold mb-10">
          Create an Account
        </h4>

        <form onSubmit={handleRegister}>
          <div>
            <p className="text-lg font-medium mb-2">Your Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter your name..."
              className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3"
              onChange={handleChange}
              required
            />
          </div>
          <div className="my-4">
            <p className="text-lg font-medium mb-2">Your Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email..."
              className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <p className="text-lg font-medium mb-2">Your Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password..."
              className="border-[2px] border-gray-400 rounded w-[300px] lg:w-[400px] p-3"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-purple-500 px-4 py-3 mt-2 cursor-pointer flex items-center justify-center text-md w-full hover:bg-purple-600 rounded text-white"
          >
            {loading ? <Spinner /> : <span>Register</span>}

          </button>
        </form>

        <p className="mt-10">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}