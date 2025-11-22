"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Database, Wrench, Brain, Users } from 'lucide-react';

const skillCategories = [
  {
    id: 1,
    title: 'Frontend',
    icon: Code,
    color: 'text-blue-500',
    bgGradient: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Zustand']
  },
  {
    id: 2,
    title: 'Backend',
    icon: Server,
    color: 'text-green-500',
    bgGradient: 'from-green-500/20 to-green-600/10',
    borderColor: 'border-green-500/30',
    skills: ['Node.js', 'Express.js']
  },
  {
    id: 3,
    title: 'Database',
    icon: Database,
    color: 'text-purple-500',
    bgGradient: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/30',
    skills: ['MongoDB', 'Mongoose']
  },
  {
    id: 4,
    title: 'Tools & Platforms',
    icon: Wrench,
    color: 'text-orange-500',
    bgGradient: 'from-orange-500/20 to-orange-600/10',
    borderColor: 'border-orange-500/30',
    skills: ['Git', 'GitHub', 'Postman', 'REST APIs']
  },
  {
    id: 5,
    title: 'Other Technologies',
    icon: Brain,
    color: 'text-pink-500',
    bgGradient: 'from-pink-500/20 to-pink-600/10',
    borderColor: 'border-pink-500/30',
    skills: ['Agentic AI', 'JWT Authentication']
  },
  {
    id: 6,
    title: 'Soft Skills',
    icon: Users,
    color: 'text-indigo-500',
    bgGradient: 'from-indigo-500/20 to-indigo-600/10',
    borderColor: 'border-indigo-500/30',
    skills: ['Communication', 'Problem-solving', 'Time Management', 'Leadership']
  }
];

export function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
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
              Skills & Expertise
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
            A comprehensive toolkit for building modern, scalable web applications
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <Card className={`
                h-full relative overflow-hidden
                transition-all duration-500 group
                backdrop-blur-sm bg-card/50
                border-2 ${category.borderColor}
                hover:shadow-2xl hover:shadow-primary/20
                hover:-translate-y-2
                ${hoveredIndex === index ? 'scale-105 z-10' : ''}
              `}>
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={false}
                />
                
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${category.bgGradient} rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}
                  initial={false}
                />

                <CardHeader className="text-center pb-4 relative z-10">
                  <motion.div
                    className="inline-flex flex-col items-center gap-3 mb-4"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3, type: "tween" }}
                  >
                    <div className={`
                      p-4 rounded-2xl bg-gradient-to-br ${category.bgGradient}
                      border ${category.borderColor}
                      group-hover:shadow-lg transition-all duration-300
                    `}>
                      <category.icon className={`w-8 h-8 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {category.title}
                    </CardTitle>
                  </motion.div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        transition={{ 
                          delay: (index * 0.1) + (skillIndex * 0.05), 
                          duration: 0.3,
                          type: "tween"
                        }}
                        viewport={{ once: true }}
                      >
                        <Badge 
                          variant="secondary"
                          className={`
                            hover:bg-primary hover:text-primary-foreground 
                            transition-all duration-300 cursor-default
                            border ${category.borderColor}
                            backdrop-blur-sm
                            hover:shadow-md hover:shadow-primary/30
                          `}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}