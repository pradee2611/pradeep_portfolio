"use client";

import { useEffect, useRef, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as THREE from 'three';

// Dynamically import the entire 3D component
const ThreeScene = dynamic(() => import('./three-scene'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-background" />
});

export function HeroSection() {
  const [show3D, setShow3D] = useState(true);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const copyEmailToClipboard = async () => {
    const email = 'pradee.s.2611@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      toast({
        title: "Email copied!",
        description: `${email} has been copied to your clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setShow3D(false);
    }
  }, []);

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        {show3D ? (
          <ThreeScene />
        ) : (
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

      {/* Floating Particles Effect - Client Only */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
            const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080);
            const randomYEnd = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080);
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-black dark:bg-primary/30 rounded-full"
                initial={{
                  x: randomX,
                  y: randomY,
                  opacity: 0.3,
                }}
                animate={{
                  y: randomYEnd,
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center max-w-5xl mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Available for Opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 via-pink-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
              Pradeep Kumar S
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto"
          >
            MERN & Next.js | Passionate about Scalable AI-integrated Web Apps
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70"
              asChild
            >
              <a href="#contact" className="relative z-10 flex items-center">
                Get In Touch
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon" className="group backdrop-blur-sm bg-background/50 border-primary/20 hover:border-primary/50">
                  <a href="https://github.com/pradee2611" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon" className="group backdrop-blur-sm bg-background/50 border-primary/20 hover:border-primary/50">
                  <a href="https://www.linkedin.com/in/pradeep-kumar-selvam" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="group backdrop-blur-sm bg-background/50 border-primary/20 hover:border-primary/50"
                  onClick={copyEmailToClipboard}
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
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
      </motion.div>
    </section>
  );
}