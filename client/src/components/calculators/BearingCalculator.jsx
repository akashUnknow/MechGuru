// File: src/components/calculators/BearingCalculator.jsx
import React, { useState } from 'react';

const BearingCalculator = () => {
  const [inputs, setInputs] = useState({ 
    load: '', 
    speed: '', 
    life: '' 
  });

  const calculate = () => {
    const P = parseFloat(inputs.load);
    const N = parseFloat(inputs.speed);
    const L = parseFloat(inputs.life);
    
    if (!P || !N || !L) return null;
    
    const L10_revs = L * 60 * N;
    const C = P * Math.pow(L10_revs / 1000000, 1/3);
    
    return {
      L10_revs: (L10_revs / 1000000).toFixed(2),
      dynamicLoad: C.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Bearing Life Calculator</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Radial Load (kN)</label>
          <input
            type="number"
            value={inputs.load}
            onChange={(e) => setInputs({...inputs, load: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter load"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Speed (RPM)</label>
          <input
            type="number"
            value={inputs.speed}
            onChange={(e) => setInputs({...inputs, speed: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter speed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Desired Life (hours)</label>
          <input
            type="number"
            value={inputs.life}
            onChange={(e) => setInputs({...inputs, life: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter life in hours"
          />
        </div>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-300">
          <h4 className="font-bold mb-2">Results:</h4>
          <p>L10 Life: <strong>{result.L10_revs} million revolutions</strong></p>
          <p>Required Dynamic Load Capacity: <strong>{result.dynamicLoad} kN</strong></p>
        </div>
      )}
    </div>
  );
};

export default BearingCalculator;