import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { X, Send, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileLayout from '@/components/MobileLayout';
import { useChatContext } from '@/contexts/ChatContext';
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}
const ChatWithElliot = () => {
  const {
    messages,
    setMessages
  } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  // Smooth scroll to bottom function
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    }
  };

  // Check if user is near bottom of chat
  const checkScrollPosition = () => {
    if (scrollViewportRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollViewportRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
      setIsUserScrolling(!isNearBottom);
    }
  };

  // Enhanced auto-scroll effect
  useLayoutEffect(() => {
    // Only auto-scroll if user isn't manually scrolling up
    if (!isUserScrolling) {
      scrollToBottom(true);
    }
  }, [messages, isTyping]);

  // Initial scroll to bottom
  useEffect(() => {
    scrollToBottom(false);
  }, []);

  // Set up scroll listener
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (viewport) {
      viewport.addEventListener('scroll', checkScrollPosition, { passive: true });
      return () => viewport.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Immediately scroll to user message
    setTimeout(() => scrollToBottom(true), 50);
    
    setIsTyping(true);
    
    // Scroll when typing indicator appears
    setTimeout(() => scrollToBottom(true), 100);

    // Simulate AI response with 3-dot loading
    setTimeout(() => {
      const responses = ["Great question! Based on your current progress, I'd recommend focusing on your weaker areas. You've been doing well in Quantitative Reasoning, but Abstract Reasoning could use some work.", "That's a smart approach! Here are some personalized study tips based on your performance patterns...", "I can help you with that! Let me guide you to the right section of the platform where you can practice more effectively."];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
        quickReplies: ["Go to Practice Tests", "View detailed progress", "More study tips"]
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Scroll to new AI message
      setTimeout(() => scrollToBottom(true), 100);
    }, 2000);
  };
  const handleQuickReply = (reply: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: reply,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Scroll to quick reply message
    setTimeout(() => scrollToBottom(true), 50);
    
    setIsTyping(true);
    
    // Scroll when typing indicator appears
    setTimeout(() => scrollToBottom(true), 100);

    // Handle quick reply responses
    setTimeout(() => {
      let response = "";
      if (reply.includes("progress")) {
        response = "Based on your recent activity, you've completed 3 practice sessions this week. Your strongest subject is Quantitative Reasoning (85% accuracy), while Abstract Reasoning needs attention (45% accuracy).";
      } else if (reply.includes("Practice")) {
        response = "I recommend starting with some Abstract Reasoning questions. You can find targeted practice in the Skills Trainer section.";
      } else {
        response = "Here are some effective study strategies: 1) Focus on one subject at a time, 2) Review incorrect answers immediately, 3) Take regular breaks to maintain concentration.";
      }
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Scroll to new AI response
      setTimeout(() => scrollToBottom(true), 100);
    }, 1500);
  };
  return (
    <MobileLayout>
      <main className="flex-1 flex flex-col bg-white">
        {/* Header - Centered with large avatar and name */}
        <div className="flex items-center justify-center p-6 sm:p-8 border-b border-gray-200 bg-gradient-to-r from-[#009dff]/5 to-[#33a9ff]/5 relative">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden shadow-lg">
              <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
            </div>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Hey, I'm Elliot, your AI Virtual Assistant</h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-1">You can ask me anything related to your GATE exam preparation.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 sm:top-6 sm:right-6" onClick={() => window.history.back()}>
            <X size={24} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 relative">
          <ScrollArea className="h-full p-4 sm:p-6" ref={scrollAreaRef}>
            <div 
              ref={scrollViewportRef}
              className="h-full"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'auto'
              }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4 sm:space-y-6 pb-4">
                  {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[70%]">
                    {message.type === 'assistant' && <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                          <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Elliot</span>
                      </div>}
                    <div className={`p-4 rounded-2xl ${message.type === 'user' ? 'bg-[#009dff] text-white ml-auto' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                    
                    {message.type === 'assistant' && <div className="flex items-center gap-2 mt-3 ml-13">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                          <ThumbsUp size={14} className="mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                          <ThumbsDown size={14} className="mr-1" />
                          Not helpful
                        </Button>
                      </div>}
                    
                    {message.quickReplies && <div className="flex flex-wrap gap-2 mt-4 ml-13">
                        {message.quickReplies.map((reply, index) => <Button key={index} variant="outline" size="sm" onClick={() => handleQuickReply(reply)} className="text-xs bg-white hover:bg-gray-50">
                            {reply}
                          </Button>)}
                      </div>}
                      </div>
                    </div>)}
                  
                  {isTyping && <div className="flex justify-start">
                  <div className="max-w-[70%]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                        <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-8 h-8 rounded-full" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">Elliot</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                      animationDelay: '0.1s'
                    }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                      animationDelay: '0.2s'
                     }}></div>
                      </div>
                    </div>
                    </div>
                  </div>}
                  
                  {/* Invisible element to mark end of messages */}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Scroll to bottom button */}
          {showScrollButton && (
            <Button
              onClick={() => {
                setIsUserScrolling(false);
                scrollToBottom(true);
              }}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg z-10 transition-all duration-200 animate-fade-in"
              size="icon"
            >
              <ChevronDown size={20} />
            </Button>
          )}
        </div>

        {/* Input - Enhanced for mobile */}
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-white safe-area-padding-bottom">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 sm:gap-3">
              <Input 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)} 
                placeholder="Type any question" 
                onKeyPress={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 h-11 sm:h-12 text-base resize-none"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="bg-primary hover:bg-primary/90 h-11 sm:h-12 w-11 sm:w-12 shrink-0 transition-all duration-200"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-3 text-center">
              Elliot can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>
    </MobileLayout>
  );
};
export default ChatWithElliot;
