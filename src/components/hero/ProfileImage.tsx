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
      className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-md xl:h-112 group ${
        !isMobile ? 'cursor-pointer transition-all duration-500' : ''
      }`}
      onMouseMove={!isMobile ? handleImageInteraction : undefined}
      onMouseLeave={!isMobile ? resetImageTransform : undefined}
    >
      {/* Background Glow - Hanya di Desktop */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] opacity-20 blur-2xl group-hover:opacity-30 group-hover:blur-3xl transition-all duration-500 animate-pulse" />
      )}
      
      <div className={`relative w-full h-full rounded-full overflow-hidden border-4 border-[#d4af37]/40 ${
        !isMobile ? 'group-hover:border-[#d4af37] transition-all duration-500 shadow-2xl' : ''
      }`}>
        {/* LCP IMAGE - SAMA UNTUK SEMUA DEVICE */}
        <img
          src="/IMGG/face1-320x320.webp"
          alt="Raka Pranata professional profile - Frontend Developer and UI/UX Designer"
          fetchPriority="high"
          width="320"
          height="320"
          className={`absolute inset-0 w-full h-full object-cover ${
            !isMobile 
              ? 'transition-all duration-1000 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-110' 
              : ''
          }`}
        />
        
        {/* SECOND IMAGE - HANYA DI DESKTOP */}
        {!isMobile && (
          <img
            src="/IMGG/face0-320x320.webp"
            alt="Raka Pranata creative profile - showcasing innovative design and development work"
            loading="lazy"
            width="320"
            height="320"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
        )}
      </div>

      {/* ANIMATED ELEMENTS - HANYA DI DESKTOP */}
      {!isMobile && (
        <>
          <div className="absolute -top-4 -right-4 w-6 h-6 flex items-center justify-center">
            <GiSpinningBlades className="w-5 h-5 text-[#d4af37] animate-spin" aria-hidden="true" />
          </div>
          
          <div className="absolute -bottom-4 -left-4 w-8 h-8 flex items-center justify-center">
            <BsStars className="w-6 h-6 text-[#d4af37] animate-bounce" aria-hidden="true" />
          </div>

          <div className="absolute -right-2 top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
            <BsStars className="w-4 h-4 text-[#f4d03f] animate-pulse" />
          </div>
          
          <div className="absolute -left-2 bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" aria-hidden="true">
            <BsStars className="w-3 h-3 text-[#ffffea] animate-ping" />
          </div>
        </>
      )}
      
      {/* TECH STACK - SIMPLIFIED DI MOBILE */}
      <div className={`absolute -left-4 top-1/2 transform -translate-y-1/2 space-y-2 ${
        isMobile ? 'space-y-1' : ''
      }`}>
        {TECH_STACK.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <div
              key={tech.name}
              className={`bg-[#1a1a1a] text-[#d4af37] border border-[#d4af37]/30 flex items-center gap-2 ${
                isMobile
                  ? 'px-2 py-1 rounded-full text-xs' // Mobile: simple
                  : 'px-3 py-2 rounded-full text-sm font-medium transform transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-[#1a1a1a] group/tech' // Desktop: full effects
              }`}
              style={!isMobile ? { 
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationFillMode: 'both'
              } : undefined}
            >
              <IconComponent 
                className={`${
                  isMobile ? 'w-3 h-3' : 'w-4 h-4 transition-colors duration-300 group-hover/tech:text-[#1a1a1a]'
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