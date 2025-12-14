// File: src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl transform transition-all">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
          Login to <span className="text-orange-500">MechGuru</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-4 py-3 transition-all outline-none text-slate-800 placeholder:text-slate-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-4 py-3 transition-all outline-none text-slate-800 placeholder:text-slate-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg 
              font-semibold hover:from-orange-600 hover:to-orange-700 
              hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-slate-700 text-sm sm:text-base">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/getStarted")}
            className="text-orange-600 hover:text-orange-700 font-semibold"
          >
            Get Started
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
