

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Question {
  id: number;
  prompt?: string;
  passage?: string;
  question?: string;
  category: string;
  image?: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string | null;
  explanation: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  questions?: Question[];
  currentQuestionIndex?: number;
  type?: 'abstract-reasoning' | 'reading-comprehension';
}

const ChatPanel = ({ isOpen, onClose, questions = [], currentQuestionIndex = 0, type }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: type 
        ? `Hi! I'm Elliot, your AI study assistant. I have access to all the ${type === 'reading-comprehension' ? 'reading comprehension passages, questions' : 'abstract reasoning questions'}, answers, and explanations from your test. Feel free to ask me about any question, explanation, or concept you'd like to understand better!`
        : "Hi! I'm Elliot, your AI study assistant. I'm here to help you with your studies and answer any questions you might have about your preparation!",
      timestamp: new Date(),
      quickReplies: type ? [
        "Explain current question",
        "Why is this answer correct?",
        type === 'reading-comprehension' ? "Help with passage analysis" : "Pattern recognition tips",
        "Study tips"
      ] : [
        "Study tips",
        "How can I improve?",
        "Practice recommendations",
        "General help"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive or the chat opens
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateElliotResponse = (userMessage: string) => {
    // If no questions data provided, give general responses
    if (!questions.length || !type) {
      return generateGeneralResponse(userMessage);
    }

    const currentQuestion = questions[currentQuestionIndex];
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('current question') || lowerMessage.includes('this question')) {
      if (type === 'reading-comprehension') {
        return `Let me break down the current question for you:\n\n**Passage Topic**: ${currentQuestion.category}\n\n**Question**: ${currentQuestion.question}\n\n**Correct Answer**: ${currentQuestion.correctAnswer}\n\n**Your Answer**: ${currentQuestion.userAnswer || 'Not answered'}\n\n**Explanation**: ${currentQuestion.explanation}`;
      } else {
        return `Here's the current question breakdown:\n\n**Category**: ${currentQuestion.category}\n\n**Question**: ${currentQuestion.prompt}\n\n**Correct Answer**: ${currentQuestion.correctAnswer}\n\n**Your Answer**: ${currentQuestion.userAnswer || 'Not answered'}\n\n**Explanation**: ${currentQuestion.explanation}`;
      }
    }

    if (lowerMessage.includes('why') && (lowerMessage.includes('correct') || lowerMessage.includes('answer'))) {
      return `Great question! Here's why the correct answer is "${currentQuestion.correctAnswer}":\n\n${currentQuestion.explanation}\n\nThis type of question tests your ability to ${type === 'reading-comprehension' ? 'comprehend and analyze written text' : 'recognize patterns and logical relationships'}. The key is to ${type === 'reading-comprehension' ? 'carefully read the passage and identify the specific information being asked for' : 'identify the underlying pattern or rule governing the sequence'}.`;
    }

    if (lowerMessage.includes('passage') && type === 'reading-comprehension') {
      return `Let me help you analyze the passage:\n\n**Key Points to Focus On**:\n- Main topic and theme\n- Specific details that answer the question\n- Context clues and supporting evidence\n\n**For this passage**: ${currentQuestion.passage}\n\n**The question asks**: ${currentQuestion.question}\n\n**Strategy**: Look for explicit statements in the passage that directly answer what's being asked. The correct answer "${currentQuestion.correctAnswer}" can be found by carefully reading and identifying the relevant information.`;
    }

    if (lowerMessage.includes('study tips') || lowerMessage.includes('how to improve')) {
      const tips = type === 'reading-comprehension' 
        ? [
            "Read the passage carefully before looking at the question",
            "Identify key words in the question that guide what to look for",
            "Look for explicit statements rather than making inferences",
            "Eliminate obviously wrong answers first",
            "Practice active reading techniques"
          ]
        : [
            "Look for patterns in shapes, colors, positions, and transformations",
            "Consider rotation, reflection, and size changes",
            "Break complex patterns into simpler components",
            "Practice identifying different types of sequences",
            "Time yourself to improve speed while maintaining accuracy"
          ];
      
      return `Here are some effective study tips for ${type === 'reading-comprehension' ? 'Reading Comprehension' : 'Abstract Reasoning'}:\n\n${tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}\n\nWould you like me to elaborate on any of these strategies?`;
    }

    // Default response with context about the current question
    const responses = [
      `I can help you understand this better! The current question is about ${currentQuestion.category.toLowerCase()}. ${currentQuestion.explanation}`,
      `That's a great question! Based on the current problem, ${currentQuestion.explanation}. Is there a specific part you'd like me to explain further?`,
      `Let me help you with that! For this type of question, the key is understanding that ${currentQuestion.explanation}. Would you like me to break it down step by step?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateGeneralResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('study tips') || lowerMessage.includes('how to improve')) {
      return `Here are some general study tips for GATE preparation:\n\n1. Create a structured study schedule\n2. Focus on understanding concepts rather than memorization\n3. Practice regularly with timed tests\n4. Review your mistakes and learn from them\n5. Take breaks to maintain focus\n\nWhat specific area would you like help with?`;
    }
    
    if (lowerMessage.includes('practice') || lowerMessage.includes('recommendation')) {
      return `For effective practice, I recommend:\n\n1. Start with Skills Trainer to build fundamentals\n2. Take Practice Tests to identify weak areas\n3. Use Mini Mock Exams for timed practice\n4. Take Full Mock Exams to simulate real conditions\n\nWould you like more specific recommendations for any particular subject?`;
    }
    
    const generalResponses = [
      "I'm here to help with your GATE preparation! Feel free to ask me about study strategies, practice recommendations, or any specific topics you're struggling with.",
      "That's a great question! I can assist you with various aspects of your exam preparation. What would you like to focus on today?",
      "I'd be happy to help you with that! Whether it's study tips, practice strategies, or understanding concepts, I'm here to support your learning journey."
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

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

    // Generate contextual AI response
    setTimeout(() => {
      const response = generateElliotResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        quickReplies: type ? [
          "Explain another question",
          "More study tips",
          type === 'reading-comprehension' ? "Help with passage analysis" : "Pattern recognition tips",
          "Next question explanation"
        ] : [
          "Study strategies",
          "Practice recommendations",
          "General tips",
          "Subject help"
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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

    setTimeout(() => {
      const response = generateElliotResponse(reply);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  if (!isOpen) return null;

  // Check if this is being used as a side panel (when it has a type and questions)
  const isSidePanel = type && questions.length > 0;

  return (
    <div className={isSidePanel 
      ? "h-full flex flex-col bg-white relative" 
      : "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    }>
      <div className={isSidePanel 
        ? "h-full flex flex-col relative overflow-hidden" 
        : "bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col"
      }>
        {/* Header */}
        {!isSidePanel && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-8 h-8 rounded-full" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Chat with Elliot</h2>
                <p className="text-sm text-gray-500">Your AI study assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Messages - with proper height calculation to leave space for input */}
        <div className={`flex-1 overflow-hidden ${isSidePanel ? 'pb-20' : ''}`}>
          <ScrollArea className="h-full py-4 px-4">
            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[80%]">
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                          <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-5 h-5 rounded-full" />
                        </div>
                        <span className="text-xs font-medium text-gray-600">Elliot</span>
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-[#009dff] text-white ml-auto' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                    
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2 ml-8">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <ThumbsUp size={12} className="mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <ThumbsDown size={12} className="mr-1" />
                          Not helpful
                        </Button>
                      </div>
                    )}
                    
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-8">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs bg-white hover:bg-gray-50 h-7"
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
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                        <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-5 h-5 rounded-full" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Elliot</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input - absolutely positioned at bottom of chat panel */}
        <div className={`${isSidePanel ? 'absolute bottom-0 left-0 right-0' : 'relative'} border-t border-gray-200 p-3 bg-white shadow-lg`}>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Elliot about any question or concept..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-[#009dff] hover:bg-[#0080ff]"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {type ? `Elliot has access to all questions and explanations.` : `Elliot is here to help with your studies.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
