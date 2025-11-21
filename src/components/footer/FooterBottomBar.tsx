// components/Footer/FooterBottomBar.tsx
import { FaHeart, FaCoffee } from 'react-icons/fa';

interface FooterBottomBarProps {
  isVisible: boolean;
}

function FooterBottomBar({ isVisible }: FooterBottomBarProps) {
  return (
    <div className={`border-t border-[#d4af37]/10 py-6 transition-all duration-1000 delay-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[#ffffea]/60 text-sm text-center md:text-left flex items-center gap-2">
          © {new Date().getFullYear()} Raka Pranata. Crafted with 
          <FaHeart className="text-red-500 animate-pulse" /> 
          and 
          <FaCoffee className="text-amber-600" />
        </div>
        <div className="flex items-center gap-6 text-[#ffffea]/60 text-sm">
          <span className="hover:text-[#d4af37] transition-colors duration-300 cursor-pointer transform hover:scale-105">
            Privacy Policy
          </span>
          <span className="hover:text-[#d4af37] transition-colors duration-300 cursor-pointer transform hover:scale-105">
            Terms of Service
          </span>
          <span className="hover:text-[#d4af37] transition-colors duration-300 cursor-pointer transform hover:scale-105">
            Cookies
          </span>
        </div>
      </div>
    </div>
  );
}

export default FooterBottomBar;