import React, { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  id: number;
}

const SmokeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const requestRef = useRef<number>();
  const nextParticleId = useRef(0);

  const createParticle = (): SmokeParticle => {
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    return {
      x: Math.random() * containerWidth,
      y: window.innerHeight + Math.random() * 20,
      size: Math.random() * 60 + 20,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      id: nextParticleId.current++
    };
  };

  const animateSmoke = () => {
    if (!containerRef.current) return;

    const particles = particlesRef.current;
    
    // Update existing particles
    particlesRef.current = particles
      .map(p => ({
        ...p,
        y: p.y - p.speed,
        opacity: p.y < window.innerHeight * 0.6 ? p.opacity - 0.003 : p.opacity
      }))
      .filter(p => p.opacity > 0);
    
    // Add new particles occasionally
    if (Math.random() < 0.1 && particles.length < 20) {
      particlesRef.current.push(createParticle());
    }
    
    // Update DOM
    const container = containerRef.current;
    container.innerHTML = '';
    
    particlesRef.current.forEach(p => {
      const particle = document.createElement('div');
      particle.className = 'smoke-particle';
      particle.style.left = `${p.x}px`;
      particle.style.top = `${p.y}px`;
      particle.style.width = `${p.size}px`;
      particle.style.height = `${p.size}px`;
      particle.style.opacity = `${p.opacity}`;
      container.appendChild(particle);
    });
    
    requestRef.current = requestAnimationFrame(animateSmoke);
  };

  useEffect(() => {
    // Initialize with a few particles
    for (let i = 0; i < 10; i++) {
      particlesRef.current.push(createParticle());
    }
    
    requestRef.current = requestAnimationFrame(animateSmoke);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="smoke-container" />;
};

export default SmokeBackground;