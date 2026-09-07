function AboutHeader() {
  return (
    <div className="text-center mb-16">
      <div className="terminal-section-label mb-2">[01] // SPEC SHEET</div>
      <div className="data-flow w-full max-w-48 mx-auto h-px mb-4" />
      <div className="cyber-line w-24 mx-auto mb-6" />
      <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-wide transform transition-all duration-700 hover:scale-[1.03] cursor-default mb-6">
        <span className="lightning-text" data-text="About Me">
          About Me
        </span>
      </h2>
      <p className="text-xl text-[#ffffea]/70 max-w-2xl mx-auto">
        Frontend Developer by day, Musician & Polyglot by passion
      </p>
    </div>
  );
}

export default AboutHeader;