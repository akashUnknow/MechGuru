import React, { useState } from 'react';
import ThreeDShaft from '../3dModels/ThreeDShaft';

const TypesOfShaft = [
  'Shafts subjected to twisting moment or torque only',
  'Shafts subjected to twisting moment or torque only (Hollow shafts)',
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
    tau: '',
    k: '',
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

    const tau_design = tau_material / fos;
    const D = Math.pow((16 * torque * 1000) / (Math.PI * tau_design), 1 / 3);
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

    const tau_design = tau_material / fos;
    const D = Math.pow((16 * torque * 1000) / (Math.PI * tau_design * (1 - Math.pow(k, 4))), 1 / 3);
    return Number(D.toFixed(2));
  };

  // ✅ Main Calculation
  const calculate = () => {
    const T = torqueFromPowerRPM(parseFloat(inputs.power), parseFloat(inputs.rpm));
    let D = 0;
    if (inputs.shaftType.includes('Hollow')) {
      D = diameterFromHollowTorque(
        T,
        inputs.material,
        parseFloat(inputs.k || 0.6),
        parseFloat(inputs.fos),
        inputs.tau
      );
    } else {
      D = diameterFromTorque(T, inputs.material, parseFloat(inputs.fos), inputs.tau);
    }

    const safe = inputs.diameter ? parseFloat(inputs.diameter) >= D : true;

    return {
      diameter: inputs.diameter || D.toFixed(2),
      minDiameter: D.toFixed(2),
      safe,
      torque: T.toFixed(2),
    };
  };

  const result = calculate();

  return (
    <div
      className="flex flex-col lg:flex-row gap-2 bg-transparent
  border-none rounded-2xl p-1 sm:p-3 md:p-2 shadow-none
  w-full max-w-7xl mx-auto"
    >
      {/* LEFT SIDE - Calculator */}
      <div className="flex-1 w-full space-y-5">
        <h3 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent">
          Shaft Design Calculator
        </h3>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Shaft Type */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-semibold mb-1 text-slate-700">
              Select Type of Shaft:
            </label>
            <select
              value={inputs.shaftType}
              onChange={(e) => setInputs({ ...inputs, shaftType: e.target.value })}
              className="w-full border-2 border-slate-300 focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none"
            >
              <option value="">-- Select Type --</option>
              {TypesOfShaft.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Power */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Power (kW)</label>
            <input
              type="number"
              value={inputs.power}
              onChange={(e) => setInputs({ ...inputs, power: e.target.value })}
              placeholder="Enter Power (kW)"
              className="w-full border-2 border-slate-300 focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          {/* RPM */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">RPM</label>
            <input
              type="number"
              value={inputs.rpm}
              onChange={(e) => setInputs({ ...inputs, rpm: e.target.value })}
              placeholder="Enter RPM"
              className="w-full border-2 border-slate-300 focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          {/* FOS */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">
              Factor of Safety
            </label>
            <input
              type="number"
              value={inputs.fos}
              onChange={(e) => setInputs({ ...inputs, fos: e.target.value })}
              placeholder="Enter FOS (e.g. 1.5)"
              className="w-full border-2 border-slate-300 focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">Material</label>
            <select
              value={inputs.material}
              onChange={(e) => setInputs({ ...inputs, material: e.target.value })}
              className="w-full border-2 border-slate-300 focus:border-orange-500 
              focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none bg-white"
            >
              <option value="steel">Steel (τ = 42 MPa)</option>
              <option value="cast-iron">Cast Iron (τ = 28 MPa)</option>
              <option value="custom">Custom (Manual τ)</option>
            </select>
          </div>

          {/* Custom τ */}
          {inputs.material === 'custom' && (
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700">Enter τ (MPa)</label>
              <input
                type="number"
                value={inputs.tau}
                onChange={(e) => setInputs({ ...inputs, tau: e.target.value })}
                placeholder="Enter shear stress"
                className="w-full border-2 border-slate-300 focus:border-orange-500 
                focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none"
              />
            </div>
          )}

          {/* k for Hollow Shaft */}
          {inputs.shaftType.includes('Hollow') && (
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700">
                Inner/Outer Diameter Ratio (k)
              </label>
              <input
                type="number"
                step="0.05"
                value={inputs.k}
                onChange={(e) => setInputs({ ...inputs, k: e.target.value })}
                placeholder="Enter k (e.g. 0.6)"
                className="w-full border-2 border-slate-300 focus:border-orange-500 
                focus:ring-2 focus:ring-orange-200 rounded-lg px-3 py-2 outline-none"
              />
            </div>
          )}
        </div>

        {/* Results */}
        {result && result.minDiameter > 0 && (
          <div
            className={`p-5 sm:p-6 rounded-xl border-2 transition-all duration-300 ${result.safe
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
                : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400'
              }`}
          >
            <h4 className="font-bold mb-3 text-lg text-slate-800">Results:</h4>
            <p className="text-slate-700">
              Torque: <strong className="text-blue-900">{result.torque} N·m</strong>
            </p>
            <p className="text-slate-700">
              Diameter: <strong className="text-blue-900">{result.diameter} mm</strong>
            </p>
            <p className="text-slate-700">
              Minimum Required Diameter:{' '}
              <strong className="text-orange-600">{result.minDiameter} mm</strong>
            </p>
            <p className="text-slate-700">
              Status:{' '}
              <strong className={result.safe ? 'text-green-700' : 'text-red-700'}>
                {result.safe ? '✓ Safe Design' : '✗ Unsafe - Increase Diameter'}
              </strong>
            </p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - 3D Visualization */}
      <div
        className="flex-1 flex flex-col items-center justify-start bg-slate-50 
        rounded-xl p-4 sm:p-6 shadow-inner space-y-6"
      >
        <div className="w-full flex justify-center">
          <ThreeDShaft diameter={result.minDiameter} torque={result.torque} />
        </div>

        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 text-center">📘 Torsional Equation</h2>
          <div className="text-sm text-slate-700 space-y-1 leading-relaxed">
            <p><strong>T</strong> = Twisting moment (or torque)</p>
            <p><strong>J</strong> = Polar moment of inertia</p>
            <p><strong>τ</strong> = Max torsional shear stress</p>
            <p><strong>r</strong> = Outer radius (r = d / 2)</p>
          </div>
          <div className="mt-4 text-center text-slate-800 font-semibold text-base">
            <span className="text-blue-800 font-bold">T / J = τ / r</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShaftCalculator;
