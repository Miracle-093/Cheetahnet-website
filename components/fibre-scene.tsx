"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const paths: [number, number, number][][] = [
  [[0,0,0],[1.2,.5,.2],[2.7,1.45,-.5]],
  [[0,0,0],[-1.2,.45,.2],[-2.8,1.2,-.3]],
  [[0,0,0],[.7,-.9,.1],[2.6,-1.35,-.8]],
  [[0,0,0],[-.6,-.8,.2],[-2.4,-1.45,-.5]],
  [[0,0,0],[.2,1.1,-.2],[.45,2.3,-1]],
];

function Network() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * .18, .035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * .1, .035);
    core.current.rotation.x += delta * .2;
    core.current.rotation.y += delta * .28;
  });
  return <group ref={group}>
    <Float speed={1.4} rotationIntensity={.25} floatIntensity={.35}>
      <mesh ref={core}><icosahedronGeometry args={[.72, 2]} /><meshStandardMaterial color="#ff6b18" emissive="#ff4f00" emissiveIntensity={2.5} roughness={.18} metalness={.5} wireframe /></mesh>
      <mesh><sphereGeometry args={[.28, 24, 24]} /><meshBasicMaterial color="#fff3d8" /></mesh>
    </Float>
    {paths.map((path, index) => <group key={index}>
      <Line points={path} color={index % 2 ? "#c8ff45" : "#ff6b18"} lineWidth={1.5} transparent opacity={.85} />
      <mesh position={path[path.length - 1]}><sphereGeometry args={[.12, 16, 16]} /><meshStandardMaterial color={index % 2 ? "#c8ff45" : "#ff6b18"} emissive={index % 2 ? "#c8ff45" : "#ff6b18"} emissiveIntensity={2} /></mesh>
    </group>)}
    <Sparkles count={34} scale={6} size={1.4} speed={.25} color="#f4f0e5" opacity={.45} />
  </group>;
}

export function FibreScene() {
  return <div className="absolute inset-0" aria-hidden="true">
    <Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 6.3], fov: 48 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
      <ambientLight intensity={.3} /><pointLight position={[2,2,3]} color="#ff6b18" intensity={12} /><pointLight position={[-2,-1,2]} color="#c8ff45" intensity={8} />
      <Network />
    </Canvas>
  </div>;
}
