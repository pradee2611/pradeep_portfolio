"use client";

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright */}
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 text-center md:text-left">
            &copy; {currentYear} Pradeep Kumar Selvam. All rights reserved.
          </p>

          {/* Right: Quick Links */}
          <div className="flex items-center space-x-8">
            <a 
              href="https://github.com/pradee2611" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-sans uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/pradeep-kumar-selvam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-sans uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}