"use client";

import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-muted-foreground mb-4 md:mb-0"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>by Pradeep Kumar S</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <p className="text-sm text-muted-foreground">
              © 2024 All rights reserved
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}