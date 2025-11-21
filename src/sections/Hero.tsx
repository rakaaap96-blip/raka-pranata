import { useRef } from 'react';
import useTyping from '../hooks/useTyping';
import ProfileImage from '../components/hero/ProfileImage';
import TextContent from '../components/hero/TextContent';
import CTAButtons from '../components/hero/CTAButtons';
import Stats from '../components/hero/Stats';

function Hero() {
  const displayText = useTyping([
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker',
    'Frontend Developer',
    'Digital Artist',
  ]);

  const heroRef = useRef<HTMLDivElement>(null);

  const handleDownloadCV = () => console.log('Downloading CV...');
  const handleLetsTalk = () => console.log('Opening contact...');

  return (
    <section
      id='home'
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Content - Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
          <TextContent displayText={displayText} />
          <CTAButtons onDownloadCV={handleDownloadCV} onLetsTalk={handleLetsTalk} />
          <Stats />
        </div>

        {/* Right Content - Image Section */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <ProfileImage />
        </div>
      </div>
    </section>
  );
}

export default Hero;