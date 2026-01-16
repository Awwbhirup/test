"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

function CyberOrb() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ff003c" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <CyberOrb />
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#00f0ff" />
        </Suspense>
      </Canvas>
    </div>
  );
}
