// File: src/components/CalculatorView.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShaftCalculator from './calculators/ShaftCalculator';
import BeltCalculator from './calculators/BeltCalculator';
import GearCalculator from './calculators/GearCalculator';
import BearingCalculator from './calculators/BearingCalculator';
import BrakeCalculator from './calculators/BrakeCalculator';

const CalculatorView = () => {
  const { calculatorType } = useParams();
  const navigate = useNavigate();

  const renderCalculator = () => {
    switch(calculatorType) {
      case 'shafts':
        return <ShaftCalculator />;
      case 'belts':
        return <BeltCalculator />;
      case 'gears':
        return <GearCalculator />;
      case 'bearings':
        return <BearingCalculator />;
      case 'brakes':
        return <BrakeCalculator />;
      default:
        return <div>Calculator not found</div>;
    }
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => navigate(`/concept/${calculatorType}`)}
        className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 
          hover:gap-3 transition-all bg-white px-4 py-2 rounded-lg shadow-md"
      >
        ← Back to Concepts
      </button>
      {renderCalculator()}
    </div>
  );
};

export default CalculatorView;