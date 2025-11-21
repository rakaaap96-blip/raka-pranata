// components/Footer/SocialSection.tsx
import { FaUser, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaDiscord, FaSquareBehance, FaSquareDribbble } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
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
  return (
    <div className="space-y-6">
      <div className="text-lg font-bold text-[#d4af37] flex items-center gap-2">
        <FaUser className="text-sm" />
        Let's Connect
      </div>
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            className="group flex items-center gap-3 p-3 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl border border-[#d4af37]/20 transform transition-all duration-500 hover:scale-105 hover:border-[#d4af37] hover:shadow-lg"
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
            onMouseEnter={() => setHoveredSocial(social.name)}
            onMouseLeave={() => setHoveredSocial(null)}
          >
            <social.icon className={`text-lg transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 ${
              hoveredSocial === social.name ? social.color : 'text-[#ffffea]'
            }`} />
            <span className="text-[#ffffea] font-medium text-sm group-hover:text-[#d4af37] transition-colors duration-300">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialSection;