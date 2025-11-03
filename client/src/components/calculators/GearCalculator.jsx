import React, { useState } from "react";
import Gear3D from "../3dModels/Gear3D"; // Your 3D model
import GearImage from "../images/SpurGear.png";

const GearCalculator = () => {
  const [inputs, setInputs] = useState({
    power: "",        // kW
    speed: "",        // rpm
    gearRatio: "",    // N2/N1
    module: "",       // mm
    teethPinion: "",  // Z1
    faceWidth: "",    // b (optional)
    materialStrength: "", // σ_allow (N/mm²)
  });

  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  const handleCalculate = () => {
    const P = parseFloat(inputs.power);
    const N1 = parseFloat(inputs.speed);
    const i = parseFloat(inputs.gearRatio);
    const m = parseFloat(inputs.module);
    const Z1 = parseFloat(inputs.teethPinion);
    const b = parseFloat(inputs.faceWidth || 0);
    const sigma_allow = parseFloat(inputs.materialStrength);

    if (!P || !N1 || !i || !m || !Z1 || !sigma_allow) {
      alert("Please enter all required fields correctly.");
      return;
    }

    // --- Basic Gear Geometry ---
    const Z2 = Z1 * i;
    const D1 = m * Z1; // mm
    const D2 = m * Z2; // mm
    const centerDistance = (D1 + D2) / 2; // mm
    const V = (Math.PI * D1 * N1) / (60 * 1000); // m/s
    const Ft = (1000 * P) / V; // N
    const T = (Ft * D1) / 2; // N·mm

    // --- Lewis Equation ---
    // Ft = σ * b * y * π * m
    // y = Lewis form factor (for 20° full-depth teeth)
    const y = 0.154 - (0.912 / Z1);
    let requiredFaceWidth = (Ft) / (Math.PI * m * y * sigma_allow);
    requiredFaceWidth = requiredFaceWidth.toFixed(2);

    let isSafe = true;
    if (b && b < requiredFaceWidth) {
      isSafe = false;
    }

    setResult({
      teethGear: Z2.toFixed(0),
      pitchDiameterPinion: D1.toFixed(2),
      pitchDiameterGear: D2.toFixed(2),
      centerDistance: centerDistance.toFixed(2),
      velocity: V.toFixed(3),
      tangentialForce: Ft.toFixed(2),
      torque: T.toFixed(2),
      lewisFactor: y.toFixed(4),
      requiredFaceWidth,
      isSafe,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-2xl p-6 shadow-md w-full max-w-6xl mx-auto">
      {/* LEFT — Inputs */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
          Spur Gear Design Calculator (with Strength Check)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Power (kW)", "power"],
            ["Pinion Speed (rpm)", "speed"],
            ["Gear Ratio (N2/N1)", "gearRatio"],
            ["Module (mm)", "module"],
            ["Teeth on Pinion", "teethPinion"],
            ["Face Width (mm, optional)", "faceWidth"],
            ["Material Strength σ_allow (N/mm²)", "materialStrength"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-slate-700">
                {label}
              </label>
              <input
                type="number"
                value={inputs[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-5 bg-slate-100 rounded-lg p-4 border border-slate-300">
            <h3 className="text-lg font-bold text-slate-700 mb-2">
              Results:
            </h3>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><b>Teeth on Gear:</b> {result.teethGear}</li>
              <li><b>Pitch Diameter (Pinion):</b> {result.pitchDiameterPinion} mm</li>
              <li><b>Pitch Diameter (Gear):</b> {result.pitchDiameterGear} mm</li>
              <li><b>Center Distance:</b> {result.centerDistance} mm</li>
              <li><b>Pitch Line Velocity:</b> {result.velocity} m/s</li>
              <li><b>Tangential Force:</b> {result.tangentialForce} N</li>
              <li><b>Torque on Pinion:</b> {result.torque} N·mm</li>
              <li><b>Lewis Form Factor (y):</b> {result.lewisFactor}</li>
              <li><b>Required Face Width:</b> {result.requiredFaceWidth} mm</li>
              <li>
                <b>Status:</b>{" "}
                <span className={result.isSafe ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {result.isSafe ? "Safe ✅" : "Not Safe ❌ (Increase Face Width or Module)"}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT — 3D Gear Model */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-slate-100 rounded-xl shadow-inner p-4">
        <div className="w-full h-[400px]">
          <Gear3D />
        </div>
          <div className="mt-4 text-center">
         
            <div>
              <img
                src={GearImage}
                alt="Gear Reference"
                className="rounded-lg shadow-md w-[250px] sm:w-[320px] md:w-[400px] lg:w-[420px] h-auto object-contain"
              />
              <p className="mt-2 text-xs md:text-sm text-slate-500">
                Reference illustration of brake geometry
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GearCalculator;
