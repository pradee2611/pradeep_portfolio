"use client";

import { motion } from 'framer-motion';

const skillCategories = [
  {
    id: 1,
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'Redux Toolkit', 'Zustand', 'Tailwind CSS', 'Framer Motion', 'Three.js']
  },
  {
    id: 2,
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'JWT Authentication', 'WebSockets']
  },
  {
    id: 3,
    title: 'Database',
    skills: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Redis']
  },
  {
    id: 4,
    title: 'GenAI & Agentic AI',
    featured: true,
    skills: ['LangChain', 'OpenAI API', 'Gemini API', 'RAG', 'Apache Spark', 'Delta Lake']
  },
  {
    id: 5,
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Postman', 'Docker', 'AWS', 'Vercel']
  },
  {
    id: 6,
    title: 'Soft Skills',
    skills: ['Communication', 'Problem-solving', 'Time Management', 'Leadership']
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-white dark:bg-black relative overflow-hidden">
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
            03
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            Expertise
          </h2>
        </motion.div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col group cursor-default"
            >
              <h3 className={`text-3xl md:text-4xl tracking-tight mb-6 transition-colors duration-500 ${
                category.featured
                  ? 'font-serif italic text-gray-900 dark:text-white'
                  : 'font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300'
              }`}>
                {category.title}
              </h3>
              <div className="flex flex-col space-y-3 border-l border-gray-200 dark:border-gray-800 pl-6 group-hover:border-gray-900 dark:group-hover:border-white transition-colors duration-500">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`text-lg tracking-wide transition-colors duration-500 ${
                      skill === 'RAG'
                        ? 'text-gray-900 dark:text-white font-medium'
                        : 'text-gray-500 dark:text-gray-400 font-light group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}
                    style={{ transitionDelay: `${skillIndex * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}