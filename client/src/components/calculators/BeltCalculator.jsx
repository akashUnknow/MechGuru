// File: src/components/calculators/BeltCalculator.jsx
import React, { useState } from 'react';

const BeltCalculator = () => {
  const [inputs, setInputs] = useState({ 
    power: '', 
    speed: '', 
    diameter1: '', 
    diameter2: '' 
  });

  const calculate = () => {
    const P = parseFloat(inputs.power);
    const N = parseFloat(inputs.speed);
    const D1 = parseFloat(inputs.diameter1);
    const D2 = parseFloat(inputs.diameter2);
    
    if (!P || !N || !D1 || !D2) return null;
    
    const velocityRatio = D2 / D1;
    const N2 = N / velocityRatio;
    const velocity = (Math.PI * D1 * N) / 60000;
    
    return {
      velocityRatio: velocityRatio.toFixed(3),
      outputSpeed: N2.toFixed(2),
      beltVelocity: velocity.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Belt Drive Calculator</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Power (kW)</label>
          <input
            type="number"
            value={inputs.power}
            onChange={(e) => setInputs({...inputs, power: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter power"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Driver Speed (RPM)</label>
          <input
            type="number"
            value={inputs.speed}
            onChange={(e) => setInputs({...inputs, speed: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter speed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Driver Pulley Diameter (mm)</label>
          <input
            type="number"
            value={inputs.diameter1}
            onChange={(e) => setInputs({...inputs, diameter1: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter diameter"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Driven Pulley Diameter (mm)</label>
          <input
            type="number"
            value={inputs.diameter2}
            onChange={(e) => setInputs({...inputs, diameter2: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter diameter"
          />
        </div>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-300">
          <h4 className="font-bold mb-2">Results:</h4>
          <p>Velocity Ratio: <strong>{result.velocityRatio}</strong></p>
          <p>Output Speed: <strong>{result.outputSpeed} RPM</strong></p>
          <p>Belt Velocity: <strong>{result.beltVelocity} m/s</strong></p>
        </div>
      )}
    </div>
  );
};

export default BeltCalculator;