"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pradee.s.2611@gmail.com',
    href: 'mailto:pradee.s.2611@gmail.com',
    color: 'text-blue-500'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-7010262389',
    href: 'tel:+917010262389',
    color: 'text-green-500'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Saravanapatti, Coimbatore-643005',
    color: 'text-red-500'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'pradeep-kumar-selvam',
    href: 'https://www.linkedin.com/in/pradeep-kumar-selvam',
    color: 'text-blue-600'
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

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your next project or just say hello
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg bg-muted/50`}>
                            <info.icon className={`w-5 h-5 ${info.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              {info.label}
                            </p>
                            {info.href ? (
                              <a
                                href={info.href}
                                target={info.href.startsWith('http') ? '_blank' : undefined}
                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-sm text-primary hover:underline break-words"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-sm text-foreground break-words">
                                {info.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-primary">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="group" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="group" asChild>
                  <a href="https://www.linkedin.com/in/pradeep-kumar-selvam" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="transition-all duration-200 focus:scale-[1.02] resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}