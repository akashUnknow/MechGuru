// File: src/components/calculators/GearCalculator.jsx
import React, { useState } from 'react';

const GearCalculator = () => {
  const [inputs, setInputs] = useState({ 
    teeth1: '', 
    teeth2: '', 
    module: '' 
  });

  const calculate = () => {
    const z1 = parseFloat(inputs.teeth1);
    const z2 = parseFloat(inputs.teeth2);
    const m = parseFloat(inputs.module);
    
    if (!z1 || !z2 || !m) return null;
    
    const gearRatio = z2 / z1;
    const d1 = m * z1;
    const d2 = m * z2;
    const centerDistance = (d1 + d2) / 2;
    
    return {
      gearRatio: gearRatio.toFixed(3),
      pitchDia1: d1.toFixed(2),
      pitchDia2: d2.toFixed(2),
      centerDistance: centerDistance.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Gear Design Calculator</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Pinion Teeth (z1)</label>
          <input
            type="number"
            value={inputs.teeth1}
            onChange={(e) => setInputs({...inputs, teeth1: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter number of teeth"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Gear Teeth (z2)</label>
          <input
            type="number"
            value={inputs.teeth2}
            onChange={(e) => setInputs({...inputs, teeth2: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter number of teeth"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Module (mm)</label>
          <input
            type="number"
            value={inputs.module}
            onChange={(e) => setInputs({...inputs, module: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter module"
          />
        </div>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-300">
          <h4 className="font-bold mb-2">Results:</h4>
          <p>Gear Ratio: <strong>{result.gearRatio}</strong></p>
          <p>Pinion Pitch Diameter: <strong>{result.pitchDia1} mm</strong></p>
          <p>Gear Pitch Diameter: <strong>{result.pitchDia2} mm</strong></p>
          <p>Center Distance: <strong>{result.centerDistance} mm</strong></p>
        </div>
      )}
    </div>
  );
};

export default GearCalculator;