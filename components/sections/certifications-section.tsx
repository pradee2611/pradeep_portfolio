"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const certifications = [
  {
    title: 'Databricks Certified Data Engineer Associate',
    highlight: 'Data Engineer Associate',
    issuer: 'Databricks',
    date: 'May 2026 · Expires May 2028',
    category: 'AI & Data Engineering',
  },
  {
    title: 'Generative AI Engineer Associate',
    highlight: 'Generative AI Engineer',
    issuer: 'Databricks',
    date: 'Jan 2026',
    category: 'AI & Data Engineering',
    url: 'https://credentials.databricks.com/ce209708-a8a3-46da-91e5-ceba90c809f3#acc.qNTGdh1D',
  },
  {
    title: 'Model Context Protocol: Advanced Topics',
    highlight: 'Model Context Protocol',
    issuer: 'Anthropic',
    date: 'Jul 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Certificate of Completion: Introduction to Subagents',
    highlight: 'Subagents',
    issuer: 'Anthropic',
    date: 'Jul 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Introduction to Model Context Protocol',
    highlight: 'Model Context Protocol',
    issuer: 'Anthropic',
    date: 'Jun 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Certificate of Completion: Introduction to Agent Skills',
    highlight: 'Agent Skills',
    issuer: 'Anthropic',
    date: 'Jun 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Claude Code in Action',
    highlight: 'Claude Code',
    issuer: 'Anthropic',
    date: 'Jun 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Building with the Claude API',
    highlight: 'Claude API',
    issuer: 'Anthropic',
    date: 'Jun 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Certificate of Completion: AI Fluency Framework & Foundations',
    highlight: 'AI Fluency',
    issuer: 'Anthropic',
    date: 'Jun 2026',
    category: 'AI & Agentic Development',
  },
  {
    title: 'Generative AI Applications & Python Fundamentals',
    highlight: 'Generative AI',
    issuer: 'HCL GUVI',
    date: 'May 2025',
    category: 'Artificial Intelligence',
    url: 'https://www.guvi.in/share-certificate/4276eT92t71s1vy412',
  },
  {
    title: 'Full Stack Web Development (MERN Stack)',
    highlight: 'MERN Stack',
    issuer: 'PrepInsta',
    date: 'Feb 2024',
    category: 'Web Development',
    url: 'https://certifications.prepinstaprime.com/verify',
  },
  {
    title: 'Enterprise Design Thinking Co-Creator',
    highlight: 'Design Thinking',
    issuer: 'IBM',
    date: 'Mar 2022',
    category: 'Design & Product',
    url: 'https://www.credly.com/badges/91b5d410-d58b-4792-ba9e-5132a254e5d5?source=linked_in_profile',
  },
  {
    title: 'Enterprise Design Thinking Practitioner',
    highlight: 'Design Thinking',
    issuer: 'IBM',
    date: 'Mar 2022',
    category: 'Design & Product',
    url: 'https://www.credly.com/badges/588d3afc-8df6-4f5c-b28f-af3823e6cb92?source=linked_in_profile',
  },
  {
    title: 'NPTEL IoT Fundamentals',
    highlight: 'IoT',
    issuer: 'NPTEL',
    date: '2023',
    category: 'IoT & Hardware',
  },
  {
    title: 'FACE Training Certificate of Appreciation',
    highlight: 'FACE Training',
    issuer: 'FACE Training',
    date: '2023',
    category: 'Professional Development',
  },
  {
    title: 'MSP Trust & Lions Club Participation',
    highlight: 'Lions Club',
    issuer: 'Lions Club',
    date: '2022',
    category: 'Community Service',
  },
  {
    title: 'Git & Quantitative Aptitude (PrepInsta)',
    highlight: 'Git',
    category: 'Development & Analytics',
  },
  {
    title: 'Conference: Innovative Research (International)',
    highlight: 'Innovative Research',
    issuer: 'International Research Conference',
    date: '2023',
    category: 'Research & Innovation',
  }
];

function CertTitle({ title, highlight }: { title: string; highlight?: string }) {
  const baseClass = 'font-light text-gray-500 dark:text-gray-400';
  const highlightClass = 'font-medium text-gray-900 dark:text-white';

  if (!highlight) {
    return <span className={baseClass}>{title}</span>;
  }

  const matchIndex = title.indexOf(highlight);
  if (matchIndex === -1) {
    return <span className={baseClass}>{title}</span>;
  }

  const before = title.slice(0, matchIndex);
  const after = title.slice(matchIndex + highlight.length);

  return (
    <>
      {before && <span className={baseClass}>{before}</span>}
      <span className={highlightClass}>{highlight}</span>
      {after && <span className={baseClass}>{after}</span>}
    </>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-32 bg-[#fcfbfe] dark:bg-[#08080a] relative overflow-hidden">
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
            05
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            Recognitions
          </h2>
        </motion.div>
 
        {/* Minimalist List */}
        <div className="flex flex-col">
          {certifications.map((cert, index) => {
            const hasUrl = !!cert.url;
            const Wrapper = hasUrl ? motion.a : motion.div;
            
            return (
              <Wrapper
                key={cert.title}
                {...(hasUrl ? {
                  href: cert.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                } : {})}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-colors duration-500 ${
                  hasUrl ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Left Side: Title, Issuer, and Date */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl md:text-3xl tracking-tight group-hover:pl-4 transition-all duration-500">
                    <CertTitle title={cert.title} highlight={cert.highlight} />
                  </h3>
                  <div className="flex items-center gap-4 group-hover:pl-4 transition-all duration-500">
                    <p className="text-sm font-serif italic text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </p>
                    {cert.date && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                        <p className="text-xs font-sans tracking-wider text-gray-400 dark:text-gray-500 uppercase">
                          {cert.date}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Side: Category and Arrow if Link Available */}
                <div className="flex items-center gap-8 justify-between mt-4 md:mt-0">
                  <p className="text-sm md:text-base font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 md:text-right">
                    {cert.category}
                  </p>
                  
                  {hasUrl && (
                    <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:border-gray-900 dark:group-hover:border-white transition-all duration-500">
                      <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                    </div>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
