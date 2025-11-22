"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mail, Phone, Calendar, User, Linkedin } from 'lucide-react';

const personalInfo = [
  { icon: User, label: 'Full Name', value: 'Pradeep Kumar S' },
  { icon: MapPin, label: 'Location', value: 'Saravanapatti, Coimbatore-643005' },
  { icon: Mail, label: 'Email', value: 'pradee.s.2611@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91-7010262389' },
  { icon: Calendar, label: 'Date of Birth', value: '26-11-2001' },
  { icon: User, label: 'Gender', value: 'Male' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              About Me
            </span>
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm bg-card/50 border-2 border-primary/10 hover:border-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            {info.label}
                          </p>
                          <p className="text-sm text-foreground break-words">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* LinkedIn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm bg-card/50 border-2 border-blue-500/20 hover:border-blue-500/40">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        LinkedIn
                      </p>
                      <a 
                        href="https://www.linkedin.com/in/pradeep-kumar-selvam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline break-all"
                      >
                        www.linkedin.com/in/pradeep-kumar-selvam
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 backdrop-blur-sm bg-card/50 border-2 border-primary/10 hover:border-primary/30 relative overflow-hidden">
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-500" />
              <CardContent className="p-8 relative z-10">
                <motion.h3 
                  className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  My Story
                </motion.h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I am a <Badge variant="secondary" className="mx-1">Full Stack Developer</Badge> 
                    with hands-on experience in the <Badge variant="secondary" className="mx-1">MERN stack</Badge> 
                    and <Badge variant="secondary" className="mx-1">Next.js</Badge>, passionate about building 
                    scalable web applications.
                  </p>
                  <p>
                    I have integrated modern <Badge variant="secondary" className="mx-1">AI solutions</Badge> 
                    and worked on real-world projects in startup acceleration, ed-tech, and recruitment platforms. 
                    My experience spans across building dynamic user interfaces, implementing robust backend systems, 
                    and ensuring seamless user experiences.
                  </p>
                  <p>
                    My commitment is to deliver <Badge variant="secondary" className="mx-1">high-quality software solutions</Badge> 
                    that not only meet but exceed expectations. I thrive in collaborative environments and am always 
                    eager to take on new challenges that push the boundaries of web development.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}