// components/Footer/BrandSection.tsx
import { useState, useEffect } from 'react';
import { FaEnvelope, FaClock, FaCheck } from 'react-icons/fa';

interface BrandSectionProps {
  isVisible: boolean;
}

function BrandSection({ }: BrandSectionProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('rakaaa.p96@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="group">
        <h3 className="text-2xl font-black text-[#ffffea] mb-3">
          <span className="bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x">
            Raka Pranata
          </span>
        </h3>
        <p className="text-[#ffffea]/70 leading-relaxed text-sm group-hover:text-[#ffffea] transition-colors duration-300 mb-6">
          Creating digital experiences that blend beautiful design with flawless functionality. <br/>
          Let's build the future together, one pixel at a time.
        </p>
      </div>

      {/* Live Time & Email */}
      <div className="space-y-4">
        <div 
          className="flex items-center gap-3 group cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={copyEmail}
        >
          <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-300 group-hover:scale-110">
            {emailCopied ? (
              <FaCheck className="text-[#d4af37] group-hover:text-[#1a1a1a] text-lg" />
            ) : (
              <FaEnvelope className="text-[#d4af37] group-hover:text-[#1a1a1a] text-lg" />
            )}
          </div>
          <div className="flex-1">
            <div className="text-[#ffffea] font-medium text-sm">Email Me</div>
            <div className="text-[#ffffea]/70 text-xs group-hover:text-[#d4af37] transition-colors duration-300">
              {emailCopied ? 'Copied to clipboard! 🎉' : 'rakaaa.p96@gmail.com'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 group transform transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-300 group-hover:scale-110">
            <FaClock className="text-[#d4af37] group-hover:text-[#1a1a1a] text-lg" />
          </div>
          <div>
            <div className="text-[#ffffea] font-medium text-sm">Current Time</div>
            <div className="text-[#d4af37] text-xs font-mono">{currentTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSection;