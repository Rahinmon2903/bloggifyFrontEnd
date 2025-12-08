import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api.js";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/forgot-password", { email });

      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to send reset email";
      setError(msg);
      toast.error(msg);
    }

    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Forgot Password
          </h1>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <form className="space-y-6" onSubmit={HandleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:border-blue-500 focus:ring-blue-500 focus:ring-2 
                         outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl 
                       hover:bg-blue-700 transition-all shadow-md hover:shadow-lg 
                       active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?
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

export default ForgetPassword;
