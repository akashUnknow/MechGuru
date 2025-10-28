// File: src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area grows to fill space */}
      <main className="flex-grow container mx-auto px-2 py-4 max-w-7xl">
        <Outlet />
      </main>

      {/* Footer sticks at bottom */}
      <footer className="bg-slate-800 text-center py-4 text-slate-300 text-sm">
        © {new Date().getFullYear()} MechGuru — All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
