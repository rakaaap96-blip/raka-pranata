import { useRef, useEffect, useState } from 'react';
import useMousePosition from '../hooks/useMousePosition';
import useParticleSystem from '../hooks/useParticleSystem';
import ParticleBackground from '../components/hero/ParticleBackground';
import GeometricPattern from '../components/hero/GeometricPattern';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  const mousePosition = useMousePosition();
  const particles = useParticleSystem(40);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const dynamicBackground = {
    background: `
      radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
        rgba(212, 175, 55, 0.08) 0%, 
        transparent 60%),
      linear-gradient(135deg, 
        rgba(5, 5, 5, 0.98) 0%,
        rgba(15, 15, 15, 0.97) 50%,
        rgba(5, 5, 5, 0.98) 100%)
    `,
  };

  return (
    <div 
      ref={wrapperRef}
      className="relative min-h-screen bg-[#050505] text-[#ffffea] transition-all duration-1000"
      style={dynamicBackground}
    >
      {/* Global Background Elements */}
      <ParticleBackground particles={particles} />
      <GeometricPattern />
      
      {/* Additional Glow Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-[#f4d03f]/3 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-[#d4af37]/3 rounded-full blur-2xl animate-pulse delay-500" />
      
      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {children}
      </div>
    </div>
  );
}

export default BackgroundWrapper;