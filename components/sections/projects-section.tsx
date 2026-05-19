"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const featuredProjects = [
  {
    title: 'Startzy',
    subtitle: 'Startup Accelerator',
    description: 'A comprehensive platform for startup acceleration with funding modules and streamlined onboarding processes.',
    role: 'Full-stack development, funding module, onboarding',
    technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://www.startzyai.com/',
  },
  {
    title: 'EdCom',
    subtitle: 'Student Admission Portal',
    description: 'A student admission management system with multi-step forms, real-time validation, and secure payment integration.',
    role: 'Multi-step forms, real-time validation, secure payment gateway',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
    url: 'https://github.com/pradee2611/admissionPortalFrontend',
  },
  {
    title: 'HyrDragon',
    subtitle: 'Intelligent Resume Analysis',
    description: 'Platform for resume analysis and interview evaluation. Built modules for coding tests, AI chatbot interviews, and proctoring.',
    role: 'Coding tests, AI chatbot interviews, MCQ assessments, proctoring',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Python'],
    url: 'https://hyrdragon.digitaldiffuse.in/',
  },
  {
    title: 'Milai.ai',
    subtitle: 'Career Upskilling',
    description: 'Learning and assessment platform for candidate upskilling. Developed skill-gap analysis, interview bots, and coding challenges.',
    role: 'Skill-gap analysis, interview bots, coding challenges',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://milai.ai/',
  }
];

const openSourceProjects = [
  {
    title: 'FoodAccess',
    subtitle: 'Food Security Platform',
    description: 'A full-stack solution designed to combat food waste and improve distribution logistics by connecting donors, food banks, and shelters in real-time.',
    role: 'End-to-end full-stack development, real-time dashboard, and donor matching logistics',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://github.com/pradee2611/FoodAccess',
  },
  {
    title: 'Agentic AI Workshop',
    subtitle: 'Autonomous Systems & LLMs',
    description: 'Hands-on training resources, implementation notebooks, and practical examples for building intelligent autonomous agents, multi-agent frameworks, and structured tool-calling pipelines.',
    role: 'Curated notebook materials, LangChain agents, and custom tool integrations',
    technologies: ['Jupyter Notebook', 'Python', 'LangChain', 'Gemini API'],
    url: 'https://github.com/pradee2611/Agentic_ai_workshop',
  },
  {
    title: 'Fullstack Playground',
    subtitle: 'Web Architecture Sandbox',
    description: 'An interactive sandbox containing experimental full-stack features, modern UI paradigms, secure authentication, database schemas, and optimized build setups.',
    role: 'Interactive dashboard, custom API endpoints, and Vercel optimization',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    url: 'https://github.com/pradee2611/fullstack-playground',
  },
  {
    title: 'Learning Sandbox',
    subtitle: 'Interactive Code Playground',
    description: 'A collection of React challenge environments, custom state-management containers, data structure visualizations, and experimentations in the modern frontend ecosystem.',
    role: 'Custom React hooks, algorithmic animations, and responsive components',
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Vercel'],
    url: 'https://github.com/pradee2611/learning',
  }
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'featured' | 'opensource'>('featured');
  const currentProjects = activeTab === 'featured' ? featuredProjects : openSourceProjects;

  return (
    <section id="projects" className="py-32 bg-[#fcfbfe] dark:bg-[#08080a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-baseline gap-4 md:gap-8 border-b border-gray-200 dark:border-gray-800 pb-12"
        >
          <span className="text-gray-400 dark:text-gray-600 font-sans tracking-[0.2em] uppercase text-sm">
            02
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            Selected Works
          </h2>
        </motion.div>

        {/* Tab Toggle Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex gap-8 mb-16 border-b border-gray-200 dark:border-gray-800 pb-px"
        >
          <button
            onClick={() => setActiveTab('featured')}
            className={`text-xl md:text-2xl font-serif italic pb-6 relative transition-colors duration-300 ${
              activeTab === 'featured'
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
            }`}
          >
            Featured Works
            {activeTab === 'featured' && (
              <motion.div
                layoutId="activeTabBorder"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 dark:bg-white"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('opensource')}
            className={`text-xl md:text-2xl font-serif italic pb-6 relative transition-colors duration-300 ${
              activeTab === 'opensource'
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
            }`}
          >
            Open Source & Github
            {activeTab === 'opensource' && (
              <motion.div
                layoutId="activeTabBorder"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 dark:bg-white"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        </motion.div>

        {/* Minimalist Projects List */}
        <div className="flex flex-col min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {currentProjects.map((project, index) => (
                <motion.a
                  href={project.url || "#"}
                  target={project.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="group block py-12 border-b border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors duration-500 cursor-pointer"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
                    
                    {/* Title */}
                    <div className="md:col-span-4 flex items-center gap-6">
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 dark:text-white group-hover:pl-4 transition-all duration-500">
                        {project.title}
                      </h3>
                    </div>

                    {/* Subtitle & Role */}
                    <div className="md:col-span-3 flex flex-col">
                      <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                        {project.subtitle}
                      </p>
                      <p className="text-base text-gray-600 dark:text-gray-400 font-serif italic">
                        {project.technologies.join(', ')}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-4 flex flex-col">
                      <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-1 flex justify-end">
                      <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:border-gray-900 dark:group-hover:border-white transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                      </div>
                    </div>

                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
