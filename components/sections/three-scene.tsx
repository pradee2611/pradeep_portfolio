"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  Sphere,
  Float,
  Environment,
  Lightformer,
  PerformanceMonitor
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

type Quality = "high" | "low";

// Same "city" lighting as drei's preset, self-hosted so it comes from our own
// cached domain instead of a third-party CDN that blocks the whole canvas.
const ENVIRONMENT_MAP = "/env/city.exr";

// Phones, tablets and modest machines get a lighter variant of the same scene.
function detectQuality(): Quality {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const fewCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const saveData = nav.connection?.saveData === true;
  return touch || narrow || fewCores || lowMemory || saveData ? "low" : "high";
}

function Rig() {
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, mouse }) => {
    // Smooth camera rig for floating effect
    camera.position.lerp(target.set(mouse.x * 2.5, mouse.y * 2.5, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Fires once the first frames have rendered, i.e. shaders are compiled and the
// scene is actually on screen. The loading screen waits for this.
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);

  useFrame(() => {
    if (frames.current < 3 && ++frames.current === 3) onReady();
  });

  return null;
}

function GlassBlob({ isDark, quality }: { isDark: boolean; quality: Quality }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const high = quality === "high";

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  // Segment count drives vertex-shader cost (the distortion runs per vertex, per frame).
  const segments = high ? 96 : 48;

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} visible args={[1, segments, segments]} scale={2.8}>
        {/* Dynamic morphing material with high-end glass physics.
            Transmission needs an extra full-scene render pass every frame, so the
            low tier fakes the glass with translucency instead. */}
        <MeshDistortMaterial
          color={isDark ? "#d8b4fe" : "#a78bfa"}
          speed={2.5}
          distort={0.35}
          radius={1}
          transmission={high ? (isDark ? 0.75 : 0.65) : 0}
          transparent={!high}
          opacity={high ? 1 : 0.88}
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

function Scene({ quality, onReady }: { quality: Quality; onReady: () => void }) {
  const { resolvedTheme } = useTheme();

  // resolvedTheme is undefined until next-themes has mounted
  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Rig />
      <ReadySignal onReady={onReady} />
      <ambientLight intensity={isDark ? 0.8 : 1.2} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 3.5 : 2.5} color={isDark ? "#c084fc" : "#8b5cf6"} />
      <directionalLight position={[-10, -10, -5]} intensity={isDark ? 2.5 : 1.5} color={isDark ? "#2dd4bf" : "#06b6d4"} />

      <GlassBlob isDark={isDark} quality={quality} />

      <Environment files={ENVIRONMENT_MAP} background={false}>
        <Lightformer form="rect" intensity={isDark ? 2.5 : 1.5} position={[10, 5, 0]} scale={[10, 10, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={isDark ? 3 : 2} position={[-10, -5, 0]} scale={[10, 10, 1]} target={[0, 0, 0]} color={isDark ? "#ffccff" : "#ffeedd"} />
      </Environment>
    </>
  );
}

export default function ThreeScene({ onReady }: { onReady?: () => void }) {
  const [quality, setQuality] = useState<Quality>(() => detectQuality());
  const [inView, setInView] = useState(true);
  const [shown, setShown] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Stop rendering while the hero is scrolled out of view: the biggest single
  // saving for scroll smoothness and battery once the user moves down the page.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "100px"
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Start judging performance only once the scene is visible and has settled, so
  // start-up work (shader compile, hydration) can't trigger a needless downgrade.
  useEffect(() => {
    if (!shown) return;
    const timer = window.setTimeout(() => setMonitoring(true), 2000);
    return () => window.clearTimeout(timer);
  }, [shown]);

  const handleReady = () => {
    setShown(true);
    onReady?.();
  };

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      style={{ opacity: shown ? 1 : 0, transition: "opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={quality === "high" ? [1, 1.5] : [1, 1.25]}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 200 } }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: quality === "high" ? "high-performance" : "default",
          toneMapping: THREE.ACESFilmicToneMapping
        }}
      >
        {/* If a "high" device can't hold ~50fps, drop to the light variant for good. */}
        {quality === "high" && monitoring && <PerformanceMonitor onDecline={() => setQuality("low")} />}
        <Scene quality={quality} onReady={handleReady} />
      </Canvas>
    </div>
  );
}
