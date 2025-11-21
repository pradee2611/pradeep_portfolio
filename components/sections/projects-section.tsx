"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Rocket, Users, GraduationCap } from 'lucide-react';

const projects = [
  {
    title: 'Startzy – Startup Accelerator Platform',
    description: 'A comprehensive platform for startup acceleration with funding modules and streamlined onboarding processes. Built to help entrepreneurs connect with investors and manage their growth journey.',
    role: 'Full-stack development, funding module, onboarding',
    technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB'],
    url: 'https://www.startzyai.com/',
    icon: Rocket,
    color: 'text-green-500'
  },
  {
    title: 'Interview Portal – Assessment & Hiring',
    description: 'An intelligent interview platform featuring question modules, automated evaluation logic, and comprehensive admin dashboard for efficient hiring processes.',
    role: 'Question modules, auto-evaluation logic, admin dashboard',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
    icon: Users,
    color: 'text-blue-500'
  },
  {
    title: 'EdCom – Student Admission Portal',
    description: 'A student admission management system with multi-step forms, real-time validation, and secure payment gateway integration for educational institutions.',
    role: 'Multi-step forms, real-time validation, secure payment gateway',
    technologies: ['React', 'Express', 'Node.js', 'MongoDB'],
    icon: GraduationCap,
    color: 'text-purple-500'
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world applications showcasing full-stack development expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
                
                <CardHeader className="relative">
                  <div className={`inline-flex p-3 rounded-full bg-muted/50 w-fit group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    <project.icon className={`w-8 h-8 ${project.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-sm text-primary mb-2">
                      My Role
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {project.role}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-primary mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: (index * 0.2) + (techIndex * 0.05), 
                            duration: 0.3 
                          }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="secondary">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    {project.url && (
                      <Button variant="default" size="sm" className="flex-1 group" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="group" asChild>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}