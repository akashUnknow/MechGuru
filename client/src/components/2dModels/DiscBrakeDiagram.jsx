import React, { useRef, useEffect } from "react";
import { Stage, Layer, Circle, Rect, Line, Text, Group } from "react-konva";

const DiscBrakeDiagram = ({
  appliedForce = 100,
  discDiameter = 100,
  isBraking = false,
  setIsBraking,
  drumRotation = "clockwise",
}) => {
  const width = 500;
  const height = 350;
  const centerX = 250;
  const centerY = 180;
  const discRadius = 100 / 2 || 50;

  const discRef = useRef();
  const padLeftRef = useRef();
  const padRightRef = useRef();

  useEffect(() => {
    let angle = 0;
    const anim = new window.Konva.Animation(() => {
      if (!isBraking && discRef.current) {
        angle += drumRotation === "clockwise" ? 2 : -2;
        discRef.current.rotation(angle);
      }

      if (padLeftRef.current && padRightRef.current) {
        const offset = isBraking ? 5 : 0;
        padLeftRef.current.x(centerX - discRadius - 20 + offset);
        padRightRef.current.x(centerX + discRadius + 10 - offset);
      }

      discRef.current?.getLayer().batchDraw();
    });
    anim.start();
    return () => anim.stop();
  }, [isBraking, drumRotation]);

  return (
    <div className="bg-transparent flex flex-col items-center p-4 rounded-lg">
      <Stage width={width} height={height}>
        <Layer>
          {/* Rotating Disc */}
          <Group ref={discRef} x={centerX} y={centerY}>
            <Circle radius={discRadius} stroke="black" strokeWidth={3} />
            <Circle radius={discRadius - 10} stroke="gray" strokeWidth={1} />
            <Circle radius={5} fill="black" />
            <Line
              points={[0, 0, discRadius - 10, 0]}
              stroke="red"
              strokeWidth={2}
              rotation={45}
            />
            <Line
              points={[0, 0, discRadius - 10, 0]}
              stroke="red"
              strokeWidth={2}
              rotation={-45}
            />
          </Group>
          {/* hydrolic caliper */}
          <Rect
            x={centerX - 25}
            y={centerY - discRadius - 52}
            width={50}
            height={25}
            fill="blue"
            shadowBlur={10}
            cornerRadius={10}
          />
           <Text
            x={centerX - 25}
            y={centerY - discRadius - 70}
            text={"hydraulic "+ appliedForce + "N"}
            fontStyle="bold"
          />
          
          {/* tube */}
          <Line
            points={[centerX - 25, centerY - discRadius - 40,
               centerX-100, centerY - discRadius - 40,
              centerX-100, centerY - discRadius +50,
              centerX -62, centerY - discRadius +50,
            ]}
            stroke="red"
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
          />
          {/* mirroe line */}
          <Line
            points={[centerX + 25, centerY - discRadius-40,
                centerX+100, centerY - discRadius -40,
                centerX+100, centerY - discRadius +50,
                centerX+62, centerY - discRadius +50,
            ]}
            stroke="red"
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
          />
          {/* Brake Pads */}
          <Rect
            ref={padLeftRef}
            x={centerX - discRadius - 20}
            y={centerY - 20}
            width={10}
            height={40}
            fill={isBraking ? "#ff9999" : "#ccc"}
            stroke="black"
          />
          <Rect
            ref={padRightRef}
            x={centerX + discRadius + 10}
            y={centerY - 20}
            width={10}
            height={40}
            fill={isBraking ? "#ff9999" : "#ccc"}
            stroke="black"
          />

          <Text
            x={centerX - 40}
            y={centerY + discRadius + 20}
            text={`Disc Ø${discDiameter} mm`}
          />
          <Text
            x={centerX - 40}
            y={height - 70}
            text={isBraking ? "Braking Applied!" : "Disc Rotating"}
            fontStyle="bold"
            fill={isBraking ? "red" : "green"}
          />
        </Layer>
      </Stage>

      {setIsBraking && (
        <button
          onClick={() => setIsBraking((prev) => !prev)}
          className={`px-6 py-2 mt-3 text-white font-semibold rounded-lg shadow-md transition-all ${isBraking ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {isBraking ? "Release Brake" : "Apply Brake"}
        </button>
      )}
    </div>
  );
};

export default DiscBrakeDiagram;
