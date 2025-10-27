// File: src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white/90 backdrop-blur border-2 border-slate-200 rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
          Login to MechGuru
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-4 py-3 transition-all outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-4 py-3 transition-all outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg 
              font-semibold hover:from-orange-600 hover:to-orange-700 
              hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Login
          </Button>
        </form>
        
        <p className="mt-4 text-center text-slate-600">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/getStarted')}
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