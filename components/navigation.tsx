"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Expertise' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Pradeep_kumar_S.pdf';
    link.download = 'Pradeep kumar S.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-serif italic text-gray-900 dark:text-white tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#home');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Pradeep.
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-sans uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 relative group"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={handleDownloadResume}
              className="group flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 hover:border-gray-900 dark:hover:border-gray-100 transition-colors duration-300"
            >
              Resume
              <Download className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <ThemeToggle />
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="text-gray-900 dark:text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col items-center justify-center space-y-8 h-[calc(100vh-80px)]">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-3xl font-serif italic text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-300"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8"
              >
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-white dark:text-black bg-gray-900 dark:bg-white rounded-full px-8 py-4 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
                >
                  Download Resume
                  <Download className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}