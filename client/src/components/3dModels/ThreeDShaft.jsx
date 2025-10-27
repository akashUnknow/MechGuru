// File: src/components/ThreeDShaft.jsx
import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function Shaft({ diameter = 10, torque = 0 }) {
  const meshRef = useRef();

  const scaledRadius = (diameter / 10) / 2;
 const length = diameter * 0.6

  // Rotate based on torque (speed = torque/1000)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += (parseFloat(torque) || 0) / 20000;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
      <cylinderGeometry args={[scaledRadius, scaledRadius, length, 64]} />
      <meshStandardMaterial
        color="#999"
        metalness={0.8}
        roughness={0.3}
      />
    </mesh>
  )
}

const ThreeDShaft = ({ diameter, torque }) => {
  return (
    <div className="w-full h-[400px] bg-slate-100 rounded-xl border border-slate-300">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Shaft diameter={diameter} torque={torque} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}

export default ThreeDShaft
