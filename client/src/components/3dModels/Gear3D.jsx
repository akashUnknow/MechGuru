import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";

function GearModel() {
  const { scene } = useGLTF("/models/gear/scene.gltf");
  return <primitive object={scene} scale={1} />;
}

export default function Gear3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 6], fov: 45 }}>
        {/* ✅ Soft background color */}
        <color attach="background" args={["#787878"]} />

        {/* ✅ Key Lights Setup */}
        <ambientLight intensity={0.5} /> {/* soft global light */}
        
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 2, -5]} intensity={0.6} /> {/* fill light */}
        <pointLight position={[0, 5, 0]} intensity={0.8} /> {/* top light */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* ✅ Optional realistic environment */}
        <Environment preset="studio" />

        {/* ✅ Soft shadow under model */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        {/* ✅ Model */}
        <GearModel />

        {/* ✅ Smooth Orbit Controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          zoomSpeed={0.8}
          panSpeed={0.5}
          minDistance={2}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}
