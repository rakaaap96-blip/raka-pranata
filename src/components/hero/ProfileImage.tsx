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

  return (
    <div
      ref={imageRef}
      className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-md xl:h-112 group cursor-pointer transition-all duration-500"
      onMouseMove={handleImageInteraction}
      onMouseLeave={resetImageTransform}
    >
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] opacity-20 blur-2xl group-hover:opacity-30 group-hover:blur-3xl transition-all duration-500 animate-pulse" />
      
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#d4af37]/40 group-hover:border-[#d4af37] transition-all duration-500 shadow-2xl">
        {/* LCP IMAGE - NO LAZY LOAD */}
        <img
          src="/IMGG/face1-248x248.webp"
          srcSet="/IMGG/face1-248x248.webp 248w,
                  /IMGG/face1-496x496.webp 496w,
                  /IMGG/face1-1418x1418.webp 1418w"
          sizes="(max-width: 640px) 248px,
                 (max-width: 1024px) 496px,
                 1418px"
          alt="Raka Pranata professional profile - Frontend Developer and UI/UX Designer"
          fetchPriority="high"
          width="248"
          height="248"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-110"
        />
        
        {/* SECOND IMAGE - BISA LAZY LOAD */}
        <img
          src="/IMGG/face0-248x248.webp"
          srcSet="/IMGG/face0-248x248.webp 248w,
                  /IMGG/face0-496x496.webp 496w,
                  /IMGG/face0-1418x1418.webp 1418w"
          sizes="(max-width: 640px) 248px,
                 (max-width: 1024px) 496px,
                 1418px"
          alt="Raka Pranata creative profile - showcasing innovative design and development work"
          loading="lazy"
          width="248"
          height="248"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
        />
      </div>

      <div className="absolute -top-4 -right-4 w-6 h-6 flex items-center justify-center">
        <GiSpinningBlades className="w-5 h-5 text-[#d4af37] animate-spin" aria-hidden="true" />
      </div>
      
      <div className="absolute -bottom-4 -left-4 w-8 h-8 flex items-center justify-center">
        <BsStars className="w-6 h-6 text-[#d4af37] animate-bounce" aria-hidden="true" />
      </div>
      
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 space-y-2">
        {TECH_STACK.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <div
              key={tech.name}
              className="bg-[#1a1a1a] text-[#d4af37] px-3 py-2 rounded-full text-sm font-medium border border-[#d4af37]/30 transform transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-[#1a1a1a] flex items-center gap-2 group/tech"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationFillMode: 'both'
              }}
            >
              <IconComponent className={`w-4 h-4 transition-colors duration-300 ${tech.color} group-hover/tech:text-[#1a1a1a]`} aria-hidden="true" />
              <span className="transition-colors duration-300">{tech.name}</span>
            </div>
          );
        })}
      </div>

      <div className="absolute -right-2 top-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
        <BsStars className="w-4 h-4 text-[#f4d03f] animate-pulse" />
      </div>
      
      <div className="absolute -left-2 bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" aria-hidden="true">
        <BsStars className="w-3 h-3 text-[#ffffea] animate-ping" />
      </div>
    </div>
  );
}

export default ProfileImage;