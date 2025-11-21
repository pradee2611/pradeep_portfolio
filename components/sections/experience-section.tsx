"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

const responsibilities = [
  'Built full-stack web applications with MERN and Next.js',
  'Created reusable UI components, implemented dynamic rendering',
  'Integrated backend APIs, authentication, and authorization',
  'Collaborated in cross-functional teams',
  'Used Git and GitHub for version control'
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional journey and key achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-purple-500"></div>
              
              <CardHeader className="pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      Junior Software Associate
                    </CardTitle>
                    <h3 className="text-xl text-primary font-semibold">
                      SNS Innovation Hub, Coimbatore
                    </h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      July 2024 – July 2025
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Coimbatore
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-primary">
                    Key Responsibilities
                  </h4>
                  <div className="space-y-3">
                    {responsibilities.map((responsibility, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 group"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                        <p className="text-muted-foreground leading-relaxed">
                          {responsibility}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-lg font-semibold mb-3 text-primary">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['MERN Stack', 'Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'GitHub'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge 
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}