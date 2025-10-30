import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function BeltConveyorModel() {
  const { scene } = useGLTF("/models/con_ass.glb");
  return <primitive object={scene} scale={1} />;
}

export default function BeltConveyor3D() {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Model */}
        <BeltConveyorModel />

        {/* Orbit Controls — fine-tuned for smooth mouse experience */}
        <OrbitControls
          enableDamping
          dampingFactor={0.08}       // smooth camera motion
          rotateSpeed={0.6}          // slower rotation
          zoomSpeed={0.8}            // smoother zoom
          panSpeed={0.5}             // smoother panning
          minDistance={2}            // prevent zooming in too close
          maxDistance={10}           // prevent zooming out too far
          maxPolarAngle={Math.PI / 2.1} // restrict to top-down limit
        />
      </Canvas>
    </div>
  );
}
