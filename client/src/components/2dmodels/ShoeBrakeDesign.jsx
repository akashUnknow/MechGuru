import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Circle, Line, Arc, Arrow, Text, Group } from "react-konva";

const ShoeBrakeDiagram = () => {
  const width = 600;
  const height = 450;
  const centerX = 300;
  const centerY = 250;
  const drumRadius = 40;

  const drumRef = useRef();
  const leverRef = useRef();
  const blockRef = useRef();
  const PleverRef = useRef();

  const [isBraking, setIsBraking] = useState(false);
  const [leverOffset, setLeverOffset] = useState(0); // lever down movement

  useEffect(() => {
    let angle = 0;
    let t = 0;

    const anim = new window.Konva.Animation(() => {
      t += 1;

      // Smooth lever movement based on braking state
      setLeverOffset((prev) => {
        if (isBraking) {
          // Move down smoothly to max 15
          return prev < 15 ? prev + 0.6 : 15;
        } else {
          // Move back up smoothly
          return prev > 0 ? prev - 0.6 : 0;
        }
      });

      // Lever line points update
      const leverPoints = [

        centerX - 104,
        centerY - 90 + leverOffset,
        centerX + 130,
        centerY - 90 + leverOffset,

      ];
      leverRef.current.points(leverPoints);

      // Move brake shoe slightly with lever
      blockRef.current.y(centerY - 30 + leverOffset / 2);
      blockRef.current.outerRadius(drumRadius + 25 - leverOffset / 1.5);
      //moving pivot with lever
      PleverRef.current.points([
        centerX - 100,
        centerY - 40,
        centerX - 100,
        centerY - 90 + leverOffset,
      ]);
      if (!isBraking && drumRef.current) {
        angle += 2;
        drumRef.current.rotation(angle);
      }

      drumRef.current.getLayer().batchDraw();
    });

    anim.start();
    return () => anim.stop();
  }, [isBraking, leverOffset]);

  return (
    <div className="flex flex-col items-center bg-slate-100 p-1 rounded-xl shadow-md">
      <Stage width={width} height={height}>
        <Layer>
          {/* Drum */}
          <Group ref={drumRef} x={centerX} y={centerY - 30}>
            <Circle radius={drumRadius} stroke="black" strokeWidth={2} />
            {/* Red mark to visualize rotation */}
            <Circle x={drumRadius - 5} y={0} radius={4} fill="red" />
          </Group>

          {/* Brake Shoe */}
          <Arc
            ref={blockRef}
            x={centerX}
            y={centerY - 30}
            innerRadius={drumRadius + 5}
            outerRadius={drumRadius + 25}
            angle={60}
            rotation={240}
            fill={isBraking ? "#ff9999" : "#ccc"}
            stroke="black"
            strokeWidth={2}
          />
          <Text x={centerX - 70} y={centerY - 70} text="Block" />

          {/* Lever */}
          <Line
            ref={PleverRef}
            points={[
              centerX - 100,
              centerY - 40,
              centerX - 100,
              centerY - 90,
            ]}
            stroke="red"
            strokeWidth={8}
          />

          {/* Lever */}
          <Line
            ref={leverRef}
            points={[
              centerX - 104,
              centerY - 90,
              centerX + 130,
              centerY - 90,
            ]}
            stroke="black"
            strokeWidth={8}
          />

          <Text x={centerX - 100} y={centerY - 110} text="Lever" />

          {/* Pivot */}
          <Circle

            x={centerX - 100}
            y={centerY - 40}
            radius={8}
            stroke="black"
            strokeWidth={2}
            fill="white"
          />
          <Text x={centerX - 120} y={centerY - 20} text="Pivot" />

          {/* Force Arrow */}
          <Arrow
            points={[centerX + 120, centerY - 90, centerX + 120, centerY - 60]}
            stroke="black"
            fill="black"
            pointerLength={10}
            pointerWidth={10}
          />
          <Text x={centerX + 140} y={centerY - 90} text="P" fontStyle="bold" />

          {/* Status */}
          <Text
            x={20}
            y={height - 30}
            text={isBraking ? "Braking Applied!" : "Drum Rotating"}
            fontStyle="bold"
            fill={isBraking ? "red" : "green"}
          />
        </Layer>
      </Stage>

      {/* Button */}
      <button
        onClick={() => setIsBraking((prev) => !prev)}
        className={`mt-4 px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all ${isBraking
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
          }`}
      >
        {isBraking ? "Release Brake" : "Apply Brake"}
      </button>
    </div>
  );
};

export default ShoeBrakeDiagram;
