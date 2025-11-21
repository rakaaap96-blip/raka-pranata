import { FaDownload, FaComments } from 'react-icons/fa';

interface CTAButtonsProps {
  onDownloadCV: () => void;
  onLetsTalk: () => void;
}

function CTAButtons({ onDownloadCV, onLetsTalk }: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 justify-center lg:justify-start">
      <a
        href="https://drive.google.com/file/d/1GMGxkzO1oAyBYOQQQD_BYLpcY6PQxaWH/view?usp=sharing"
        onClick={onDownloadCV}
        className="group relative px-5 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-lg sm:rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#d4af37]/30 active:scale-95"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="relative z-10 text-[#1a1a1a] font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
          <FaDownload className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          Download CV
        </span>
      </a>

      <a
        href="https://wa.me/6287823268333?text=Hi%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch"
        onClick={onLetsTalk}
        className="group relative px-5 sm:px-6 py-2 sm:py-3 border-2 border-[#d4af37] rounded-lg sm:rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:bg-[#d4af37]/20 active:scale-95"
      >
        <span className="relative z-10 text-[#d4af37] font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2">
          <FaComments className="w-4 h-4 transition-transform group-hover:scale-110" />
          Let's Talk
        </span>
      </a>
    </div>
  );
}

export default CTAButtons;