"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pradee.s.2611@gmail.com',
    href: 'mailto:pradee.s.2611@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-7010262389',
    href: 'tel:+917010262389',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Saravanapatti, Coimbatore',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'pradeep-kumar-selvam',
    href: 'https://www.linkedin.com/in/pradeep-kumar-selvam',
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-32 bg-white dark:bg-black relative overflow-hidden">
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
            07
          </span>
          <h2 className="text-[12vw] md:text-[8vw] font-serif italic text-gray-900 dark:text-white leading-none tracking-tighter">
            Let's Talk
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-24">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-white mb-12">
              Have an idea? <br />
              <span className="font-serif italic text-gray-500 dark:text-gray-400">I'd love to hear it.</span>
            </h3>

            <div className="space-y-8 border-l border-gray-200 dark:border-gray-800 pl-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex flex-col">
                  <p className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-xl md:text-2xl text-gray-900 dark:text-white font-light hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-xl md:text-2xl text-gray-900 dark:text-white font-light">
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-16 flex space-x-6 pl-8">
              <a href="https://github.com/pradee2611" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/pradeep-kumar-selvam" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              
              <div className="space-y-2">
                <label className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 pl-4">Your Name</label>
                <Input
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-0 border-b border-gray-200 dark:border-gray-800 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-900 dark:focus-visible:border-white px-4 py-6 text-xl font-light text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 bg-transparent transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 pl-4">Your Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-0 border-b border-gray-200 dark:border-gray-800 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-900 dark:focus-visible:border-white px-4 py-6 text-xl font-light text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 bg-transparent transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-sans uppercase tracking-widest text-gray-400 dark:text-gray-500 pl-4">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="border-0 border-b border-gray-200 dark:border-gray-800 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-gray-900 dark:focus-visible:border-white px-4 py-6 text-xl font-light text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700 bg-transparent transition-colors resize-none"
                />
              </div>
              
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-4 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="uppercase tracking-widest text-sm font-semibold">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  {!isSubmitting && (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}