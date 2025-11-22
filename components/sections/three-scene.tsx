"use client";

import { useRef, useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted" />
});

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  const [error, setError] = useState(false);
  const [drei, setDrei] = useState<any>(null);
  
  const sphere = new Float32Array(5000 * 3);
  for (let i = 0; i < 5000; i++) {
    const r = Math.random() * 25 + 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i * 3 + 2] = r * Math.cos(phi);
  }

  useEffect(() => {
    // Load drei components
    import('@react-three/drei').then((dreiModule) => {
      setDrei(dreiModule);
    }).catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (!drei || error) return;
    
    let animationId: number;
    
    const animate = () => {
      try {
        if (ref.current) {
          const time = Date.now() * 0.001;
          ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
          ref.current.rotation.y = time * 0.05;
        }
        animationId = requestAnimationFrame(animate);
      } catch (err) {
        setError(true);
      }
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [drei, error]);

  if (error || !drei) {
    return null;
  }

  const Points = drei.Points;
  const PointMaterial = drei.PointMaterial;

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="hsl(var(--primary))"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function ThreeSceneContent() {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Additional WebGL check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  }, []);

  if (error) {
    return <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted" />;
  }

  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <AnimatedSphere />
      </Suspense>
    </Canvas>
  );
}

export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted" />;
  }

  return <ThreeSceneContent />;
} 