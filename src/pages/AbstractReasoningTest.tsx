import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { 
  Clock, 
  ChevronLeft, 
  Flag,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QuestionTracker from '@/components/test/QuestionTracker';
import QuestionTimer from '@/components/test/QuestionTimer';
import TestSummaryModal from '@/components/test/TestSummaryModal';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    prompt: "What is the next shape in this sequence?",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    answer: null
  },
  {
    id: 2,
    prompt: "Identify the pattern that does not belong in the group.",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    answer: null
  },
  {
    id: 3,
    prompt: "Which figure completes the sequence?",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    answer: null
  }
];

const AbstractReasoningTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(mockQuestions.length).fill(false));
  const [time, setTime] = useState(1200); // 20 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousQuestion();
      } else if (e.key === 'ArrowRight') {
        goToNextQuestion();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFlagQuestion();
      } else if (e.key === 'c' || e.key === 'C') {
        clearCurrentAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex]);

  // Timer countdown
  useEffect(() => {
    if (isTestCompleted) return;
    
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestCompleted]);

  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your test has been submitted automatically.",
      variant: "destructive",
    });
    handleSubmitTest();
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Check for unanswered questions before submitting
      checkForUnansweredQuestions();
    }
  };

  const toggleFlagQuestion = () => {
    const newFlaggedQuestions = [...flaggedQuestions];
    newFlaggedQuestions[currentQuestionIndex] = !newFlaggedQuestions[currentQuestionIndex];
    setFlaggedQuestions(newFlaggedQuestions);
    
    toast({
      title: newFlaggedQuestions[currentQuestionIndex] 
        ? "Question flagged" 
        : "Flag removed",
      description: newFlaggedQuestions[currentQuestionIndex] 
        ? "You've flagged this question for review" 
        : "You've removed the flag from this question",
      variant: "default",
    });
  };

  const clearCurrentAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = null;
    setAnswers(newAnswers);
    
    toast({
      title: "Answer cleared",
      description: "You've cleared your answer for this question",
      variant: "default",
    });
  };

  const getQuestionStatus = (index: number) => {
    if (flaggedQuestions[index]) return 'flagged';
    if (answers[index]) return 'answered';
    return 'blank';
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const checkForUnansweredQuestions = () => {
    const unanswered = answers.filter(answer => answer === null).length;
    
    if (unanswered > 0 || flaggedQuestions.includes(true)) {
      setShowSubmitDialog(true);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    setIsTestCompleted(true);
    // Here you would typically send data to a backend or store locally
    
    toast({
      title: "Test completed!",
      description: "Your answers have been submitted.",
      variant: "default",
    });
    
    // For demo purposes, just close the dialog
    setShowSubmitDialog(false);
  };

  const handleCancel = () => {
    setShowSubmitDialog(false);
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
              onClick={() => navigate(-1)}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Tests</span>
            </button>
            
            <QuestionTimer 
              time={time}
              isWarning={time <= 60}
            />
          </div>
        </div>
      </div>
      
      {/* Main content with top padding to account for fixed header */}
      <div className="container mx-auto pt-20 px-4 pb-24">
        {/* Test title and progress */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h1 className="text-2xl font-bold text-blue-900">
              Abstract Reasoning Test <span className="text-base font-medium text-[#009dff]">• Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
            </h1>
          </div>
          
          <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#009dff] to-[#80dfff] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Question tracker */}
          <QuestionTracker 
            questions={mockQuestions}
            currentIndex={currentQuestionIndex}
            getStatus={getQuestionStatus}
            onSelect={handleJumpToQuestion}
          />
        </div>
        
        {/* Main question card */}
        <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-blue-100">
          <CardContent className="p-0">
            {/* Category banner - Updated to use solid color instead of gradient */}
            <div className="bg-[#009dff] py-3 px-6 text-white shadow-sm rounded-t-lg">
              <p className="text-sm font-medium">{currentQuestion.category}</p>
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
                      className="max-h-[300px] w-auto mx-auto rounded object-contain question-image hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              
              {/* Answer options */}
              <div className="mb-8">
                <RadioGroup 
                  value={answers[currentQuestionIndex] || ""}
                  onValueChange={handleAnswerChange}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, idx) => {
                      const optionLabels = ['A', 'B', 'C', 'D'];
                      const optionLabel = optionLabels[idx];
                      return (
                        <div 
                          key={option}
                          className={`border rounded-xl p-4 transition-all cursor-pointer
                            ${answers[currentQuestionIndex] === option 
                              ? 'border-[#009dff] bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                            }`}
                          onClick={() => handleAnswerChange(option)}
                        >
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              answers[currentQuestionIndex] === option 
                                ? 'bg-[#009dff] text-white' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {optionLabel}
                            </div>
                            <div className="flex-1 ml-3">
                              <p className="text-gray-700 font-medium">Option {optionLabel}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
              
              {/* Flag button */}
              <div className="flex items-center justify-start mb-4">
                <Button 
                  variant="outline"
                  onClick={toggleFlagQuestion}
                  className={`border ${flaggedQuestions[currentQuestionIndex] ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-blue-100 text-[#009dff] hover:bg-blue-50'}`}
                >
                  <Flag className={`mr-2 h-4 w-4 ${flaggedQuestions[currentQuestionIndex] ? 'fill-orange-200' : ''}`} />
                  {flaggedQuestions[currentQuestionIndex] ? 'Flagged for Review' : 'Flag for Review'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={clearCurrentAnswer}
                  className="ml-2 border-gray-200 text-gray-600 hover:bg-gray-50"
                  disabled={answers[currentQuestionIndex] === null}
                >
                  Clear Answer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Keyboard shortcuts info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Keyboard shortcuts: <span className="bg-gray-100 px-2 py-1 mx-1 rounded text-xs font-mono">←/→</span> to navigate, 
            <span className="bg-gray-100 px-2 py-1 mx-1 rounded text-xs font-mono">F</span> to flag, 
            <span className="bg-gray-100 px-2 py-1 mx-1 rounded text-xs font-mono">C</span> to clear answer
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
              {currentQuestionIndex < mockQuestions.length - 1 ? (
                <Button
                  onClick={goToNextQuestion}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={checkForUnansweredQuestions}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white"
                >
                  Submit Test
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Test submission dialog */}
        {showSubmitDialog && (
          <TestSummaryModal
            isOpen={showSubmitDialog}
            onClose={handleCancel}
            onSubmit={handleSubmitTest}
            questions={mockQuestions}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
          />
        )}
      </div>
    </div>
  );
};

export default AbstractReasoningTest;
