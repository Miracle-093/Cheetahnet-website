"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Quality = "low" | "high";
const endpoints: Array<{ point: [number,number,number]; label: string; lime?: boolean }> = [
  { point: [3.35,1.9,-.6], label: "HOME" }, { point: [3.65,-.1,-.2], label: "CREATE", lime: true },
  { point: [3.1,-2.15,-.9], label: "BUSINESS" }, { point: [-2.75,-1.75,-.6], label: "WORK", lime: true },
  { point: [-2.85,1.55,-.4], label: "PLAY" },
];
const curves = endpoints.map(({point}, index) => new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,0,0), new THREE.Vector3(index % 2 ? .8 : -.7, index < 2 ? .7 : -.6, .25),
  new THREE.Vector3(point[0] * .62, point[1] * .7, .15), new THREE.Vector3(...point),
]));

function DataPulse({ curve, offset, lime }: { curve: THREE.CatmullRomCurve3; offset: number; lime?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => { if (!ref.current) return; const progress = (state.clock.elapsedTime * .22 + offset) % 1; ref.current.position.copy(curve.getPoint(progress)); ref.current.scale.setScalar(.75 + Math.sin(progress * Math.PI) * .55); });
  return <mesh ref={ref}><sphereGeometry args={[.075,10,10]} /><meshBasicMaterial color={lime ? "#c8ff45" : "#fff3d8"} toneMapped={false} /></mesh>;
}

function Network({ quality }: { quality: Quality }) {
  const group = useRef<THREE.Group>(null); const core = useRef<THREE.Group>(null);
  const paths = useMemo(() => curves.map((curve) => curve.getPoints(quality === "low" ? 22 : 42)), [quality]);
  useFrame((state, delta) => { if (!group.current || !core.current) return; group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * .16, .035); group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * .09, .035); core.current.rotation.x += delta * .08; core.current.rotation.y += delta * .14; });
  return <group ref={group} position={[-.72,0,0]}>
    <Float speed={1.1} rotationIntensity={.12} floatIntensity={.22}><group ref={core}>
      <mesh><icosahedronGeometry args={[1.02, quality === "low" ? 1 : 2]} /><meshPhysicalMaterial color="#ff6b18" emissive="#ff4b00" emissiveIntensity={2.8} roughness={.16} metalness={.72} clearcoat={1} wireframe /></mesh>
      <mesh scale={.76}><icosahedronGeometry args={[1,2]} /><meshPhysicalMaterial color="#ff7a24" emissive="#ff5200" emissiveIntensity={1.2} transparent opacity={.26} roughness={.2} metalness={.45} /></mesh>
      <mesh scale={.34}><sphereGeometry args={[1,24,24]} /><meshBasicMaterial color="#fff5dd" toneMapped={false} /></mesh>
    </group></Float>
    {endpoints.map((endpoint, index) => <group key={endpoint.label}>
      <Line points={paths[index]} color={endpoint.lime ? "#c8ff45" : "#ff6b18"} lineWidth={endpoint.lime ? 1.4 : 2.1} transparent opacity={.92} />
      <Line points={paths[index]} color={endpoint.lime ? "#c8ff45" : "#ff6b18"} lineWidth={7} transparent opacity={.08} />
      <group position={endpoint.point}><mesh><sphereGeometry args={[.19,16,16]} /><meshPhysicalMaterial color="#10120e" emissive={endpoint.lime ? "#c8ff45" : "#ff6b18"} emissiveIntensity={1.4} metalness={.85} roughness={.2} /></mesh><mesh scale={1.55}><sphereGeometry args={[.19,12,12]} /><meshBasicMaterial color={endpoint.lime ? "#c8ff45" : "#ff6b18"} transparent opacity={.13} /></mesh></group>
      <DataPulse curve={curves[index]} offset={index * .17} lime={endpoint.lime} />{quality === "high" && <DataPulse curve={curves[index]} offset={.48 + index * .11} lime={endpoint.lime} />}
    </group>)}
    <Sparkles count={quality === "low" ? 18 : 42} scale={[7.5,5.5,3]} size={quality === "low" ? 1.2 : 1.8} speed={.18} color="#f4f0e5" opacity={.35} />
  </group>;
}

export function FibreScene({ quality }: { quality: Quality }) {
  return <div className="absolute inset-0" aria-hidden="true"><Canvas dpr={quality === "low" ? 1 : [1,1.5]} camera={{ position:[0,0,7.2], fov:46 }} gl={{ antialias: quality === "high", powerPreference: quality === "low" ? "low-power" : "high-performance", alpha:true }}>
    <ambientLight intensity={.55}/><pointLight position={[1.8,1.8,3]} color="#ff6b18" intensity={18} distance={12}/><pointLight position={[-2.5,-1.4,2]} color="#c8ff45" intensity={7} distance={9}/><spotLight position={[0,4,5]} color="#fff5dd" intensity={6} angle={.55} penumbra={1}/><Network quality={quality}/>
  </Canvas></div>;
}
