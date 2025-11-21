"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Book, Code, Trophy, Users, GitBranch, Brain } from 'lucide-react';

const certifications = [
  {
    title: 'IBM Co-Creator Certification',
    category: 'Technology',
    icon: Code,
    color: 'text-blue-600'
  },
  {
    title: 'NPTEL IoT Fundamentals',
    category: 'IoT & Hardware',
    icon: Brain,
    color: 'text-purple-600'
  },
  {
    title: 'Generative AI and Python Fundamentals',
    category: 'AI & Programming',
    icon: Brain,
    color: 'text-green-600'
  },
  {
    title: 'FACE Training Certificate of Appreciation',
    category: 'Professional Development',
    icon: Award,
    color: 'text-orange-600'
  },
  {
    title: 'MSP Trust & Lions Club Participation',
    category: 'Community Service',
    icon: Users,
    color: 'text-red-600'
  },
  {
    title: 'Git & Quantitative Aptitude (PrepInsta)',
    category: 'Development & Analytics',
    icon: GitBranch,
    color: 'text-indigo-600'
  },
  {
    title: 'Conference: Innovative Research (International)',
    category: 'Research & Innovation',
    icon: Trophy,
    color: 'text-pink-600'
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Certifications & Achievements
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development milestones
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
                
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-muted/50 group-hover:scale-110 transition-transform duration-300`}>
                      <cert.icon className={`w-6 h-6 ${cert.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground leading-tight mb-2">
                        {cert.title}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {cert.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">
              {certifications.length} Professional Certifications
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}