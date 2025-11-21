interface TextContentProps {
  displayText: string;
}

function TextContent({ displayText }: TextContentProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="overflow-hidden">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight transform transition-all duration-700 hover:scale-105 cursor-default">
          <span className="block bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x">
            Raka Pranata
          </span>
        </h1>
      </div>

      <div className="overflow-hidden">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#ffffea]/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
          <span className="text-[#d4af37]/70">I'm a</span>
          <span className="relative min-w-[180px] sm:min-w-[200px] h-6 sm:h-8 flex items-center justify-center lg:justify-start">
            <span className="bg-linear-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent text-xl sm:text-2xl lg:text-3xl font-bold">
              {displayText}
            </span>
          </span>
        </h2>
      </div>

      <div className="space-y-3 max-w-2xl">
        <p className="text-base sm:text-md lg:text-lg leading-relaxed text-[#ffffea]/90 font-light">
          I design like I play games. <br/> 
          I explore, test, respawn & level up.<br/>  
          The boss fight is bad UX and trust me,
        </p>
        <p className="font-bold text-base sm:text-md lg:text-lg animate-pulse text-[#d4af37]">
          I don't lose.
        </p>
      </div>
    </div>
  );
}

export default TextContent;