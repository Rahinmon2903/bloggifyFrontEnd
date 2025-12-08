import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api.js";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/register",
        { name, email, password }
      );
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
     
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setName("");
    setEmail("");
    setPassword("");

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-10">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Create an account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Join us to continue to your dashboard
          </p>

          {/* ❌ Error Message (Improved) */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <form className="space-y-5" onSubmit={HandleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-2 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 focus:ring-2 outline-none transition"
            />
          </div>

          {/* Password + Show/Hide */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showpassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-xl 
                           focus:border-blue-500 focus:ring-blue-500 focus:ring-2 outline-none transition"
              />

              {/* Show/Hide Toggle */}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl 
                       hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium ml-1"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
