
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useChatContext } from '@/contexts/ChatContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

const ChatWithElliot = () => {
  const { messages, setMessages } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
    setIsTyping(true);

    // Simulate AI response with 3-dot loading
    setTimeout(() => {
      const responses = [
        "Great question! Based on your current progress, I'd recommend focusing on your weaker areas. You've been doing well in Quantitative Reasoning, but Abstract Reasoning could use some work.",
        "That's a smart approach! Here are some personalized study tips based on your performance patterns...",
        "I can help you with that! Let me guide you to the right section of the platform where you can practice more effectively."
      ];
      
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
    setIsTyping(true);
    
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
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col bg-white">
        {/* Header - Centered with large avatar and name */}
        <div className="flex items-center justify-center p-8 border-b border-gray-200 bg-gradient-to-r from-[#009dff]/5 to-[#33a9ff]/5">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden shadow-lg">
              <div className="text-white text-4xl">🤓</div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Hey, I'm Elliot, your virtual assistant</h1>
              <p className="text-lg text-gray-500 mt-1">You can ask me anything related to your exam preparation.</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="absolute top-6 right-6" onClick={() => window.history.back()}>
            <X size={24} />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[70%]">
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                          <div className="text-white text-lg">🤓</div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Elliot</span>
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-[#009dff] text-white ml-auto' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                    
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mt-3 ml-13">
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                          <ThumbsUp size={14} className="mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                          <ThumbsDown size={14} className="mr-1" />
                          Not helpful
                        </Button>
                      </div>
                    )}
                    
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-4 ml-13">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs bg-white hover:bg-gray-50"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[70%]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                        <div className="text-white text-lg">🤓</div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">Elliot</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type any question"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 h-12 text-base"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="bg-[#009dff] hover:bg-[#0080ff] h-12 w-12"
              >
                <Send size={20} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Elliot can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatWithElliot;
