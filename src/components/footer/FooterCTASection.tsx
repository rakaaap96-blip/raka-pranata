import { useState, useRef, useEffect, useCallback } from 'react';
import { FaRocket, FaFolderOpen } from 'react-icons/fa';
import MagneticButton from '../ui/MagneticButton';

/* ============================================
   MAIN FOOTER CTA SECTION
   ============================================ */
function FooterCTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-16 text-center relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 50, y: 50 });
      }}
    >
      <div className="absolute -inset-12 bg-[#d4af37]/5 rounded-[3rem] blur-3xl opacity-0 transition-opacity duration-1000 pointer-events-none" style={{ opacity: isHovered ? 0.4 : 0 }} />

      <div 
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none overflow-hidden -m-4"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(800px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.12), transparent 40%)`,
        }}
      />

      <div 
        className={`relative bg-[#1a1a1a]/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-[#d4af37]/15 overflow-hidden transition-all duration-700 hover:border-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/10 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ animation: isVisible ? 'floatCta 6s ease-in-out infinite' : 'none' }}
      >
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          <div className="absolute w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl top-0 left-1/4"
            style={{ animation: 'float1 8s ease-in-out infinite' }} />
          <div className="absolute w-24 h-24 bg-[#f4d03f]/10 rounded-full blur-2xl bottom-0 right-1/4"
            style={{ animation: 'float2 10s ease-in-out infinite' }} />
        </div>

        <h3 
          className="text-2xl md:text-3xl font-black text-[#ffffea] mb-4 relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 100ms',
          }}
        >
          Ready to start your next project?
          <div className="mx-auto mt-3 w-24 h-1 bg-linear-to-r from-transparent via-[#d4af37] to-transparent rounded-full opacity-60" />
        </h3>

        <p 
          className="text-[#ffffea]/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms',
          }}
        >
          Let's collaborate to create something extraordinary. I'm always excited to take on new challenges and bring innovative ideas to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <MagneticButton 
            href="#contact" 
            variant="primary" 
            delay={300} 
            isVisible={isVisible}
            icon={<FaRocket />}
          >
            Start a Project
          </MagneticButton>
          
          <MagneticButton 
            href="#projects" 
            variant="secondary" 
            isVisible={isVisible}
            icon={<FaFolderOpen />}
          >
            View My Work
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

export default FooterCTASection;