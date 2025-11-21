import { useState, useEffect } from 'react';
import type { Particle } from '../types/particle';

function useParticleSystem(particleCount: number = 50) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);

    const animate = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }))
      );
    };

    const interval = setInterval(animate, 100);
    return () => clearInterval(interval);
  }, [particleCount]);

  return particles;
}

export default useParticleSystem;