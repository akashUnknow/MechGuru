import { Link } from "react-router-dom";
import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 shadow-lg border-b-4 border-orange-500">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Cog 
                size={32}
                strokeWidth={2.5}
                className="text-orange-400 group-hover:rotate-180 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <span className="text-2xl font-extrabold tracking-wide text-white">
              Mech<span className="text-orange-400">Guru</span>
            </span>
          </Link>

          <div className="flex gap-4">
            <Link to="/login">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold
                  hover:from-blue-700 hover:to-blue-800
                  hover:scale-105 hover:shadow-xl
                  border border-blue-400/30
                  transition-all duration-300 ease-in-out"
              >
                Login
              </Button>
            </Link>

            <Link to="/getStarted">
              <Button
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold
                  hover:from-orange-600 hover:to-orange-700
                  hover:scale-105 hover:shadow-xl
                  border border-orange-400/30
                  transition-all duration-300 ease-in-out"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;