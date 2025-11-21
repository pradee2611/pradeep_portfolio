"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Database, Wrench, Brain, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code,
    color: 'text-blue-500',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Zustand']
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'text-green-500',
    skills: ['Node.js', 'Express.js']
  },
  {
    title: 'Database',
    icon: Database,
    color: 'text-purple-500',
    skills: ['MongoDB', 'Mongoose']
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    color: 'text-orange-500',
    skills: ['Git', 'GitHub', 'Postman', 'REST APIs']
  },
  {
    title: 'Other Technologies',
    icon: Brain,
    color: 'text-pink-500',
    skills: ['Agentic AI', 'JWT Authentication']
  },
  {
    title: 'Soft Skills',
    icon: Users,
    color: 'text-indigo-500',
    skills: ['Communication', 'Problem-solving', 'Time Management', 'Leadership']
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-full bg-muted/50 group-hover:scale-110 transition-transform duration-300 mb-4`}>
                    <category.icon className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: (index * 0.1) + (skillIndex * 0.05), 
                          duration: 0.3 
                        }}
                        viewport={{ once: true }}
                      >
                        <Badge 
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
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