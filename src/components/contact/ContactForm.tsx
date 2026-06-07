import { useState, useRef } from 'react';
import { useContactForm } from '../../hooks/usContactForm';
import MagneticButton from '../ui/MagneticButton';

/* ============================================
   FLOATING PARTICLE ON FOCUS (FIXED: always render)
   ============================================ */
interface FocusParticleProps {
  active: boolean;
}

function FocusParticles({ active }: FocusParticleProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-[#d4af37] transition-all duration-500 ${
            active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{
            left: `${20 + i * 12}%`,
            bottom: '0',
            transitionDelay: `${i * 80}ms`,
            ...(active && {
              animation: 'focus-particle 0.5s ease-out forwards',
              '--angle': `${(i / 6) * Math.PI * 2}rad`,
              '--speed': `${2 + Math.random() * 2}`,
            }),
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ============================================
   TYPING WAVE EQUALIZER (FIXED: always render)
   ============================================ */
function TypingWave({ active }: { active: boolean }) {
  return (
    <div className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-end gap-0.5 h-4 transition-opacity duration-300 ${
      active ? 'opacity-50' : 'opacity-0'
    }`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-0.5 bg-linear-to-t from-[#d4af37] to-[#f4d03f] rounded-full animate-typing-wave"
          style={{
            height: `${30 + Math.random() * 70}%`,
            animationDelay: `${i * 60}ms`,
            animationPlayState: active ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  );
}

/* ============================================
   FLOATING LABEL INPUT (no changes needed)
   ============================================ */
interface FloatingInputProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  activeField: string | null;
  isFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
  autoComplete?: string;
  isTextarea?: boolean;
  delay: number;
  isVisible: boolean;
}

function FloatingInput({
  id, name, type = 'text', value, placeholder, activeField, isFocused,
  onChange, onFocus, onBlur, required, autoComplete, isTextarea, delay, isVisible
}: FloatingInputProps) {
  const isActive = activeField === name || value.length > 0;

  const inputClasses = `w-full px-4 py-3.5 bg-transparent border rounded-xl text-[#ffffea] placeholder-transparent transition-all duration-300 outline-none ${
    isActive 
      ? 'border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
      : 'border-[#d4af37]/20 hover:border-[#d4af37]/40'
  }`;

  return (
    <div 
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Floating label */}
      <label 
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          isActive 
            ? 'top-1 text-[10px] text-[#d4af37] font-semibold tracking-wider' 
            : 'top-1/2 -translate-y-1/2 text-sm text-[#ffffea]/50'
        } ${isTextarea && isActive ? 'top-2' : ''}`}
      >
        {placeholder}
      </label>

      {/* Animated border glow */}
      <div className={`absolute -inset-px rounded-xl bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] opacity-0 blur-sm transition-opacity duration-500 ${isActive ? 'opacity-60 animate-spin-slow' : ''}`} />

      <div className="relative bg-[#0f0f0f]/80 rounded-xl overflow-hidden">
        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`${inputClasses} min-h-40 resize-none pt-6`}
            required={required}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`${inputClasses} pt-5`}
            required={required}
          />
        )}

        {/* Focus particles - always rendered, visibility controlled by CSS */}
        <FocusParticles active={isFocused} />

        {/* Typing wave - always rendered, opacity controlled */}
        <TypingWave active={isFocused && value.length > 0} />

        {/* Bottom line animation */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
}

/* ============================================
   MAGNETIC SUBMIT BUTTON (no changes)
   ============================================ */
interface MagneticSubmitProps {
  isSubmitting: boolean;
  isVisible: boolean;
  progress: number;
}

function MagneticSubmit({ isSubmitting, isVisible, progress }: MagneticSubmitProps) {
  return (
    <div 
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: '600ms' }}
    >
      {/* Progress bar above button */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex-1 h-1 bg-[#ffffea]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] text-[#d4af37]/60 font-mono">{Math.round(progress)}%</span>
      </div>

      <MagneticButton
        variant="primary"
        disabled={isSubmitting}
        isVisible={isVisible}
        delay={600}
        magnetStrength={0.2}
        particleCount={8}
        ripple={true}
        showEq={false}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            🚀 Send Message ✨
          </>
        )}
      </MagneticButton>
    </div>
  );
}

/* ============================================
   SUCCESS CONFETTI (always rendered, visibility via state? but it's conditional render.
   For confetti, it's okay because it appears after submission, not during load.
   But to be safe, we could keep it as is - it only appears after user action.
   ============================================ */
function SuccessConfetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10%',
            backgroundColor: ['#d4af37', '#f4d03f', '#ffffea', '#ffd700'][i % 4],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================
   MAIN CONTACT FORM
   ============================================ */
interface ContactFormProps {
  isVisible: boolean;
}

function ContactForm({ isVisible }: ContactFormProps) {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    activeField,
    setActiveField,
    handleInputChange,
    handleSubmit
  } = useContactForm();

  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate form progress
  const fields = ['name', 'email', 'subject', 'message'];
  const filledFields = fields.filter(f => formData[f as keyof typeof formData].length > 0).length;
  const progress = (filledFields / fields.length) * 100;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col h-full transition-all duration-1000 delay-200 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight({ x: 50, y: 50 });
      }}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-8 bg-[#d4af37]/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* Spotlight */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none overflow-hidden"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.08), transparent 40%)`,
        }}
      />

      {/* Success Message */}
      {isSubmitted && (
        <div className="relative mb-6">
          <SuccessConfetti />
          <div className="bg-linear-to-r from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 bg-linear-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-green-400 text-lg">Message Sent!</div>
                <p className="text-green-300/70 text-sm">I'll get back to you within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <div className="relative bg-[#1a1a1a]/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-[#d4af37]/15 overflow-hidden transition-all duration-700 hover:border-[#d4af37]/30 hover:shadow-2xl hover:shadow-[#d4af37]/10">
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 group flex flex-col relative z-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FloatingInput
              id="contact-name"
              name="name"
              value={formData.name}
              placeholder="Your Name"
              activeField={activeField}
              isFocused={activeField === 'name'}
              onChange={handleInputChange}
              onFocus={() => setActiveField('name')}
              onBlur={() => setActiveField(null)}
              required
              autoComplete="name"
              delay={0}
              isVisible={isVisible}
            />
            <FloatingInput
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Email Address"
              activeField={activeField}
              isFocused={activeField === 'email'}
              onChange={handleInputChange}
              onFocus={() => setActiveField('email')}
              onBlur={() => setActiveField(null)}
              required
              autoComplete="email"
              delay={100}
              isVisible={isVisible}
            />
          </div>

          <FloatingInput
            id="contact-subject"
            name="subject"
            value={formData.subject}
            placeholder="Subject"
            activeField={activeField}
            isFocused={activeField === 'subject'}
            onChange={handleInputChange}
            onFocus={() => setActiveField('subject')}
            onBlur={() => setActiveField(null)}
            required
            autoComplete="off"
            delay={200}
            isVisible={isVisible}
          />

          <FloatingInput
            id="contact-message"
            name="message"
            value={formData.message}
            placeholder="Your Message"
            activeField={activeField}
            isFocused={activeField === 'message'}
            onChange={handleInputChange}
            onFocus={() => setActiveField('message')}
            onBlur={() => setActiveField(null)}
            required
            autoComplete="off"
            isTextarea
            delay={300}
            isVisible={isVisible}
          />

          <MagneticSubmit 
            isSubmitting={isSubmitting} 
            isVisible={isVisible} 
            progress={progress} 
          />
        </form>
      </div>
    </div>
  );
}

export default ContactForm;