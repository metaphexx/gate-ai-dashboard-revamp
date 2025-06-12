
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
  MessageCircle
} from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatPanel from '@/components/chat/ChatPanel';
import { useChatContext } from '@/contexts/ChatContext';

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
  const [showExplanations, setShowExplanations] = useState(true);
  const [showRewritten, setShowRewritten] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setMessages } = useChatContext();

  const handleBackToTest = () => {
    navigate('/writing-test');
  };

  const handleBackToResults = () => {
    navigate('/writing-results');
  };

  const handleAIRewrite = () => {
    setShowRewritten(true);
    setShowGenerated(false);
  };

  const handleAIGenerate = () => {
    setShowGenerated(true);
    setShowRewritten(false);
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

  // Function to highlight errors in text
  const highlightErrors = (text: string) => {
    let highlightedText = text;
    
    // Sort errors by position in reverse order to avoid index shifting
    const sortedErrors = [...errors].sort((a, b) => b.position - a.position);
    
    sortedErrors.forEach(error => {
      const before = highlightedText.substring(0, error.position);
      const after = highlightedText.substring(error.position + error.word.length);
      highlightedText = before + `<span class="bg-red-100 text-red-800 px-1 rounded font-semibold">${error.word}</span>` + after;
    });
    
    return highlightedText;
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
                  onClick={handleBackToTest}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span className="text-sm">Back to Test</span>
                </button>
              </div>
            </div>
            <Button
              onClick={handleOpenChat}
              className="bg-[#009dff] hover:bg-[#008ae6] text-white flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with Elliot
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#009dff] mb-2">Writing - Solution Review</h1>
            <p className="text-lg text-gray-600">Review your writing and understand the AI feedback</p>
          </div>

          {/* User Written Text with Highlighted Errors */}
          <Card className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-900">Your Submitted Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <div 
                  className="text-base leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: highlightErrors(userText) }}
                />
              </div>

              {/* Error Explanations */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowExplanations(!showExplanations)}
                  className="flex items-center text-[#009dff] hover:text-[#008ae6] font-medium mb-4"
                >
                  {showExplanations ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
                  {showExplanations ? 'Hide' : 'Show'} Error Explanations
                </button>

                {showExplanations && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-lg mb-3">Explanation of Highlighted Mistakes</h4>
                    {errors.map((error, index) => (
                      <Card key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="mb-2">
                                <span className="text-sm text-blue-600 font-medium">Highlighted Mistakes:</span>
                                <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded font-semibold text-sm">
                                  {error.word}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm text-blue-600 font-medium">Correction:</span>
                                <span className="ml-2 text-green-700 font-semibold">{error.correction}</span>
                              </div>
                              <div>
                                <span className="text-sm text-blue-600 font-medium">Explanation:</span>
                                <span className="ml-2 text-gray-700">{error.explanation}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={handleAIRewrite}
              className="bg-[#009dff] hover:bg-[#008ae6] text-white px-6 py-3 rounded-xl text-base font-medium flex-1"
            >
              AI Rewrite My Text
            </Button>
            <Button 
              onClick={handleAIGenerate}
              className="bg-[#009dff] hover:bg-[#008ae6] text-white px-6 py-3 rounded-xl text-base font-medium flex-1"
            >
              AI Generate New Text
            </Button>
            <Button 
              onClick={handleBackToResults}
              variant="outline"
              className="border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-6 py-3 rounded-xl text-base font-medium flex-1"
            >
              Back to Results
            </Button>
          </div>

          {/* AI-Generated Refined Version */}
          {(showRewritten || showGenerated) && (
            <Card className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-[#009dff]">AI-Crafted Refined Version</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="text-base leading-relaxed whitespace-pre-wrap">
                    {showRewritten ? aiRewrittenText : aiGeneratedText}
                  </div>
                </div>
                <div className="flex items-start space-x-2 text-sm text-blue-600">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">i</span>
                  </div>
                  <p>
                    This AI-generated result provides a completely reimagined version of the text, tailored to the prompt and designed to meet high evaluation criteria.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={handleOpenChat} />

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default WritingSolution;
