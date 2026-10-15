"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { HighlightText } from '@/components/highlight-text';
import { markSceneReady, useSiteReady } from '@/lib/site-ready';

// Dynamically import the entire 3D component. Its own wrapper fades in once the
// first frames have rendered, so there is nothing to show while it loads.
const ThreeScene = dynamic(() => import('./three-scene'), {
  ssr: false,
  loading: () => null
});

export function HeroSection() {
  const [scene, setScene] = useState<'pending' | '3d' | 'static'>('pending');
  const ref = useRef<HTMLDivElement>(null);
  const ready = useSiteReady();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    // Skip WebGL entirely for people who asked for reduced motion, and where it is unsupported.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as
        | WebGLRenderingContext
        | WebGL2RenderingContext
        | null;
      webgl = !!gl;
      // release the probe context straight away; browsers cap the number of live contexts
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      webgl = false;
    }

    if (reduceMotion || !webgl) {
      setScene('static');
      markSceneReady();
    } else {
      setScene('3d');
    }
  }, []);

  return (
    <section ref={ref} id="home" className="relative h-screen-stable flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        {scene === '3d' && <ThreeScene onReady={markSceneReady} />}
        {scene === 'static' && (
          <div className="w-full h-full bg-gradient-to-br from-background via-purple-500/5 to-pink-500/5">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        )}
      </div>

      {/* Noomo-Style Storytelling Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-12 lg:px-24 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          {/* Subtle top label */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-500 dark:text-gray-400 font-sans text-sm md:text-base uppercase tracking-[0.2em] mb-4 md:mb-8"
          >
            Digital Portfolio
          </motion.div>

          {/* MASSIVE Typography - Noomo Style */}
          <div className="flex flex-col text-gray-900 dark:text-white leading-[0.9]">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[8vw] md:text-[6vw] font-medium tracking-tight flex items-center gap-4"
            >
              The craft <span className="font-serif italic font-normal text-[9vw] md:text-[7vw]">of</span> code
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] md:text-[12vw] font-serif italic tracking-tighter"
            >
              Pradeep Kumar
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between max-w-7xl gap-8"
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-md font-sans font-light leading-relaxed">
              <HighlightText text="Full-Stack (MERN), Agentic AI and Gen AI Developer building RAG-powered, scalable web experiences." />
            </p>

            <div className="flex items-center gap-6 pointer-events-auto">
              <a href="#contact" className="group flex items-center gap-4 cursor-pointer bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                <span className="uppercase tracking-widest text-xs font-semibold">
                  Let's Talk
                </span>
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center backdrop-blur-sm bg-background/20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div> */}
    </section>
  );
}