"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, RoundedBox, Sparkles } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

type Quality = "low" | "high";
type EndpointKind = "home" | "creator" | "business" | "relay";
type Endpoint = { point: [number, number, number]; kind: EndpointKind; warm?: boolean; primary?: boolean };

const endpoints: Endpoint[] = [
  { point: [3.15, 1.95, -.55], kind: "home", primary: true },
  { point: [3.55, -.1, -.05], kind: "creator", warm: true, primary: true },
  { point: [2.95, -2.1, -.7], kind: "business", primary: true },
  { point: [-2.65, -1.62, -.9], kind: "relay", warm: true },
  { point: [-2.72, 1.45, -.6], kind: "relay" },
];

const curves = endpoints.map(({ point }, index) => new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(index % 2 ? .72 : -.62, index < 2 ? .72 : -.58, .55),
  new THREE.Vector3(point[0] * .58, point[1] * .72, index % 2 ? .38 : -.08),
  new THREE.Vector3(...point),
]));

function DataPulse({ curve, lane, quality, primary }: { curve: THREE.CatmullRomCurve3; lane: number; quality: Quality; primary: boolean }) {
  const pulse = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (!pulse.current || !material.current) return;
    const local = (state.clock.elapsedTime % 9 - lane * 2.05 + 9) % 9;
    const duration = primary ? 1.85 : 1.35;
    const active = local < duration;
    pulse.current.visible = active;
    if (!active) return;
    const progress = THREE.MathUtils.smootherstep(Math.min(local / duration, 1), 0, 1);
    pulse.current.position.copy(curve.getPoint(progress));
    pulse.current.scale.setScalar(.7 + Math.sin(progress * Math.PI) * .85);
    material.current.opacity = Math.sin(progress * Math.PI) * .98;
  });
  return <group ref={pulse} visible={false}>
    <mesh><sphereGeometry args={[primary ? .09 : .065, quality === "low" ? 8 : 14, quality === "low" ? 8 : 14]} /><meshBasicMaterial ref={material} color="#fff5d8" transparent opacity={0} toneMapped={false} /></mesh>
    <mesh scale={3.2}><sphereGeometry args={[primary ? .09 : .065, 8, 8]} /><meshBasicMaterial color="#ffb200" transparent opacity={.16} depthWrite={false} toneMapped={false} /></mesh>
  </group>;
}

function PodShell({ children, color }: { children: ReactNode; color: string }) {
  return <group>
    <mesh><cylinderGeometry args={[.46, .54, .12, 32]} /><meshPhysicalMaterial color="#16130e" metalness={.92} roughness={.16} clearcoat={1} /></mesh>
    <mesh position={[0, .09, 0]}><cylinderGeometry args={[.39, .44, .08, 32]} /><meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={.5} metalness={.58} roughness={.22} /></mesh>
    <mesh position={[0, .42, 0]}><sphereGeometry args={[.55, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshPhysicalMaterial color="#fff3d0" transparent opacity={.1} transmission={.38} roughness={.06} metalness={.1} depthWrite={false} /></mesh>
    <group position={[0, .18, 0]}>{children}</group>
    <mesh position={[0, .04, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.48, .012, 8, 48]} /><meshBasicMaterial color={color} transparent opacity={.85} toneMapped={false} /></mesh>
    <pointLight position={[0, .5, .35]} color={color} intensity={2.2} distance={2.4} />
  </group>;
}

function HomePod() {
  return <PodShell color="#ffb200"><group scale={.42}>
    <RoundedBox args={[1.25, .82, .72]} radius={.1} smoothness={3} position={[0, .25, 0]}><meshPhysicalMaterial color="#201b13" metalness={.58} roughness={.2} clearcoat={1} /></RoundedBox>
    <mesh position={[0, .86, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[.88, .88, .76]} /><meshPhysicalMaterial color="#2b2417" metalness={.52} roughness={.23} /></mesh>
    <mesh position={[0, .24, .39]}><planeGeometry args={[.3, .48]} /><meshBasicMaterial color="#fff2ce" toneMapped={false} /></mesh>
    <mesh position={[.39, .38, .375]}><planeGeometry args={[.26, .22]} /><meshBasicMaterial color="#ffb200" toneMapped={false} /></mesh>
  </group></PodShell>;
}

function CreatorPod() {
  return <PodShell color="#ffe3a1"><group position={[0, .22, 0]}>
    <mesh rotation={[0, 0, -.1]}><boxGeometry args={[.58, .4, .12]} /><meshPhysicalMaterial color="#181611" metalness={.8} roughness={.12} clearcoat={1} /></mesh>
    <mesh position={[0, 0, .066]}><planeGeometry args={[.48, .3]} /><meshBasicMaterial color="#ffb200" toneMapped={false} /></mesh>
    <mesh position={[.33, .05, .08]}><cylinderGeometry args={[.11, .13, .3, 20]} /><meshPhysicalMaterial color="#eee2c4" metalness={.72} roughness={.16} /></mesh>
    <mesh position={[.33, .27, .08]}><sphereGeometry args={[.14, 18, 18]} /><meshPhysicalMaterial color="#fff4d8" emissive="#ffb200" emissiveIntensity={.35} metalness={.48} roughness={.2} /></mesh>
  </group></PodShell>;
}

function BusinessPod() {
  return <PodShell color="#ffb200"><group position={[0, .12, 0]}>
    {[-.25, 0, .25].map((x, index) => <RoundedBox key={x} args={[.2, .55 + index * .18, .22]} radius={.035} smoothness={2} position={[x, (.55 + index * .18) / 2, 0]}><meshPhysicalMaterial color={index === 1 ? "#332712" : "#1c1913"} metalness={.78} roughness={.18} clearcoat={1} /></RoundedBox>)}
    {[[-.25, .22], [0, .28], [.25, .2]].map(([x, y]) => <mesh key={`${x}-${y}`} position={[x, y, .116]}><planeGeometry args={[.09, .1]} /><meshBasicMaterial color="#ffe3a1" toneMapped={false} /></mesh>)}
  </group></PodShell>;
}

function EndpointObject({ kind, warm = false }: Pick<Endpoint, "kind" | "warm">) {
  const color = warm ? "#ffe3a1" : "#ffb200";
  if (kind === "home") return <Float speed={.75} rotationIntensity={.035} floatIntensity={.12}><HomePod /></Float>;
  if (kind === "creator") return <Float speed={.7} rotationIntensity={.03} floatIntensity={.11}><CreatorPod /></Float>;
  if (kind === "business") return <Float speed={.8} rotationIntensity={.035} floatIntensity={.1}><BusinessPod /></Float>;
  return <Float speed={1.1} rotationIntensity={.07} floatIntensity={.16}><group scale={.72}>
    <mesh><icosahedronGeometry args={[.24, 1]} /><meshPhysicalMaterial color="#17140f" metalness={.9} roughness={.18} clearcoat={1} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.35, .014, 8, 32]} /><meshBasicMaterial color={color} transparent opacity={.65} toneMapped={false} /></mesh>
    <pointLight color={color} intensity={1.3} distance={1.7} />
  </group></Float>;
}

function Core({ quality }: { quality: Quality }) {
  const core = useRef<THREE.Group>(null);
  const orbitA = useRef<THREE.Mesh>(null);
  const orbitB = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!core.current || !orbitA.current || !orbitB.current) return;
    core.current.rotation.x += delta * .04;
    core.current.rotation.y += delta * .075;
    orbitA.current.rotation.z += delta * .12;
    orbitB.current.rotation.x -= delta * .09;
  });
  return <Float speed={.8} rotationIntensity={.05} floatIntensity={.16}><group ref={core}>
    <mesh><icosahedronGeometry args={[1.08, quality === "low" ? 1 : 2]} /><meshPhysicalMaterial color="#ffb200" emissive="#ff8a00" emissiveIntensity={2.4} roughness={.12} metalness={.8} clearcoat={1} wireframe /></mesh>
    <mesh scale={.82}><icosahedronGeometry args={[1, quality === "low" ? 1 : 2]} /><meshPhysicalMaterial color="#ffc233" emissive="#f7941e" emissiveIntensity={1.05} transparent opacity={.2} roughness={.18} metalness={.55} /></mesh>
    <mesh ref={orbitA} rotation={[1.1, .2, .2]}><torusGeometry args={[1.32, .012, 8, 64]} /><meshBasicMaterial color="#ffd36e" transparent opacity={.5} toneMapped={false} /></mesh>
    <mesh ref={orbitB} rotation={[.2, .9, 1.3]}><torusGeometry args={[1.5, .009, 8, 64]} /><meshBasicMaterial color="#ffe3a1" transparent opacity={.24} toneMapped={false} /></mesh>
    <mesh scale={.35}><sphereGeometry args={[1, quality === "low" ? 16 : 28, quality === "low" ? 16 : 28]} /><meshBasicMaterial color="#fff5dd" toneMapped={false} /></mesh>
    <mesh scale={.58}><sphereGeometry args={[1, 16, 16]} /><meshBasicMaterial color="#ffb200" transparent opacity={.08} depthWrite={false} /></mesh>
  </group></Float>;
}

function Network({ quality }: { quality: Quality }) {
  const { pointer, size } = useThree();
  const compact = size.width < 360;
  const medium = size.width >= 360 && size.width < 620;
  const paths = useMemo(() => curves.map((curve) => curve.getPoints(quality === "low" ? 26 : 56)), [quality]);
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * (compact ? .08 : .22), .025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.y * (compact ? .045 : .12), .025);
    state.camera.lookAt(0, 0, 0);
  });
  const position: [number, number, number] = compact ? [-.05, .02, 0] : medium ? [-.28, 0, 0] : [-.55, 0, 0];
  const scale = compact ? .68 : medium ? .84 : 1;
  return <group position={position} scale={scale}>
    <Core quality={quality} />
    {endpoints.map((endpoint, index) => {
      const color = endpoint.warm ? "#ffe3a1" : "#ffb200";
      return <group key={`${endpoint.kind}-${index}`} visible={!compact || Boolean(endpoint.primary)}>
        <mesh><tubeGeometry args={[curves[index], quality === "low" ? 28 : 58, endpoint.primary ? .022 : .014, quality === "low" ? 5 : 8, false]} /><meshBasicMaterial color={color} transparent opacity={endpoint.primary ? .94 : .5} toneMapped={false} /></mesh>
        <mesh><tubeGeometry args={[curves[index], quality === "low" ? 22 : 42, endpoint.primary ? .08 : .045, 6, false]} /><meshBasicMaterial color={color} transparent opacity={endpoint.primary ? .065 : .025} depthWrite={false} /></mesh>
        <Line points={paths[index]} color="#fff5dd" lineWidth={endpoint.primary ? .5 : .3} transparent opacity={endpoint.primary ? .34 : .18} />
        <group position={endpoint.point}><EndpointObject kind={endpoint.kind} warm={endpoint.warm} /></group>
        <DataPulse curve={curves[index]} lane={index} quality={quality} primary={Boolean(endpoint.primary)} />
      </group>;
    })}
    {compact ? null : <Sparkles count={quality === "low" ? 18 : 42} scale={[7.5, 5.6, 3]} size={quality === "low" ? 1 : 1.55} speed={.11} color="#f4f0e5" opacity={.26} />}
  </group>;
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const sent = useRef(false);
  useFrame(() => {
    if (sent.current) return;
    sent.current = true;
    onReady?.();
  });
  return null;
}

export function FibreScene({ quality, onReady }: { quality: Quality; onReady?: () => void }) {
  return <div className="absolute inset-0" aria-hidden="true"><Canvas dpr={quality === "low" ? 1 : [1, 1.5]} camera={{ position: [0, 0, 7.35], fov: 45 }} gl={{ antialias: quality === "high", powerPreference: quality === "low" ? "low-power" : "high-performance", alpha: true }}>
    <ambientLight intensity={.5} /><pointLight position={[1.8, 1.8, 3]} color="#ffb200" intensity={19} distance={12} /><pointLight position={[-2.5, -1.4, 2]} color="#ffe3a1" intensity={7} distance={9} /><spotLight position={[0, 4, 5]} color="#fff5dd" intensity={7} angle={.55} penumbra={1} /><Network quality={quality} /><ReadySignal onReady={onReady} />
  </Canvas></div>;
}
