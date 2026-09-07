import { useState, useEffect, useRef } from 'react';
import type { Particle } from '../types/particle';

function useParticleSystem(particleCount: number = 50) {
  const [particles, setParticles] = useState<Particle[]>(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  );
  const particlesRef = useRef<Particle[]>(particles);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = 0;

    const animate = (time: number) => {
      if (time - lastTime >= 100) {
        lastTime = time;
        particlesRef.current = particlesRef.current.map(p => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }));
        setParticles([...particlesRef.current]);
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [particleCount]);

  return particles;
}

export default useParticleSystem;