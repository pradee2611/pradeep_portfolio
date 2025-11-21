"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const education = [
  {
    institution: 'SNS College of Technology',
    degree: 'Bachelor\'s Degree',
    year: '2024',
    location: 'Coimbatore',
    type: 'Higher Education',
    color: 'from-blue-500 to-purple-500'
  },
  {
    institution: 'Sri Ramakrishna Polytechnic College',
    degree: 'Diploma',
    year: '2019',
    location: 'Coimbatore',
    type: 'Technical Education',
    color: 'from-green-500 to-teal-500'
  },
  {
    institution: 'REX Senior Secondary School',
    degree: 'Secondary Education',
    year: '2017',
    location: '',
    type: 'School Education',
    color: 'from-orange-500 to-red-500'
  }
];

export function EducationSection() {
  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic journey and educational milestones
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500 hidden md:block"></div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative ${index % 2 === 0 ? 'md:ml-16' : 'md:ml-16'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-12 top-6 w-4 h-4 rounded-full bg-background border-4 border-primary hidden md:block z-10"></div>
                  
                  <Card className="hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${edu.color}`}></div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <GraduationCap className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-foreground">
                              {edu.institution}
                            </CardTitle>
                            <p className="text-lg text-muted-foreground font-medium">
                              {edu.degree}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-2">
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            <Calendar className="w-3 h-3" />
                            {edu.year}
                          </Badge>
                          {edu.location && (
                            <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                              <MapPin className="w-3 h-3" />
                              {edu.location}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Badge 
                        variant="outline" 
                        className="text-sm"
                      >
                        {edu.type}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}