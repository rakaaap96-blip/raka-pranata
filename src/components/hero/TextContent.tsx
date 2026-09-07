interface TextContentProps {
  displayText: string;
}

function TextContent({ displayText }: TextContentProps) {
  return (
    <div className="space-y-3 lg:space-y-4">
      <div className="system-header mb-2 flex items-center gap-3">
        <span>// SYSTEM BOOT v3.0</span>
        <span className="h-px w-16 bg-[#d4af37]/40" />
        <span className="text-[#d4af37]/70">ONLINE</span>
      </div>
      <div className="overflow-hidden">
        <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-wide transform transition-all duration-700 hover:scale-[1.03] cursor-default">
          <span className="lightning-text" data-text="RAKA PRANATA">
            RAKA PRANATA
          </span>
        </h1>
      </div>

      <div className="overflow-hidden">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#ffffea]/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
          <span className="terminal-prompt mr-2">&gt;</span>
          <span className="relative min-w-[180px] sm:min-w-[200px] h-6 sm:h-8 flex items-center justify-center lg:justify-start">
            <span className="bg-linear-to-r from-[#d4af37] to-[#f4d03f] bg-clip-text text-transparent text-lg sm:text-xl lg:text-2xl font-bold terminal-cursor neon-text-gold-sm">
              {displayText}
            </span>
          </span>
        </h2>
      </div>

      <div className="space-y-2 max-w-xl">
        <p className="text-sm sm:text-base lg:text-base leading-relaxed text-[#ffffea]/90 font-light">
          I design like I play games. <br/> 
          I explore, test, respawn & level up.<br/>  
          The boss fight is bad UX and trust me,
        </p>
        <p className="font-bold text-sm sm:text-base lg:text-base text-[#d4af37] neon-flicker tracking-wider">
          I don't lose.
        </p>
      </div>
    </div>
  );
}

export default TextContent;
