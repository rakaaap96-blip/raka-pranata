import { categories } from '../../data/projects';

interface ProjectFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

function ProjectFilter({ filter, setFilter, searchTerm, setSearchTerm }: ProjectFilterProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
      {/* Search Bar */}
      <div className="relative w-full lg:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-[#d4af37]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search projects or technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-80 pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#d4af37]/30 rounded-xl text-[#ffffea] placeholder-[#ffffea]/50 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all duration-300"
        />
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
              filter === category
                ? 'bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] shadow-lg shadow-[#d4af37]/30'
                : 'bg-[#1a1a1a] text-[#ffffea] border border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProjectFilter;