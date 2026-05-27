import { useState, useRef, useEffect, useCallback } from 'react';
import { FaTimes, FaPaperPlane, FaUser, FaBrain, FaLightbulb } from 'react-icons/fa';
import { BsStars, BsLightning, BsChatDotsFill } from 'react-icons/bs';

const HF_API_TOKEN = '';

const KNOWLEDGE_BASE = {
  personal: {
    name: "Raka Pranata",
    title: "Creative Developer",
    location: "Indonesia",
    status: "Open to Opportunities",
    hobbies: ["Photography", "Gaming", "Tech Exploration", "Music Production", "Reading Tech Blogs"],
    personality: ["Analytical", "Creative", "Problem-solver", "Curious", "Adaptive"]
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
  },
  dailyLife: {
    tech: ["I'm proficient with modern tools and love exploring new technologies", "I enjoy optimizing workflows with automation", "Currently excited about AI integration in creative tools"],
    productivity: ["Pomodoro technique for focused work sessions", "Time-blocking for better task management", "Digital minimalism for reduced distractions"],
    creativity: ["Sketching ideas before digital implementation", "Photography as visual storytelling", "Music as a form of creative expression"],
    wellness: ["Regular exercise for mental clarity", "Digital detox on weekends", "Continuous learning as mental exercise"]
  }
};

class SmartAIEngine {
  private conversationContext: any[] = [];
  private userInterests: Set<string> = new Set();
  private conversationHistory: string[] = [];

  analyzeUserIntent(message: string): { 
    intent: string; 
    confidence: number; 
    entities: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
    context: 'professional' | 'personal' | 'casual';
  } {
    const lowerMsg = message.toLowerCase().trim();
    const entities: string[] = [];
    let intent = 'general';
    let confidence = 0.7;
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    let context: 'professional' | 'personal' | 'casual' = 'professional';

    const casualWords = ['how are you', 'how\'s it going', 'what\'s up', 'hello', 'hi', 'hey'];
    const personalWords = ['hobby', 'interest', 'like', 'enjoy', 'passion', 'personal', 'life'];
    
    if (casualWords.some(word => lowerMsg.includes(word))) context = 'casual';
    if (personalWords.some(word => lowerMsg.includes(word))) context = 'personal';

    const positiveWords = ['good', 'great', 'awesome', 'love', 'like', 'cool', 'nice', 'wonderful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'poor', 'sad'];
    
    if (positiveWords.some(word => lowerMsg.includes(word))) sentiment = 'positive';
    if (negativeWords.some(word => lowerMsg.includes(word))) sentiment = 'negative';

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

    const dailyTopics = ['weather', 'time', 'day', 'music', 'game', 'movie', 'book', 'food', 'exercise'];
    dailyTopics.forEach(topic => {
      if (lowerMsg.includes(topic)) {
        entities.push(`daily:${topic}`);
        context = 'personal';
      }
    });

    const intents = {
      greeting: { keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'], weight: 1.0 },
      farewell: { keywords: ['bye', 'goodbye', 'see you', 'later'], weight: 0.95 },
      skill: { keywords: ['skill', 'tech', 'stack', 'technology', 'tool'], weight: 0.9 },
      experience: { keywords: ['experience', 'year', 'work', 'background'], weight: 0.9 },
      design: { keywords: ['design', 'illustrator', 'photoshop', 'graphic', 'ui'], weight: 0.85 },
      frontend: { keywords: ['frontend', 'react', 'typescript', 'developer', 'code'], weight: 0.85 },
      project: { keywords: ['project', 'portfolio', 'work example', 'case study'], weight: 0.8 },
      contact: { keywords: ['contact', 'hire', 'email', 'linkedin'], weight: 0.95 },
      learning: { keywords: ['learn', 'study', 'improving', 'growing'], weight: 0.7 },
      daily: { keywords: ['how are you', 'what\'s up', 'hobby', 'interest', 'daily', 'life'], weight: 0.8 },
      weather: { keywords: ['weather', 'temperature', 'rain', 'sunny'], weight: 0.9 },
      time: { keywords: ['time', 'clock', 'hour', 'what time'], weight: 0.9 },
      help: { keywords: ['help', 'assist', 'support', 'what can you do'], weight: 0.95 },
      opinion: { keywords: ['think', 'opinion', 'view', 'feel about'], weight: 0.7 }
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

    return { intent, confidence, entities, sentiment, context };
  }

  generateSmartResponse(userMessage: string, messageHistory: any[]): string {
    const analysis = this.analyzeUserIntent(userMessage);
    this.conversationContext = messageHistory;
    this.conversationHistory.push(userMessage);
    
    analysis.entities.forEach(entity => this.userInterests.add(entity));

    const responseMethod = this.getResponseMethod(analysis.intent);
    return responseMethod.bind(this)(analysis);
  }

  private getResponseMethod(intent: string): Function {
    const responseMap: { [key: string]: Function } = {
      greeting: this.generateGreetingResponse,
      farewell: this.generateFarewellResponse,
      skill: this.generateSkillsResponse,
      experience: this.generateExperienceResponse,
      design: this.generateDesignResponse,
      frontend: this.generateFrontendResponse,
      project: this.generateProjectsResponse,
      contact: this.generateContactResponse,
      learning: this.generateLearningResponse,
      daily: this.generateDailyLifeResponse,
      weather: this.generateWeatherResponse,
      time: this.generateTimeResponse,
      help: this.generateHelpResponse,
      opinion: this.generateOpinionResponse,
      general: this.generateContextualResponse
    };

    return responseMap[intent] || this.generateContextualResponse;
  }

  private generateGreetingResponse(_analysis: any): string {
    const now = new Date();
    const hour = now.getHours();
    let timeOfDay = 'evening';
    if (hour < 12) timeOfDay = 'morning';
    else if (hour < 18) timeOfDay = 'afternoon';

    const greetings = {
      morning: [
        "Good morning! ☀️ I'm Raka's AI assistant, ready to chat about work or daily life!",
        "Morning! 🌞 Whether it's design, development, or just casual talk, I'm here!"
      ],
      afternoon: [
        "Good afternoon! 🌤️ I'm Raka's digital companion - professional insights or friendly chat!",
        "Afternoon! 🚀 Looking to learn about Raka's work or just have a chat?"
      ],
      evening: [
        "Good evening! 🌙 Perfect time for tech chats or casual conversations!",
        "Evening! 🌃 Let's chat about projects, tech trends, or anything on your mind!"
      ]
    };

    const greetingList = greetings[timeOfDay as keyof typeof greetings];
    const baseGreeting = greetingList[Math.floor(Math.random() * greetingList.length)];

    if (this.userInterests.size > 0) {
      const interests = Array.from(this.userInterests).slice(0, 2);
      if (interests.length > 0) {
        return `${baseGreeting} I notice you're interested in ${interests.includes('design_tools') ? 'design tools' : interests.includes('frontend_tech') ? 'frontend tech' : 'these topics'}. Let's dive in!`;
      }
    }

    return baseGreeting;
  }

  private generateFarewellResponse(): string {
    const farewells = [
      "Goodbye! 👋 Great chatting with you. Come back anytime!",
      "See you later! 🚀 Thanks for the conversation!",
      "Take care! 🌟 Feel free to return whenever!",
      "Until next time! 💫 Keep creating amazing things!"
    ];
    return farewells[Math.floor(Math.random() * farewells.length)];
  }

  private generateDailyLifeResponse(_analysis: any): string {
    const responses = [
      `I'm doing great! Raka enjoys ${KNOWLEDGE_BASE.personal.hobbies[Math.floor(Math.random() * KNOWLEDGE_BASE.personal.hobbies.length)]} when not working. How about you? 😊`,
      `Thanks for asking! Raka is currently working on ${KNOWLEDGE_BASE.learning.current[0]}. Outside work, he finds ${KNOWLEDGE_BASE.dailyLife.creativity[2]} inspiring. What interests you? 🎨`,
      `Doing well! Raka believes in ${KNOWLEDGE_BASE.dailyLife.productivity[0]} for focused work. His favorite tools? Figma for design or VSCode for dev. What's keeping you busy? 💻`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateWeatherResponse(): string {
    const now = new Date();
    const hour = now.getHours();
    const isDaytime = hour > 6 && hour < 18;
    
    const responses = [
      `I can't access real-time weather, but Raka enjoys ${isDaytime ? 'sunny days for photography' : 'cool evenings for focused work'}! ☕`,
      `Weather is perfect for creativity! Raka finds ${isDaytime ? 'bright days' : 'calm nights'} ideal for different work. "Rainy days = deep coding sessions!" 🌈`,
      `Sunny or rainy, Raka adapts. He uses ${isDaytime ? 'natural light for design' : 'focused light for coding'}. Environment matters! 🏡`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateTimeResponse(): string {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    const dayPart = now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening';

    return `It's ${timeString} where Raka is. ${dayPart === 'morning' ? 'Perfect for planning creative work!' : dayPart === 'afternoon' ? 'Ideal for development sessions!' : 'Great for reflection!'} ⏰ Raka uses time-blocking effectively.`;
  }

  private generateHelpResponse(): string {
    return `I'm Raka's AI assistant! Here's what I can help with: 🤖

🎯 **Professional**:
• Design skills & experience
• Frontend development expertise
• Project portfolio
• Technical skills & tools

💬 **Daily Life**:
• Work-life balance
• Hobbies & interests
• Productivity tips
• General conversation

🛠️ **Specific**:
• Design tools (Figma, Illustrator, etc.)
• React, TypeScript, web dev
• Creative processes
• Tech trends opinions

🌐 **Also**:
• Learning journey
• Industry trends
• Productivity tips
• Friendly chat

What would you like to explore? 🚀`;
  }

  private generateOpinionResponse(analysis: any): string {
    const topics = {
      design: [
        "Raka believes good design solves problems beautifully. 'Design isn't just how it looks, but how it works and feels.'",
        "From Raka's view: best designs combine aesthetic appeal with functional clarity."
      ],
      development: [
        "Raka's philosophy: clean, maintainable code. 'Great code is clear, concise, and easy to understand.'",
        "For Raka, development is creating experiences. TypeScript and component architecture are favorites."
      ],
      technology: [
        "Raka is excited about AI in creative tools - augmenting human creativity, not replacing.",
        "The design-development intersection fascinates Raka. Best products understand both domains."
      ],
      productivity: [
        "Raka swears by focused sessions with breaks. 'Quality over quantity' is his motto.",
        "For Raka, productivity = meaningful work efficiently. Mindset matters more than tools."
      ]
    };

    let topic: keyof typeof topics = 'design';
    const msg = analysis.entities.join(' ').toLowerCase();
    if (msg.includes('code') || msg.includes('develop')) topic = 'development';
    if (msg.includes('tech') || msg.includes('ai')) topic = 'technology';
    if (msg.includes('productivity') || msg.includes('work')) topic = 'productivity';

    const topicResponses = topics[topic];
    return topicResponses[Math.floor(Math.random() * topicResponses.length)];
  }

  private generateSkillsResponse(analysis: any): string {
    const hasDesignFocus = analysis.entities.some((e: string) => e.startsWith('design_tool'));
    const hasTechFocus = analysis.entities.some((e: string) => e.startsWith('frontend_tech'));

    if (hasDesignFocus && hasTechFocus) {
      return `Raka's dual expertise: 🦸

🎨 **Design (${KNOWLEDGE_BASE.skills.design.experience})**:
• Tools: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}
• Specialties: ${KNOWLEDGE_BASE.skills.design.specialties.join(', ')}
• Achievements: ${KNOWLEDGE_BASE.skills.design.achievements.join(', ')}

💻 **Frontend (${KNOWLEDGE_BASE.skills.frontend.experience})**:
• Stack: ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}
• Focus: ${KNOWLEDGE_BASE.skills.frontend.specialties.join(', ')}
• Success: ${KNOWLEDGE_BASE.skills.frontend.achievements.join(', ')}

🚀 **Impact**: Owns projects from concept to deployment with creative vision & technical precision!`;
    }

    if (hasDesignFocus) {
      return `Raka's design capabilities: 🎨

**${KNOWLEDGE_BASE.skills.design.experience} Experience**:
🛠️ **Tools**: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}
🎯 **Skills**: ${KNOWLEDGE_BASE.skills.design.specialties.join(', ')}
📊 **Projects**: ${KNOWLEDGE_BASE.skills.design.projects.join(', ')}
🏆 **Achievements**: ${KNOWLEDGE_BASE.skills.design.achievements.join(', ')}

**Philosophy**: User-centered, visual storytelling, scalable systems. Creates developer-friendly, stunning interfaces!`;
    }

    if (hasTechFocus) {
      return `Raka's frontend skills: 💻

**${KNOWLEDGE_BASE.skills.frontend.experience} Experience**:
⚡ **Tech**: ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}
🎯 **Specialties**: ${KNOWLEDGE_BASE.skills.frontend.specialties.join(', ')}
📁 **Projects**: ${KNOWLEDGE_BASE.skills.frontend.projects.join(', ')}
🚀 **Achievements**: ${KNOWLEDGE_BASE.skills.frontend.achievements.join(', ')}

**Approach**: Component-driven, performance-first, TypeScript, accessible, responsive.

**Edge**: Design background = exceptional UX, not just functional interfaces!`;
    }

    return `Raka's skill combo: 🌟

🎨 **Design**: ${KNOWLEDGE_BASE.skills.design.experience} expertise
💻 **Tech**: ${KNOWLEDGE_BASE.skills.frontend.experience} modern dev
🚀 **Value**: Bridges design & development workflows

Can:
• Implement design systems
• Communicate with designers/devs
• Create cohesive products
• Maintain design integrity

Explore deeper?`;
  }

  private generateExperienceResponse(): string {
    return `Raka's journey: 📈

📊 **Timeline**:
• Graphic Design: ${KNOWLEDGE_BASE.skills.design.experience}
• Frontend Dev: ${KNOWLEDGE_BASE.skills.frontend.experience}
• Combined: Digital products with visual excellence & technical robustness

💡 **Advantage**:
• Design Thinking: UI/UX principles, user psychology
• Technical Depth: Complex features, clean code
• Communication: Translates design ↔ tech
• Full-Product: Understands entire lifecycle

🎯 **Now**: Learning ${KNOWLEDGE_BASE.learning.current.join(', ')} while exploring ${KNOWLEDGE_BASE.learning.interests.join(', ')}`;
  }

  private generateDesignResponse(): string {
    return `Raka's design expertise: 🎨

**${KNOWLEDGE_BASE.skills.design.experience} Mastery**:
🛠️ **Tools**: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}
🎯 **Domains**: ${KNOWLEDGE_BASE.skills.design.specialties.join(', ')}
📁 **Portfolio**: ${KNOWLEDGE_BASE.skills.design.projects.join(', ')}
🏆 **Achievements**: ${KNOWLEDGE_BASE.skills.design.achievements.join(', ')}

**Methodology**:
• Research-Driven: User needs & business goals
• System-Oriented: Scalable design systems
• Detail-Focused: Pixel-perfect execution
• Collaborative: Works with stakeholders & devs

**Dev Impact**:
• Intuitive component APIs
• Developer-friendly systems
• Efficient handoff
• Consistent visual language`;
  }

  private generateFrontendResponse(): string {
    return `Raka's frontend capabilities: 💻

**${KNOWLEDGE_BASE.skills.frontend.experience} Excellence**:
⚡ **Tech**: ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}
🎯 **Specialties**: ${KNOWLEDGE_BASE.skills.frontend.specialties.join(', ')}
📁 **Projects**: ${KNOWLEDGE_BASE.skills.frontend.projects.join(', ')}
🚀 **Achievements**: ${KNOWLEDGE_BASE.skills.frontend.achievements.join(', ')}

**Philosophy**:
• Component-Driven: Reusable libraries
• Performance-First: Core web vitals
• Type-Safe: TypeScript benefits
• Accessible: WCAG guidelines
• Responsive: All device sizes

**Edge**: Design background = understanding of UI patterns, animations, collaboration, visual polish!`;
  }

  private generateProjectsResponse(): string {
    const projects = KNOWLEDGE_BASE.projects.featured;
    return `Raka's impressive projects: 🚀

${projects.map(project => 
`**${project.name}**
• *Description*: ${project.description}
• *Tech*: ${project.tech.join(', ')}
• *Design*: ${project.design.join(', ')}
• *Role*: ${project.role}
• *Impact*: ${project.impact}`
).join('\n\n')}

💡 **Philosophy**: Merges beautiful design with solid technical execution. Enjoys creative problem-solving & technical innovation!`;
  }

  private generateContactResponse(): string {
    return `Raka seeks opportunities: 💼

🎯 **Ideal Roles**:
• Frontend Dev with design collaboration
• UI/UX Engineer
• Creative Technologist
• Design System development
• Product-focused teams

🛠️ **What He Brings**:
• ${KNOWLEDGE_BASE.skills.design.experience} design expertise
• ${KNOWLEDGE_BASE.skills.frontend.experience} modern dev
• Bridge between design & engineering
• Full-product perspective

📞 **Next Steps**:
• Use contact form on website
• Connect on LinkedIn
• Schedule collaboration discussion

Excited about roles valuing creative vision & technical execution! 🚀`;
  }

  private generateLearningResponse(): string {
    return `Raka's continuous growth: 📚

🎯 **Currently Mastering**:
${KNOWLEDGE_BASE.learning.current.map(item => `• ${item}`).join('\n')}

🚀 **Future Interests**:
${KNOWLEDGE_BASE.learning.interests.map(item => `• ${item}`).join('\n')}

💡 **Philosophy**:
• Stay current with web tech
• Explore design trends
• Balance depth & breadth
• Apply learning immediately

Stays at design & development forefront!`;
  }

  private generateContextualResponse(analysis: any): string {
    const lastMessages = this.conversationContext.slice(-3);
    const hasDesignContext = lastMessages.some(msg => 
      msg.content && typeof msg.content === 'string' && 
      msg.content.toLowerCase().includes('design')
    );
    const hasDevContext = lastMessages.some(msg => 
      msg.content && typeof msg.content === 'string' && 
      msg.content.toLowerCase().includes('develop')
    );
    const hasCasualContext = analysis.context === 'casual' || analysis.context === 'personal';

    if (hasCasualContext) {
      const casualResponses = [
        "Interesting! Raka finds balance between work and personal interests key. Inspiration often comes from everyday experiences!",
        "Great point! Raka believes professional skills and personal interests create a well-rounded creative mindset.",
        "Fascinating! Raka relates this to bridging domains - design/development or work/life balance."
      ];
      return casualResponses[Math.floor(Math.random() * casualResponses.length)];
    }

    const contextualResponses = [
      `Interesting! ${hasDesignContext ? 'Given our design talk' : hasDevContext ? 'Building on tech chat' : 'Based on Raka\'s background'}, his skill combo creates exceptional value here.`,
      `Great question! Raka's journey through ${KNOWLEDGE_BASE.skills.design.experience} design & ${KNOWLEDGE_BASE.skills.frontend.experience} dev gives unique approach.`,
      `That's thoughtful! Raka bridges ${hasDesignContext ? 'tech implementation' : 'creative vision'} with ${hasDesignContext ? 'design principles' : 'dev best practices'}.`,
      `Fascinating! Aligns with Raka's creative & technical expertise. Combines ${hasDesignContext ? 'user-centered thinking' : 'robust architecture'} with ${hasDesignContext ? 'scalable implementation' : 'engaging UX'}.`
    ];

    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  }
}

function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: "Hello! I'm Raka's AI assistant! 🧠 Ready to explore his design+dev skills or just chat about daily life? What's on your mind? 🚀",
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
  const aiEngine = useRef(new SmartAIEngine());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  }, [isOpen]);

  useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();

  window.addEventListener('resize', checkMobile);

  return () => {
    window.removeEventListener('resize', checkMobile);
  };
}, []);

  const simulateTyping = useCallback((message: string, onComplete: (fullMessage: string) => void) => {
    setIsTyping(true);
    setTypingProgress(0);
    
    const characters = message.split('');
    let currentText = '';
    let index = 0;

    const typeCharacter = () => {
      if (index < characters.length) {
        currentText += characters[index];
        setTypingProgress(Math.min(100, ((index + 1) / characters.length) * 100));
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: currentText + (index < characters.length - 1 ? '▊' : '')
          };
          return newMessages;
        });

        index++;
        
        const baseSpeed = 20;
        const randomVariation = Math.random() * 15;
        const punctuationDelay = ['.', '!', '?', '\n'].includes(characters[index - 1]) ? 150 : 0;
        const speed = baseSpeed + randomVariation + punctuationDelay;
        
        setTimeout(typeCharacter, speed);
      } else {
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
              inputs: `You are Raka Pranata's AI assistant. Be helpful and conversational. About Raka: 4+ years design, 1+ year React/TypeScript. Skills: ${KNOWLEDGE_BASE.skills.design.tools.join(', ')}, ${KNOWLEDGE_BASE.skills.frontend.technologies.join(', ')}. Question: ${inputMessage}`,
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

      const smartResponse = aiEngine.current.generateSmartResponse(inputMessage, messages);
      
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
      const fallbackResponse = aiEngine.current.generateSmartResponse(inputMessage, messages);
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

  const getContextualSuggestions = () => {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) return defaultSuggestions;

    const analysis = aiEngine.current.analyzeUserIntent(lastUserMessage.content);
    
    switch (analysis.intent) {
      case 'design':
        return [
          "What design process?",
          "Show design portfolio",
          "Handle client feedback?",
          "Favorite design project?"
        ];
      case 'frontend':
        return [
          "React best practices?",
          "Optimize performance?",
          "TypeScript experience?",
          "Testing strategies?"
        ];
      case 'skill':
        return [
          "Strongest tech skill?",
          "Stay updated with tech?",
          "Important soft skills?",
          "Learning approach?"
        ];
      case 'daily':
        return [
          "Favorite hobby?",
          "Work-life balance?",
          "Productivity tips?",
          "Daily routine?"
        ];
      default:
        return defaultSuggestions;
    }
  };

  const defaultSuggestions = [
    "Tell about design journey",
    "What React projects?",
    "Combine design & dev?",
    "TypeScript experience?",
    "Expert design tools?",
    "What makes you unique?"
  ];

  const contextualSuggestions = getContextualSuggestions();

  return (
    <>
      {/* Floating Button dengan warna emas */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] text-[#1a1a1a] shadow-2xl hover:scale-110 transition-all duration-300 group animate-float"
        style={{
          bottom: isMobile ? '7rem' : '2rem',
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
          <BsChatDotsFill className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
        </div>
        
        <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-40 animate-ping" style={{ animationDuration: '2s' }} aria-hidden="true" />
        
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-[#1a1a1a] text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-[#d4af37]/30">
          <div className="flex items-center gap-2">
            <BsStars className="text-[#d4af37]" aria-hidden="true" />
            <span>Chat with AI Assistant</span>
          </div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-[#1a1a1a]" aria-hidden="true"></div>
        </div>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-end p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-heading"
          aria-describedby="ai-chat-description"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#d4af37]/10 to-black/80 backdrop-blur-lg"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div 
            id="ai-chat-modal"
            className="relative w-full max-w-full sm:max-w-md lg:max-w-lg h-[90vh] sm:h-[600px] bg-[#0a0a0a] border border-[#d4af37]/40 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#d4af37]/10 via-[#f4d03f]/10 to-[#d4af37]/10 animate-gradient-x" aria-hidden="true" />
            
            <div className="relative bg-gradient-to-r from-[#d4af37] to-[#f4d03f] p-4 sm:p-5 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0a0a0a] p-2 rounded-full border border-[#d4af37]/30">
                    <BsChatDotsFill className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 id="ai-chat-heading" className="font-bold text-[#0a0a0a] text-sm sm:text-base flex items-center gap-2">
                      Raka's AI Assistant
                    </h3>
                    <p id="ai-chat-description" className="text-[#0a0a0a]/80 text-xs sm:text-sm flex items-center gap-1">
                      <BsStars className="w-3 h-3" aria-hidden="true" />
                      Smart Chat v3.0
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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

            <div 
              className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 relative"
              role="log"
              aria-live="polite"
              aria-atomic="false"
              aria-label="Chat conversation"
            >
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
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a0a0a] rounded-br-none border border-[#d4af37]/30' 
                        : 'bg-[#1a1a1a]/80 border border-[#d4af37]/20 text-white rounded-bl-none'
                    }`}
                    role={msg.role === 'user' ? 'status' : 'article'}
                    aria-label={`${msg.role === 'user' ? 'You said' : 'AI Assistant said'}: ${msg.content}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.role === 'user' ? (
                        <FaUser className="w-3 h-3 opacity-70" aria-hidden="true" />
                      ) : (
                        <BsChatDotsFill className="w-3 h-3 text-[#d4af37]" aria-hidden="true" />
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
                        <span className="text-sm text-gray-300">Processing...</span>
                        <div 
                          className="w-32 h-1 bg-[#1a1a1a] rounded-full overflow-hidden mt-1"
                          role="progressbar"
                          aria-valuenow={typingProgress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-300"
                            style={{ width: `${typingProgress}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {messages.length > 0 && !isLoading && (
                <div className="space-y-3 mt-4">
                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                    <FaLightbulb className="text-[#d4af37]" aria-hidden="true" />
                    Quick suggestions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="menu" aria-label="Quick question suggestions">
                    {contextualSuggestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(sendMessage, 100);
                        }}
                        className="bg-[#1a1a1a]/80 border border-[#d4af37]/20 text-xs text-white p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#d4af37]/20 hover:to-[#f4d03f]/20 hover:border-[#d4af37]/40 transition-all text-center backdrop-blur-sm group"
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

            <div className="relative p-3 sm:p-4 border-t border-[#d4af37]/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
              <div className="absolute inset-0 border-t border-[#d4af37]/10" aria-hidden="true" />
              
              <div className="flex gap-2 sm:gap-3 items-end relative z-10">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about design, development, daily life, anything..."
                  className="flex-1 bg-[#1a1a1a]/80 border border-[#d4af37]/20 rounded-2xl px-4 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] focus:bg-[#1a1a1a] transition-all duration-300 text-sm sm:text-base resize-none backdrop-blur-sm"
                  disabled={isLoading || isTyping}
                  style={{ minHeight: '3rem' }}
                  aria-label="Type your message"
                  aria-describedby="input-instructions"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-[#0a0a0a] p-3 sm:p-4 rounded-2xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center min-w-12 sm:min-w-14 font-semibold disabled:cursor-not-allowed group"
                  aria-label="Send message"
                >
                  {isLoading || isTyping ? (
                    <div className="w-5 h-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  ) : (
                    <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  )}
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-2 sm:mt-3 px-2">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span>Smart AI • v3.0</span>
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <FaBrain className="text-[#d4af37]" aria-hidden="true" />
                  <span>Context-Aware • Secure</span>
                </p>
              </div>
              
              <div id="input-instructions" className="sr-only">
                Press Enter to send your message. Use the quick suggestion buttons for common questions.
              </div>
            </div>
          </div>
        </div>
      )}

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