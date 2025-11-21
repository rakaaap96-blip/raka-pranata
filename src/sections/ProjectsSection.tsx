import { useRef } from 'react';
import { projects } from '../data/projects';
import useFilter from '../hooks/useFilter';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import { 
  FaFigma, 
  FaReact, 
  FaHtml5, 
  FaJs, 
  FaSearch,
  FaHandshake
} from 'react-icons/fa';
import { 
  SiAdobeillustrator, 
  SiCoreldraw, 
  SiTypescript, 
  SiTailwindcss,
} from 'react-icons/si';
import { 
  GiArtificialIntelligence 
} from 'react-icons/gi';
import { 
  RiToolsFill,
  RiStarFill
} from 'react-icons/ri';

function ProjectsSection() {
  const { filter, setFilter, searchTerm, setSearchTerm, filteredProjects } = useFilter(projects);
  const { ref, isVisible } = useScrollAnimation();
  const projectsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "Figma", level: 90, color: "from-purple-500 to-pink-500", icon: FaFigma },
    { name: "Adobe Illustrator", level: 85, color: "from-cyan-500 to-blue-500", icon: SiAdobeillustrator },
    { name: "Corel Draw", level: 90, color: "from-orange-400 to-red-500", icon: SiCoreldraw },
    { name: "React.js", level: 85, color: "from-purple-500 to-pink-500", icon: FaReact },
    { name: "TypeScript", level: 80, color: "from-blue-500 to-blue-600", icon: SiTypescript },
    { name: "TailwindCSS", level: 95, color: "from-teal-400 to-cyan-500", icon: SiTailwindcss },
    { name: "HTML/CSS", level: 95, color: "from-orange-400 to-red-500", icon: FaHtml5 },
    { name: "JavaScript", level: 88, color: "from-yellow-400 to-yellow-500", icon: FaJs },
    { name: "AI", level: 95, color: "from-teal-400 to-cyan-500", icon: GiArtificialIntelligence }
  ];

  return (
    <section
      id='projects'
      ref={projectsRef}
      className="relative min-h-screen flex items-center justify-between overflow-hidden px-4 sm:px-8 lg:px-16 py-16 lg:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 
            id="projects-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6"
          >
            <span className="block bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x pb-4">
              My Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#ffffea]/70 max-w-2xl mx-auto leading-relaxed px-4">
            Projects with a frontend focus that highlight current development techniques, seamless interactions, and clean design.
          </p>
        </div>

        {/* Skills Overview */}
        <div 
          className="mb-12 sm:mb-16 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#d4af37]/20 transform hover:scale-105 transition-all duration-500"
          aria-labelledby="tech-stack-heading"
        >
          <h3 
            id="tech-stack-heading"
            className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-6 text-center flex items-center justify-center gap-3"
          >
            <RiToolsFill className="w-6 h-6" aria-hidden="true" />
            Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={skill.name} className="space-y-2 group">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <IconComponent 
                        className="w-4 h-4 text-[#d4af37] transition-transform group-hover:scale-110" 
                        aria-hidden="true" 
                      />
                      <span className="text-[#ffffea] font-medium">{skill.name}</span>
                    </div>
                    <span className="text-[#d4af37]">{skill.level}%</span>
                  </div>
                  <div 
                    className="w-full bg-[#ffffea]/10 rounded-full h-2"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level}%`}
                  >
                    <div 
                      className={`h-2 rounded-full bg-linear-to-r ${skill.color} transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-current/30`}
                      style={{ 
                        width: `${skill.level}%`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Section */}
        <ProjectFilter
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div 
            className="text-center py-16 sm:py-20 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20"
            role="status"
            aria-live="polite"
          >
            <FaSearch className="text-4xl sm:text-6xl mb-4 mx-auto text-[#d4af37]/50" aria-hidden="true" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#ffffea] mb-2">No projects found</h3>
            <p className="text-[#ffffea]/70 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Stats - Fixed mobile gap */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-center">
          {[
            { number: new Set(projects.flatMap(p => p.technologies)).size, label: 'Tools Used', icon: RiToolsFill },
            { number: "4.8", label: 'Design Rating', icon: RiStarFill },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#d4af37]/20 transform hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-[#d4af37]/20 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <IconComponent 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37] mb-2 mx-auto transition-transform group-hover:scale-110 group-hover:rotate-12" 
                  aria-hidden="true" 
                />
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#d4af37] mb-1 sm:mb-2">
                  {stat.number}{!stat.number.toString().includes('.') && '+'}
                </div>
                <div className="text-[#ffffea]/70 text-xs sm:text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-[#ffffea]/70 mb-4 sm:mb-6 px-4">
            Interested in working together? Let's create something amazing!
          </p>
          
          {/* Opsi 1: Link external ke WhatsApp/Email */}
          <a 
            href="https://wa.me/6287823268333?text=Hi%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block group relative px-6 sm:px-8 py-3 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/30"
            aria-label="Contact via WhatsApp - opens in new window"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 text-[#1a1a1a] font-bold text-base sm:text-lg tracking-wide flex items-center justify-center gap-2">
              <FaHandshake className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              Get In Touch
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;