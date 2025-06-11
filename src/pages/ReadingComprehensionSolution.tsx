
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  MessageCircle,
} from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatPanel from '@/components/chat/ChatPanel';

// Mock data for reading comprehension questions with solutions
const mockReadingComprehensionQuestions = [
  {
    id: 1,
    prompt: "Read the following passage and answer the question below:",
    passage: "Climate change represents one of the most pressing challenges of our time. Scientists worldwide have reached a consensus that human activities, particularly the burning of fossil fuels, are the primary drivers of recent climate change. The consequences are already visible: rising sea levels, more frequent extreme weather events, and shifts in precipitation patterns.",
    question: "According to the passage, what is the primary cause of recent climate change?",
    category: "Reading Comprehension",
    options: ["Natural climate cycles", "Human activities, particularly burning fossil fuels", "Solar radiation changes", "Volcanic activity"],
    correctAnswer: "Human activities, particularly burning fossil fuels",
    userAnswer: "Natural climate cycles",
    explanation: "The passage clearly states that 'human activities, particularly the burning of fossil fuels, are the primary drivers of recent climate change.' This is explicitly mentioned as the scientific consensus."
  },
  {
    id: 2,
    prompt: "Read the following passage and answer the question below:",
    passage: "The rise of artificial intelligence has transformed numerous industries, from healthcare to transportation. Machine learning algorithms can now diagnose diseases with remarkable accuracy, sometimes surpassing human physicians in specific tasks. However, concerns about job displacement and ethical implications continue to be debated among experts.",
    question: "What does the passage suggest about AI's performance in medical diagnosis?",
    category: "Reading Comprehension",
    options: ["AI is less accurate than humans", "AI can sometimes outperform human physicians", "AI cannot be used in healthcare", "AI is only useful for transportation"],
    correctAnswer: "AI can sometimes outperform human physicians",
    userAnswer: "AI can sometimes outperform human physicians",
    explanation: "The passage states that machine learning algorithms 'can now diagnose diseases with remarkable accuracy, sometimes surpassing human physicians in specific tasks,' indicating that AI can sometimes outperform humans in medical diagnosis."
  },
  {
    id: 3,
    prompt: "Read the following passage and answer the question below:",
    passage: "Urban gardening has gained popularity as cities seek sustainable solutions to food security and environmental challenges. Rooftop gardens, community plots, and vertical farming systems are transforming unused urban spaces into productive agricultural areas. These initiatives not only provide fresh produce but also help reduce carbon footprints and strengthen community bonds.",
    question: "According to the passage, urban gardening helps with all of the following EXCEPT:",
    category: "Reading Comprehension",
    options: ["Food security", "Reducing carbon footprints", "Strengthening community bonds", "Increasing property values"],
    correctAnswer: "Increasing property values",
    userAnswer: null,
    explanation: "The passage mentions that urban gardening helps with food security, reducing carbon footprints, and strengthening community bonds. However, it does not mention anything about increasing property values."
  }
];

const ReadingComprehensionSolution = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const currentQuestion = mockReadingComprehensionQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockReadingComprehensionQuestions.length) * 100;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousQuestion();
      } else if (e.key === 'ArrowRight') {
        goToNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex]);

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockReadingComprehensionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getQuestionStatus = (index: number) => {
    const question = mockReadingComprehensionQuestions[index];
    if (question.userAnswer === question.correctAnswer) return 'correct';
    if (question.userAnswer === null) return 'unanswered';
    return 'incorrect';
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const getAnswerIcon = () => {
    if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (currentQuestion.userAnswer === null) {
      return <XCircle className="h-5 w-5 text-gray-400" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getAnswerStatus = () => {
    if (currentQuestion.userAnswer === currentQuestion.correctAnswer) {
      return { text: "Correct", color: "text-green-600", bg: "bg-green-50" };
    } else if (currentQuestion.userAnswer === null) {
      return { text: "Not Answered", color: "text-gray-600", bg: "bg-gray-50" };
    } else {
      return { text: "Incorrect", color: "text-red-600", bg: "bg-red-50" };
    }
  };

  const answerStatus = getAnswerStatus();

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
              onClick={() => navigate('/history')}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Results</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content with top padding to account for fixed header */}
      <div className="container mx-auto pt-20 px-4 pb-24">
        {/* Test title and progress */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h1 className="text-2xl font-bold text-blue-900">
              Reading Comprehension - Solution Review <span className="text-base font-medium text-[#009dff]">• Question {currentQuestionIndex + 1} of {mockReadingComprehensionQuestions.length}</span>
            </h1>
          </div>
          
          <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#009dff] to-[#80dfff] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Chat with Elliot prompt */}
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                <img src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" alt="Elliot Avatar" className="w-8 h-8 rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">💬 Need help understanding?</span> Chat with Elliot about any question, passage, or explanation!
                </p>
              </div>
              <Button
                onClick={() => setIsChatOpen(true)}
                size="sm"
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat Now
              </Button>
            </div>
          </div>
          
          {/* Question tracker */}
          <div className="mb-8 overflow-visible">
            <div className="flex space-x-3 overflow-visible">
              {mockReadingComprehensionQuestions.map((question, index) => {
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
        </div>
        
        {/* Main question card */}
        <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-blue-100">
          <CardContent className="p-0">
            {/* Category banner with answer status */}
            <div className={`${answerStatus.bg} py-3 px-6 shadow-sm rounded-t-lg border-b`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">{currentQuestion.category}</p>
                <div className="flex items-center space-x-2">
                  {getAnswerIcon()}
                  <span className={`text-sm font-medium ${answerStatus.color}`}>
                    {answerStatus.text}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Question content */}
            <div className="p-6 md:p-8">
              {/* Question prompt */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentQuestion.prompt}
              </h2>
              
              {/* Passage section */}
              <div className="mb-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Passage</h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {currentQuestion.passage}
                  </p>
                </div>
              </div>
              
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Question</h3>
                <p className="text-gray-700 text-base">
                  {currentQuestion.question}
                </p>
              </div>
              
              {/* Answer options with highlighting */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Answer Options</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const optionLabels = ['A', 'B', 'C', 'D'];
                    const optionLabel = optionLabels[idx];
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isUserAnswer = option === currentQuestion.userAnswer;
                    
                    let borderColor = 'border-gray-200';
                    let bgColor = 'bg-white';
                    let textColor = 'text-gray-700';
                    
                    if (isCorrect) {
                      borderColor = 'border-green-500';
                      bgColor = 'bg-green-50';
                      textColor = 'text-green-700';
                    } else if (isUserAnswer && !isCorrect) {
                      borderColor = 'border-red-500';
                      bgColor = 'bg-red-50';
                      textColor = 'text-red-700';
                    }
                    
                    return (
                      <div 
                        key={option}
                        className={`border-2 rounded-xl p-4 ${borderColor} ${bgColor}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              isCorrect 
                                ? 'bg-green-500 text-white' 
                                : isUserAnswer && !isCorrect
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-100 text-gray-700'
                            }`}>
                              {optionLabel}
                            </div>
                            <div className="flex-1 ml-3">
                              <p className={`font-medium ${textColor}`}>{option}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {isUserAnswer && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                            {isCorrect && <span className="text-xs font-medium text-green-600">Correct Answer</span>}
                            {isUserAnswer && !isCorrect && <span className="text-xs font-medium text-red-600">Your Answer</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Explanation */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Explanation</h3>
                <p className="text-blue-800 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
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
        
        {/* Fixed bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {currentQuestionIndex < mockReadingComprehensionQuestions.length - 1 ? (
                <Button
                  onClick={goToNextQuestion}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/history')}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  Back to Results
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Chat Button */}
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      
      {/* Chat Panel */}
      <ChatPanel 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        questions={mockReadingComprehensionQuestions}
        currentQuestionIndex={currentQuestionIndex}
        type="reading-comprehension"
      />
    </div>
  );
};

export default ReadingComprehensionSolution;
