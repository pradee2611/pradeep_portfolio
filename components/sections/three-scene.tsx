"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
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

// We drive the render loop ourselves (frameloop="never") so the scene can stand
// completely still while the page scrolls or the hero is off-screen. The clock we
// feed in only advances while rendering, so the blob resumes exactly where it
// stopped instead of jumping. It also watches frame times and reports a device
// that can't hold a smooth frame rate so the scene can switch to its light variant.
function Driver({
  active,
  watchPerformance,
  onSlow
}: {
  active: MutableRefObject<boolean>;
  watchPerformance: boolean;
  onSlow: () => void;
}) {
  const advance = useThree((state) => state.advance);
  const watch = useRef(watchPerformance);
  const slow = useRef(onSlow);
  watch.current = watchPerformance;
  slow.current = onSlow;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let sceneTime = 0;
    let rendered = 0;
    let wasActive = false;
    let windowFrames = 0;
    let windowMs = 0;
    let slowWindows = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = now - last;
      last = now;

      // Always render the first few frames, even if the hero is off-screen (e.g. a
      // reload while scrolled down), so shaders are compiled and the scene is
      // ready by the time anyone scrolls back up.
      if (!active.current && rendered >= 3) {
        wasActive = false;
        return;
      }

      sceneTime += Math.min(dt, 100) / 1000;
      advance(sceneTime, true);
      rendered++;

      // The first frame after a pause spans the pause, so it is not a fair sample.
      if (!wasActive) {
        wasActive = true;
        windowFrames = 0;
        windowMs = 0;
        return;
      }
      if (!watch.current) return;

      windowFrames++;
      windowMs += dt;
      if (windowFrames === 60) {
        // two consecutive ~1s windows slower than 40fps = this device can't keep up
        slowWindows = windowMs / windowFrames > 25 ? slowWindows + 1 : 0;
        windowFrames = 0;
        windowMs = 0;
        if (slowWindows >= 2) slow.current();
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [advance, active]);

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

function Scene({
  quality,
  active,
  watchPerformance,
  onSlow,
  onReady
}: {
  quality: Quality;
  active: MutableRefObject<boolean>;
  watchPerformance: boolean;
  onSlow: () => void;
  onReady: () => void;
}) {
  const { resolvedTheme } = useTheme();

  // resolvedTheme is undefined until next-themes has mounted
  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <Driver active={active} watchPerformance={watchPerformance} onSlow={onSlow} />
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
  const [shown, setShown] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // The scene only renders while the hero is on screen AND the page is not
  // actively scrolling. Scrolling is the moment smoothness matters most, and a
  // frozen background for a fraction of a second is imperceptible.
  const active = useRef(true);
  useEffect(() => {
    const el = wrapperRef.current;
    let visible = true;
    let scrolling = false;
    let timer = 0;
    const update = () => {
      active.current = visible && !scrolling;
    };

    const onScroll = () => {
      scrolling = true;
      update();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scrolling = false;
        update();
      }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let observer: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          update();
        },
        { rootMargin: "100px" }
      );
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      observer?.disconnect();
    };
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
        frameloop="never"
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
        <Scene
          quality={quality}
          active={active}
          watchPerformance={quality === "high" && monitoring}
          onSlow={() => setQuality("low")}
          onReady={handleReady}
        />
      </Canvas>
    </div>
  );
}
