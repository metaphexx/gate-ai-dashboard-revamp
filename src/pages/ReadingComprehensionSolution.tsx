
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MessageCircle, X, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
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
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePreviousQuestion();
      } else if (e.key === 'ArrowRight') {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex]);

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

  const getQuestionStatus = (index: number) => {
    const question = mockQuestions[index];
    if (question.userAnswer === question.correctAnswer) return 'correct';
    if (question.userAnswer === null) return 'unanswered';
    return 'incorrect';
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
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

      {/* Main content with side-by-side layout */}
      <div className="flex flex-1 pt-16 pb-20">
        {/* Left side - Questions content */}
        <div className={`${isChatOpen ? 'w-2/3' : 'w-full'} transition-all duration-300 overflow-y-auto`}>
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  Reading Comprehension - Solution Review
                </h1>
                <p className="text-lg text-gray-600">
                  Review your answers and understand the explanations
                </p>
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden mb-6">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#009dff] to-[#80dfff] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Question tracker */}
              <div className="mb-8 overflow-visible">
                <div className="flex space-x-3 overflow-visible">
                  {mockQuestions.map((question, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <button
                        key={question.id}
                        onClick={() => handleJumpToQuestion(index)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all relative overflow-visible ${
                          index === currentQuestionIndex
                            ? 'bg-gradient-to-r from-[#009dff] to-[#80dfff] text-white shadow-lg shadow-blue-200' 
                            : status === 'correct'
                              ? 'bg-green-100 text-green-700' 
                              : status === 'incorrect'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                        aria-label={`Question ${index + 1}`}
                      >
                        {index + 1}
                        {status === 'correct' && index !== currentQuestionIndex && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center z-10">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </span>
                        )}
                        {status === 'incorrect' && index !== currentQuestionIndex && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center z-10">
                            <XCircle className="w-3 h-3 text-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-100 mr-1"></span>
                    <span>Correct</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-100 mr-1"></span>
                    <span>Incorrect</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-gray-100 mr-1"></span>
                    <span>Not answered</span>
                  </div>
                </div>
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

              {/* Question Card with improved layout */}
              <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-blue-100 mb-6">
                <CardContent className="p-0">
                  {/* Category banner */}
                  <div className="bg-gradient-to-r from-[#009dff] to-[#33a9ff] text-white p-4 text-center">
                    <p className="text-sm font-medium">{currentQuestion.category}</p>
                  </div>
                  
                  {/* Content area with improved layout - 60% passage, 40% question */}
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                      {/* Left side - Passage (larger area - 3/5) */}
                      <div className="xl:col-span-3 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Passage:</h3>
                        <ScrollArea className="h-[600px] w-full rounded-lg border border-gray-300 p-6 bg-white shadow-sm">
                          <div className="pr-4">
                            {currentQuestion.passage.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="text-gray-800 leading-relaxed text-base mb-6 last:mb-0 font-medium">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      {/* Right side - Question and Options (smaller area - 2/5) */}
                      <div className="xl:col-span-2 space-y-6">
                        {/* Question */}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Question:</h3>
                          <p className="text-gray-800 font-medium text-lg leading-relaxed">{currentQuestion.question}</p>
                        </div>
                        
                        {/* Options */}
                        <div>
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
                                    <span className="text-gray-800 leading-relaxed flex-1">{option}</span>
                                    {isCorrectAnswer && (
                                      <span className="text-green-600 font-medium text-sm">✓ Correct Answer</span>
                                    )}
                                    {isUserAnswer && !isCorrectAnswer && (
                                      <span className="text-red-600 font-medium text-sm">✗ Your Answer</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Result */}
                        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
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
                            <p className="text-gray-800 leading-relaxed">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Keyboard shortcuts info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Keyboard shortcuts: <span className="bg-gray-100 px-2 py-1 mx-1 rounded text-xs font-mono">←/→</span> to navigate
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Chat Panel */}
        {isChatOpen && (
          <div className="w-1/3 border-l border-gray-200 bg-white flex flex-col">
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
      </div>

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {currentQuestionIndex < mockQuestions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleBackToResults}
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                Back to Results
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Chat Button (only show when chat is closed) */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-24 right-6 bg-[#009dff] hover:bg-[#0080ff] text-white rounded-full w-14 h-14 shadow-lg z-40 flex items-center justify-center"
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
