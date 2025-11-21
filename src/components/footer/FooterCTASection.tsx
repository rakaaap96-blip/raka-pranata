// components/Footer/FooterCTASection.tsx
import { FaRocket, FaFolderOpen, FaEye } from 'react-icons/fa';

function FooterCTASection() {
  return (
    <div className="mt-16 text-center">
      <div className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#d4af37]/20 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/20">
        <h3 className="text-2xl font-bold text-[#ffffea] mb-4">
          Ready to start your next project?
        </h3>
        <p className="text-[#ffffea]/70 mb-6 max-w-2xl mx-auto">
          Let's collaborate to create something extraordinary. I'm always excited to take on new challenges and bring innovative ideas to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="group relative px-8 py-3 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 text-[#1a1a1a] font-bold text-sm tracking-wide flex items-center justify-center gap-2">
              <FaRocket className="transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300" />
              Start a Project
              <FaRocket className="transform group-hover:scale-110 group-hover:translate-y-0.5 transition-all duration-300" />
            </span>
          </a>
          <a
            href="#projects"
            className="group relative px-8 py-3 border-2 border-[#d4af37] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:bg-[#d4af37]/10"
          >
            <span className="text-[#d4af37] font-bold text-sm tracking-wide flex items-center justify-center gap-2">
              <FaFolderOpen className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              View My Work
              <FaEye className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterCTASection;