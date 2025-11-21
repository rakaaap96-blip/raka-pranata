import AboutHeader from '../components/about/AboutHeader';
import MusicCard from '../components/about/MusicCard';
import PhilosophyCard from '../components/about/PhilosophyCard';
import LanguagesCard from '../components/about/LanguagesCard';
import HobbiesCard from '../components/about/HobbiesCard';
import AboutQuote from '../components/about/AboutQuote';

function About() {
  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <AboutHeader />
        
        {/* Top Row - Music & Design Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MusicCard />
          <PhilosophyCard />
        </div>

        {/* Middle Row - Language Skills */}
        <div className="mb-8">
          <LanguagesCard />
        </div>

        {/* Bottom Row - Beyond Coding */}
        <div>
          <HobbiesCard />
        </div>

        <AboutQuote />
      </div>
    </section>
  );
}

export default About;