import { useState, useEffect } from 'react';
import useImageTilt from '../../hooks/useImageTilt';
import { FaFigma, FaReact } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';
import { GiSpinningBlades } from 'react-icons/gi';
import { BsStars } from 'react-icons/bs';

const TECH_STACK = [
  { name: 'Figma', icon: FaFigma, color: 'text-[#d4af37]' },
  { name: 'React', icon: FaReact, color: 'text-[#d4af37]' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-[#d4af37]' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-[#d4af37]' }
];

function ProfileImage() {
  const { imageRef, handleImageInteraction, resetImageTransform } = useImageTilt();
  const [isMobile, setIsMobile] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      ref={imageRef}
      className={`relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-88 xl:w-88 xl:h-96 group ${
        !isMobile ? 'cursor-pointer transition-all duration-500' : ''
      }`}
      onMouseMove={!isMobile ? handleImageInteraction : undefined}
      onMouseLeave={!isMobile ? resetImageTransform : undefined}
    >
      {/* Background Glow - Hanya di Desktop */}
      {!isMobile && (
        <div className="absolute inset-0 bg-linear-to-r from-[#d4af37] to-[#f4d03f] opacity-20 blur-2xl group-hover:opacity-30 group-hover:blur-3xl transition-all duration-500 animate-pulse [clip-path:polygon(12%_0,100%_0,100%_88%,88%_100%,0_100%,0_12%)]" />
      )}
      
      <div className={`relative w-full h-full cyber-panel cyber-frame overflow-hidden border border-[#d4af37]/50 ${
        !isMobile ? 'group-hover:border-[#d4af37] transition-all duration-500 shadow-2xl' : ''
      }`}>
        
        {/* PRIMARY IMAGE */}
        <img
          src="/IMGG/face1-248x248.webp"
          alt="Raka Pranata - Frontend Developer and UI/UX Designer"
          fetchPriority="high"
          width="248"
          height="248"
          className={`absolute inset-0 z-10 w-full h-full object-cover grayscale-20 contrast-110 ${
            !isMobile 
              ? `transition-all duration-1000 ease-out group-hover:scale-110 ${hoverImageLoaded ? 'group-hover:opacity-0' : ''}` 
              : ''
          }`}
        />
        
        {/* SECOND IMAGE - HANYA DI DESKTOP */}
        {!isMobile && (
          <img
            src="/IMGG/face0-248x248.webp"
            alt="Raka Pranata creative profile"
            loading="lazy"
            width="248"
            height="248"
            className="absolute inset-0 z-20 w-full h-full object-cover grayscale-20 contrast-110 transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
            onLoad={() => setHoverImageLoaded(true)}
          />
        )}
        <div className="absolute inset-0 z-30 bg-linear-to-t from-black/45 via-transparent to-[#d4af37]/10 mix-blend-multiply pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 z-40 h-10 data-flow opacity-50 pointer-events-none" />
      </div>

      {/* ANIMATED ELEMENTS - HANYA DI DESKTOP */}
      {!isMobile && (
        <>
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center">
            <GiSpinningBlades className="w-5 h-5 text-[#d4af37] animate-spin" aria-hidden="true" />
          </div>
          
          <div className="absolute -bottom-3 -left-3 w-7 h-7 flex items-center justify-center">
            <BsStars className="w-5 h-5 text-[#d4af37] animate-bounce" aria-hidden="true" />
          </div>

          <div className="absolute -right-2 top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
            <BsStars className="w-4 h-4 text-[#f4d03f] animate-pulse" />
          </div>
          
          <div className="absolute -left-2 bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" aria-hidden="true">
            <BsStars className="w-3 h-3 text-[#ffffea] animate-ping" />
          </div>
        </>
      )}
      
      {/* TECH STACK */}
      <div className={`absolute -left-3 top-1/2 transform -translate-y-1/2 space-y-1.5 ${
        isMobile ? 'space-y-1' : ''
      }`}>
        {TECH_STACK.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <div
              key={tech.name}
              className={`cyber-chip text-[#d4af37] flex items-center gap-2 ${
                isMobile
                  ? 'px-2 py-1 text-xs' // Mobile: simple
                  : 'px-2.5 py-1.5 text-xs font-medium transform transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-[#1a1a1a] group/tech' // Desktop: full effects
              }`}
              style={!isMobile ? { 
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationFillMode: 'both'
              } : undefined}
            >
              <IconComponent 
                className={`${
                  isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5 transition-colors duration-300 group-hover/tech:text-[#1a1a1a]'
                } ${tech.color}`} 
                aria-hidden="true" 
              />
              {!isMobile && (
                <span className="transition-colors duration-300">{tech.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileImage;
