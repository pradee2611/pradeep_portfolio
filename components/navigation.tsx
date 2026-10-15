"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Download, FileText, FileType } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSiteReady } from '@/lib/site-ready';

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
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const resumeMenuRef = useRef<HTMLDivElement>(null);
  const ready = useSiteReady();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(e.target as Node)) {
        setResumeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownloadResume = (format: 'pdf' | 'docx') => {
    const href = format === 'pdf' ? '/Pradeep_Kumar_S_Resume.pdf' : '/Pradeep_Kumar_S_Resume.docx';
    const filename = format === 'pdf' ? 'Pradeep_Kumar_S_Resume.pdf' : 'Pradeep_Kumar_S_Resume.docx';
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setResumeMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={ready ? { y: 0 } : undefined}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 dark:bg-black/95 md:bg-white/80 md:dark:bg-black/80 md:backdrop-blur-xl border-b border-gray-100 dark:border-gray-900 py-4'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
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
            Pradeep kumar S
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
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
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative" ref={resumeMenuRef}>
              <button
                onClick={() => setResumeMenuOpen((prev) => !prev)}
                className="group flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 hover:border-gray-900 dark:hover:border-gray-100 transition-colors duration-300"
              >
                Resume
                <Download className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
              <AnimatePresence>
                {resumeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <button
                      onClick={() => handleDownloadResume('pdf')}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs font-sans uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <FileText className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => handleDownloadResume('docx')}
                      className="w-full flex items-center gap-3 px-5 py-3 text-xs font-sans uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 border-t border-gray-100 dark:border-gray-900"
                    >
                      <FileType className="w-4 h-4" />
                      Download Word (.docx)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 h-screen-stable bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col items-center justify-center space-y-8 h-menu-stable">
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
                className="pt-8 flex flex-col items-center gap-4"
              >
                <button
                  onClick={() => handleDownloadResume('pdf')}
                  className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-white dark:text-black bg-gray-900 dark:bg-white rounded-full px-8 py-4 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
                >
                  Download PDF
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownloadResume('docx')}
                  className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full px-8 py-4 hover:border-gray-900 dark:hover:border-gray-100 transition-colors duration-300"
                >
                  Download Word (.docx)
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