'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SocialLinks from '@/components/SocialLinks';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-primary">
      {/* Ambient background: aurora glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-secondary/20 blur-[140px] animate-aurora" />
        <div className="absolute top-1/3 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[140px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute bottom-0 -left-32 h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-[140px] animate-aurora [animation-delay:-12s]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <SocialLinks />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
