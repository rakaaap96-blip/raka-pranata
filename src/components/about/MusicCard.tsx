import { FaGuitar, FaMusic, FaMicrophone, FaLightbulb, FaHeart } from 'react-icons/fa';
import { GiGuitarBassHead } from 'react-icons/gi';
import { BsSoundwave } from 'react-icons/bs';

function MusicCard() {
  const skills = [
    { name: 'Guitar', icon: FaGuitar },
    { name: 'Songwriting', icon: FaMusic },
    { name: 'Singing', icon: FaMicrophone },
    { name: 'Inspiration', icon: FaLightbulb },
    { name: 'Instrumental', icon: GiGuitarBassHead },
    { name: 'Soothing', icon: BsSoundwave },
    { name: 'Serenading', icon: FaHeart }
  ];

  return (
    <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-8 pb-25 border border-[#d4af37]/20 transition-all duration-500 hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/20 hover:bg-[#1a1a1a]/70">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
          <FaMusic className="w-6 h-6 text-[#1a1a1a]" />
        </div>
        <h3 className="text-2xl font-bold text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
          Music & Creativity
        </h3>
      </div>
      <p className="text-[#ffffea]/80 leading-relaxed mb-6 text-lg group-hover:text-[#ffffea] transition-colors duration-300">
        When I'm not coding, you'll probably find me with my guitar, lost in a world of chords and lyrics. Music's like my second language — it's where logic meets emotion, and where I get to turn feelings into sound. 
        Whether it's late-night jam sessions or scribbling song ideas in a notebook, that's my kind of therapy.
      </p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <span 
              key={skill.name} 
              className="px-4 py-2 bg-[#d4af37]/10 text-[#d4af37] text-base rounded-full border border-[#d4af37]/20 font-medium transition-all duration-300 hover:scale-110 hover:bg-[#d4af37] hover:text-[#1a1a1a] hover:shadow-lg hover:shadow-[#d4af37]/30 flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {skill.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default MusicCard;