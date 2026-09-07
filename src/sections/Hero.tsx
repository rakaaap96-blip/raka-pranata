import { useRef } from 'react';
import useTyping from '../hooks/useTyping';
import ProfileImage from '../components/hero/ProfileImage';
import TextContent from '../components/hero/TextContent';
import CTAButtons from '../components/hero/CTAButtons';
function Hero() {
  const displayText = useTyping([
    'The Architect',
    'Problem Solver',
    'Product Thinker',
    'Full Stack Developer',
  ]);

  const heroRef = useRef<HTMLDivElement>(null);

  const handleLetsTalk = () => {};

  return (
    <section
      id='home'
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-12 py-14 lg:py-16 cyber-grid-section cyber-section"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* Left Content - Text Section */}
        <div className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6 cyber-panel cyber-frame p-4 sm:p-6 lg:p-6">
          <TextContent displayText={displayText} />
          <CTAButtons onLetsTalk={handleLetsTalk} />
        </div>

        {/* Right Content - Image Section */}
        <div className="w-full lg:w-[38%] flex justify-center lg:justify-end mt-5 lg:mt-0">
          <ProfileImage />
        </div>
      </div>
    </section>
  );
}

export default Hero;
