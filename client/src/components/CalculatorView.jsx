// File: src/components/CalculatorView.jsx
import React from 'react';
import ShaftCalculator from './calculators/ShaftCalculator';
import BeltCalculator from './calculators/BeltCalculator';
import GearCalculator from './calculators/GearCalculator';
import BearingCalculator from './calculators/BearingCalculator';

const CalculatorView = ({ calculatorType, setActiveCalculator }) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => setActiveCalculator(null)}
        className="text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Back to Concepts
      </button>
      {renderCalculator()}
    </div>
  );
};

export default CalculatorView;