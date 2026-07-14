"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.08;
      ringRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Wireframe outer sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Floating orbital rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.015, 8, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Solid inner core glowing dot */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* India marker node coordinates */}
      {/* Bhopal is approximately at 23.25 N, 77.41 E. In spherical coordinates: */}
      <mesh position={[0.65, 0.7, 1.25]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

export default function InteractiveGlobe() {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <GlobeMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
