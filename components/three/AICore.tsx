"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Line, Edges } from "@react-three/drei";
import * as THREE from "three";

const NODES = [
  { label: "Frontend", angle: 0, height: 2 },
  { label: "Backend", angle: (Math.PI * 2) / 8, height: -1 },
  { label: "DevOps", angle: (Math.PI * 2) / 8 * 2, height: 3 },
  { label: "Research", angle: (Math.PI * 2) / 8 * 3, height: -2 },
  { label: "AI Agents", angle: (Math.PI * 2) / 8 * 4, height: 1.5 },
  { label: "Documentation", angle: (Math.PI * 2) / 8 * 5, height: -3 },
  { label: "Codebase", angle: (Math.PI * 2) / 8 * 6, height: 0.5 },
  { label: "Memory", angle: (Math.PI * 2) / 8 * 7, height: -0.5 },
];

export default function AICore({ scrollProgress }: { scrollProgress: number }) {
  const engineGroupRef = useRef<THREE.Group>(null);
  const spineRef = useRef<THREE.Mesh>(null);
  const shardGroupRef = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  
  const { mouse } = useThree();
  
  // Generate random shard positions and rotations
  const shardData = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));
  }, []);

  // Generate floating glass panels
  const panelData = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const radius = 4 + Math.random() * 3;
      const angle = (i / 12) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 8,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [0, -angle + Math.PI/2, 0] as [number, number, number], // Face tangent to orbit
        orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.05 + Math.random() * 0.1)
      };
    });
  }, []);

  // Sync Event Timers
  const timeRef = useRef(0);
  const syncState = useRef({
    isSyncing: false,
    pulseValue: 0,
    spineFlash: 0
  });

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    // 10s Signature Event cycle
    if (timeRef.current >= 10) {
      timeRef.current = 0;
      syncState.current.isSyncing = true;
      syncState.current.spineFlash = 1.0;
    }

    // Process Sync Event (lasts about 1.5 seconds)
    if (syncState.current.isSyncing) {
      // Ease out the sync pulse
      if (timeRef.current < 1.5) {
        syncState.current.pulseValue = Math.sin((timeRef.current / 1.5) * Math.PI);
        syncState.current.spineFlash = Math.max(0, syncState.current.spineFlash - delta * 0.8);
      } else {
        syncState.current.isSyncing = false;
        syncState.current.pulseValue = 0;
        syncState.current.spineFlash = 0;
      }
    }

    const { pulseValue, spineFlash } = syncState.current;

    // Spine Animation
    if (spineRef.current) {
      // Spine slowly rotates, speeds up during sync
      spineRef.current.rotation.y += delta * (0.2 + pulseValue * 2);
      // Spine material emissive bumps during flash
      const mat = spineRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + (spineFlash * 10) + (Math.sin(state.clock.elapsedTime * 4) * 0.5);
    }

    // Shards Animation
    if (shardGroupRef.current) {
      shardGroupRef.current.rotation.y += delta * 0.1;
      shardGroupRef.current.children.forEach((child, i) => {
        child.rotation.x += shardData[i].speed;
        child.rotation.y += shardData[i].speed * 1.5;
        // Float slightly
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.005;
        // Expand outward during sync
        if (pulseValue > 0) {
          const distance = Math.sqrt(child.position.x**2 + child.position.z**2);
          const push = pulseValue * 0.1 * (1/Math.max(1, distance));
          child.position.x += child.position.x * push;
          child.position.z += child.position.z * push;
        }
      });
    }

    // Glass Panels Orbit
    if (panelsRef.current) {
      panelsRef.current.children.forEach((panel, i) => {
        const data = panelData[i];
        const currentAngle = Math.atan2(panel.position.z, panel.position.x);
        const radius = Math.sqrt(panel.position.x**2 + panel.position.z**2);
        const newAngle = currentAngle + delta * data.orbitSpeed * (1 + pulseValue * 3); // speed up on sync
        
        panel.position.x = Math.cos(newAngle) * radius;
        panel.position.z = Math.sin(newAngle) * radius;
        panel.rotation.y = -newAngle + Math.PI/2;
        
        // Bob up and down
        panel.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01;
      });
    }

    // Main Engine Parallax (mouse follow)
    if (engineGroupRef.current) {
      const targetX = mouse.x * 0.8;
      const targetY = mouse.y * 0.8;
      engineGroupRef.current.rotation.x += (targetY - engineGroupRef.current.rotation.x) * 0.05;
      engineGroupRef.current.rotation.y += (targetX - engineGroupRef.current.rotation.y) * 0.05;
    }
  });

  // Reusable Materials
  const spineMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#a855f7",
    emissive: "#7c3aed",
    emissiveIntensity: 2,
    wireframe: true,
    toneMapped: false
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#e879f9",
    metalness: 0.2,
    roughness: 0.1,
    transmission: 0.9, // glass-like
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide
  }), []);

  const shardMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#3b82f6",
    emissive: "#1d4ed8",
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.8
  }), []);

  return (
    <group ref={engineGroupRef}>
      
      {/* Central Vertical Energy Spine */}
      <mesh ref={spineRef} material={spineMaterial}>
        {/* Hexagonal cylinder (radiusTop, radiusBottom, height, radialSegments) */}
        <cylinderGeometry args={[0.5, 0.5, 14, 6]} />
        <Edges scale={1.05} threshold={15} color="#d8b4fe" />
      </mesh>

      {/* Inner Core Crystal */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#fff" emissive="#c084fc" emissiveIntensity={3} wireframe />
      </mesh>

      {/* Orbiting Hexagonal Shards */}
      <group ref={shardGroupRef}>
        {shardData.map((data, i) => (
          <mesh 
            key={`shard-${i}`} 
            position={data.position} 
            rotation={data.rotation} 
            scale={data.scale}
            material={shardMaterial}
          >
            <cylinderGeometry args={[1, 1, 0.2, 6]} /> {/* Flat Hexagon */}
            <Edges scale={1.02} color="#60a5fa" />
          </mesh>
        ))}
      </group>

      {/* Floating Glass Data Panels */}
      <group ref={panelsRef}>
        {panelData.map((data, i) => (
          <group key={`panel-${i}`} position={data.position} rotation={data.rotation}>
            <mesh material={glassMaterial}>
              <planeGeometry args={[1.5, 2.5]} />
            </mesh>
            {/* Holographic borders */}
            <Line points={[[-0.75, 1.25, 0], [0.75, 1.25, 0], [0.75, -1.25, 0], [-0.75, -1.25, 0], [-0.75, 1.25, 0]]} color="#a855f7" lineWidth={1} />
            {/* Fake data lines inside panel */}
            <Line points={[[-0.5, 0.8, 0.01], [0.5, 0.8, 0.01]]} color="#c084fc" lineWidth={1} opacity={0.5} transparent />
            <Line points={[[-0.5, 0.4, 0.01], [0.2, 0.4, 0.01]]} color="#c084fc" lineWidth={1} opacity={0.5} transparent />
            <Line points={[[-0.5, 0.0, 0.01], [0.4, 0.0, 0.01]]} color="#c084fc" lineWidth={1} opacity={0.5} transparent />
          </group>
        ))}
      </group>

      {/* Neural Nodes & Pathways */}
      {NODES.map((node, i) => {
        const radius = 5 + (i % 2 === 0 ? 1 : 2);
        const x = Math.cos(node.angle) * radius;
        const z = Math.sin(node.angle) * radius;
        const y = node.height;
        
        // Scroll activation logic:
        const threshold = i / NODES.length;
        const isActive = scrollProgress >= threshold * 0.4;
        const opacity = isActive ? 1 : 0;

        return (
          <group key={node.label} position={[x, y, z]}>
            <Html center zIndexRange={[100, 0]} style={{ transition: 'opacity 0.8s', opacity, pointerEvents: 'none' }}>
              <div className="px-3 py-1.5 rounded border border-[#a855f7]/40 text-[10px] uppercase tracking-widest font-bold text-white whitespace-nowrap bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                {node.label}
              </div>
            </Html>
            {isActive && (
              <>
                {/* Connection to spine (jagged path instead of straight line) */}
                <Line 
                  points={[
                    [0, 0, 0], 
                    [-x * 0.3, -y * 0.5, -z * 0.3], 
                    [-x * 0.7, -y * 0.8, -z * 0.7], 
                    [-x, -y, -z]
                  ]} 
                  color="#c084fc" 
                  lineWidth={1}
                  opacity={0.4} 
                  transparent 
                />
                <mesh>
                  <octahedronGeometry args={[0.15, 0]} />
                  <meshStandardMaterial color="#fff" emissive="#a855f7" emissiveIntensity={2} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}
