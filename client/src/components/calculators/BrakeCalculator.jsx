import React, { useState } from "react";
import ShoeBrakeDesign from "../2dModels/ShoeBrakeDiagram";
import shoeImage from "../images/shoeimage.png";

const BrakeCalculator = () => {
  const [inputs, setInputs] = useState({
    brakeType: "disc",
    leverArmLength: "",
    shoeBrakeType: "horizontal",
    coefficientOfFriction: "",
    forceAppliedAtLeverEnd: "",
    distanceToFulcrum: "",
    actuatingForce: "",
    numberOfSurfaces: 2,
    drumDiameter: "",
    lengthBetweenFulcrumAndDrum: "",
    lengthBetweenFulcrumAndBrakingForce: "",
    drumRotation: "clockwise",
  });

  const [isBraking, setIsBraking] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => setInputs((prev) => ({ ...prev, [field]: value }));

  // --- SHOE BRAKE CALCULATION ---
  const calculateShoeBrake = () => {
    const {
      coefficientOfFriction,
      forceAppliedAtLeverEnd,
      leverArmLength,
      lengthBetweenFulcrumAndDrum,
      lengthBetweenFulcrumAndBrakingForce,
      drumDiameter,
      shoeBrakeType,
      drumRotation,
    } = inputs;

    const mu = parseFloat(coefficientOfFriction);
    const F = parseFloat(forceAppliedAtLeverEnd);
    const L = parseFloat(leverArmLength);
    const a = parseFloat(lengthBetweenFulcrumAndDrum);
    const b = parseFloat(lengthBetweenFulcrumAndBrakingForce);
    const r = parseFloat(drumDiameter) / 2;

    if ([mu, F, L, a, b, r].some(isNaN)) return alert("Please fill all numeric fields correctly!");

    let T = 0;
    const t = shoeBrakeType, rot = drumRotation;

    if (t === "horizontal") T = (mu * F * L * r) / a;
    else if (t === "down" && rot === "clockwise") T = (mu * F * L * r) / (a + mu * b);
    else if (t === "down" && rot === "counter-clockwise") T = (mu * F * L * r) / (a - mu * b);
    else if (t === "above" && rot === "clockwise") T = (mu * F * L * r) / (a - mu * b);
    else if (t === "above" && rot === "counter-clockwise") T = (mu * F * L * r) / (a + mu * b);
    else return alert("Invalid configuration!");

    setIsBraking(true);  // <-- Trigger brake animation
    setResult({ torque: T.toFixed(2), powerAbsorbed: "—" });
  };

  const handleCalculate = () => {
    if (inputs.brakeType === "disc") {
      alert("Disc brake calculation not implemented here.");
    } else if (inputs.brakeType === "shoe") {
      calculateShoeBrake();
    } else {
      alert("Selected brake type not yet implemented.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-transparent rounded-2xl p-3 md:p-6 w-full max-w-7xl mx-auto">
      {/* LEFT SIDE — Inputs */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
          Brake Analysis Calculator
        </h2>

        {/* Brake Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Brake Type</label>
          <select
            value={inputs.brakeType}
            onChange={(e) => handleChange("brakeType", e.target.value)}
            className="w-full border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg px-4 py-3 bg-white outline-none transition-all"
          >
            <option value="disc">Disc Brake</option>
            <option value="shoe">Shoe Brake</option>
      
           
          </select>
        </div>
        

        {/* Shoe Brake Inputs */}
        {inputs.brakeType === "shoe" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Drum Position</label>
              <select
                value={inputs.shoeBrakeType}
                onChange={(e) => handleChange("shoeBrakeType", e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
              >
                <option value="horizontal">Horizontal</option>
                <option value="down">Below Drum</option>
                <option value="above">Above Drum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Drum Rotation</label>
              <select
                value={inputs.drumRotation}
                onChange={(e) => handleChange("drumRotation", e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white"
              >
                <option value="clockwise">Clockwise</option>
                <option value="counter-clockwise">Counter Clockwise</option>
              </select>
            </div>
          </div>
        )}

        {/* Numeric Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Force applied at lever end (N)", "forceAppliedAtLeverEnd"],
            ["Lever arm length (mm)", "leverArmLength"],
            ["Fulcrum to drum center (mm)", "lengthBetweenFulcrumAndDrum"],
            ["Drum diameter (mm)", "drumDiameter"],
            ["Coefficient of friction (μ)", "coefficientOfFriction"],
            ["Fulcrum to braking force (mm)", "lengthBetweenFulcrumAndBrakingForce"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-slate-700">{label}</label>
              <input
                type="number"
                value={inputs[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
              />
            </div>
          ))}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Calculate
        </button>

        {/* Results */}
        {result && (
          <div className="mt-4 bg-slate-100 rounded-lg p-4 border border-slate-300">
            <h3 className="text-lg font-bold text-slate-700 mb-2">Results:</h3>
            <p><b>Braking Torque:</b> {result.torque} N·mm</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE — Visualization */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start bg-slate-100 rounded-xl shadow-inner p-4">
        <ShoeBrakeDesign
          appliedForce={inputs.forceAppliedAtLeverEnd}
          leverLength={inputs.leverArmLength}
          leverHeight={inputs.lengthBetweenFulcrumAndDrum}
          showLength={true}
          showHeight={true}
          actualDrumDiameter={inputs.drumDiameter}
          isBraking={isBraking}
          setIsBraking={setIsBraking} // pass setter to child
          drumRotation={inputs.drumRotation}
        />

        <div className="mt-4 text-center">
          <img
            src={shoeImage}
            alt="Shoe Brake Reference"
            className="rounded-lg shadow-md w-[250px] sm:w-[320px] md:w-[400px] lg:w-[420px] h-auto object-contain"
          />
          <p className="mt-2 text-xs md:text-sm text-slate-500">
            Reference illustration of shoe brake geometry
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrakeCalculator;
