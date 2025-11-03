import React, { useState } from 'react';
import Gear3D from "../3dModels/Gear3D"; // add this import at top


const GearCalculator = () => {
  const [inputs, setInputs] = useState({
    power: '',
    speed: '',
    diameter1: '',
    diameter2: ''
  });

  const calculate = () => {
    // const P = parseFloat(inputs.power);
    // const N = parseFloat(inputs.speed);
    // const D1 = parseFloat(inputs.diameter1);
    // const D2 = parseFloat(inputs.diameter2);

    // if (!P || !N || !D1 || !D2) return null;

    // const velocityRatio = D2 / D1;
    // const N2 = N / velocityRatio;
    // const velocity = (Math.PI * D1 * N) / 60000;

    // return {
    //   velocityRatio: velocityRatio.toFixed(3),
    //   outputSpeed: N2.toFixed(2),
    //   beltVelocity: velocity.toFixed(2)
    // };
  };

  const result = calculate();

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-transparent rounded-2xl p-3 md:p-6 w-full max-w-7xl mx-auto">
      {/* LEFT SIDE — Inputs */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
          Belt Conveyor Sizing
        </h2>

        {/* Disc Brake Inputs */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Total weight of loads and conveyor belt"],
            ["Friction coefficient of the belt and linear guide"],
            ["Drive pulley diameter"],
            ["Drive pulley weight"],
            ["External force"],
            ["Primary pulley (gear) pitch circle diameter (PCD) or diameter"],
            ["Secondary pulley (gear) pitch circle diameter (PCD) or diameter"],
            ["Primary pulley (gear) weight"],
            ["Secondary pulley (gear) weight"],
            ["Mechanism angle"],
            ["Operating speed"],
            ["Acceleration"],
            ["Safety factor"]
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
          // onClick={handleCalculate}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all"
        >
          Calculate
        </button>

        {/* Results */}
        {result && (
          <div className="mt-4 bg-slate-100 rounded-lg p-4 border border-slate-300">
            <h3 className="text-lg font-bold text-slate-700 mb-2">Results:</h3>
            <p><b>Braking Torque:</b> {result.torque} N·mm</p>
            {result.meanRadius && <p><b>Mean Radius:</b> {result.meanRadius} mm</p>}
          </div>
        )}
      </div>

      {/* RIGHT SIDE — Visualization */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start bg-slate-100 rounded-xl shadow-inner p-4">
        <div className="w-full h-[400px]">
          <Gear3D />
        </div>
        <p className="mt-2 text-sm text-slate-500 text-center">
          3D Visualization of Belt Conveyor
        </p>

        <div className="mt-4 text-center">
          {/* {inputs.brakeType === "shoe" ? (
            <div>
              <img
                src={shoeImage}
                alt="Brake Reference"
                className="rounded-lg shadow-md w-[250px] sm:w-[320px] md:w-[400px] lg:w-[420px] h-auto object-contain"
              />
              <p className="mt-2 text-xs md:text-sm text-slate-500">
                Reference illustration of brake geometry
              </p>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default GearCalculator;