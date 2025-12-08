import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ Store correctly
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      toast.success(response.data.message);
      setError(null);
      navigate("/");
    } catch (error) {
      // ✅ SAFE error handling (no crashes)
      const msg = error.response?.data?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    }

    // ✅ Reset inputs ONLY after submit
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Login
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back! Please login
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={HandleSubmit}>
          {/* ✅ EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // ✅ REQUIRED
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:border-blue-500 focus:ring-blue-500 focus:ring-2 
                         outline-none transition"
            />
          </div>

          {/* ✅ PASSWORD + SHOW/HIDE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showpassword ? "text" : "password"}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // ✅ REQUIRED
                className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-xl 
                           focus:border-blue-500 focus:ring-blue-500 focus:ring-2 
                           outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showpassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm 
                           text-blue-600 font-medium hover:text-blue-800 transition"
              >
                {showpassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ✅ FORGOT PASSWORD */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* ✅ SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl 
                       hover:bg-blue-700 transition-all shadow-md hover:shadow-lg 
                       active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* ✅ REGISTER LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

