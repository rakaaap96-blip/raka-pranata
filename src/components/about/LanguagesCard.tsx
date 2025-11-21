import { IoLanguage } from 'react-icons/io5';

function LanguagesCard() {
  const languageCategories = [
    { 
      level: "Native", 
      languages: [
        { name: 'Indonesian' },
        { name: 'Sundanese' }
      ], 
      color: "bg-[#d4af37]/20 border-[#d4af37]/40" 
    },
    { 
      level: "Fluent", 
      languages: [
        { name: 'Javanese' },
        { name: 'English' }
      ], 
      color: "bg-[#d4af37]/15 border-[#d4af37]/30" 
    },
    { 
      level: "Conversational", 
      languages: [
        { name: 'Tagalog' },
        { name: 'Japanese' }
      ], 
      color: "bg-[#d4af37]/10 border-[#d4af37]/20" 
    },
    { 
      level: "Basic", 
      languages: [
        { name: 'Spanish' },
        { name: 'Russian' }
      ], 
      color: "bg-[#d4af37]/5 border-[#d4af37]/10" 
    }
  ];

  return (
    <div className="group bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#d4af37]/20 transition-all duration-500 hover:scale-102 hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-[#d4af37]/20 hover:bg-[#1a1a1a]/70">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
          <IoLanguage className="w-6 h-6 text-[#1a1a1a]" />
        </div>
        <h3 className="text-2xl font-bold text-[#ffffea] group-hover:text-[#d4af37] transition-colors duration-300">
          Language Skills
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {languageCategories.map((category) => (
          <div key={category.level} className="text-center">
            <div className="font-bold text-[#d4af37] text-lg mb-4 group-hover:scale-105 transition-transform duration-300">
              {category.level}
            </div>
            <div className="space-y-3">
              {category.languages.map((lang) => (
                <div 
                  key={lang.name} 
                  className={`px-4 py-3 ${category.color} text-[#ffffea] rounded-xl border font-medium transition-all duration-300`}
                >
                  {lang.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguagesCard;