"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Quality = "low" | "high";
type EndpointKind = "home" | "creator" | "business" | "relay";
type Endpoint = { point: [number,number,number]; kind: EndpointKind; lime?: boolean; primary?: boolean };

const endpoints: Endpoint[] = [
  { point:[3.25,2,-.65], kind:"home", primary:true },
  { point:[3.7,-.05,-.15], kind:"creator", lime:true, primary:true },
  { point:[3.05,-2.18,-.8], kind:"business", primary:true },
  { point:[-2.75,-1.7,-.7], kind:"relay", lime:true },
  { point:[-2.85,1.55,-.45], kind:"relay" },
];

const curves = endpoints.map(({point}, index) => new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(index % 2 ? .8 : -.72,index < 2 ? .78 : -.64,.45),
  new THREE.Vector3(point[0]*.58,point[1]*.72,index % 2 ? .35 : -.05),
  new THREE.Vector3(...point),
]));

function DataPulse({curve,offset,lime,quality}:{curve:THREE.CatmullRomCurve3;offset:number;lime?:boolean;quality:Quality}) {
  const head=useRef<THREE.Group>(null);
  useFrame((state)=>{if(!head.current)return;const progress=(state.clock.elapsedTime*(quality==="low"?.16:.2)+offset)%1;head.current.position.copy(curve.getPoint(progress));head.current.scale.setScalar(.74+Math.sin(progress*Math.PI)*.62);});
  const color=lime?"#ffe3a1":"#fff0d2";
  return <group ref={head}><mesh><sphereGeometry args={[.082,quality==="low"?8:14,quality==="low"?8:14]}/><meshBasicMaterial color={color} toneMapped={false}/></mesh><mesh scale={2.7}><sphereGeometry args={[.082,8,8]}/><meshBasicMaterial color={color} transparent opacity={.13} depthWrite={false}/></mesh></group>;
}

function EndpointGlyph({kind,lime=false,primary=false}:Pick<Endpoint,"kind"|"lime"|"primary">) {
  const color=lime?"#ffe3a1":"#ffb200";
  return <Float speed={1.35} rotationIntensity={.08} floatIntensity={.18}><group scale={primary?1:.72}>
    <mesh><sphereGeometry args={[.31,20,20]}/><meshPhysicalMaterial color="#0d0f0b" metalness={.82} roughness={.2} clearcoat={1}/></mesh>
    <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.4,.018,8,36]}/><meshBasicMaterial color={color} transparent opacity={.7} toneMapped={false}/></mesh>
    <mesh rotation={[.4,.25,.65]}><torusGeometry args={[.48,.012,8,36]}/><meshBasicMaterial color={color} transparent opacity={.27} toneMapped={false}/></mesh>
    {kind==="home"&&<group position={[0,-.01,.28]} scale={.14}><mesh position={[0,-.35,0]}><boxGeometry args={[1.2,.9,.16]}/><meshBasicMaterial color="#fff5dd" toneMapped={false}/></mesh><mesh position={[0,.3,0]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.86,.86,.16]}/><meshBasicMaterial color="#fff5dd" toneMapped={false}/></mesh></group>}
    {kind==="creator"&&<group position={[0,0,.29]}><mesh><torusGeometry args={[.13,.045,10,28]}/><meshBasicMaterial color="#fff6dc" toneMapped={false}/></mesh><mesh position={[0,0,-.01]}><circleGeometry args={[.045,16]}/><meshBasicMaterial color={color} toneMapped={false}/></mesh></group>}
    {kind==="business"&&<group position={[0,-.015,.29]}>{[-.12,0,.12].map((x,index)=><mesh key={x} position={[x,(index-1)*.035,0]}><boxGeometry args={[.085,.24+index*.06,.08]}/><meshBasicMaterial color="#fff5dd" toneMapped={false}/></mesh>)}</group>}
    {kind==="relay"&&<mesh position={[0,0,.3]}><sphereGeometry args={[.065,12,12]}/><meshBasicMaterial color={color} toneMapped={false}/></mesh>}
    <pointLight color={color} intensity={primary?3.5:1.5} distance={2.2}/>
  </group></Float>;
}

function Core({quality}:{quality:Quality}) {
  const core=useRef<THREE.Group>(null);const orbitA=useRef<THREE.Mesh>(null);const orbitB=useRef<THREE.Mesh>(null);
  useFrame((_,delta)=>{if(!core.current||!orbitA.current||!orbitB.current)return;core.current.rotation.x+=delta*.055;core.current.rotation.y+=delta*.105;orbitA.current.rotation.z+=delta*.16;orbitB.current.rotation.x-=delta*.12;});
  return <Float speed={1.05} rotationIntensity={.08} floatIntensity={.22}><group ref={core}>
    <mesh><icosahedronGeometry args={[1.08,quality==="low"?1:2]}/><meshPhysicalMaterial color="#ffb200" emissive="#ff8a00" emissiveIntensity={2.6} roughness={.14} metalness={.78} clearcoat={1} wireframe/></mesh>
    <mesh scale={.82}><icosahedronGeometry args={[1,quality==="low"?1:2]}/><meshPhysicalMaterial color="#ffc233" emissive="#f7941e" emissiveIntensity={1.1} transparent opacity={.2} roughness={.2} metalness={.5}/></mesh>
    <mesh ref={orbitA} rotation={[1.1,.2,.2]}><torusGeometry args={[1.32,.012,8,64]}/><meshBasicMaterial color="#ffd36e" transparent opacity={.5} toneMapped={false}/></mesh>
    <mesh ref={orbitB} rotation={[.2,.9,1.3]}><torusGeometry args={[1.5,.009,8,64]}/><meshBasicMaterial color="#ffe3a1" transparent opacity={.24} toneMapped={false}/></mesh>
    <mesh scale={.35}><sphereGeometry args={[1,quality==="low"?16:28,quality==="low"?16:28]}/><meshBasicMaterial color="#fff5dd" toneMapped={false}/></mesh>
    <mesh scale={.58}><sphereGeometry args={[1,16,16]}/><meshBasicMaterial color="#ffb200" transparent opacity={.08} depthWrite={false}/></mesh>
  </group></Float>;
}

function Network({quality}:{quality:Quality}) {
  const group=useRef<THREE.Group>(null);const {size}=useThree();const compact=size.width<620;
  const paths=useMemo(()=>curves.map((curve)=>curve.getPoints(quality==="low"?26:56)),[quality]);
  useFrame((state)=>{if(!group.current)return;group.current.rotation.y=THREE.MathUtils.lerp(group.current.rotation.y,state.pointer.x*(compact?.08:.16),.035);group.current.rotation.x=THREE.MathUtils.lerp(group.current.rotation.x,-state.pointer.y*(compact?.045:.09),.035);});
  return <group ref={group} position={compact?[-.1,.05,0]:[-.68,0,0]} scale={compact?.78:1}>
    <Core quality={quality}/>
    {endpoints.map((endpoint,index)=>{const color=endpoint.lime?"#ffe3a1":"#ffb200";return <group key={`${endpoint.kind}-${index}`}>
      <mesh><tubeGeometry args={[curves[index],quality==="low"?28:58,.018,quality==="low"?5:8,false]}/><meshBasicMaterial color={color} transparent opacity={.92} toneMapped={false}/></mesh>
      <mesh><tubeGeometry args={[curves[index],quality==="low"?22:42,.07,6,false]}/><meshBasicMaterial color={color} transparent opacity={.055} depthWrite={false}/></mesh>
      <Line points={paths[index]} color="#fff5dd" lineWidth={.45} transparent opacity={.34}/>
      <group position={endpoint.point}><EndpointGlyph kind={endpoint.kind} lime={endpoint.lime} primary={endpoint.primary}/></group>
      <DataPulse curve={curves[index]} offset={index*.17} lime={endpoint.lime} quality={quality}/>
      {quality==="high"&&<DataPulse curve={curves[index]} offset={.46+index*.11} lime={endpoint.lime} quality={quality}/>}
    </group>})}
    <Sparkles count={quality==="low"?20:54} scale={[7.7,5.8,3.2]} size={quality==="low"?1.1:1.7} speed={.16} color="#f4f0e5" opacity={.34}/>
  </group>;
}

export function FibreScene({quality,onReady}:{quality:Quality;onReady?:()=>void}) {
  return <div className="absolute inset-0" aria-hidden="true"><Canvas onCreated={onReady} dpr={quality==="low"?1:[1,1.5]} camera={{position:[0,0,7.35],fov:45}} gl={{antialias:quality==="high",powerPreference:quality==="low"?"low-power":"high-performance",alpha:true}}>
    <ambientLight intensity={.5}/><pointLight position={[1.8,1.8,3]} color="#ffb200" intensity={19} distance={12}/><pointLight position={[-2.5,-1.4,2]} color="#ffe3a1" intensity={7} distance={9}/><spotLight position={[0,4,5]} color="#fff5dd" intensity={7} angle={.55} penumbra={1}/><Network quality={quality}/>
  </Canvas></div>;
}
