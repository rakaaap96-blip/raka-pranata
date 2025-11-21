import { FaPaintBrush, FaCode, FaRocket } from 'react-icons/fa';
import { GiSpiderWeb } from 'react-icons/gi';

function PhilosophyCard() {
  const philosophies = [
    { 
      title: "User-Centered Design", 
      description: "Every pixel should serve a purpose and create meaningful experiences",
      icon: FaPaintBrush
    },
    { 
      title: "Clean Code", 
      description: "Writing maintainable, scalable code that other developers love to work with",
      icon: FaCode
    },
    { 
      title: "Continuous Learning", 
      description: "The tech landscape evolves fast, and so do I",
      icon: FaRocket
    }
  ];

  return (
    <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#d4af37]/20 transition-all duration-500 hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/20 hover:bg-[#1a1a1a]/70">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
          <GiSpiderWeb className="w-6 h-6 text-[#1a1a1a]" />
        </div>
        <h3 className="text-2xl font-bold text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
          Design Philosophy
        </h3>
      </div>
      <div className="space-y-6">
        {philosophies.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.title} 
              className="flex items-start gap-4 group/item hover:bg-[#d4af37]/5 p-4 rounded-xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-[#d4af37]/20"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:rotate-12 transition-transform duration-300">
                <IconComponent className="w-5 h-5 text-[#1a1a1a]" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#ffffea] text-lg mb-2 group-hover/item:text-[#d4af37] transition-colors duration-300">
                  {item.title}
                </div>
                <p className="text-[#ffffea]/70 group-hover/item:text-[#ffffea]/90 transition-colors duration-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PhilosophyCard;