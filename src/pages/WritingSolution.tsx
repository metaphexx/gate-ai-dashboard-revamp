
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  ChevronDown,
  ChevronUp,
  MessageCircle,
  X,
  Send
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for the user's submitted text and errors
const userSubmittedText = "The journey through the tunnel was long and difficult. I had to persevere through many challenges that stretches my limits. When I finally emerged from the tunnel, I felt a great sense of energy and accomplishment.";

const detectedErrors = [
  {
    incorrectPhrase: "stretches",
    correction: "stretched",
    explanation: "Verb tense inconsistency. Since 'had to persevere' is past tense, 'stretches' should be 'stretched' to maintain consistent past tense throughout the sentence.",
    position: { start: 98, end: 107 }
  },
  {
    incorrectPhrase: "energy",
    correction: "relief",
    explanation: "Word choice error. 'Energy' doesn't fit the context. After emerging from a difficult journey, one would feel 'relief' or 'freedom' rather than 'energy'.",
    position: { start: 196, end: 202 }
  }
];

const aiRewrittenText = "The journey through the tunnel was long and arduous. I had to persevere through numerous challenges that stretched my limits and tested my resolve. When I finally emerged from the tunnel, I felt an overwhelming sense of relief and accomplishment, knowing I had overcome every obstacle in my path.";

const aiGeneratedText = "Navigating through the dimly lit tunnel felt like traversing through my own uncertainties and fears. Each step forward required unwavering determination as obstacles seemed to multiply before me. The narrow walls echoed with my labored breathing, yet I pressed on, driven by an inner strength I didn't know I possessed. Upon reaching the tunnel's end and stepping into the brilliant daylight, I experienced a profound transformation—not just relief, but a newfound confidence in my ability to conquer any challenge life might present.";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WritingSolution = () => {
  const navigate = useNavigate();
  const [showExplanations, setShowExplanations] = useState(false);
  const [showRewrittenText, setShowRewrittenText] = useState(false);
  const [showGeneratedText, setShowGeneratedText] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm here to help you understand your writing feedback and improve your skills. Feel free to ask me about any errors or writing techniques!",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const highlightErrors = (text: string) => {
    let highlightedText = text;
    const sortedErrors = [...detectedErrors].sort((a, b) => b.position.start - a.position.start);
    
    sortedErrors.forEach(error => {
      const before = highlightedText.substring(0, error.position.start);
      const errorText = highlightedText.substring(error.position.start, error.position.end);
      const after = highlightedText.substring(error.position.end);
      
      highlightedText = before + `<span class="bg-red-100 text-red-800 font-semibold px-1 rounded">${errorText}</span>` + after;
    });
    
    return highlightedText;
  };

  const handleChatSubmit = (message?: string) => {
    const messageText = message || chatInput;
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      if (messageText.includes("mistake") || messageText.includes("error")) {
        response = "Looking at your text, I notice two main errors: 1) 'stretches' should be 'stretched' to maintain past tense consistency, and 2) 'energy' doesn't fit the context - 'relief' would be more appropriate after completing a difficult journey.";
      } else if (messageText.includes("improve")) {
        response = "To improve your writing: 1) Maintain consistent verb tense throughout, 2) Choose words that fit the emotional context, 3) Use more descriptive language to engage readers, and 4) Vary your sentence structure for better flow.";
      } else if (messageText.includes("tips")) {
        response = "Here are key writing tips: 1) Read your work aloud to catch errors, 2) Use a variety of sentence lengths, 3) Show don't tell - use specific details, 4) Practice writing daily, even if just for 10 minutes.";
      } else {
        response = "I'm here to help with your writing! You can ask me about specific errors, general writing tips, or how to improve particular aspects of your text.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <EverestLogo />
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigate('/writing-results')}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span className="text-sm">Back to Results</span>
                </button>
                <span className="text-gray-300">|</span>
                <h1 className="text-xl font-bold text-[#009dff]">Writing - Solution Review</h1>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600 mb-3">Review your writing and understand the AI feedback</p>
            <Progress value={100} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* User Written Text with Highlighted Errors */}
            <Card className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Your Submitted Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightErrors(userSubmittedText) }}
                />
                
                <Collapsible open={showExplanations} onOpenChange={setShowExplanations}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="mt-4 flex items-center space-x-2"
                    >
                      {showExplanations ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span>{showExplanations ? 'Hide' : 'Show'} Error Explanations</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    {detectedErrors.map((error, index) => (
                      <Card key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <h4 className="font-semibold text-gray-900">Error {index + 1}</h4>
                          </div>
                          <p className="text-gray-700 mb-2">
                            <span className="font-semibold text-red-600">"{error.incorrectPhrase}"</span> → 
                            <span className="font-semibold text-green-600 ml-1">"{error.correction}"</span>
                          </p>
                          <p className="text-gray-600 text-sm">{error.explanation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={() => setShowRewrittenText(!showRewrittenText)}
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                AI Rewrite My Text
              </Button>
              <Button
                onClick={() => setShowGeneratedText(!showGeneratedText)}
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                AI Generate New Text
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/writing-results')}
                className="border-gray-300 hover:bg-gray-50"
              >
                Back to Results
              </Button>
            </div>

            {/* AI Rewritten Text */}
            {showRewrittenText && (
              <Card className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#009dff]">AI-Crafted Refined Version (Rewrite)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 leading-relaxed">
                    {aiRewrittenText}
                  </div>
                  <p className="text-[#009dff] text-sm mt-3">
                    This AI-generated result provides a refined version of your original text with all errors corrected.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* AI Generated Text */}
            {showGeneratedText && (
              <Card className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#009dff]">AI-Crafted Refined Version (New)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-900 leading-relaxed">
                    {aiGeneratedText}
                  </div>
                  <p className="text-[#009dff] text-sm mt-3">
                    This AI-generated result provides a completely reimagined version of the text, tailored to the prompt.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat with Elliot Panel */}
          <div className={`${isChatOpen ? 'w-80' : 'w-12'} transition-all duration-300`}>
            {!isChatOpen ? (
              <Button
                onClick={() => setIsChatOpen(true)}
                className="fixed right-6 top-32 bg-[#009dff] hover:bg-[#008ae6] text-white rounded-full w-12 h-12 shadow-lg"
                size="icon"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            ) : (
              <Card className="fixed right-6 top-32 w-80 h-96 bg-white rounded-xl border border-gray-200 shadow-lg flex flex-col">
                <CardHeader className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                        alt="Elliot Avatar" 
                        className="w-8 h-8 rounded-full"
                      />
                      <CardTitle className="text-lg">Chat with Elliot</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsChatOpen(false)}
                      className="h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map(message => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-[#009dff] text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Quick Action Buttons */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChatSubmit("Explain this mistake")}
                        className="w-full text-xs"
                      >
                        Explain this mistake
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChatSubmit("How can I improve this text?")}
                        className="w-full text-xs"
                      >
                        How can I improve this text?
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChatSubmit("Study tips for writing")}
                        className="w-full text-xs"
                      >
                        Study tips for writing
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask Elliot..."
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={() => handleChatSubmit()}
                      size="icon"
                      className="bg-[#009dff] hover:bg-[#008ae6] h-10 w-10"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingSolution;
