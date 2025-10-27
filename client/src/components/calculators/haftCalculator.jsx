import React, { useState } from 'react';

const ShaftCalculator = () => {
  const [inputs, setInputs] = useState({ 
    torque: '', 
    diameter: '', 
    material: 'steel' 
  });

  const calculate = () => {
    const T = parseFloat(inputs.torque);
    const d = parseFloat(inputs.diameter);
    const tau_max = inputs.material === 'steel' ? 42 : 28;
    
    if (!T || !d) return null;
    
    const tau = (16 * T * 1000) / (Math.PI * Math.pow(d, 3));
    const safe = tau < tau_max;
    const minDiameter = Math.pow((16 * T * 1000) / (Math.PI * tau_max), 1/3);
    
    return { 
      tau: tau.toFixed(2), 
      safe, 
      minDiameter: minDiameter.toFixed(2) 
    };
  };

  const result = calculate();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Shaft Design Calculator</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Torque (N·m)</label>
          <input
            type="number"
            value={inputs.torque}
            onChange={(e) => setInputs({...inputs, torque: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter torque"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Shaft Diameter (mm)</label>
          <input
            type="number"
            value={inputs.diameter}
            onChange={(e) => setInputs({...inputs, diameter: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
            placeholder="Enter diameter"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2">Material</label>
          <select
            value={inputs.material}
            onChange={(e) => setInputs({...inputs, material: e.target.value})}
            className="w-full border-2 border-gray-300 rounded px-3 py-2"
          >
            <option value="steel">Steel (τ = 42 MPa)</option>
            <option value="cast-iron">Cast Iron (τ = 28 MPa)</option>
          </select>
        </div>
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${result.safe ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
          <h4 className="font-bold mb-2">Results:</h4>
          <p>Torsional Shear Stress: <strong>{result.tau} MPa</strong></p>
          <p>Status: <strong>{result.safe ? '✓ Safe Design' : '✗ Unsafe - Increase Diameter'}</strong></p>
          <p>Minimum Required Diameter: <strong>{result.minDiameter} mm</strong></p>
        </div>
      )}
    </div>
  );
};

export default ShaftCalculator;