"use client";

import { useEffect, useRef, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import * as THREE from 'three';

// Dynamically import the entire 3D component
const ThreeScene = dynamic(() => import('./three-scene'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-background" />
});

export function HeroSection() {
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setShow3D(false);
    }
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        {show3D ? (
          <ThreeScene />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-background via-background to-muted" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Pradeep Kumar S
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Full Stack Developer | MERN & Next.js | Passionate about Scalable AI-integrated Web Apps
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" className="group">
              <a href="#contact" className="flex items-center">
                Get In Touch
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="group">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="group">
                <a href="https://www.linkedin.com/in/pradeep-kumar-selvam" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="group">
                <a href="mailto:pradee.s.2611@gmail.com">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}