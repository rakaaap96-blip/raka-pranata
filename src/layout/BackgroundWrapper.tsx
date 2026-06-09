import { useRef, useEffect } from 'react';
import GeometricPattern from '../components/hero/GeometricPattern';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`);
        el.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`);
        rafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="relative min-h-screen bg-[#050505] text-[#ffffea]"
      style={{
        background: `
          radial-gradient(circle at var(--mx, 50%) var(--my, 50%), 
            rgba(212, 175, 55, 0.08) 0%, 
            transparent 60%),
          linear-gradient(135deg, 
            rgba(5, 5, 5, 0.98) 0%,
            rgba(15, 15, 15, 0.97) 50%,
            rgba(5, 5, 5, 0.98) 100%)
        `,
      }}
    >
      <GeometricPattern />
      
      <div className="fixed top-20 left-10 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-[#f4d03f]/3 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-[#d4af37]/3 rounded-full blur-2xl animate-pulse delay-500" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default BackgroundWrapper;