import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, User, Bot, Phone, Calendar } from 'lucide-react';
import { simpleRAGService } from '@/services/simpleRAG';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  showContactButtons?: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to help you with any questions about our window tinting services. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ragStatus, setRagStatus] = useState<'initializing' | 'ready' | 'error'>('initializing');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkRagStatus = () => {
      const status = simpleRAGService.getStatus();
      setRagStatus(status);
    };

    // Check status immediately
    checkRagStatus();

    // Check status periodically until ready
    const interval = setInterval(() => {
      checkRagStatus();
      if (simpleRAGService.isReady()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-open chatbot when user scrolls to second section
  useEffect(() => {
    const handleScroll = () => {
      // Don't auto-open if already opened manually or already auto-opened
      if (isOpen || hasAutoOpened) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Auto-open when user has scrolled at least one viewport height (second section)
      if (scrollPosition >= viewportHeight * 0.8) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, hasAutoOpened]);

  const quickResponses = [
    "What types of tint do you offer?",
    "How long does installation take?",
    "What's included in the warranty?",
    "I'd like to get a quote for my vehicle"
  ];

  const detectContactIntent = (message: string): boolean => {
    const contactKeywords = [
      'quote', 'price', 'cost', 'estimate', 'consultation', 'appointment',
      'schedule', 'book', 'contact', 'call', 'phone', 'visit', 'come in',
      'get started', 'interested', 'sign up', 'hire', 'service',
      'when can', 'available', 'free time', 'meet', 'discuss'
    ];
    
    const lowerMessage = message.toLowerCase();
    return contactKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const getBotResponse = async (userMessage: string): Promise<{ text: string; showContactButtons: boolean }> => {
    try {
      // Use RAG service for intelligent responses
      const response = await simpleRAGService.getResponse(userMessage);
      
      // Check if user has contact intent
      const hasContactIntent = detectContactIntent(userMessage) || 
                              response.toLowerCase().includes('call us') ||
                              response.toLowerCase().includes('consultation');
      
      return {
        text: response,
        showContactButtons: hasContactIntent
      };
    } catch (error) {
      console.error('Error getting bot response:', error);
      return {
        text: "I apologize, but I'm having trouble processing your request right now. Please call us at (540) 891-0696 for immediate assistance.",
        showContactButtons: true
      };
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const currentInput = inputValue; // Store current input value
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Get bot response with RAG
    try {
      const botResponseData = await getBotResponse(currentInput);
      
      // Add some delay for better UX
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: botResponseData.text,
          sender: 'bot',
          timestamp: new Date(),
          showContactButtons: botResponseData.showContactButtons
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error handling message:', error);
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "I'm having trouble processing your request right now. Please call us at (540) 891-0696 for immediate assistance.",
          sender: 'bot',
          timestamp: new Date(),
          showContactButtons: true
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleQuickResponse = (response: string) => {
    setInputValue(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-none bg-black hover:bg-gray-800 text-white shadow-2xl transition-all duration-300 ${
            isOpen ? 'scale-95' : 'hover:scale-105'
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white border border-gray-200 shadow-2xl z-50 flex flex-col">
          
          {/* Chat Header */}
          <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/10 rounded-none flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-helvetica font-medium text-sm">TintLab Assistant</h3>
                <p className="text-gray-300 text-xs">
                  {ragStatus === 'initializing' && '🔄 Initializing knowledge base...'}
                  {ragStatus === 'ready' && '✅ Ready with full knowledge'}
                  {ragStatus === 'error' && '⚠️ Basic responses only'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-gray-300' : 'bg-black'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-black text-white' 
                      : 'bg-white border border-gray-200 text-black'
                  }`}>
                    <p className="text-sm font-helvetica font-light leading-relaxed">
                      {message.text}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    
                    {/* Contact buttons for bot messages with contact intent */}
                    {message.sender === 'bot' && message.showContactButtons && (
                      <div className="mt-3 flex flex-col gap-2">
                        <Button
                          onClick={() => navigate('/contact')}
                          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-none text-sm flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Get Free Quote
                        </Button>
                        <Button
                          onClick={() => window.open('tel:540-891-0696', '_self')}
                          variant="outline"
                          className="border-black text-black hover:bg-gray-100 px-4 py-2 rounded-none text-sm flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          Call (540) 891-0696
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-black rounded-none flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-helvetica">Quick questions:</p>
              <div className="grid grid-cols-1 gap-1">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="text-left px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 transition-colors duration-200 font-helvetica"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={ragStatus === 'initializing' ? 'Initializing... Please wait...' : 'Type your message...'}
                disabled={ragStatus === 'initializing'}
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm font-helvetica font-light text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <Button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || ragStatus === 'initializing'}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 