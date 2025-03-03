import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { useWindowSize } from '../hooks/useWindowSize';

// Dynamic import of Three.js to reduce initial bundle size
const ThreeScene = dynamic(() => import('../components/ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-primary bg-opacity-50" />
  ),
});

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  
  // Initialize on client-side only to prevent SSR issues
  useEffect(() => {
    setIsClient(true);
    
    // Handle mouse/touch movement with throttling for better performance
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      if (timeout) clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        const clientX = 'touches' in event 
          ? event.touches[0].clientX 
          : (event as MouseEvent).clientX;
        const clientY = 'touches' in event 
          ? event.touches[0].clientY 
          : (event as MouseEvent).clientY;
          
        const mouseX = (clientX / window.innerWidth) * 2 - 1;
        const mouseY = -((clientY / window.innerHeight) * 2 - 1);
        
        setMousePosition({ x: mouseX, y: mouseY });
      }, 10); // 10ms throttle
    };
    
    // Add both mouse and touch events for full device support
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  }, []);
  
  // Adjust particle count based on device capabilities
  const getParticleCount = () => {
    // Reduce particle count on mobile for better performance
    if (width < 480) return 800;
    if (width < 768) return 1200;
    return 2000;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 opacity-30"
      aria-hidden="true"
    >
      {isClient && (
        <ThreeScene 
          mousePosition={mousePosition}
          particleCount={getParticleCount()}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}