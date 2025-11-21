interface ContactHeaderProps {
  isVisible: boolean;
}

function ContactHeader({ isVisible }: ContactHeaderProps) {
  return (
    <div className={`text-center mb-16 transition-all duration-1000 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span className="block bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x">
          Let's Work Together
        </span>
      </h2>
      <p className="text-xl text-[#ffffea]/70 max-w-2xl mx-auto leading-relaxed">
        Ready to bring your ideas to life? Let's create something amazing together. 
        I'm just a message away from turning your vision into reality.
      </p>
    </div>
  );
}

export default ContactHeader;