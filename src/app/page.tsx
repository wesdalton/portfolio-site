'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SocialLinks from '@/components/SocialLinks';

export default function Home() {
  useEffect(() => {
    // Create a particle texture for the HeroAnimation component
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = 32;
      canvas.height = 32;
      
      // Create a radial gradient for a soft particle
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(100, 255, 218, 1)');
      gradient.addColorStop(0.5, 'rgba(100, 255, 218, 0.5)');
      gradient.addColorStop(1, 'rgba(100, 255, 218, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Convert to data URL and save to public folder
      const dataURL = canvas.toDataURL();
      
      // In a production environment, we would use the File System API
      // to write this to /public/images/particle.png
      // For this demonstration, we'll create a blob URL
      const img = new Image();
      img.src = dataURL;
      
      // Just for debug purposes
      console.log('Particle texture created');
    }
  }, []);

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <SocialLinks />
      
      <div className="pt-0">
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