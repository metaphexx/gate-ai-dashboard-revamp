
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

interface ReadingComprehensionChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Reading Comprehension data that Elliot would have access to
const readingComprehensionData = {
  passages: [
    {
      id: 1,
      title: "Climate Change and Ocean Currents",
      text: "The relationship between climate change and ocean currents is complex and far-reaching...",
      questions: [
        {
          id: 1,
          question: "What is the primary factor affecting ocean currents according to the passage?",
          options: ["Temperature", "Wind patterns", "Salinity", "Climate change"],
          correctAnswer: "Climate change",
          userAnswer: "Temperature",
          explanation: "The passage clearly states that climate change is the overarching factor that influences temperature, salinity, and wind patterns, which in turn affect ocean currents."
        },
        {
          id: 2,
          question: "How do ocean currents impact global weather patterns?",
          options: ["They don't", "By redistributing heat", "Only in coastal areas", "Through tidal forces"],
          correctAnswer: "By redistributing heat",
          userAnswer: "By redistributing heat",
          explanation: "Correct! Ocean currents act like a global conveyor belt, moving warm water from equatorial regions to polar areas and cold water in the opposite direction."
        }
      ]
    },
    {
      id: 2,
      title: "The Evolution of Language",
      text: "Language evolution is a fascinating field that combines linguistics, anthropology, and cognitive science...",
      questions: [
        {
          id: 3,
          question: "What evidence supports the theory of language evolution?",
          options: ["Fossil records", "Comparative linguistics", "Archaeological findings", "All of the above"],
          correctAnswer: "All of the above",
          userAnswer: "Comparative linguistics",
          explanation: "While comparative linguistics is important, the passage mentions that language evolution research draws from multiple sources including fossil evidence of brain development, archaeological artifacts with symbolic meaning, and linguistic comparisons."
        }
      ]
    }
  ]
};

const ReadingComprehensionChatPanel = ({ isOpen, onClose }: ReadingComprehensionChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm here to help you understand your Reading Comprehension test results. I have access to all the passages, questions, your answers, and detailed explanations. Feel free to ask me about any specific question or concept you'd like to review!",
      timestamp: new Date(),
      quickReplies: ["Explain question 1", "Why was my answer wrong?", "Show me passage summaries", "Review difficult questions"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponseForQuestion = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Check if user is asking about specific questions
    if (lowerInput.includes('question 1') || lowerInput.includes('ocean currents')) {
      const q1 = readingComprehensionData.passages[0].questions[0];
      return `For the ocean currents question: "${q1.question}"\n\nYour answer: ${q1.userAnswer}\nCorrect answer: ${q1.correctAnswer}\n\nExplanation: ${q1.explanation}\n\nThe key was to look for the overarching theme in the passage rather than focusing on individual factors.`;
    }
    
    if (lowerInput.includes('question 2')) {
      const q2 = readingComprehensionData.passages[0].questions[1];
      return `Great job on question 2! You got it right.\n\nQuestion: "${q2.question}"\nYour answer: ${q2.userAnswer} ✓\n\nExplanation: ${q2.explanation}`;
    }
    
    if (lowerInput.includes('question 3') || lowerInput.includes('language evolution')) {
      const q3 = readingComprehensionData.passages[1].questions[0];
      return `For the language evolution question: "${q3.question}"\n\nYour answer: ${q3.userAnswer}\nCorrect answer: ${q3.correctAnswer}\n\nExplanation: ${q3.explanation}\n\nRemember to look for keywords like "all of the above" when multiple evidence types are mentioned in the passage.`;
    }
    
    if (lowerInput.includes('wrong') || lowerInput.includes('incorrect')) {
      return `You got 2 out of 3 questions incorrect. Let me break down what went wrong:\n\n1. Ocean currents question: You focused on a specific factor (temperature) rather than the main theme (climate change)\n2. Language evolution question: You missed that the passage mentioned multiple types of evidence\n\nThe key strategy is to identify the passage's main argument and look for comprehensive answers when options include "all of the above."`;
    }
    
    if (lowerInput.includes('passage') || lowerInput.includes('summary')) {
      return `Here are the passages you read:\n\n1. "Climate Change and Ocean Currents" - Discusses how climate change affects ocean circulation patterns and global weather\n2. "The Evolution of Language" - Explores how language developed using evidence from multiple scientific disciplines\n\nWould you like me to explain any specific part of these passages?`;
    }
    
    if (lowerInput.includes('difficult') || lowerInput.includes('challenging')) {
      return `The most challenging questions for you were:\n\n• Question 1 (Ocean currents) - Required identifying the main theme vs. specific details\n• Question 3 (Language evolution) - Needed recognition of comprehensive evidence types\n\nBoth required careful attention to the passage's overall argument rather than focusing on individual details.`;
    }
    
    // Default responses for general questions
    const defaultResponses = [
      "Based on your Reading Comprehension test, you scored 1 out of 3 questions correctly. The main areas to focus on are identifying main themes versus specific details, and recognizing when passages present multiple types of evidence.",
      "Your strength was in understanding direct cause-and-effect relationships, as shown in question 2. To improve, practice identifying when a passage presents multiple supporting pieces of evidence for a single conclusion.",
      "I can help you understand any of the three questions you attempted. Would you like me to explain a specific question or discuss general reading comprehension strategies?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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

    // Generate contextual response based on user input
    setTimeout(() => {
      const response = generateResponseForQuestion(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        quickReplies: ["Explain another question", "Reading strategies", "Review my mistakes", "Practice recommendations"]
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
      let response = "";
      if (reply.includes("question 1")) {
        response = generateResponseForQuestion("question 1");
      } else if (reply.includes("wrong") || reply.includes("mistakes")) {
        response = generateResponseForQuestion("wrong");
      } else if (reply.includes("summaries")) {
        response = generateResponseForQuestion("passage");
      } else if (reply.includes("difficult")) {
        response = generateResponseForQuestion("difficult");
      } else if (reply.includes("strategies")) {
        response = "Here are key Reading Comprehension strategies:\n\n1. Read the questions first to know what to look for\n2. Identify the main theme vs. supporting details\n3. Look for signal words like 'however,' 'therefore,' 'in conclusion'\n4. When you see 'all of the above,' check if the passage mentions multiple evidence types\n5. Don't get distracted by familiar terms - focus on the passage's specific context";
      } else if (reply.includes("recommendations")) {
        response = "Based on your performance, I recommend:\n\n1. Practice identifying main ideas vs. details in passages\n2. Work on questions with 'all of the above' options\n3. Focus on scientific and academic texts\n4. Time yourself to build reading speed\n5. Review answer explanations to understand reasoning patterns";
      } else {
        response = generateResponseForQuestion(reply);
      }

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                alt="Elliot Avatar" 
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Reading Comprehension Review</h3>
              <p className="text-xs text-gray-500">Ask about any question</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%]">
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                        <img 
                          src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                          alt="Elliot Avatar" 
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-[#009dff] text-white ml-auto' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsDown size={12} />
                      </Button>
                    </div>
                  )}
                  
                  {message.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs"
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
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                      alt="Elliot Avatar" 
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
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
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about any question..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-[#009dff] hover:bg-[#0080ff]">
              <Send size={16} />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Elliot has access to all questions, answers & explanations
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingComprehensionChatPanel;
