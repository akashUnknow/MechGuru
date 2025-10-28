import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Shaft({ diameter = 10, torque = 0 }) {
  const groupRef = useRef();

  // 🔹 Normalize scaling to avoid extreme sizes
  const normalizedScale = diameter / 100; // scale factor (makes 100 mm look normal)
  const scaledRadius = 0.5 * normalizedScale;
  const length = 3 * normalizedScale; // fixed proportion

  // 🔹 Continuous rotation about shaft’s own Y-axis
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (parseFloat(torque) || 0) / 5000;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0.2, 0]}>
      {/* Shaft */}
      <mesh>
        <cylinderGeometry args={[scaledRadius, scaledRadius, length, 64]} />
        <meshStandardMaterial color="#999" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Red marker to visualize rotation */}
      <mesh position={[scaledRadius, 0, 0]}>
        <boxGeometry args={[0.1 * normalizedScale, 0.1 * normalizedScale, 0.1 * normalizedScale]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}

const ThreeDShaft = ({ diameter, torque }) => {
  // 🔹 Dynamic camera adjustment
  const cameraDistance = useMemo(() => {
    const base = 8;
    return base + diameter / 50; // keeps shaft in view
  }, [diameter]);

  return (
    <div className="w-full h-[400px] bg-slate-100 rounded-xl border border-slate-300">
      <Canvas camera={{ position: [0, 0, cameraDistance], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Shaft diameter={diameter} torque={torque} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default ThreeDShaft;
