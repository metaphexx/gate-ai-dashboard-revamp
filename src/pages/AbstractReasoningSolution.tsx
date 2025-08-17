
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
} from 'lucide-react';
import QuestionTracker from '@/components/test/QuestionTracker';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for questions with solutions
const mockQuestionsWithSolutions = [
  {
    id: 1,
    prompt: "What is the next shape in this sequence?",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    userAnswer: "B",
    explanation: "The pattern shows shapes rotating 90 degrees clockwise in each step. Following this pattern, the next shape should be option C, which shows the correct rotation."
  },
  {
    id: 2,
    prompt: "Identify the pattern that does not belong in the group.",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    userAnswer: "A",
    explanation: "All shapes except A follow the same symmetrical pattern. Option A breaks this pattern by having an asymmetrical design."
  },
  {
    id: 3,
    prompt: "Which figure completes the sequence?",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    userAnswer: null,
    explanation: "The sequence shows alternating colors and increasing number of sides. Option D correctly continues this pattern with the appropriate color and shape."
  }
];

const AbstractReasoningSolution = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const currentQuestion = mockQuestionsWithSolutions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestionsWithSolutions.length) * 100;

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
    if (currentQuestionIndex < mockQuestionsWithSolutions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getQuestionStatus = (index: number) => {
    const question = mockQuestionsWithSolutions[index];
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
              onClick={() => navigate('/abstract-reasoning-results')}
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
              Abstract Reasoning - Solution Review <span className="text-base font-medium text-[#009dff]">• Question {currentQuestionIndex + 1} of {mockQuestionsWithSolutions.length}</span>
            </h1>
          </div>
          
          <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#009dff] to-[#80dfff] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Question tracker - modified for solution view */}
          <div className="mb-8 overflow-visible">
            <div className="flex space-x-3 overflow-visible">
              {mockQuestionsWithSolutions.map((question, index) => {
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
              <h2 className="text-xl font-semibold text-gray-800 mb-8">
                {currentQuestion.prompt}
              </h2>
              
              {/* Image section */}
              <div className="mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="relative">
                    <img 
                      src={currentQuestion.image}
                      alt="Abstract reasoning question" 
                      className="max-h-[300px] w-auto mx-auto rounded object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Answer options with highlighting */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <p className={`font-medium ${textColor}`}>Option {optionLabel}</p>
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
        <div className="mt-6 text-center hidden sm:block">
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
              {currentQuestionIndex < mockQuestionsWithSolutions.length - 1 ? (
                <Button
                  onClick={goToNextQuestion}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/abstract-reasoning-results')}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  Back to Results
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractReasoningSolution;
