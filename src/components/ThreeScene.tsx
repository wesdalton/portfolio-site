import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ThreeSceneProps {
  mousePosition: { x: number; y: number };
  particleCount: number;
  isMobile: boolean;
}

export default function ThreeScene({ mousePosition, particleCount, isMobile }: ThreeSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneObjectsRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    particles: THREE.Points;
    animationFrameId?: number;
  } | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Setup scene basics
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Initialize renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    sceneRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a circle texture dynamically instead of loading an image
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      // Draw a radial gradient for a soft particle effect
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(32, 32, 32, 0, Math.PI * 2);
      context.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create optimized particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const count = particleCount;
      
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const opacities = new Float32Array(count);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Create 3D space distribution - more clustered toward center
        const radius = Math.random() * 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        scales[i] = Math.random();
        opacities[i] = 0.5 + Math.random() * 0.5; // Varying opacity for depth effect
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      
      // Optimized material
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x64ffda,
        size: isMobile ? 0.08 : 0.05, // Larger on mobile for visibility
        sizeAttenuation: true,
        transparent: true,
        alphaMap: texture,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      // Create particle system
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Store objects for later reference
      sceneObjectsRef.current = {
        scene,
        camera,
        particles
      };

      // Animation with frame limiting for better performance
      let lastRender = 0;
      const fps = isMobile ? 30 : 60; // Limit FPS on mobile
      const fpsInterval = 1000 / fps;
      
      const animate = (now: number) => {
        sceneObjectsRef.current!.animationFrameId = requestAnimationFrame(animate);
        
        // Calculate time elapsed since last render
        const elapsed = now - lastRender;
        
        // Only render if enough time has passed
        if (elapsed > fpsInterval) {
          lastRender = now - (elapsed % fpsInterval);
          
          // Apply minimal rotation for ambient movement
          particles.rotation.x += 0.0002;
          particles.rotation.y += 0.0003;
          
          renderer.render(scene, camera);
        }
      };
      
      animate(0);

      // Handle resize
      const handleResize = () => {
        if (!sceneObjectsRef.current) return;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (sceneObjectsRef.current?.animationFrameId) {
          cancelAnimationFrame(sceneObjectsRef.current.animationFrameId);
        }
        
        scene.remove(particles);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        
        if (rendererRef.current && sceneRef.current) {
          sceneRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    // No need for closing the texture loader callback
  }, [particleCount, isMobile]);
  
  // Apply smooth rotation based on mouse position
  useEffect(() => {
    if (!sceneObjectsRef.current) return;
    
    gsap.to(sceneObjectsRef.current.particles.rotation, {
      x: mousePosition.y * 0.1,
      y: mousePosition.x * 0.1,
      duration: isMobile ? 1 : 2, // Faster on mobile for better responsiveness
      ease: 'power1.out'
    });
  }, [mousePosition, isMobile]);

  return <div ref={sceneRef} className="w-full h-full" />;
}