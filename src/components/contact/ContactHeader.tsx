interface ContactHeaderProps {
  isVisible: boolean;
}

function ContactHeader({ isVisible }: ContactHeaderProps) {
  return (
    <div className={`text-center mb-16 transition-all duration-1000 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="terminal-section-label mb-2">[04] // INITIATE ORDER</div>
      <div className="data-flow w-full max-w-48 mx-auto h-px mb-4" />
      <div className="cyber-line w-24 mx-auto mb-6" />
      <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-wide transform transition-all duration-700 hover:scale-[1.03] cursor-default mb-6">
        <span className="lightning-text" data-text="Let's Work Together">
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