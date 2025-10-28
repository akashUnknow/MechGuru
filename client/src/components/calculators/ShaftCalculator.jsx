import React, { useState } from 'react';
import ThreeDShaft from '../3dModels/ThreeDShaft';

const TypesOfShaft = [
  "Shafts subjected to twisting moment or torque only",
  "Shafts subjected to twisting moment or torque only (Hollow shafts)",
];

const ShaftCalculator = () => {
  const [inputs, setInputs] = useState({
    shaftType: '',
    power: '',
    fos: '1.5',
    rpm: '',
    torque: '',
    diameter: '',
    material: 'steel',
    tau: '', // custom τ (MPa)
    k: '',   // inner/outer diameter ratio for hollow shaft
  });

  // ✅ Torque (in N·m) from Power (kW) and RPM
  const torqueFromPowerRPM = (power, rpm) => {
    if (!power || !rpm) return 0;
    return (power * 60 * 1000) / (2 * Math.PI * rpm);
  };

  // ✅ Solid Shaft Diameter (mm)
  const diameterFromTorque = (torque, material, fos = 1.5, customTau = null) => {
    if (!torque || torque <= 0) return 0;

    let tau_material;
    if (material === 'steel') tau_material = 42;
    else if (material === 'cast-iron') tau_material = 28;
    else if (material === 'custom' && customTau) tau_material = Number(customTau);
    else tau_material = 42;

    const tau_design = tau_material / fos; // design shear stress (MPa)
    const D = Math.pow((16 * torque * 1000) / (Math.PI * tau_design), 1 / 3); // mm

    return Number(D.toFixed(2));
  };

  // ✅ Hollow Shaft Diameter (mm)
  const diameterFromHollowTorque = (torque, material, k, fos = 1.5, customTau = null) => {
    if (!torque || !k || torque <= 0) return 0;

    let tau_material;
    if (material === 'steel') tau_material = 42;
    else if (material === 'cast-iron') tau_material = 28;
    else if (material === 'custom' && customTau) tau_material = Number(customTau);
    else tau_material = 42;

    const tau_design = tau_material / fos; // design shear stress (MPa)
    const D = Math.pow((16 * torque * 1000) / (Math.PI * tau_design * (1 - Math.pow(k, 4))), 1 / 3); // mm

    return Number(D.toFixed(2));
  };

  // ✅ Main Calculation Logic
  const calculate = () => {
    const T = torqueFromPowerRPM(parseFloat(inputs.power), parseFloat(inputs.rpm));

    let D = 0;
    if (inputs.shaftType.includes('Hollow')) {
      D = diameterFromHollowTorque(
        T,
        inputs.material,
        parseFloat(inputs.k || 0.6), // assume default k = 0.6
        parseFloat(inputs.fos),
        inputs.tau
      );
    } else {
      D = diameterFromTorque(
        T,
        inputs.material,
        parseFloat(inputs.fos),
        inputs.tau
      );
    }

    const safe = inputs.diameter ? parseFloat(inputs.diameter) >= D : true;

    return {
      diameter: inputs.diameter || D.toFixed(2),
      minDiameter: D.toFixed(2),
      safe,
      torque: T.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="flex flex-row bg-white/90 backdrop-blur border-2 border-slate-200 rounded-xl p-8 shadow-xl w-full h-auto">

      {/* LEFT SIDE - Calculator */}
      <div className="w-1/2 pr-6">
        <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
          Shaft Design Calculator
        </h3>

        <div className="space-y-2 mb-6">

          {/* Shaft Type */}
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            Select Type of Shaft:
          </label>
          <select
            value={inputs.shaftType}
            onChange={(e) => setInputs({ ...inputs, shaftType: e.target.value })}
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            rounded-lg px-2 py-1 transition-all outline-none"
          >
            <option value="">-- Select Type --</option>
            {TypesOfShaft.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          {/* Power */}
          <label className="block text-sm font-semibold mb-2 text-slate-700">Power (kW)</label>
          <input
            type="number"
            value={inputs.power}
            onChange={(e) => setInputs({ ...inputs, power: e.target.value })}
            placeholder="Enter Power (kW)"
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            rounded-lg px-2 py-1 transition-all outline-none"
          />

          {/* RPM */}
          <label className="block text-sm font-semibold mb-2 text-slate-700">RPM</label>
          <input
            type="number"
            value={inputs.rpm}
            onChange={(e) => setInputs({ ...inputs, rpm: e.target.value })}
            placeholder="Enter RPM"
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            rounded-lg px-2 py-1 transition-all outline-none"
          />

          {/* FOS */}
          <label className="block text-sm font-semibold mb-2 text-slate-700">Factor of Safety</label>
          <input
            type="number"
            value={inputs.fos}
            onChange={(e) => setInputs({ ...inputs, fos: e.target.value })}
            placeholder="Enter FOS (e.g. 1.5)"
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            rounded-lg px-2 py-1 transition-all outline-none"
          />

          {/* Material */}
          <label className="block text-sm font-semibold mb-2 text-slate-700">Material</label>
          <select
            value={inputs.material}
            onChange={(e) => setInputs({ ...inputs, material: e.target.value })}
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
            rounded-lg px-2 py-1 transition-all outline-none bg-white"
          >
            <option value="steel">Steel (τ = 42 MPa)</option>
            <option value="cast-iron">Cast Iron (τ = 28 MPa)</option>
            <option value="custom">Custom (Manual τ)</option>
          </select>

          {/* Custom τ input */}
          {inputs.material === 'custom' && (
            <div className="mt-3">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Enter τ (MPa)
              </label>
              <input
                type="number"
                value={inputs.tau}
                onChange={(e) => setInputs({ ...inputs, tau: e.target.value })}
                placeholder="Enter allowable shear stress (MPa)"
                className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-2 py-1 transition-all outline-none"
              />
            </div>
          )}

          {/* k for Hollow Shaft */}
          {inputs.shaftType.includes('Hollow') && (
            <div className="mt-3">
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Inner/Outer Diameter Ratio (k)
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.k}
                onChange={(e) => setInputs({ ...inputs, k: e.target.value })}
                placeholder="Enter k (e.g. 0.6)"
                className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-2 py-1 transition-all outline-none"
              />
            </div>
          )}

          {/* Results */}
          {result && result.minDiameter > 0 && (
            <div
              className={`p-6 rounded-xl border-2 ${result.safe
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
                : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400'
                }`}
            >
              <h4 className="font-bold mb-3 text-lg text-slate-800">Results:</h4>
              <p className="mb-2 text-slate-700">
                Torque: <strong className="text-blue-900">{result.torque} N·m</strong>
              </p>
              <p className="mb-2 text-slate-700">
                Diameter: <strong className="text-blue-900">{result.diameter} mm</strong>
              </p>
              <p className="text-slate-700">
                Minimum Required Diameter: <strong className="text-orange-600">{result.minDiameter} mm</strong>
              </p>
              <p className="text-slate-700">
                Status: <strong className={result.safe ? 'text-green-700' : 'text-red-700'}>
                  {result.safe ? '✓ Safe Design' : '✗ Unsafe - Increase Diameter'}
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - 3D Visualization */}
      <div className="w-1/2 flex flex-col items-center justify-start bg-slate-50 rounded-lg p-6 shadow-inner space-y-6">

        {/* 3D Shaft Model */}
        <div className="w-full flex justify-center">
          <ThreeDShaft
            diameter={result.minDiameter}
            torque={result.torque}
          />
        </div>

        {/* Formula Explanation */}
        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 text-center">
            📘 Torsional Equation
          </h2>
          <div className="text-sm text-slate-700 space-y-1 leading-relaxed">
            <p><strong>T</strong> = Twisting moment (or torque) acting upon the shaft</p>
            <p><strong>J</strong> = Polar moment of inertia of the shaft about the axis of rotation</p>
            <p><strong>τ</strong> = Maximum torsional shear stress</p>
            <p><strong>r</strong> = Distance from the neutral axis to the outermost fibre (r = d / 2)</p>
          </div>

          {/* Formula Display */}
          <div className="mt-4 text-center text-slate-800 font-semibold text-base">
            <span className="text-blue-800 font-bold">T / J = τ / r</span>
          </div>
        </div>
      </div>

    </div>

  );
};

export default ShaftCalculator;
