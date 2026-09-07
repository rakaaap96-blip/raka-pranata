import { useState, useRef, type MouseEvent } from 'react';
import { FaUser, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaDiscord, FaSquareBehance, FaSquareDribbble } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

interface SocialSectionProps {
  isVisible: boolean;
}

const socialLinks = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/rakaaap96-blip' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/in/raka-pranata-2804a437a/' },
  { name: 'Instagram', icon: RiInstagramFill, url: 'https://www.instagram.com/aranasaha11/' },
  { name: 'Dribbble', icon: FaSquareDribbble, url: 'https://dribbble.com/raka-pranata' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/' },
  { name: 'Behance', icon: FaSquareBehance, url: 'https://www.behance.net/Rakanzha' }
];

function SocialCard({ social, index, isVisible }: { social: typeof socialLinks[number]; index: number; isVisible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setMagnet({ x, y });
  };

  const handleLeave = () => {
    setHovered(false);
    setMagnet({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative block w-full h-[52px] overflow-hidden cyber-card border border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translate(${magnet.x}px, ${magnet.y}px)`,
        transition: isVisible ? `opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 100}ms, border 0.3s, box-shadow 0.3s, transform 0.1s ease-out` : `opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 100}ms, transform 0.1s ease-out`,
      }}
    >
      {/* Cyber corners */}
      <div className="absolute top-0 left-0 w-3 h-px bg-[#d4af37]/60" />
      <div className="absolute top-0 left-0 w-px h-3 bg-[#d4af37]/60" />
      <div className="absolute top-0 right-0 w-3 h-px bg-[#d4af37]/60" />
      <div className="absolute top-0 right-0 w-px h-3 bg-[#d4af37]/60" />
      <div className="absolute bottom-0 left-0 w-3 h-px bg-[#d4af37]/60" />
      <div className="absolute bottom-0 left-0 w-px h-3 bg-[#d4af37]/60" />
      <div className="absolute bottom-0 right-0 w-3 h-px bg-[#d4af37]/60" />
      <div className="absolute bottom-0 right-0 w-px h-3 bg-[#d4af37]/60" />

      {/* Glow on hover */}
      <div className={`absolute inset-0 bg-[#d4af37] transition-all duration-300 ${
        hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`} />

      {/* Scanline */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
        hovered ? 'opacity-20' : 'opacity-0'
      }`} style={{
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`
      }} />

      {/* Inner */}
      <div className="relative z-10 flex items-center gap-3 h-full px-4">
        {/* Icon */}
        <div className={`w-9 h-9 rounded-lg bg-linear-to-r from-[#d4af37] to-[#f4d03f] flex items-center justify-center shrink-0 transition-all duration-300 ${
          hovered ? 'scale-110 rotate-12 shadow-lg shadow-[#d4af37]/30' : ''
        }`}>
          <social.icon className="w-4 h-4 text-[#1a1a1a]" />
        </div>

        {/* Name */}
        <span className={`font-semibold text-sm flex-1 min-w-0 transition-all duration-300 ${
          hovered ? 'text-[#1a1a1a]' : 'text-[#ffffea]'
        }`}>
          {social.name}
        </span>

        {/* Arrow */}
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-all duration-300 ${
            hovered ? 'text-[#1a1a1a] translate-x-0 opacity-100' : 'text-[#d4af37] opacity-40'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

function SocialSection({ isVisible }: SocialSectionProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
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
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 50, y: 50 });
      }}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none overflow-hidden -m-6"
        style={{
          opacity: isHovered ? 0.3 : 0,
          background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.1), transparent 40%)`,
        }}
      />

      <div className="system-header mb-4">// SOCIAL_LINKS</div>

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

      {/* Social Links */}
      <div className="grid grid-cols-2 gap-2 mt-4 relative z-10 w-full">
        {socialLinks.map((social, index) => (
          <SocialCard key={social.name} social={social} index={index} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
}

export default SocialSection;