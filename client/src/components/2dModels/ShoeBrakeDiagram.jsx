import React, { useRef, useEffect } from "react";
import { Stage, Layer, Circle, Line, Arc, Arrow, Text, Group } from "react-konva";

const ShoeBrakeDiagram = ({
  appliedForce = 100,
  leverLength = 230,
  leverHeight = 50,
  showLength = true,
  showHeight = true,
  actualDrumDiameter = 80,
  isBraking = false,
  setIsBraking,
  drumRotation = "clockwise", // new prop
}) => {
  const width = 500;
  const height = 350;
  const centerX = 250;
  const centerY = 200;
  const drumRadius = 40;

  const drumRef = useRef();
  const leverRef = useRef();
  const blockRef = useRef();
  const PleverRef = useRef();

  const leverOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);

  useEffect(() => {
    let angle = 0;

    const anim = new window.Konva.Animation(() => {
      targetOffsetRef.current = isBraking ? 15 : 0;
      const diff = targetOffsetRef.current - leverOffsetRef.current;
      leverOffsetRef.current += diff * 0.1;
      const leverOffset = leverOffsetRef.current;

      // Brake shoe movement
      if (blockRef.current) {
        blockRef.current.y(centerY - 30 + leverOffset / 2);
        blockRef.current.outerRadius(drumRadius + 25 - leverOffset / 1.5);
      }

      // Vertical lever movement
      if (PleverRef.current) {
        PleverRef.current.points([
          centerX - 100,
          centerY - 40,
          centerX - 100,
          centerY - 90 + leverOffset,
        ]);
      }

      // Horizontal lever movement
      if (leverRef.current) leverRef.current.y(leverOffset);

      // Drum rotation
      if (!isBraking && drumRef.current) {
        angle += drumRotation === "clockwise" ? 2 : -2;
        drumRef.current.rotation(angle);
      }

      drumRef.current?.getLayer().batchDraw();
    });

    console.log(drumRotation);
    anim.start();
    return () => anim.stop();
  }, [isBraking, drumRotation]);

  return (
    <div className="bg-transparent flex flex-col items-center p-4 rounded-lg">
      <Stage width={width} height={height}>
        <Layer>
          {/* Drum */}
          <Group ref={drumRef} x={centerX} y={centerY - 30}>
            <Circle radius={drumRadius} stroke="black" strokeWidth={2} />
            <Circle x={drumRadius - 5} y={0} radius={4} fill="red" />
          </Group>

          {/* Drum diameter line */}
          <Line
            points={[centerX - drumRadius, centerY - 30, centerX + drumRadius, centerY - 30]}
            stroke="blue"
            strokeWidth={2}
            lineJoin="round"
            dash={[5, 5]}
          />
          <Text x={centerX - 20} y={centerY - 50} text={`${actualDrumDiameter} mm`} fontStyle="italic" fill="blue" />

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

          {/* Vertical Lever */}
          <Line
            ref={PleverRef}
            points={[centerX - 100, centerY - 40, centerX - 100, centerY - 90]}
            stroke="red"
            strokeWidth={8}
          />

          {/* Horizontal Lever */}
          <Group ref={leverRef}>
            <Line points={[centerX - 104, centerY - 90, centerX + 130, centerY - 90]} stroke="black" strokeWidth={8} />
            <Arrow
              points={[centerX + 120, centerY - 90, centerX + 120, centerY - 60]}
              stroke="black"
              fill="black"
              pointerLength={10}
              pointerWidth={10}
            />
          </Group>

          <Text x={centerX - 100} y={centerY - 110} text="Lever" />
          <Circle x={centerX - 100} y={centerY - 40} radius={8} stroke="black" strokeWidth={2} fill="white" />
          <Text x={centerX - 120} y={centerY - 20} text="Pivot" />
          <Text x={centerX + 140} y={centerY - 90} text={appliedForce + " N"} fontStyle="bold" />

          {/* Status */}
          <Text
            x={centerX - 40}
            y={height - 100}
            text={isBraking ? "Braking Applied!" : "Drum Rotating"}
            fontStyle="bold"
            fill={isBraking ? "red" : "green"}
          />

          {/* Dimension Lines */}
          {showLength && (
            <Group>
              <Line
                points={[centerX - 104, centerY - 170, centerX + 130, centerY - 170]}
                stroke="green"
                strokeWidth={2}
                lineJoin="round"
                dash={[5, 5]}
                y={50}
              />
              <Text x={centerX} y={centerY - 140} text={`${leverLength} mm`} fontStyle="italic" fill="green" />
            </Group>
          )}

          {showHeight && (
            <Group>
              <Line
                points={[centerX - 155, centerY - 150, centerX - 40, centerY - 150]}
                stroke="blue"
                strokeWidth={2}
                lineJoin="round"
                dash={[5, 5]}
                x={50}
              />
              <Text x={centerX - 100} y={centerY - 140} text={`${leverHeight} mm`} fontStyle="italic" fill="blue" />
            </Group>
          )}
        </Layer>
      </Stage>

      {setIsBraking && (
        <button
          onClick={() => setIsBraking((prev) => !prev)}
          className={`px-6 py-2 mt-2 text-white font-semibold rounded-lg shadow-md transition-all ${
            isBraking ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isBraking ? "Release Brake" : "Apply Brake"}
        </button>
      )}
    </div>
  );
};

export default ShoeBrakeDiagram;
