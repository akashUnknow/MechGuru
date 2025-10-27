// File: src/components/calculators/ShaftCalculator.jsx
import React, { useState } from 'react';
import ThreeDShaft from '../3dModels/ThreeDShaft';


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
    const minDiameter = Math.pow((16 * T * 1000) / (Math.PI * tau_max), 1 / 3);

    return {
      tau: tau.toFixed(2),
      safe,
      minDiameter: minDiameter.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="flex flex-row bg-white/90 backdrop-blur border-2 border-slate-200 rounded-xl p-8 shadow-xl">
      <div><h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
        Shaft Design Calculator
      </h3>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Torque (N·m)</label>
            <input
              type="number"
              value={inputs.torque}
              onChange={(e) => setInputs({ ...inputs, torque: e.target.value })}
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              rounded-lg px-4 py-3 transition-all outline-none"
              placeholder="Enter torque"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Shaft Diameter (mm)</label>
            <input
              type="number"
              value={inputs.diameter}
              onChange={(e) => setInputs({ ...inputs, diameter: e.target.value })}
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              rounded-lg px-4 py-3 transition-all outline-none"
              placeholder="Enter diameter"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Material</label>
            <select
              value={inputs.material}
              onChange={(e) => setInputs({ ...inputs, material: e.target.value })}
              className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              rounded-lg px-4 py-3 transition-all outline-none bg-white"
            >
              <option value="steel">Steel (τ = 42 MPa)</option>
              <option value="cast-iron">Cast Iron (τ = 28 MPa)</option>
            </select>
          </div>
        </div>

        {result && (
          <div className={`p-6 rounded-xl border-2 ${result.safe
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400'
            }`}>
            <h4 className="font-bold mb-3 text-lg text-slate-800">Results:</h4>
            <p className="mb-2 text-slate-700">Torsional Shear Stress: <strong className="text-blue-900">{result.tau} MPa</strong></p>
            <p className="mb-2 text-slate-700">
              Status: <strong className={result.safe ? 'text-green-700' : 'text-red-700'}>
                {result.safe ? '✓ Safe Design' : '✗ Unsafe - Increase Diameter'}
              </strong>
            </p>
            <p className="text-slate-700">Minimum Required Diameter: <strong className="text-orange-600">{result.minDiameter} mm</strong></p>
          </div>
        )}</div>
      <div className="flex-1 bg-slate-50 p-4">
        <ThreeDShaft diameter={inputs.diameter} torque={inputs.torque} />
      </div>

    </div>
  );
};

export default ShaftCalculator;