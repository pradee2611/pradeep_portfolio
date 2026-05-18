"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  MeshDistortMaterial, 
  Sphere, 
  Float, 
  Environment, 
  Lightformer
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame(() => {
    // Smooth camera rig for floating effect
    camera.position.lerp(vec.set(mouse.x * 2.5, mouse.y * 2.5, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
}

function GlassBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} visible args={[1, 256, 256]} scale={2.8}>
        {/* Dynamic morphing material with high-end glass physics */}
        <MeshDistortMaterial
          color={isDark ? "#d8b4fe" : "#a78bfa"}
          speed={2.5}
          distort={0.35}
          radius={1}
          transmission={isDark ? 0.75 : 0.65}
          opacity={1}
          metalness={isDark ? 0.15 : 0.1}
          roughness={isDark ? 0.08 : 0.12}
          ior={isDark ? 1.55 : 1.65}
          thickness={isDark ? 1.2 : 2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Rig />
      <ambientLight intensity={isDark ? 0.8 : 1.2} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 3.5 : 2.5} color={isDark ? "#c084fc" : "#8b5cf6"} />
      <directionalLight position={[-10, -10, -5]} intensity={isDark ? 2.5 : 1.5} color={isDark ? "#2dd4bf" : "#06b6d4"} />
      
      <GlassBlob />
      
      <Environment preset="city" background={false}>
        <Lightformer form="rect" intensity={isDark ? 2.5 : 1.5} position={[10, 5, 0]} scale={[10, 10, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={isDark ? 3 : 2} position={[-10, -5, 0]} scale={[10, 10, 1]} target={[0, 0, 0]} color={isDark ? "#ffccff" : "#ffeedd"} />
      </Environment>
    </>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 7], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}