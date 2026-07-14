"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const ref = useRef<THREE.Points>(null);

  // Generate 800 random point coordinates
  const positions = useMemo(() => {
    const coords = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;     // X
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      coords[i * 3 + 2] = (Math.random() - 0.5) * 8;  // Z
    }
    return coords;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow background rotation
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;

      // Mouse influence (slight parallax shifting)
      const targetX = (mouseX / window.innerWidth - 0.5) * 1.5;
      const targetY = -(mouseY / window.innerHeight - 0.5) * 1.5;

      ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

interface GalaxyBgProps {
  mouseX: number;
  mouseY: number;
}

export default function GalaxyBg({ mouseX, mouseY }: GalaxyBgProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }}>
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.5} />
        <ParticleField mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
