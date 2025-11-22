"use client";

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Rocket, Users, GraduationCap, ArrowUpRight, Brain, Target } from 'lucide-react';

const projects = [
  {
    title: 'Startzy – Startup Accelerator Platform',
    description: 'A comprehensive platform for startup acceleration with funding modules and streamlined onboarding processes. Built to help entrepreneurs connect with investors and manage their growth journey.',
    role: 'Full-stack development, funding module, onboarding',
    technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://www.startzyai.com/',
    icon: Rocket,
    color: 'text-green-500',
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    borderColor: 'border-green-500/30'
  },
  {
    title: 'Interview Portal – Assessment & Hiring',
    description: 'An intelligent interview platform featuring question modules, automated evaluation logic, and comprehensive admin dashboard for efficient hiring processes.',
    role: 'Question modules, auto-evaluation logic, admin dashboard',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
    icon: Users,
    color: 'text-blue-500',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    borderColor: 'border-blue-500/30'
  },
  {
    title: 'EdCom – Student Admission Portal',
    description: 'A student admission management system with multi-step forms, real-time validation, and secure payment gateway integration for educational institutions.',
    role: 'Multi-step forms, real-time validation, secure payment gateway',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
    icon: GraduationCap,
    color: 'text-purple-500',
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    borderColor: 'border-purple-500/30'
  },
  {
    title: 'HyrDragon – Intelligent Resume Analysis & Interview Monitoring',
    description: 'Platform for resume analysis and interview evaluation. Built modules for coding tests, AI chatbot interviews, and MCQ assessments with proctoring features like tab-switch detection and face monitoring.',
    role: 'Coding tests, AI chatbot interviews, MCQ assessments, proctoring features',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Python'],
    url: 'https://hyrdragon.digitaldiffuse.in/',
    icon: Brain,
    color: 'text-orange-500',
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    borderColor: 'border-orange-500/30'
  },
  {
    title: 'Milai.ai – Career Upskilling & Roadmap Builder',
    description: 'Learning and assessment platform for candidate upskilling. Developed skill-gap analysis, interview bots, coding challenges, and MCQ/aptitude test workflows to guide candidates toward job readiness.',
    role: 'Skill-gap analysis, interview bots, coding challenges, MCQ/aptitude test workflows',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://milai.ai/',
    icon: Target,
    color: 'text-indigo-500',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
    borderColor: 'border-indigo-500/30'
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <Card className={`
        h-full relative overflow-hidden
        backdrop-blur-sm bg-card/50
        border-2 ${project.borderColor}
        transition-all duration-500
        group
        ${isHovered ? 'shadow-2xl shadow-primary/30' : 'shadow-lg'}
      `}>
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          initial={false}
        />
        
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}
          initial={false}
        />

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-full transform -translate-x-8 translate-y-8 group-hover:scale-110 transition-transform duration-500" />
        
        <CardHeader className="relative z-10">
          <motion.div
            className="flex items-center justify-between mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`
              inline-flex p-4 rounded-2xl 
              bg-gradient-to-br ${project.gradient}
              border ${project.borderColor}
              group-hover:shadow-lg transition-all duration-300
            `}>
              <project.icon className={`w-8 h-8 ${project.color} group-hover:rotate-12 transition-transform duration-300`} />
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <ArrowUpRight className={`w-6 h-6 ${project.color}`} />
            </motion.div>
          </motion.div>
          <CardTitle className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          <motion.p 
            className="text-muted-foreground leading-relaxed"
            initial={false}
            animate={{ color: isHovered ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-primary flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              My Role
            </h4>
            <p className="text-sm text-muted-foreground pl-4">
              {project.role}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-primary mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ 
                    delay: (index * 0.15) + (techIndex * 0.05), 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  <Badge 
                    variant="secondary"
                    className={`
                      border ${project.borderColor}
                      hover:bg-primary hover:text-primary-foreground
                      transition-all duration-300 cursor-default
                      backdrop-blur-sm
                    `}
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {project.url && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1 group bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-primary/30" 
                  asChild
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform duration-300" />
                    Live Demo
                  </a>
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              {/* <Button 
                variant="outline" 
                size="sm" 
                className={`group border-2 ${project.borderColor} backdrop-blur-sm`}
                asChild
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </Button> */}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Real-world applications showcasing full-stack development expertise
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}