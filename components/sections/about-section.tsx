"use client";

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Calendar, User, Linkedin, Bot } from 'lucide-react';
import { HighlightText } from '@/components/highlight-text';

const personalInfo = [
  { icon: User, label: 'Full Name', value: 'Pradeep Kumar S' },
  { icon: MapPin, label: 'Location', value: 'Saravanapatti, Coimbatore' },
  { icon: Mail, label: 'Email', value: 'pradee.s.2611@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91-7010262389' },
  { icon: Calendar, label: 'Date of Birth', value: '26-11-2001' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 bg-[#fcfbfe] dark:bg-[#08080a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row items-baseline gap-4 md:gap-8 border-b border-gray-200 dark:border-gray-800 pb-12"
        >
          <span className="text-gray-400 dark:text-gray-600 font-sans tracking-[0.2em] uppercase text-sm">
            01
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Personal Info - Minimalist */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-6 border-l-2 border-gray-900 dark:border-white pl-6">
              {personalInfo.map((info, index) => (
                <div key={info.label} className="flex items-center space-x-4">
                  <info.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-base text-gray-900 dark:text-white font-medium">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center space-x-4 pt-4">
                <Linkedin className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                    LinkedIn
                  </p>
                  <a 
                    href="https://www.linkedin.com/in/pradeep-kumar-selvam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-900 dark:text-white font-medium hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                  >
                    Connect with me
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Bot className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                    Hugging Face
                  </p>
                  <a
                    href="https://huggingface.co/Pradee26112001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-900 dark:text-white font-medium hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                  >
                    View my models
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description - Editorial Style */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="space-y-8 text-gray-600 dark:text-gray-300 font-light text-xl md:text-3xl leading-relaxed tracking-tight">
              <p>
                I am a <span className="text-gray-900 dark:text-white font-serif italic">Full Stack Developer</span> with hands-on experience in the MERN stack and Next.js, deeply passionate about building scalable and aesthetic web applications.
              </p>
              <p>
                <HighlightText text="I've since expanded into GenAI and Agentic AI development — building RAG pipelines and LLM-powered tools, and earning the Databricks Data Engineer Associate and Generative AI Engineer Associate credentials — while shipping real-world projects in startup acceleration, ed-tech, and recruitment platforms." />
              </p>
              <p>
                My commitment is to deliver high-quality software that transcends expectations. I thrive in collaborative environments and constantly seek challenges that push the boundaries of modern digital storytelling.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}