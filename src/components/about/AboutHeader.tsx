function AboutHeader() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span className="block bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x">
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