import { useRef, useEffect, useState } from 'react';
import type { Particle } from '../../types/particle';

interface ParticleBackgroundProps {
  particles: Particle[];
}

function ParticleBackground({ particles }: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Mouse tracking (tetap)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      setMousePos(mouseRef.current);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getRepulsion = (x: number, y: number) => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const dx = x - mx;
    const dy = y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 20 && dist > 0) {
      const force = (20 - dist) / 20;
      return {
        x: (dx / dist) * force * 5,
        y: (dy / dist) * force * 5,
      };
    }
    return { x: 0, y: 0 };
  };

  const layers = [
    { items: particles.filter((_, i) => i % 3 === 0), blur: 1.5, opacity: 0.15, scale: 0.5, zIndex: 1 },
    { items: particles.filter((_, i) => i % 3 === 1), blur: 0, opacity: 0.5, scale: 1, zIndex: 2 },
    { items: particles.filter((_, i) => i % 3 === 2), blur: 0, opacity: 1.3, scale: 1.8, zIndex: 3 },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Mouse spotlight glow */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212, 175, 55, 0.15), transparent 50%)`,
        }}
      />

      {/* Connection web (tetap) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        {particles.map((p1, i) => 
          particles.slice(i + 1).map((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 18) {
              return (
                <line
                  key={`${p1.id}-${p2.id}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke="rgba(212, 175, 55, 0.3)"
                  strokeWidth="0.5"
                  opacity={(1 - dist / 18) * 0.8}
                />
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Particle layers – tanpa entrance delay, langsung tampil */}
      {layers.map((layer, layerIdx) => (
        <div 
          key={layerIdx} 
          className="absolute inset-0" 
          style={{ 
            filter: layer.blur > 0 ? `blur(${layer.blur}px)` : 'none',
            zIndex: layer.zIndex,
          }}
        >
          {layer.items.map((p, _i) => {
            const repulsion = getRepulsion(p.x, p.y);
            const size = p.size * layer.scale;
            const opacity = Math.min(1, p.opacity * layer.opacity);

            return (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x + repulsion.x}%`,
                  top: `${p.y + repulsion.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: opacity,
                  background: `radial-gradient(circle, #ffffea 0%, #f4d03f 30%, #d4af37 70%, transparent 100%)`,
                  boxShadow: layerIdx === 2 
                    ? `0 0 ${size * 4}px rgba(244, 208, 63, 0.6), 0 0 ${size * 8}px rgba(212, 175, 55, 0.2), inset 0 0 ${size}px rgba(255, 255, 234, 0.3)` 
                    : layerIdx === 1 
                      ? `0 0 ${size * 2}px rgba(212, 175, 55, 0.4)` 
                      : `0 0 ${size}px rgba(212, 175, 55, 0.15)`,
                  transform: 'translate(-50%, -50%)',
                  transition: 'left 0.5s cubic-bezier(0.23, 1, 0.32, 1), top 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                  willChange: 'left, top',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ParticleBackground;