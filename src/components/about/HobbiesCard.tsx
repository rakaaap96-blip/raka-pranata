import { FaGuitar, FaMusic } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import { BsPencilFill } from 'react-icons/bs';

function HobbiesCard() {
  const hobbies = [
    { 
      icon: FaGuitar, 
      title: "Guitar", 
      description: "Daily Practice" 
    },
    { 
      icon: BsPencilFill, 
      title: "Songwriting", 
      description: "Original Lyrics" 
    },
    { 
      icon: GiWorld, 
      title: "8 Languages", 
      description: "And Counting" 
    },
  ];

  return (
    <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-[#d4af37]/20 transition-all duration-500 hover:scale-102 hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/20 hover:bg-[#1a1a1a]/70">
      <h3 className="text-xl md:text-2xl font-bold text-[#d4af37] mb-6 md:mb-8 text-center group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
        <FaMusic className="w-5 h-5 md:w-6 md:h-6" />
        Beyond Coding
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {hobbies.map((hobby, index) => {
          const IconComponent = hobby.icon;
          return (
            <div 
              key={hobby.title}
              className="group/item text-center p-4 md:p-6 bg-[#1a1a1a]/30 rounded-2xl border border-[#d4af37]/20 transition-all duration-500 hover:scale-110 hover:bg-[#d4af37]/20 hover:border-[#d4af37] hover:shadow-2xl hover:shadow-[#d4af37]/30"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl mb-2 md:mb-3 group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform duration-500">
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-[#d4af37] mx-auto" />
              </div>
              <div className="text-[#ffffea] font-bold text-base md:text-lg mb-1 group-hover/item:text-[#d4af37] transition-colors duration-300">
                {hobby.title}
              </div>
              <div className="text-[#ffffea]/70 text-sm md:text-base group-hover/item:text-[#ffffea]/90 transition-colors duration-300">
                {hobby.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HobbiesCard;