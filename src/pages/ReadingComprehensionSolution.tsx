
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, X } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';
import ChatPanel from '@/components/chat/ChatPanel';

// Mock reading comprehension questions data
const mockQuestions = [
  {
    id: 1,
    passage: "Climate change represents one of the most pressing challenges of our time. The scientific consensus is clear: human activities, particularly the burning of fossil fuels, are the primary drivers of recent climate change. The consequences are already visible in rising global temperatures, melting ice caps, and increasingly frequent extreme weather events. While the challenge is daunting, there are reasons for cautious optimism. Renewable energy technologies have become increasingly cost-effective, and many countries have committed to ambitious carbon reduction targets. However, the window for meaningful action is rapidly closing, and coordinated global effort is essential.",
    question: "According to the passage, what is the primary cause of recent climate change?",
    category: "Reading Comprehension",
    options: [
      "Natural climate variations",
      "Human activities, particularly burning fossil fuels",
      "Solar radiation changes", 
      "Volcanic activity"
    ],
    correctAnswer: "Human activities, particularly burning fossil fuels",
    userAnswer: "Natural climate variations",
    explanation: "The passage explicitly states that 'human activities, particularly the burning of fossil fuels, are the primary drivers of recent climate change.' This directly answers the question about the primary cause."
  },
  {
    id: 2,
    passage: "The digital revolution has fundamentally transformed how we communicate, work, and access information. Social media platforms have connected billions of people globally, enabling instant communication and information sharing. However, this connectivity comes with significant challenges. The spread of misinformation, privacy concerns, and the potential for social media addiction have raised important questions about the role of technology in society. Digital literacy has become as important as traditional literacy, with individuals needing to develop skills to critically evaluate online information and protect their digital privacy.",
    question: "What does the passage suggest about digital literacy?",
    category: "Reading Comprehension",
    options: [
      "It is less important than traditional literacy",
      "It is only needed by technology professionals",
      "It has become as important as traditional literacy",
      "It is primarily about using social media"
    ],
    correctAnswer: "It has become as important as traditional literacy",
    userAnswer: "It has become as important as traditional literacy",
    explanation: "The passage directly states that 'Digital literacy has become as important as traditional literacy,' emphasizing the equal importance of both skills in today's digital age."
  }
];

const ReadingComprehensionSolution = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const isCorrect = currentQuestion.userAnswer === currentQuestion.correctAnswer;

  const handleBackToResults = () => {
    navigate('/abstract-reasoning-results');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Fixed top navigation bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <EverestLogo />
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToResults}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Results</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Reading Comprehension - Solution Review
            </h1>
            <p className="text-lg text-gray-600">
              Review your answers and understand the explanations
            </p>
          </div>

          {/* Chat with Elliot Prompt */}
          {!isChatOpen && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center">
                  <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot" className="w-6 h-6 rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="text-blue-800 font-medium">Need help understanding any question?</p>
                  <p className="text-blue-600 text-sm">Chat with Elliot about passages, answers, and explanations!</p>
                </div>
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Elliot
                </Button>
              </div>
            </div>
          )}

          {/* Question Navigation */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </h2>
            <div className="flex gap-2">
              <Button 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === mockQuestions.length - 1}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Question Card */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none mb-6">
            <CardContent className="p-8">
              {/* Passage */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Passage:</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-700 leading-relaxed">{currentQuestion.passage}</p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Question:</h3>
                <p className="text-gray-700 font-medium">{currentQuestion.question}</p>
              </div>

              {/* Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Options:</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const letter = String.fromCharCode(65 + index);
                    const isCorrectAnswer = option === currentQuestion.correctAnswer;
                    const isUserAnswer = option === currentQuestion.userAnswer;
                    
                    return (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border-2 ${
                          isCorrectAnswer 
                            ? 'border-green-500 bg-green-50' 
                            : isUserAnswer 
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCorrectAnswer 
                              ? 'bg-green-500 text-white' 
                              : isUserAnswer 
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-300 text-gray-700'
                          }`}>
                            {letter}
                          </span>
                          <span className="text-gray-700">{option}</span>
                          {isCorrectAnswer && (
                            <span className="ml-auto text-green-600 font-medium text-sm">✓ Correct Answer</span>
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <span className="ml-auto text-red-600 font-medium text-sm">✗ Your Answer</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Result */}
              <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Explanation:</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-gray-700 leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Side Chat Panel */}
      {isChatOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white border-l border-gray-200 z-20 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Chat with Elliot</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <ChatPanel
              isOpen={true}
              onClose={() => setIsChatOpen(false)}
              questions={mockQuestions}
              currentQuestionIndex={currentQuestionIndex}
              type="reading-comprehension"
            />
          </div>
        </div>
      )}

      {/* Floating Chat Button (only show when chat is closed) */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-[#009dff] hover:bg-[#0080ff] text-white rounded-full w-14 h-14 shadow-lg z-40 flex items-center justify-center"
          size="icon"
        >
          <img 
            src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
            alt="Elliot Avatar" 
            className="w-8 h-8 rounded-full"
          />
        </Button>
      )}
    </div>
  );
};

export default ReadingComprehensionSolution;
