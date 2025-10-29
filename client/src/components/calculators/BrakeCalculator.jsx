import React, { useState } from "react";

const BrakeCalculator = () => {
  const [inputs, setInputs] = useState({
    brakeType: "disc",
    leverArmLength: "",
    shoeBrakeType: "horizontal",
    coefficientOfFriction: "",
    forceAppliedAtLeverEnd: "",
    angleOfContact: "",
    distanceToFulcrum: "",
    actuatingForce: "",
    numberOfSurfaces: 2,
    stoppingTime: "",
    drumDiameter: "",
    lengthBetweenFulcrumAndDrum: "",
    lengthBetweenFulcrumAndBrakingForce: "",
    drumRotation: "clockwise",
  });

  const [result, setResult] = useState(null);

  // --- DISC BRAKE FORMULA ---
  const calculateDiscBrake = () => {
    const mu = parseFloat(inputs.coefficientOfFriction);
    const F = parseFloat(inputs.actuatingForce);
    const r = parseFloat(inputs.leverArmLength);
    const n = parseFloat(inputs.numberOfSurfaces);

    if (!mu || !F || !r || !n) {
      alert("Please fill all required fields!");
      return;
    }

    const T = mu * F * r * n; // Torque (N·m)
    setResult({
      torque: T.toFixed(2),
      powerAbsorbed: "—",
    });
  };

  // --- SHOE BRAKE FORMULA ---
  const calculateShoeBrake = () => {
    // Parse numeric values safely
    const mu = parseFloat(inputs.coefficientOfFriction);
    const F = parseFloat(inputs.forceAppliedAtLeverEnd);
    const L = parseFloat(inputs.leverArmLength);
    const a = parseFloat(inputs.lengthBetweenFulcrumAndDrum);
    const b = parseFloat(inputs.lengthBetweenFulcrumAndBrakingForce);
    const r = parseFloat(inputs.drumDiameter) / 2;
    const drumRotation = inputs.drumRotation;
    const type = inputs.shoeBrakeType;

    if ([mu, F, L, a, b, r].some((v) => isNaN(v))) {
      alert("Please fill all required numeric fields!");
      return;
    }

    let T;

    // Calculate torque based on type and rotation
    if (type === "horizontal") {
      T = (mu * F * L * r) / a;
    } else if (type === "down" && drumRotation === "clockwise") {
      T = (mu * F * L * r) / (a + mu * b);
    } else if (type === "down" && drumRotation === "counter-clockwise") {
      T = (mu * F * L * r) / (a - mu * b);
    } else if (type === "above" && drumRotation === "clockwise") {
      T = (mu * F * L * r) / (a - mu * b);
    } else if (type === "above" && drumRotation === "counter-clockwise") {
      T = (mu * F * L * r) / (a + mu * b);
    } else {
      alert("Invalid configuration!");
      return;
    }

    setResult({
      torque: T.toFixed(2),
    });
  };

  const handleCalculate = () => {
    if (inputs.brakeType === "disc") calculateDiscBrake();
    else if (inputs.brakeType === "shoe") calculateShoeBrake();
    else alert("This brake type is not yet implemented.");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-8 bg-white/90 backdrop-blur rounded-xl border-2 border-slate-200 shadow-xl">
      {/* LEFT SIDE — Inputs */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          Brake Analysis Calculator
        </h2>

        {/* Brake Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            Select Brake Type
          </label>
          <select
            value={inputs.brakeType}
            onChange={(e) =>
              setInputs({ ...inputs, brakeType: e.target.value })
            }
            className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
              rounded-lg px-4 py-3 bg-white outline-none transition-all"
          >
            <option value="disc">Disc Brake</option>
            <option value="drum">Drum Brake</option>
            <option value="band">Band Brake</option>
            <option value="shoe">Shoe Brake</option>
          </select>
        </div>

        {/* Shoe Brake Type */}
        {inputs.brakeType === "shoe" && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Fulcrum Position
              </label>
              <select
                value={inputs.shoeBrakeType}
                onChange={(e) =>
                  setInputs({ ...inputs, shoeBrakeType: e.target.value })
                }
                className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-4 py-3 bg-white outline-none transition-all"
              >
                <option value="horizontal">Horizontal</option>
                <option value="down">Below Drum</option>
                <option value="above">Above Drum</option>
              </select>
            </div>

            {/* Drum Rotation */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">
                Drum Rotation
              </label>
              <select
                value={inputs.drumRotation}
                onChange={(e) =>
                  setInputs({ ...inputs, drumRotation: e.target.value })
                }
                className="w-full border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                rounded-lg px-4 py-3 bg-white outline-none transition-all"
              >
                <option value="clockwise">Clockwise</option>
                <option value="counter-clockwise">Counter Clockwise</option>
              </select>
            </div>
          </>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Force applied at lever end (N)
            </label>
            <input
              type="number"
              value={inputs.forceAppliedAtLeverEnd}
              onChange={(e) =>
                setInputs({ ...inputs, forceAppliedAtLeverEnd: e.target.value })
              }
              placeholder="e.g. 500"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Lever arm length (mm)
            </label>
            <input
              type="number"
              value={inputs.leverArmLength}
              onChange={(e) =>
                setInputs({ ...inputs, leverArmLength: e.target.value })
              }
              placeholder="e.g. 120"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Fulcrum to drum center (mm)
            </label>
            <input
              type="number"
              value={inputs.lengthBetweenFulcrumAndDrum}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  lengthBetweenFulcrumAndDrum: e.target.value,
                })
              }
              placeholder="e.g. 350"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Drum diameter (mm)
            </label>
            <input
              type="number"
              value={inputs.drumDiameter}
              onChange={(e) =>
                setInputs({ ...inputs, drumDiameter: e.target.value })
              }
              placeholder="e.g. 200"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Coefficient of friction (μ)
            </label>
            <input
              type="number"
              value={inputs.coefficientOfFriction}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  coefficientOfFriction: e.target.value,
                })
              }
              placeholder="e.g. 0.3"
              className="w-full border-2 border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Fulcrum to braking force (mm)
            </label>
            <input
              type="number"
              value={inputs.lengthBetweenFulcrumAndBrakingForce}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  lengthBetweenFulcrumAndBrakingForce: e.target.value,
                })
              }
              placeholder="e.g. 12"
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
            <p><b>Power Absorbed:</b> {result.powerAbsorbed}</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE — Explanation */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-6 shadow-inner">
        <h2 className="text-xl font-bold mb-3 text-slate-700">
          Brake Formula Reference
        </h2>
        <div className="text-slate-600 text-sm space-y-2">
          <p>Torque (T) = μ × F × r × n</p>
          <ul className="list-disc list-inside">
            <li>μ = Coefficient of friction</li>
            <li>F = Actuating force per pad (N)</li>
            <li>r = Mean radius (m)</li>
            <li>n = Number of friction surfaces</li>
          </ul>
          <p>Power Absorbed (kW) = (T × 2πN / 60) / 1000</p>
        </div>
      </div>
    </div>
  );
};

export default BrakeCalculator;
