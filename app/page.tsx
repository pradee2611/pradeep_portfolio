"use client";

import dynamic from 'next/dynamic';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero-section';

// Everything below the hero is split into its own chunks. They are still
// server-rendered (so the content and anchors are in the HTML), but their
// JavaScript loads and hydrates after the hero instead of blocking it.
const AboutSection = dynamic(() => import('@/components/sections/about-section').then((m) => m.AboutSection));
const SkillsSection = dynamic(() => import('@/components/sections/skills-section').then((m) => m.SkillsSection));
const ExperienceSection = dynamic(() => import('@/components/sections/experience-section').then((m) => m.ExperienceSection));
const ProjectsSection = dynamic(() => import('@/components/sections/projects-section').then((m) => m.ProjectsSection));
const CertificationsSection = dynamic(() => import('@/components/sections/certifications-section').then((m) => m.CertificationsSection));
const EducationSection = dynamic(() => import('@/components/sections/education-section').then((m) => m.EducationSection));
const ContactSection = dynamic(() => import('@/components/sections/contact-section').then((m) => m.ContactSection));
const Footer = dynamic(() => import('@/components/footer').then((m) => m.Footer));

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
