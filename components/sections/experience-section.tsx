"use client";

import { motion } from 'framer-motion';

const responsibilities = [
  'Built full-stack web applications with MERN and Next.js',
  'Created reusable UI components, implemented dynamic rendering',
  'Integrated backend APIs, authentication, and authorization',
  'Collaborated in cross-functional teams',
  'Used Git and GitHub for version control'
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-white dark:bg-black relative overflow-hidden">
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
            04
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            Experience
          </h2>
        </motion.div>

        {/* Minimalist Experience Row */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="group block py-12 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">

              {/* Title & Date */}
              <div className="md:col-span-4 flex flex-col gap-2">
                <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white">
                  Software Associate
                </h3>
                <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  July 2024 – July 2025
                </p>
              </div>

              {/* Company & Location */}
              <div className="md:col-span-3 flex flex-col">
                <p className="text-xl font-serif italic text-gray-600 dark:text-gray-400 mb-2">
                  SNS Square
                </p>
                <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Coimbatore
                </p>
              </div>

              {/* Responsibilities */}
              <div className="md:col-span-5 flex flex-col">
                <ul className="space-y-4">
                  {responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-2.5 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                        {responsibility}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-900">
                  <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                    Technologies
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-serif italic">
                    MERN Stack, Next.js, React.js, Node.js, Express.js, MongoDB, Git
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}