"use client";

import { motion } from 'framer-motion';

const education = [
  {
    institution: 'SNS Institutions',
    degree: 'Bachelor of Technology',
    year: '2021 – 2024',
    location: 'Coimbatore',
    type: 'Higher Education',
  },
  {
    institution: 'Sri Ramakrishna Degree College (Autonomous)',
    degree: 'Diploma',
    year: '2020',
    location: 'Coimbatore',
    type: 'Technical Education',
  },
  {
    institution: 'Christus Rex Higher Secondary School',
    degree: 'Secondary Education',
    year: '2018',
    location: 'Ooty',
    type: 'School Education',
  }
];

export function EducationSection() {
  return (
    <section id="education" className="py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row items-baseline gap-4 md:gap-8 border-b border-gray-200 dark:border-gray-800 pb-12"
        >
          <span className="text-gray-400 dark:text-gray-600 font-sans tracking-[0.2em] uppercase text-sm">
            06
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            Education
          </h2>
        </motion.div>

        {/* Minimalist Education Row */}
        <div className="flex flex-col">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group block py-12 border-b border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors duration-500 cursor-default"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
                
                {/* Year & Type */}
                <div className="md:col-span-3 flex flex-col">
                  <p className="text-3xl font-serif italic text-gray-900 dark:text-white mb-2">
                    {edu.year}
                  </p>
                  <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {edu.type}
                  </p>
                </div>

                {/* Institution */}
                <div className="md:col-span-5 flex flex-col">
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 dark:text-white group-hover:pl-4 transition-all duration-500 mb-2">
                    {edu.institution}
                  </h3>
                </div>

                {/* Degree & Location */}
                <div className="md:col-span-4 flex flex-col md:text-right">
                  <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-2">
                    {edu.degree}
                  </p>
                  {edu.location && (
                    <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      {edu.location}
                    </p>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}