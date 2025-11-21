import { useRef } from 'react';
import { useContactForm } from '../../hooks/usContactForm';

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

  return (
    <div className={`flex flex-col h-full transition-all duration-1000 delay-200 transform ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
    }`}>
      
      {/* Success Message */}
      {isSubmitted && (
        <div className="bg-linear-to-r from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm animate-pulse mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">✓</span>
            </div>
            <div>
              <div className="font-bold text-green-400 text-lg">Message Sent!</div>
              <p className="text-green-300/70">I'll get back to you within 24 hours</p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <div className="bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#d4af37]/20 flex flex-col">
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-12 group flex flex-col"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-[#ffffea] font-medium text-sm">Your Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 bg-[#1a1a1a]/30 border rounded-xl text-[#ffffea] placeholder-[#ffffea]/50 transition-all duration-300 ${
                    activeField === 'name' 
                      ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' 
                      : 'border-[#d4af37]/30 hover:border-[#d4af37]/50'
                  }`}
                  placeholder="John Doe"
                  required
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300 ${
                  activeField === 'name' ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[#ffffea] font-medium text-sm">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  className={`w-full px-4 py-3 bg-[#1a1a1a]/30 border rounded-xl text-[#ffffea] placeholder-[#ffffea]/50 transition-all duration-300 ${
                    activeField === 'email' 
                      ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' 
                      : 'border-[#d4af37]/30 hover:border-[#d4af37]/50'
                  }`}
                  placeholder="john@example.com"
                  required
                />
                <div className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300 ${
                  activeField === 'email' ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label className="text-[#ffffea] font-medium text-sm">Subject</label>
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                onFocus={() => setActiveField('subject')}
                onBlur={() => setActiveField(null)}
                className={`w-full px-4 py-3 bg-[#1a1a1a]/30 border rounded-xl text-[#ffffea] placeholder-[#ffffea]/50 transition-all duration-300 ${
                  activeField === 'subject' 
                    ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' 
                    : 'border-[#d4af37]/30 hover:border-[#d4af37]/50'
                }`}
                placeholder="Project Collaboration"
                required
              />
              <div className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300 ${
                activeField === 'subject' ? 'w-full' : 'w-0'
              }`} />
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2 flex-1 flex flex-col">
            <label className="text-[#ffffea] font-medium text-sm">Your Message</label>
            <div className="relative flex-1">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
                className={`w-full h-full min-h-[150px] px-4 py-3 bg-[#1a1a1a]/30 border rounded-xl text-[#ffffea] placeholder-[#ffffea]/50 resize-none transition-all duration-300 ${
                  activeField === 'message' 
                    ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20' 
                    : 'border-[#d4af37]/30 hover:border-[#d4af37]/50'
                }`}
                placeholder="Tell me about your project, and how we can work together to create something extraordinary."
                required
              />
              <div className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300 ${
                activeField === 'message' ? 'w-full' : 'w-0'
              }`} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full px-8 py-4 bg-linear-to-r from-[#d4af37] to-[#f4d03f] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 text-[#1a1a1a] font-bold text-lg tracking-wide flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Send Message
                  <span>✨</span>
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

