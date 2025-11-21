const STATS = [
  { number: '1+', label: 'FE Developer Years Exp' },
  { number: '4+', label: 'Graphic Designer Years Exp' },

];

function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#d4af37]/20 w-full max-w-xs">
      {STATS.map((stat, i) => (
        <div key={i} className="text-center group cursor-default">
          <div className="text-xl lg:text-2xl font-bold text-[#d4af37] group-hover:scale-110 transition-transform duration-300">
            {stat.number}
          </div>
          <div className="text-xs text-[#ffffea]/60 group-hover:text-[#ffffea] transition-colors duration-300 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;