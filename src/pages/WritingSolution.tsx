
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ChevronDown,
  ChevronUp,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Home,
  X
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import EverestLogo from '@/components/test/EverestLogo';
import ChatPanel from '@/components/chat/ChatPanel';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import { useChatContext } from '@/contexts/ChatContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data - writing prompt with image support
const writingPrompt = {
  text: "Write a creative story about an archer standing before a mysterious portal. Your story should be between 150-200 words and include elements of adventure, mystery, and personal choice. Focus on creating vivid imagery and emotional depth in your narrative.",
  image: "/writing-test.jpg", // Image prompt
  hasImage: true
};

// Mock data - this would come from your actual test results
const userText = `the archer stood still beneath the vast alien sky. A shimmering portal pulsed before them, swirling with unkown energy. Beyond it lay a world untouched, a place of either promise or peril. They had trained for this moment, yet notr aiming could calm their racling heart. With a slow breath, they drew an arrow, its tip gllowing faintly. Was this a weapon or a key? No one knew for certain. the portal whispered ancient truths only the brave would hear. Steppingn forward, bow raised, the archer made their choice. Not out of certainty, but out of courage. Sometimes the future isn't clear. Sometimes you must face it head on, trusting the strength you have built. With one final breath, the arrow flew. The journey had begun.`;

const errors = [
  {
    word: "the",
    correction: "The",
    explanation: "The word 'the' should be capitalized as it is the beginning of a sentence.",
    position: 0
  },
  {
    word: "unkown",
    correction: "unknown",
    explanation: "The correct spelling is 'unknown'.",
    position: 95
  },
  {
    word: "notr aiming",
    correction: "no training",
    explanation: "This appears to be a typo. The intended phrase was likely 'no training'.",
    position: 202
  },
  {
    word: "racling",
    correction: "racing",
    explanation: "The correct spelling is 'racing'.",
    position: 236
  },
  {
    word: "gllowing",
    correction: "glowing",
    explanation: "The correct spelling is 'glowing'.",
    position: 295
  },
  {
    word: "the",
    correction: "The",
    explanation: "The word 'the' should be capitalized as it is the beginning of a sentence.",
    position: 378
  },
  {
    word: "Steppingn",
    correction: "Stepping",
    explanation: "The correct spelling is 'Stepping'.",
    position: 450
  }
];

const aiRewrittenText = `The archer stood resolute beneath the vast, alien sky. A shimmering portal pulsed before them, swirling with unknown energy. Beyond it lay a world untouched, a realm of either promise or peril. They had trained for this moment, yet no training could calm their racing heart. With a deliberate breath, they drew an arrow, its tip glowing faintly. Was this a weapon or a key? No one knew for certain. The portal whispered ancient truths, audible only to the brave. Stepping forward with their bow raised, the archer made their choice. It was not out of certainty, but driven by courage. Sometimes the future isn't clear; sometimes you must face it head-on, trusting in the strength you have cultivated.`;

const aiGeneratedText = `In a realm where the fabric of reality was as thin as a whisper, Elysia stood, a lone warrior against the canvas of an alien sky. The moon hung low and large, casting an ethereal glow upon the barren landscape, its surface marred by craters and shadows. She steadied her breath, drawing her bowstring taut as her eyes locked onto the pulsating portal, an anomaly suspended in the twilight.

This was no ordinary mission. The ancient texts, long forgotten by most, had whispered of a prophecy: a Chosen One who would mend the rift between worlds, restoring balance to the universe. Elysia, guided by the cryptic words of an oracle, had journeyed through time and space to this desolate world, her heart set on fulfilling her destiny.

The portal before her was a maw of swirling energy, its brilliance a beacon in the desolation. As she aimed, Elysia felt the rhythmic thrum of the portal resonate with her very soul. She knew that beyond this shimmering gateway lay the Heart of the Multiverse, a source of unimaginable power that had been corrupted by unseen forces. These entities, shadowy and malevolent, sought to unravel the threads of existence, tearing asunder the worlds they touched.

Elysia's fingers released the arrow, its path true as it soared towards the portal. In that moment, time seemed to stretch and warp, the arrow leaving a trail of luminescence in its wake. It pierced the heart of the portal, and reality itself shuddered. A shockwave of light and sound erupted, washing over her with the force of a thousand storms.

As the energy dissipated, the portal began to shrink, its malevolent glow dimming into nothingness. Elysia stood unwavering, the bow still in her grasp, knowing that the battle was far from over. Yet, she had taken the first step in a journey that would lead her across dimensions, uniting allies, and confronting the darkness that threatened all of existence. Her resolve hardened by the prophecy, Elysia prepared to step into the unknown, the echoes of her destiny guiding her forward.`;

const WritingSolution = () => {
  const navigate = useNavigate();
  const [showExplanations, setShowExplanations] = useState(false);
  const [activeTab, setActiveTab] = useState("original");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setMessages } = useChatContext();
  const isMobile = useIsMobile();

  const handleBackToTest = () => {
    navigate('/writing-test');
  };

  const handleBackToResults = () => {
    navigate('/writing-results');
  };

  const handleAIRewrite = () => {
    setActiveTab("rewritten");
  };

  const handleAIGenerate = () => {
    setActiveTab("generated");
  };

  const handleOpenChat = () => {
    // Add writing solution context to chat
    const solutionMessage = {
      id: 'solution-context',
      type: 'assistant' as const,
      content: "I can see you're reviewing your writing solution! I have access to your original text, all the highlighted errors, corrections, and the AI-generated versions. I can help explain any mistakes, provide writing tips, or discuss how to improve your writing skills. What would you like to know?",
      timestamp: new Date(),
      quickReplies: ["Explain this mistake", "How can I improve this text?", "Study tips for writing"]
    };
    
    setMessages(prev => [...prev, solutionMessage]);
    setIsChatOpen(true);
  };

  // Function to highlight errors in text with tooltips
  const highlightErrorsWithTooltips = (text: string) => {
    let highlightedText = text;
    
    // Sort errors by position in reverse order to avoid index shifting
    const sortedErrors = [...errors].sort((a, b) => b.position - a.position);
    
    sortedErrors.forEach((error, index) => {
      const before = highlightedText.substring(0, error.position);
      const after = highlightedText.substring(error.position + error.word.length);
      highlightedText = before + `<span class="error-highlight" data-error-index="${index}">${error.word}</span>` + after;
    });
    
    return highlightedText;
  };

  const errorCount = errors.length;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
        {/* Chat Panel - Full screen overlay on mobile */}
        {isChatOpen && (
          <div className={`
            fixed inset-0 z-50 bg-white
            ${isMobile ? 'w-full' : 'left-auto w-96 shadow-2xl border-l border-gray-200'}
          `}>
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden shadow-lg">
                    <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">Chat with Elliot</h2>
                    <p className="text-sm text-blue-700">Your AI writing assistant</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} className="hover:bg-blue-100">
                  {isMobile ? <X className="h-5 w-5 text-blue-700" /> : <ArrowLeft className="h-5 w-5 text-blue-700" />}
                </Button>
              </div>
              
              {/* Chat Content */}
              <div className="flex-1">
                <ChatPanel 
                  isOpen={true} 
                  onClose={() => setIsChatOpen(false)} 
                  type="writing-solution"
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Hidden on mobile when chat is open */}
        <div className={`${isChatOpen && isMobile ? 'hidden' : 'block'}`}>
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            {/* Mobile Header */}
            <div className="md:hidden">
              <div className="px-4 py-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="flex justify-start">
                    <button 
                      onClick={handleBackToResults}
                      className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <EverestLogo />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Home className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <EverestLogo />
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => navigate('/writing-test')}
                        className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        <span className="text-sm">Back to Test</span>
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={handleBackToResults}
                    className="bg-[#009dff] hover:bg-[#008ae6] text-white flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Results
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 py-4 md:py-6 pb-24">
            <div className={`max-w-7xl mx-auto ${!isMobile ? 'container' : ''}`}>
              {/* Page Title */}
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-2 md:mb-4">Writing - Solution Review</h1>
                <p className="text-sm md:text-lg text-gray-600">Review your writing and understand the AI feedback</p>
              </div>

              {/* Chat with Elliot Banner - Only show when chat is closed */}
              {!isChatOpen && (
                <div className="mb-4 md:mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 md:p-4 rounded-2xl border border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0">
                          <img 
                            src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                            alt="Elliot Avatar" 
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base md:text-lg text-blue-900 truncate">Need help understanding?</h3>
                          <p className="text-blue-700 text-xs md:text-sm">Chat with Elliot about your writing!</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleOpenChat}
                        className="bg-[#009dff] hover:bg-[#0080ff] text-white px-3 py-2 md:px-6 md:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm md:text-base flex-shrink-0"
                      >
                        <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Chat with Elliot</span>
                        <span className="sm:hidden">Chat</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Cards - Responsive layout */}
              <div className="space-y-4 md:space-y-6">
                {/* Writing Prompt and Submission - Stack on mobile, side by side on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {/* Writing Prompt */}
                  <Card className="bg-white rounded-xl md:rounded-2xl border-none shadow-lg md:shadow-xl shadow-blue-100/50">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl md:rounded-t-2xl p-4 md:p-6">
                      <CardTitle className="text-lg md:text-xl font-medium text-blue-900">Writing Prompt</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                      {writingPrompt.hasImage ? (
                        <div className="space-y-3 md:space-y-4">
                          <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                            <img 
                              src={writingPrompt.image} 
                              alt="Writing prompt" 
                              className="w-full h-32 md:h-48 object-cover rounded-lg"
                            />
                          </div>
                          <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
                            <p className="text-sm md:text-base leading-relaxed text-gray-800">{writingPrompt.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
                          <p className="text-sm md:text-base leading-relaxed text-gray-800">{writingPrompt.text}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* User Submission with Error Summary */}
                  <Card className="bg-white rounded-xl md:rounded-2xl border-none shadow-lg md:shadow-xl shadow-blue-100/50">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl md:rounded-t-2xl p-4 md:p-6">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="text-lg md:text-xl font-medium text-blue-900">Your Submission</CardTitle>
                        <div className="flex items-center gap-2 text-xs md:text-sm">
                          <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                          <span className="text-red-600 font-medium">{errorCount} errors found</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200 mb-3 md:mb-4">
                        <div 
                          className="text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: highlightErrorsWithTooltips(userText) }}
                        />
                      </div>

                      {/* Collapsible Error Explanations */}
                      <Collapsible open={showExplanations} onOpenChange={setShowExplanations}>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" className="w-full justify-between border-[#009dff] text-[#009dff] hover:bg-blue-50 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                              <span>Error Explanations ({errorCount})</span>
                            </div>
                            {showExplanations ? <ChevronUp className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 md:mt-4">
                          <div className="space-y-2 md:space-y-3">
                            {errors.map((error, index) => (
                              <div key={index} className="bg-red-50 p-2 md:p-3 rounded-lg border border-red-200">
                                <div className="flex items-start space-x-2 md:space-x-3">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                                  <div className="flex-1 text-xs md:text-sm">
                                    <div className="mb-1">
                                      <span className="font-medium text-red-800">"{error.word}"</span>
                                      <span className="mx-1 md:mx-2">→</span>
                                      <span className="font-medium text-green-700">"{error.correction}"</span>
                                    </div>
                                    <p className="text-gray-700">{error.explanation}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Results with Tabs */}
                <Card className="bg-white rounded-xl md:rounded-2xl border-none shadow-lg md:shadow-xl shadow-blue-100/50">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl md:rounded-t-2xl p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl font-medium text-blue-900">AI-Enhanced Results</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-blue-50 border border-blue-200 h-auto p-1">
                        <TabsTrigger value="original" className="data-[state=active]:bg-[#009dff] data-[state=active]:text-white data-[state=active]:shadow-lg text-xs md:text-sm px-2 py-2 md:px-3 md:py-2">Original</TabsTrigger>
                        <TabsTrigger value="rewritten" className="data-[state=active]:bg-[#009dff] data-[state=active]:text-white data-[state=active]:shadow-lg text-xs md:text-sm px-2 py-2 md:px-3 md:py-2">AI Rewrite</TabsTrigger>
                        <TabsTrigger value="generated" className="data-[state=active]:bg-[#009dff] data-[state=active]:text-white data-[state=active]:shadow-lg text-xs md:text-sm px-2 py-2 md:px-3 md:py-2">AI Generate</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="original" className="mt-4 md:mt-6">
                        <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
                          <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {userText}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-xs md:text-sm text-gray-600 mt-3 md:mt-4 bg-orange-50 p-2 md:p-3 rounded-lg border border-orange-200">
                          <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-orange-600" />
                          <p>Your original submission with {errorCount} highlighted errors to review and learn from.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="rewritten" className="mt-4 md:mt-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl border border-blue-200 shadow-sm">
                          <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {aiRewrittenText}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-xs md:text-sm text-blue-700 mt-3 md:mt-4 bg-green-50 p-2 md:p-3 rounded-lg border border-green-200">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-green-600" />
                          <p>Your text rewritten by AI with corrections applied and improved flow while maintaining your original ideas.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="generated" className="mt-4 md:mt-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl border border-blue-200 shadow-sm max-h-80 md:max-h-96 overflow-y-auto">
                          <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {aiGeneratedText}
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 text-xs md:text-sm text-blue-700 mt-3 md:mt-4 bg-green-50 p-2 md:p-3 rounded-lg border border-green-200">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-green-600" />
                          <p>A completely new response generated by AI to show different approaches to the same prompt.</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sticky Action Bar - Mobile optimized */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="px-4 py-3">
              <div className="max-w-7xl mx-auto">
                {isMobile ? (
                  /* Mobile: Single column layout */
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setActiveTab("rewritten")}
                      className="bg-gradient-to-r from-[#009dff] to-[#33a9ff] hover:from-[#008ae6] hover:to-[#2998ff] text-white px-3 py-2 rounded-lg text-sm font-medium flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      AI Rewrite
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("generated")}
                      className="bg-gradient-to-r from-[#009dff] to-[#33a9ff] hover:from-[#008ae6] hover:to-[#2998ff] text-white px-3 py-2 rounded-lg text-sm font-medium flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      AI Generate
                    </Button>
                    <Button 
                      onClick={() => navigate('/writing-results')}
                      variant="outline"
                      className="border-2 border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Results
                    </Button>
                  </div>
                ) : (
                  /* Desktop: Three column layout */
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setActiveTab("rewritten")}
                      className="bg-gradient-to-r from-[#009dff] to-[#33a9ff] hover:from-[#008ae6] hover:to-[#2998ff] text-white px-6 py-2 rounded-xl text-base font-medium flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      View AI Rewrite
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("generated")}
                      className="bg-gradient-to-r from-[#009dff] to-[#33a9ff] hover:from-[#008ae6] hover:to-[#2998ff] text-white px-6 py-2 rounded-xl text-base font-medium flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      View AI Generate
                    </Button>
                    <Button 
                      onClick={() => navigate('/writing-results')}
                      variant="outline"
                      className="border-2 border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-6 py-2 rounded-xl text-base font-medium flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Back to Results
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chat Button - Only show when chat is closed and not mobile */}
        {!isChatOpen && !isMobile && (
          <FloatingChatButton onClick={handleOpenChat} />
        )}
      </div>
      
      {/* CSS for error highlighting using a style element */}
      <style>
        {`
          .error-highlight {
            background-color: rgb(254 226 226);
            color: rgb(153 27 27);
            padding: 2px 4px;
            border-radius: 4px;
            font-weight: 600;
            cursor: help;
            border: 1px solid rgb(252 165 165);
          }
          .error-highlight:hover {
            background-color: rgb(252 165 165);
            box-shadow: 0 0 0 2px rgb(239 68 68);
          }
        `}
      </style>
    </TooltipProvider>
  );
};

export default WritingSolution;
