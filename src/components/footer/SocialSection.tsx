import { useState, useRef } from 'react';
import { FaUser, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaDiscord, FaSquareBehance, FaSquareDribbble } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import MagneticButton from '../ui/MagneticButton';

interface SocialSectionProps {
  isVisible: boolean;
  hoveredSocial: string | null;
  setHoveredSocial: (social: string | null) => void;
}

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/rakaaap96-blip', color: 'hover:text-gray-400' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/raka-pranata-2804a437a/', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: RiInstagramFill, url: 'https://www.instagram.com/aranasaha11/', color: 'hover:text-pink-500' },
  { name: 'Dribbble', icon: FaSquareDribbble, url: 'https://dribbble.com/raka-pranata', color: 'hover:text-pink-600' },
  { name: 'Discord', icon: FaDiscord, url: '#', color: 'hover:text-pink-600' },
  { name: 'Behance', icon: FaSquareBehance, url: 'https://www.behance.net/Rakanzha', color: 'hover:text-blue-600' }
];

function SocialSection({ isVisible, hoveredSocial, setHoveredSocial }: SocialSectionProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative space-y-6"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 50, y: 50 });
      }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none overflow-hidden -m-6"
        style={{
          opacity: isHovered ? 0.3 : 0,
          background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.1), transparent 40%)`,
        }}
      />

      {/* Header */}
      <div
        className={`text-lg font-bold text-[#d4af37] flex items-center gap-2 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="relative">
          <FaUser className="text-sm" />
          <div className={`absolute inset-0 bg-[#d4af37]/30 rounded-full blur-md transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>
        <span className="relative">
          Let's Connect
          <div className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full transition-all duration-700 ${isHovered ? 'w-full' : 'w-0'}`} />
        </span>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {socialLinks.map((social, index) => {
          const isCardHovered = hoveredSocial === social.name;
          return (
            <div
              key={social.name}
              onMouseEnter={() => setHoveredSocial(social.name)}
              onMouseLeave={() => setHoveredSocial(null)}
              className="w-full"
            >
              <MagneticButton
                href={social.url}
                target="_blank"
                variant="ghost"
                delay={index * 100}
                isVisible={isVisible}
                magnetStrength={0.4}
                particleCount={8}
                ripple={true}
                showEq={true}
                className={`group relative w-full p-4 bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
                  isCardHovered
                    ? 'border-[#d4af37]/60 shadow-2xl shadow-[#d4af37]/20 scale-105 z-10'
                    : 'border-[#d4af37]/15 hover:border-[#d4af37]/40'
                }`}
              >
                {/* Inner content with icon, text, arrow, and orbit ring */}
                <div className="relative flex items-center gap-3 w-full">
                  {/* Holographic border (on hover) - always rendered, opacity toggled */}
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none p-px ${
                    isCardHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] animate-holo-shift" />
                    <div className="w-full h-full rounded-2xl bg-[#1a1a1a]" />
                  </div>

                  {/* Shimmer sweep - always rendered */}
                  <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    isCardHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-shimmer-sweep" />
                  </div>

                  {/* Icon with glow */}
                  <div className="relative shrink-0">
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-r from-[#d4af37] to-[#f4d03f] flex items-center justify-center transition-all duration-500 ${
                      isCardHovered ? 'scale-110 rotate-12 shadow-lg shadow-[#d4af37]/30' : ''
                    }`}>
                      <social.icon className="w-5 h-5 text-[#1a1a1a]" />
                    </div>
                    
                    {/* Orbit ring (appears on hover) - FIXED: always rendered, visibility toggled */}
                    <svg 
                      className={`absolute -inset-1 w-12 h-12 -rotate-90 pointer-events-none transition-all duration-500 ${
                        isCardHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`} 
                      viewBox="0 0 48 48"
                    >
                      <circle 
                        cx="24" cy="24" r="22" fill="none" stroke="#d4af37" strokeWidth="1" 
                        strokeLinecap="round" strokeDasharray="138.23" strokeDashoffset="0" 
                        className={isCardHovered ? 'animate-orbit-ring' : ''}
                      />
                    </svg>
                    
                    <div className={`absolute inset-0 rounded-xl bg-[#d4af37]/30 blur-lg transition-opacity duration-500 ${
                      isCardHovered ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>

                  {/* Text and equalizer - FIXED: always render equalizer bars, hide with CSS */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <span
                      className="font-semibold text-sm transition-colors duration-300 block"
                      style={{ color: isCardHovered ? '#1a1a1a' : '#ffffea' }}
                    >
                      {social.name}
                    </span>
                    
                    {/* Equalizer bars - always present, visibility toggled */}
                    <div className={`flex items-end gap-0.5 h-2 mt-1 transition-all duration-300 ${
                      isCardHovered ? 'opacity-50 visible' : 'opacity-0 invisible'
                    }`}>
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 rounded-full animate-social-eq"
                          style={{
                            height: `${30 + Math.random() * 70}%`,
                            animationDelay: `${i * 80}ms`,
                            backgroundColor: '#1a1a1a',
                            animationPlayState: isCardHovered ? 'running' : 'paused',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className={`shrink-0 transition-all duration-300 ${
                    isCardHovered ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'
                  }`}>
                    <svg
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isCardHovered ? 'text-[#1a1a1a]' : 'text-[#d4af37]'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </MagneticButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SocialSection;