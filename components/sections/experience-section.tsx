"use client";

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Software Associate',
    dates: 'Sep 2025 – Present',
    company: 'SNS Square',
    location: 'Coimbatore',
    responsibilities: [
      'Develop and maintain full-stack web applications using React.js, Redux.js, Node.js, Express, and MongoDB',
      'Design and implement RESTful APIs and backend services for dynamic, data-driven front-end experiences',
      'Build responsive, reusable UI components and manage application state with React.js and Redux.js',
      'Collaborate with the team using Git for version control in an agile development workflow',
    ],
    technologies: 'React.js, Redux.js, Node.js, Express, MongoDB, Git',
  },
  {
    title: 'Junior Software Associate',
    dates: 'Jul 2024 – Sep 2025',
    company: 'SNS Square',
    location: 'Coimbatore',
    responsibilities: [
      'Built full-stack web applications end-to-end using the MERN stack',
      'Implemented user authentication and database integration for production features',
      'Designed responsive, dynamic front-end interfaces with React.js and Redux.js',
      'Worked with Git, GitHub, and Visual Studio in a collaborative development environment',
    ],
    technologies: 'MERN Stack, React.js, Redux.js, Node.js, Express.js, MongoDB, Git, GitHub',
  },
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

        {/* Minimalist Experience Rows */}
        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group block py-12 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">

                {/* Title & Date */}
                <div className="md:col-span-4 flex flex-col gap-2">
                  <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white">
                    {experience.title}
                  </h3>
                  <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {experience.dates}
                  </p>
                </div>

                {/* Company & Location */}
                <div className="md:col-span-3 flex flex-col">
                  <p className="text-xl font-serif italic text-gray-600 dark:text-gray-400 mb-2">
                    {experience.company}
                  </p>
                  <p className="text-sm font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {experience.location}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="md:col-span-5 flex flex-col">
                  <ul className="space-y-4">
                    {experience.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-4">
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
                      {experience.technologies}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
