import React, { useState } from "react";

const BrakeCalculator = () => {
  const [inputs, setInputs] = useState({
    brakeType: "disc",
    power: "",
    speed: "",
    mu: "",
    meanRadius: "",
    actuatingForce: "",
    numberOfSurfaces: 2,
    stoppingTime: "",
  });

  const [result, setResult] = useState(null);

  // Formula: T = μ × F × r × n
  const calculateDiscBrake = () => {
    const { mu, actuatingForce, meanRadius, numberOfSurfaces } = inputs;
    if (!mu || !actuatingForce || !meanRadius) {
      alert("Please fill all required fields!");
      return;
    }
    const T = mu * actuatingForce * meanRadius * numberOfSurfaces; // N·m
    const P = (T * (2 * Math.PI * (inputs.speed / 60))) / 1000; // Power in kW
    setResult({
      torque: T.toFixed(2),
      powerAbsorbed: P.toFixed(2),
    });
  };

  const handleCalculate = () => {
    if (inputs.brakeType === "disc") calculateDiscBrake();
    // TODO: Add drum and band later
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-8 bg-white/90 backdrop-blur rounded-xl border-2 border-slate-200 shadow-xl">
      {/* LEFT SIDE — Inputs */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Brake Analysis Calculator</h2>

        {/* Brake Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            Select Brake Type
          </label>
          <select
            value={inputs.brakeType}
            onChange={(e) => setInputs({ ...inputs, brakeType: e.target.value })}
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              rounded-lg px-4 py-3 bg-white outline-none transition-all"
          >
            <option value="disc">Disc Brake</option>
            <option value="drum">Drum Brake</option>
            <option value="band">Band Brake</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Speed (rpm)</label>
            <input
              type="number"
              value={inputs.speed}
              onChange={(e) => setInputs({ ...inputs, speed: e.target.value })}
              placeholder="e.g. 1200"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Coefficient of Friction (μ)</label>
            <input
              type="number"
              value={inputs.mu}
              onChange={(e) => setInputs({ ...inputs, mu: e.target.value })}
              placeholder="e.g. 0.3"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Mean Radius (m)</label>
            <input
              type="number"
              value={inputs.meanRadius}
              onChange={(e) => setInputs({ ...inputs, meanRadius: e.target.value })}
              placeholder="e.g. 0.12"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Actuating Force (N)</label>
            <input
              type="number"
              value={inputs.actuatingForce}
              onChange={(e) => setInputs({ ...inputs, actuatingForce: e.target.value })}
              placeholder="e.g. 800"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">No. of Friction Surfaces</label>
            <input
              type="number"
              value={inputs.numberOfSurfaces}
              onChange={(e) => setInputs({ ...inputs, numberOfSurfaces: e.target.value })}
              placeholder="e.g. 2"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Stopping Time (s)</label>
            <input
              type="number"
              value={inputs.stoppingTime}
              onChange={(e) => setInputs({ ...inputs, stoppingTime: e.target.value })}
              placeholder="e.g. 5"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Calculate
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 bg-slate-100 rounded-lg p-4 border border-slate-300">
            <h3 className="text-lg font-bold text-slate-700 mb-2">Results:</h3>
            <p><b>Braking Torque:</b> {result.torque} N·m</p>
            <p><b>Power Absorbed:</b> {result.powerAbsorbed} kW</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE — Explanation */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-6 shadow-inner">
        <h2 className="text-xl font-bold mb-3 text-slate-700">Disc Brake Formula</h2>
        <div className="text-slate-600 text-sm space-y-2">
          <p>Torque (T) = μ × F × r × n</p>
          <p>Where:</p>
          <ul className="list-disc list-inside">
            <li>μ = Coefficient of friction</li>
            <li>F = Actuating force per pad (N)</li>
            <li>r = Mean radius of disc (m)</li>
            <li>n = Number of friction surfaces</li>
          </ul>
          <p>Power absorbed (kW) = (T × 2πN / 60) / 1000</p>
        </div>
      </div>
    </div>
  );
};

export default BrakeCalculator;
