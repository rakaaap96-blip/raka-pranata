import { useState, useRef, useEffect, useCallback } from 'react';
import { FaTimes, FaPaperPlane, FaUser, FaBrain, FaLightbulb } from 'react-icons/fa';
import { BsStars, BsLightning } from 'react-icons/bs';
import { RiAiGenerate2 } from 'react-icons/ri';

// API Configuration - you can replace this with your actual Hugging Face token
const HF_API_TOKEN = ''; // Replace with your actual token

// Comprehensive knowledge base with enhanced data structure
const KNOWLEDGE_BASE = {
  personal: {
    name: "Raka Pranata",
    title: "Creative Developer",
    tagline: "Bridging Design & Development",
    location: "Indonesia",
    status: "Open to Opportunities"
  },
  skills: {
    design: {
      tools: ['Adobe Illustrator', 'CorelDRAW', 'Photoshop', 'Figma', 'Affinity Designer'],
      experience: '4+ years',
      specialties: ['Logo Design', 'Brand Identity', 'Vector Illustration', 'Print Media', 'UI/UX Design'],
      projects: ['Brand Identity Systems', 'Marketing Materials', 'Digital Illustrations', 'UI Kits'],
      achievements: ['100+ Design Projects', 'Brand System Development', 'Print & Digital Media']
    },
    frontend: {
      technologies: ['React', 'TypeScript', 'JavaScript', 'TailwindCSS', 'Next.js', 'Vite'],
      experience: '1+ year',
      specialties: ['Responsive Design', 'Modern UI', 'Performance Optimization', 'Clean Code'],
      projects: ['Portfolio Websites', 'E-commerce UIs', 'Web Applications', 'Component Libraries'],
      achievements: ['Modern Stack Proficiency', 'UI Component Development', 'Cross-browser Compatibility']
    },
    softSkills: ['Creative Problem Solving', 'Attention to Detail', 'Adaptive Learning', 'Collaborative Mindset', 'Project Management']
  },
  projects: {
    featured: [
      {
        name: 'Creative Portfolio Platform',
        description: 'Modern portfolio with AI integration and responsive design',
        tech: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
        design: ['Custom Illustrations', 'Brand System', 'UI/UX Design'],
        role: 'Full-stack Design & Development',
        impact: 'Enhanced user engagement by 40%'
      },
      {
        name: 'E-commerce UI System',
        description: 'Complete shopping experience with modern design patterns',
        tech: ['Next.js', 'TypeScript', 'Stripe Integration'],
        design: ['UI/UX Design', 'Icon System', 'Design System'],
        role: 'UI Developer & Designer',
        impact: 'Improved conversion rate by 25%'
      },
      {
        name: 'Brand Identity Suite',
        description: 'Comprehensive branding for tech startup',
        tech: ['Adobe Illustrator', 'Photoshop', 'Figma'],
        design: ['Logo Design', 'Brand Guidelines', 'Marketing Materials'],
        role: 'Lead Designer',
        impact: 'Established strong brand presence'
      }
    ]
  },
  personality: {
    traits: ['Enthusiastic', 'Professional', 'Helpful', 'Creative', 'Technical', 'Innovative'],
    communication: ['Clear', 'Concise', 'Engaging', 'Informative', 'Encouraging']
  },
  learning: {
    current: ['Advanced React Patterns', 'Three.js', 'Node.js'],
    interests: ['AI Integration', 'Web3 Technologies', 'Motion Design', 'AR/VR Experiences']
  }
};

// Advanced AI Response Engine with Memory and Context
class AdvancedAIEngine {
  private conversationContext: any[] = [];
  private userInterests: Set<string> = new Set();
  private conversationHistory: string[] = [];

  analyzeUserIntent(message: string): { 
    intent: string; 
    confidence: number; 
    entities: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
  } {
    const lowerMsg = message.toLowerCase().trim();
    const entities: string[] = [];
    let intent = 'general';
    let confidence = 0.7;
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';

    // Sentiment analysis
    const positiveWords = ['amazing', 'great', 'awesome', 'impressive', 'good', 'excellent', 'love', 'like'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'poor'];
    
    if (positiveWords.some(word => lowerMsg.includes(word))) sentiment = 'positive';
    if (negativeWords.some(word => lowerMsg.includes(word))) sentiment = 'negative';

    // Enhanced entity extraction
    KNOWLEDGE_BASE.skills.design.tools.forEach(tool => {
      if (lowerMsg.includes(tool.toLowerCase())) {
        entities.push(`design_tool:${tool}`);
        this.userInterests.add('design_tools');
      }
    });

    KNOWLEDGE_BASE.skills.frontend.technologies.forEach(tech => {
      if (lowerMsg.includes(tech.toLowerCase())) {
        entities.push(`frontend_tech:${tech}`);
        this.userInterests.add('frontend_tech');
      }
    });

    // Advanced intent classification with weighted scoring
    const intents = {
      skill: { keywords: ['skill', 'tech', 'stack', 'technology', 'tool', 'proficient'], weight: 0.9 },
      experience: { keywords: ['experience', 'year', 'work', 'background', 'career'], weight: 0.9 },
      design: { keywords: ['design', 'illustrator', 'corel', 'photoshop', 'graphic', 'ui/ux'], weight: 0.85 },
      frontend: { keywords: ['frontend', 'react', 'typescript', 'developer', 'code', 'programming'], weight: 0.85 },
      project: { keywords: ['project', 'portfolio', 'work example', 'case study', 'showcase'], weight: 0.8 },
      contact: { keywords: ['contact', 'hire', 'email', 'linkedin', 'connect', 'available'], weight: 0.95 },
      greeting: { keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'], weight: 1.0 },
      learning: { keywords: ['learn', 'study', 'improving', 'growing', 'development plan'], weight: 0.7 }
    };

    let maxScore = 0;
    Object.entries(intents).forEach(([intentKey, { keywords, weight }]) => {
      const score = keywords.filter(keyword => lowerMsg.includes(keyword)).length * weight;
      if (score > maxScore) {
        maxScore = score;
        intent = intentKey;
        confidence = Math.min(0.95, score);
      }
    });

    return { intent, confidence, entities, sentiment };
  }

  generateIntelligentResponse(userMessage: string, messageHistory: any[]): string {
    const analysis = this.analyzeUserIntent(userMessage);
    this.conversationContext = messageHistory;
    this.conversationHistory.push(userMessage);
    
    // Update user interests based on analysis
    analysis.entities.forEach(entity => this.userInterests.add(entity));

    // Generate context-aware response
    const responseMethod = this.getResponseMethod(analysis.intent);
    return responseMethod.bind(this)(analysis);
  }

  private getResponseMethod(intent: string): Function {
    const responseMap: { [key: string]: Function } = {
      greeting: this.generateGreetingResponse,
      skill: this.generateSkillsResponse,
      experience: this.generateExperienceResponse,
      design: this.generateDesignResponse,
      frontend: this.generateFrontendResponse,
      project: this.generateProjectsResponse,
      contact: this.generateContactResponse,
      learning: this.generateLearningResponse,
      general: this.generateContextualResponse
    };

    return responseMap[intent] || this.generateContextualResponse;
  }

  private generateGreetingResponse(): string {
    const timeBasedGreetings = [
      "Hello! I'm Raka's advanced AI assistant! 🧠 Ready to explore his unique blend of design mastery and development expertise?",
      "Hi there! I'm equipped with deep insights about Raka's journey from design to development. What would you like to discover?",
      "Welcome! I'm here to showcase Raka's creative technical capabilities. His combination of 4+ years design and 1+ year development experience is quite special! 🚀"
    ];

    const personalizedGreetings = [
      `Nice to meet you! I notice you're interested in ${Array.from(this.userInterests).slice(0, 2).join(' and ')}. Let me tell you how Raka excels in these areas!`,
      `Greetings! Based on our conversation, I can provide detailed insights about ${this.getInterestTopics()}.`
    ];

    const greetings = this.userInterests.size > 0 ? personalizedGreetings : timeBasedGreetings;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  private generateSkillsResponse(analysis: any): string {
    const hasDesignFocus = analysis.entities.some((e: string) => e.startsWith('design_tool'));
    const hasTechFocus = analysis.entities.some((e: string) => e.startsWith('frontend_tech'));

    if (hasDesignFocus && hasTechFocus) {
      return `Excellent! Raka's dual expertise is his superpower: 🦸

🎨 **Design Mastery (${KNOWLEDGE_BASE.skills.design.experience})**:
• Professional Tools: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}
• Specializations: ${KNOWLEDGE_BASE.skills.design.specialties.join(', ')}
• Key Achievements: ${KNOWLEDGE_BASE.skills.design.achievements.join(', ')}

💻 **Frontend Excellence (${KNOWLEDGE_BASE.skills.frontend.experience})**:
• Modern Stack: ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}
• Development Focus: ${KNOWLEDGE_BASE.skills.frontend.specialties.join(', ')}
• Project Success: ${KNOWLEDGE_BASE.skills.frontend.achievements.join(', ')}

🚀 **Combined Impact**: This unique combination allows him to own projects from concept to deployment with both creative vision and technical precision!`;
    }

    if (hasDesignFocus) {
      return `Raka's design capabilities are comprehensive and professional! 🎨

**${KNOWLEDGE_BASE.skills.design.experience} of Design Excellence**:
🛠️ **Tool Mastery**: Expert in ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}
🎯 **Specialized Skills**: ${KNOWLEDGE_BASE.skills.design.specialties.join(', ')}
📊 **Project Portfolio**: ${KNOWLEDGE_BASE.skills.design.projects.join(', ')}
🏆 **Key Achievements**: ${KNOWLEDGE_BASE.skills.design.achievements.join(', ')}

**Design Philosophy**: 
• User-centered approach with strong visual storytelling
• Balance between aesthetic appeal and functional design
• Scalable systems thinking for brand consistency

His design background gives him a unique edge in creating developer-friendly, visually stunning interfaces!`;
    }

    if (hasTechFocus) {
      return `Raka's frontend development skills are cutting-edge and production-ready! 💻

**${KNOWLEDGE_BASE.skills.frontend.experience} of Modern Development**:
⚡ **Technology Stack**: ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}
🎯 **Development Specialties**: ${KNOWLEDGE_BASE.skills.frontend.specialties.join(', ')}
📁 **Project Experience**: ${KNOWLEDGE_BASE.skills.frontend.projects.join(', ')}
🚀 **Technical Achievements**: ${KNOWLEDGE_BASE.skills.frontend.achievements.join(', ')}

**Development Approach**:
• Component-driven architecture with TypeScript
• Performance-first mindset with optimized bundles
• Responsive and accessible design principles
• Clean, maintainable, and scalable code

**Unique Advantage**: His design background ensures he builds interfaces that are not just functional, but truly exceptional in user experience!`;
    }

    return `Raka brings a powerful combination of creative and technical skills: 🌟

🎨 **Design Foundation**: ${KNOWLEDGE_BASE.skills.design.experience} with comprehensive design expertise
💻 **Technical Execution**: ${KNOWLEDGE_BASE.skills.frontend.experience} building modern web applications
🚀 **Integrated Value**: Ability to seamlessly bridge design and development workflows

This dual expertise means he can:
• Understand and implement complex design systems
• Communicate effectively with both designers and developers
• Create cohesive digital products from concept to launch
• Ensure technical feasibility while maintaining design integrity

Which specific area would you like to explore deeper?`;
  }

  private generateExperienceResponse(): string {
    return `Raka's professional journey showcases remarkable growth and versatility: 📈

📊 **Career Timeline**:
• Graphic Design: ${KNOWLEDGE_BASE.skills.design.experience} of professional design experience
• Frontend Development: ${KNOWLEDGE_BASE.skills.frontend.experience} of modern web development
• Combined Expertise: Creating digital products with both visual excellence and technical robustness

💡 **Strategic Advantage**:
His transition from design to development wasn't just a career change - it was a strategic expansion. This journey gives him:

• **Design Thinking**: Deep understanding of UI/UX principles and user psychology
• **Technical Depth**: Ability to implement complex features with clean code
• **Communication Bridge**: Can translate between design vision and technical requirements
• **Full-Product Perspective**: Understands the entire digital product lifecycle

🎯 **Current Focus**: Continuously evolving by learning ${KNOWLEDGE_BASE.learning.current.join(', ')} while exploring ${KNOWLEDGE_BASE.learning.interests.join(', ')}`;
  }

  private generateDesignResponse(): string {
    return `Raka's design expertise is both deep and versatile! 🎨

**${KNOWLEDGE_BASE.skills.design.experience} of Design Mastery**:
🛠️ **Professional Toolset**: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}
🎯 **Specialized Domains**: ${KNOWLEDGE_BASE.skills.design.specialties.join(', ')}
📁 **Project Portfolio**: ${KNOWLEDGE_BASE.skills.design.projects.join(', ')}
🏆 **Notable Achievements**: ${KNOWLEDGE_BASE.skills.design.achievements.join(', ')}

**Design Methodology**:
• **Research-Driven**: Understands user needs and business objectives
• **System-Oriented**: Creates scalable design systems and brand guidelines
• **Detail-Focused**: Pixel-perfect execution with attention to typography, color, and spacing
• **Collaborative**: Works effectively with stakeholders and development teams

**Impact on Development**:
His design background directly enhances his frontend work through:
• Intuitive component API design
• Developer-friendly design systems
• Efficient designer-developer handoff
• Consistent visual language implementation`;
  }

  private generateFrontendResponse(): string {
    return `Raka's frontend development capabilities are modern, robust, and user-focused! 💻

**${KNOWLEDGE_BASE.skills.frontend.experience} of Development Excellence**:
⚡ **Technology Expertise**: ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}
🎯 **Development Specializations**: ${KNOWLEDGE_BASE.skills.frontend.specialties.join(', ')}
📁 **Project Experience**: ${KNOWLEDGE_BASE.skills.frontend.projects.join(', ')}
🚀 **Technical Achievements**: ${KNOWLEDGE_BASE.skills.frontend.achievements.join(', ')}

**Technical Philosophy**:
• **Component-Driven**: Builds reusable, maintainable component libraries
• **Performance-First**: Optimizes for core web vitals and user experience
• **Type-Safe**: Leverages TypeScript for better developer experience and fewer runtime errors
• **Accessible**: Implements WCAG guidelines for inclusive design
• **Responsive**: Creates seamless experiences across all device sizes

**Unique Development Edge**:
His design background brings exceptional advantages:
• Intuitive understanding of design systems and UI patterns
• Ability to implement complex animations and interactions
• Strong collaboration with design teams
• Focus on both visual polish and technical excellence`;
  }

  private generateProjectsResponse(): string {
    const projects = KNOWLEDGE_BASE.projects.featured;
    return `Raka has delivered impressive projects that demonstrate his dual expertise: 🚀

${projects.map(project => 
`**${project.name}**
• *Description*: ${project.description}
• *Technologies*: ${project.tech.join(', ')}
• *Design Elements*: ${project.design.join(', ')}
• *Role*: ${project.role}
• *Impact*: ${project.impact}`
).join('\n\n')}

💡 **Project Philosophy**: Each project represents Raka's commitment to merging beautiful design with solid technical execution. He particularly enjoys challenges that require both creative problem-solving and technical innovation!`;
  }

  private generateContactResponse(): string {
    return `Excellent! Raka is actively seeking opportunities that leverage his unique skill set: 💼

🎯 **Ideal Opportunities**:
• Frontend Developer Roles with design collaboration
• UI/UX Engineer positions
• Creative Technologist roles
• Design System development
• Product-focused development teams

🛠️ **What He Brings**:
• ${KNOWLEDGE_BASE.skills.design.experience} of design expertise
• ${KNOWLEDGE_BASE.skills.frontend.experience} of modern development
• Unique bridge between design and engineering teams
• Full-product perspective from concept to deployment

📞 **Next Steps**:
• Use the contact form on this website for detailed discussions
• Connect on LinkedIn for professional networking
• Schedule a conversation about potential collaborations

Raka is particularly excited about roles that value the combination of creative vision and technical execution! 🚀`;
  }

  private generateLearningResponse(): string {
    return `Raka is committed to continuous growth and learning: 📚

🎯 **Currently Mastering**:
${KNOWLEDGE_BASE.learning.current.map(item => `• ${item}`).join('\n')}

🚀 **Future Interests**:
${KNOWLEDGE_BASE.learning.interests.map(item => `• ${item}`).join('\n')}

💡 **Learning Philosophy**:
• Stay current with evolving web technologies
• Explore emerging design trends and tools
• Balance depth of expertise with breadth of knowledge
• Apply learning immediately to real-world projects

His learning journey reflects his commitment to staying at the forefront of both design and development!`;
  }

  private generateContextualResponse(): string {
    const lastMessages = this.conversationContext.slice(-3);
    const hasDesignContext = lastMessages.some(msg => 
      msg.content && typeof msg.content === 'string' && 
      msg.content.toLowerCase().includes('design')
    );
    const hasDevContext = lastMessages.some(msg => 
      msg.content && typeof msg.content === 'string' && 
      msg.content.toLowerCase().includes('develop')
    );

    const contextualResponses = [
      `Interesting perspective! ${hasDesignContext ? 'Given our design discussion' : hasDevContext ? 'Building on our tech conversation' : 'Based on Raka\'s background'}, I can share how his unique combination of skills creates exceptional value in this context.`,

      `Great question! Raka's journey through ${KNOWLEDGE_BASE.skills.design.experience} of design and ${KNOWLEDGE_BASE.skills.frontend.experience} of development gives him a distinctive approach to such challenges.`,

      `That's a thoughtful inquiry! Raka's strength lies in his ability to bridge ${hasDesignContext ? 'technical implementation' : 'creative vision'} with ${hasDesignContext ? 'design principles' : 'development best practices'}.`,

      `Fascinating topic! This aligns perfectly with Raka's expertise in both creative and technical domains. His approach would combine ${hasDesignContext ? 'user-centered design thinking' : 'robust technical architecture'} with ${hasDesignContext ? 'scalable implementation' : 'engaging user experiences'}.`
    ];

    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  }

  private getInterestTopics(): string {
    const interests = Array.from(this.userInterests);
    if (interests.length === 0) return "Raka's skills and experience";
    
    const topics = interests.slice(0, 2).map(interest => {
      if (interest.startsWith('design_tool:')) return 'design tools';
      if (interest.startsWith('frontend_tech:')) return 'frontend technologies';
      return interest;
    });
    
    return topics.join(' and ');
  }
}

// Main Component
function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: "Hello! I'm Raka's advanced AI assistant! 🧠 Ready to explore his unique blend of 4+ years design mastery and 1+ year modern frontend development? What would you like to know? 🚀",
      timestamp: new Date(),
      type: 'greeting'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const aiEngine = useRef(new AdvancedAIEngine());

  // Enhanced auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, [messages, isTyping]);

  // Focus management
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  }, [isOpen]);

  // Enhanced smooth typing effect
  const simulateTyping = useCallback((message: string, onComplete: (fullMessage: string) => void) => {
    setIsTyping(true);
    setTypingProgress(0);
    
    const characters = message.split('');
    let currentText = '';
    let index = 0;

    const typeCharacter = () => {
      if (index < characters.length) {
        // Add character with smooth progression
        currentText += characters[index];
        setTypingProgress(Math.min(100, ((index + 1) / characters.length) * 100));
        
        // Update message with smooth cursor
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: currentText + (index < characters.length - 1 ? '▊' : '')
          };
          return newMessages;
        });

        index++;
        
        // Ultra-smooth typing speed with variable timing for natural feel
        const baseSpeed = 20; // Faster base speed
        const randomVariation = Math.random() * 15; // Small random variation
        const punctuationDelay = ['.', '!', '?', '\n'].includes(characters[index - 1]) ? 150 : 0;
        const speed = baseSpeed + randomVariation + punctuationDelay;
        
        setTimeout(typeCharacter, speed);
      } else {
        // Final completion
        setIsTyping(false);
        setTypingProgress(100);
        onComplete(message);
      }
    };

    typeCharacter();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isTyping) return;

    const userMessage = { 
      role: 'user', 
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Try to use Hugging Face API first
      if (HF_API_TOKEN && HF_API_TOKEN !== '') {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${HF_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: `You are Raka Pranata's AI portfolio assistant. Be professional and helpful. About Raka: 4+ years graphic design, 1+ year frontend development with React/TypeScript. Skills: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}, ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}. Question: ${inputMessage}`,
              parameters: {
                max_new_tokens: 200,
                temperature: 0.7,
                do_sample: true,
                repetition_penalty: 1.1
              }
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          let aiReply = data[0]?.generated_text || '';
          
          // Clean up the response
          aiReply = aiReply.split('Assistant:').pop()?.trim() || aiReply;
          
          if (aiReply) {
            const aiMessage = { 
              role: 'assistant', 
              content: aiReply,
              timestamp: new Date(),
              type: 'text'
            };
            
            setMessages(prev => [...prev, aiMessage]);
            simulateTyping(aiReply, (finalMessage) => {
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  ...newMessages[newMessages.length - 1],
                  content: finalMessage
                };
                return newMessages;
              });
            });
            return;
          }
        }
      }

      // Fallback to our intelligent engine
      const smartResponse = aiEngine.current.generateIntelligentResponse(inputMessage, messages);
      
      // Add AI message for typing effect
      const aiMessage = { 
        role: 'assistant', 
        content: smartResponse,
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      simulateTyping(smartResponse, (finalMessage) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: finalMessage
          };
          return newMessages;
        });
      });

    } catch (error) {
      console.error('Error:', error);
      // Final fallback to our engine
      const fallbackResponse = aiEngine.current.generateIntelligentResponse(inputMessage, messages);
      const aiMessage = { 
        role: 'assistant', 
        content: fallbackResponse,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Contextual smart suggestions
  const getContextualSuggestions = () => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) return defaultSuggestions;

    const analysis = aiEngine.current.analyzeUserIntent(lastUserMessage.content);
    
    switch (analysis.intent) {
      case 'design':
        return [
          "What design process do you follow?",
          "Show me your design portfolio",
          "How do you handle client feedback?",
          "What's your favorite design project?"
        ];
      case 'frontend':
        return [
          "What React best practices do you follow?",
          "How do you optimize performance?",
          "Tell me about your TypeScript experience",
          "What testing strategies do you use?"
        ];
      case 'skill':
        return [
          "What's your strongest technical skill?",
          "How do you stay updated with tech?",
          "What soft skills do you emphasize?",
          "How do you approach learning?"
        ];
      case 'project':
        return [
          "What was your most challenging project?",
          "How do you manage project timelines?",
          "What project are you most proud of?",
          "How do you handle scope changes?"
        ];
      default:
        return defaultSuggestions;
    }
  };

  const defaultSuggestions = [
    "Tell me about your design journey",
    "What React projects have you built?",
    "How do you combine design and development?",
    "What's your experience with TypeScript?",
    "What design tools are you expert in?",
    "What makes your approach unique?"
  ];

  const contextualSuggestions = getContextualSuggestions();

  return (
    <>
      {/* Enhanced Floating Button with Gold Primary Color */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bg-linear-to-br from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] shadow-2xl hover:scale-110 transition-all duration-300 group animate-float"
        style={{
          bottom: 'clamp(1rem, 3vw, 2rem)',
          right: 'clamp(1rem, 3vw, 2rem)',
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          borderRadius: '50%',
          boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)'
        }}
        aria-label="Open AI Chat Assistant"
        aria-expanded={isOpen}
        aria-controls="ai-chat-modal"
      >
        <div className="relative">
          <RiAiGenerate2 className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" aria-hidden="true" />
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-40 animate-ping" style={{ animationDuration: '2s' }} aria-hidden="true" />
        
        {/* Tech Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-[#1a1a1a] text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[#d4af37]/30">
          <div className="flex items-center gap-2">
            <BsStars className="text-[#d4af37]" aria-hidden="true" />
            <span>AI Assistant v3.0</span>
          </div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-[#1a1a1a]" aria-hidden="true"></div>
        </div>
      </button>

      {/* Enhanced Chat Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-end p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-heading"
          aria-describedby="ai-chat-description"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-linear-to-br from-black/80 via-[#d4af37]/10 to-black/80 backdrop-blur-lg"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Chat Container */}
          <div 
            id="ai-chat-modal"
            className="relative w-full max-w-full sm:max-w-md lg:max-w-lg h-[90vh] sm:h-[600px] bg-[#0a0a0a] border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#d4af37]/10 via-[#f4d03f]/10 to-[#d4af37]/10 animate-gradient-x" aria-hidden="true" />
            
            {/* Header */}
            <div className="relative bg-linear-to-r from-[#d4af37] to-[#f4d03f] p-4 sm:p-5 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0a0a0a] p-2 rounded-full border border-[#d4af37]/30">
                    <RiAiGenerate2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37] animate-pulse" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 id="ai-chat-heading" className="font-bold text-[#0a0a0a] text-sm sm:text-base flex items-center gap-2">
                      Raka's AI Assistant
                    </h3>
                    <p id="ai-chat-description" className="text-[#0a0a0a]/80 text-xs sm:text-sm flex items-center gap-1">
                      <BsStars className="w-3 h-3" aria-hidden="true" />
                      Advanced Intelligence v3.0
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Connection Status */}
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#0a0a0a]/20 rounded-full" aria-label="AI Assistant Status: Online">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></div>
                    <span className="text-[#0a0a0a] text-xs">Online</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-[#0a0a0a] hover:scale-110 transition-transform p-1 hover:bg-[#0a0a0a]/20 rounded-full"
                    aria-label="Close chat"
                  >
                    <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 relative"
              role="log"
              aria-live="polite"
              aria-atomic="false"
              aria-label="Chat conversation"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZDRhZjM3IiBmaWxsLW9wYWNpdHk9IjAuNCIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMyIvPjxjaXJjbGUgY3g9IjEzIiBjeT0iMTMiIHI9IjMiLz48L2c+PC9zdmc+')]" 
                aria-hidden="true" 
              />
              
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div 
                    className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-2xl backdrop-blur-sm ${
                      msg.role === 'user' 
                        ? 'bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#0a0a0a] rounded-br-none border border-[#d4af37]/30' 
                        : 'bg-[#1a1a1a]/80 border border-[#d4af37]/20 text-white rounded-bl-none'
                    }`}
                    role={msg.role === 'user' ? 'status' : 'article'}
                    aria-label={`${msg.role === 'user' ? 'You said' : 'AI Assistant said'}: ${msg.content}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.role === 'user' ? (
                        <FaUser className="w-3 h-3 opacity-70" aria-hidden="true" />
                      ) : (
                        <RiAiGenerate2 className="w-3 h-3 text-[#d4af37]" aria-hidden="true" />
                      )}
                      <span className="text-xs opacity-70 font-medium">
                        {msg.role === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs opacity-60 mt-2 text-right">
                      {msg.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Loading Animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div 
                    className="bg-[#1a1a1a]/80 border border-[#d4af37]/20 p-4 rounded-2xl rounded-bl-none backdrop-blur-sm"
                    role="status"
                    aria-label="AI is processing your message"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1" aria-hidden="true">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#f4d03f] rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce delay-200"></div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-300">Processing with AI...</span>
                        <div 
                          className="w-32 h-1 bg-[#1a1a1a] rounded-full overflow-hidden mt-1"
                          role="progressbar"
                          aria-valuenow={typingProgress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div 
                            className="h-full bg-linear-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300"
                            style={{ width: `${typingProgress}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Smart Suggestions */}
              {messages.length > 0 && !isLoading && (
                <div className="space-y-3 mt-4">
                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                    <FaLightbulb className="text-[#d4af37]" aria-hidden="true" />
                    Smart suggestions based on our conversation
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="menu" aria-label="Quick question suggestions">
                    {contextualSuggestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(sendMessage, 100);
                        }}
                        className="bg-[#1a1a1a]/80 border border-[#d4af37]/20 text-xs text-white p-3 rounded-xl hover:bg-linear-to-r hover:from-[#d4af37]/20 hover:to-[#f4d03f]/20 hover:border-[#d4af37]/40 transition-all text-center backdrop-blur-sm group"
                        role="menuitem"
                        aria-label={`Ask: ${question}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <BsLightning className="text-[#d4af37] group-hover:scale-110 transition-transform" aria-hidden="true" />
                          {question}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>

            {/* Input Area */}
            <div className="relative p-3 sm:p-4 border-t border-[#d4af37]/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
              <div className="absolute inset-0 border-t border-[#d4af37]/10" aria-hidden="true" />
              
              <div className="flex gap-2 sm:gap-3 items-end relative z-10">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about design experience, frontend skills, projects..."
                  className="flex-1 bg-[#1a1a1a]/80 border border-[#d4af37]/20 rounded-2xl px-4 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] focus:bg-[#1a1a1a] transition-all duration-300 text-sm sm:text-base resize-none backdrop-blur-sm"
                  disabled={isLoading || isTyping}
                  style={{ minHeight: '3rem' }}
                  aria-label="Type your message"
                  aria-describedby="input-instructions"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim() || isTyping}
                  className="bg-linear-to-r from-[#d4af37] to-[#f4d03f] text-[#0a0a0a] p-3 sm:p-4 rounded-2xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center min-w-12 sm:min-w-14 font-semibold disabled:cursor-not-allowed group"
                  aria-label="Send message"
                >
                  {isLoading || isTyping ? (
                    <div className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  ) : (
                    <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  )}
                </button>
              </div>
              
              {/* Status Bar */}
              <div className="flex justify-between items-center mt-2 sm:mt-3 px-2">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span>AI Neural Network • v3.0</span>
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <FaBrain className="text-[#d4af37]" aria-hidden="true" />
                  <span>Context-Aware • Secure</span>
                </p>
              </div>
              
              {/* Hidden instructions for screen readers */}
              <div id="input-instructions" className="sr-only">
                Press Enter to send your message. Use the quick suggestion buttons for common questions.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}

export default AIChatBot;