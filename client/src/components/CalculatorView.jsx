import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";

import ShaftCalculator from "./calculators/ShaftCalculator";
import BeltCalculator from "./calculators/BeltCalculator";
import GearCalculator from "./calculators/GearCalculator";
import BearingCalculator from "./calculators/BearingCalculator";
import BrakeCalculator from "./calculators/BrakeCalculator";

const CalculatorView = () => {
  const { calculatorType } = useParams();
  const navigate = useNavigate();

  // ✅ Map calculator components dynamically
  const calculators = {
    shafts: <ShaftCalculator />,
    belts: <BeltCalculator />,
    gears: <GearCalculator />,
    bearings: <BearingCalculator />,
    brakes: <BrakeCalculator />,
  };

  const selectedCalculator = calculators[calculatorType];

  return (
    <div
      className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 
      py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 animate-fadeIn"
    >
      {/* 🔙 Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <button
          onClick={() => navigate(`/concept/${calculatorType}`)}
          className="flex items-center justify-center gap-2 
          bg-white text-orange-600 hover:text-orange-700 font-semibold 
          border border-orange-100 shadow-md rounded-lg px-4 py-2 
          hover:gap-3 hover:shadow-lg transition-all duration-300 
          w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Concept
        </button>

        <div className="flex items-center gap-2 justify-center sm:justify-end">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
            {calculatorType.charAt(0).toUpperCase() + calculatorType.slice(1)} Calculator
          </h1>
        </div>
      </div>

      {/* ⚙️ Calculator Display */}
      <div
        className="bg-white/90 backdrop-blur-lg border-2 border-slate-200 
        rounded-2xl p-5 sm:p-8 md:p-10 shadow-2xl 
        hover:shadow-orange-200/40 transition-all duration-300"
      >
        {selectedCalculator ? (
          <div className="w-full">{selectedCalculator}</div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-4">
              Calculator not found
            </h2>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 
              text-white px-6 py-3 rounded-lg font-semibold 
              hover:from-orange-600 hover:to-orange-700 hover:scale-105 
              transition-all duration-300"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorView;
