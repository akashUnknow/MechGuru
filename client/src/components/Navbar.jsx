import { Link } from "react-router-dom";
import { Cog  } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-var(--color-primary) text-var(--color-text-primary) shadow-md">
            <Link to="/" className="flex items-center gap-2">
                <Cog 
                    size={28}
                    strokeWidth={2.5}
                    className="text-var(--color-light)"
                />
                <span className="text-xl font-extrabold tracking-wide">MechGuru</span>
            </Link>

            <div className="flex gap-6">
                <Link to="/login">
                    <Button
                        className="bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold
                     hover:bg-[var(--color-btn-hover)] 
                     hover:scale-105 
                     hover:shadow-lg
                     transition duration-300 ease-in-out"
                    >
                        Login
                    </Button>
                </Link>

                <Link to="/getStarted">
                    <Button
                        className="bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold
                     hover:bg-[var(--color-btn-hover)] 
                     hover:scale-105 
                     hover:shadow-lg
                     transition duration-300 ease-in-out"
                    >
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar