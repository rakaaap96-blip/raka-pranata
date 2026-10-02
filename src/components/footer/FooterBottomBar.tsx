import { useState } from 'react';
import { FaHeart, FaCoffee } from 'react-icons/fa';
import LegalModal from './LegalModal';
import { LEGAL_DOCS } from '../../content/legal';

interface FooterBottomBarProps {
  isVisible: boolean;
}

function FooterBottomBar({ isVisible }: FooterBottomBarProps) {
  const [openDoc, setOpenDoc] = useState<string | null>(null);

  return (
    <div
      className={`border-t border-[#d4af37]/10 py-6 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[#ffffea]/60 text-sm text-center md:text-left flex items-center gap-2 flex-wrap justify-center">
          <span className="system-status">SYSTEM ONLINE</span>
          <span className="text-[#ffffea]/40">|</span>
          <span>
            {'© ' + new Date().getFullYear() + ' Raka Pranata. Crafted with '}
            <FaHeart aria-hidden="true" className="inline text-red-500 animate-pulse" /> {' and '}
            <FaCoffee aria-hidden="true" className="inline text-amber-600" />
          </span>
          <span className="text-[#ffffea]/40">|</span>
          <span>
            Powered by{' '}
            <a
              href="https://rakawebpro.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37]/80 underline decoration-[#d4af37]/30 underline-offset-2 transition-colors duration-300 hover:text-[#d4af37] hover:decoration-[#d4af37]"
            >
              rakawebpro.vercel.app
            </a>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#ffffea]/60 text-sm md:gap-6">
          {LEGAL_DOCS.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setOpenDoc(doc.id)}
              className="min-h-11 px-1 transition-colors duration-300 hover:text-[#d4af37]"
            >
              {doc.label}
            </button>
          ))}
        </div>
      </div>

      <LegalModal open={openDoc !== null} initialDocId={openDoc ?? 'privacy'} onClose={() => setOpenDoc(null)} />
    </div>
  );
}

export default FooterBottomBar;