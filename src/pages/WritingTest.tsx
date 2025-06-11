
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  ChevronLeft, 
  Flag,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QuestionTimer from '@/components/test/QuestionTimer';
import TestSummaryModal from '@/components/test/TestSummaryModal';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for writing questions
const mockQuestions = [
  {
    id: 1,
    prompt: "Use this idea as the basis for a piece of writing. You may write in any style.",
    category: "Creative Writing",
    image: "/writing-test.jpg",
    instruction: "Look at the image above and write a creative piece inspired by what you see. You may choose any writing style - narrative, descriptive, persuasive, or analytical. Your response should be a minimum of 120 words.",
    minWords: 120,
    answer: null
  }
];

const WritingTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(mockQuestions.length).fill(false));
  const [time, setTime] = useState(2700); // 45 minutes in seconds for writing
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
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

  // Count words in current answer
  useEffect(() => {
    const currentAnswer = answers[currentQuestionIndex] || '';
    const words = currentAnswer.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [answers, currentQuestionIndex]);

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

  const checkForUnansweredQuestions = () => {
    const unanswered = answers.filter(answer => answer === null || answer.trim() === '').length;
    const hasShortAnswers = answers.some((answer, index) => {
      if (!answer) return false;
      const words = answer.trim().split(/\s+/).filter(word => word.length > 0);
      return words.length < mockQuestions[index].minWords;
    });
    
    if (unanswered > 0 || flaggedQuestions.includes(true) || hasShortAnswers) {
      setShowSubmitDialog(true);
    } else {
      handleSubmitTest();
    }
  };

  const handleSubmitTest = () => {
    setIsTestCompleted(true);
    
    toast({
      title: "Test completed!",
      description: "Your writing has been submitted.",
      variant: "default",
    });
    
    setShowSubmitDialog(false);
    navigate('/writing-results');
  };

  const handleCancel = () => {
    setShowSubmitDialog(false);
  };

  const canSubmit = wordCount >= currentQuestion.minWords;

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
              Writing Test <span className="text-base font-medium text-[#009dff]">• Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
            </h1>
          </div>
          
          <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden mb-6">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#009dff] to-[#80dfff] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Main question card */}
        <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-blue-100">
          <CardContent className="p-0">
            {/* Category banner */}
            <div className="bg-[#009dff] py-3 px-6 text-white shadow-sm rounded-t-lg">
              <p className="text-sm font-medium">{currentQuestion.category}</p>
            </div>
            
            {/* Question content */}
            <div className="p-6 md:p-8">
              {/* Question prompt */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentQuestion.prompt}
              </h2>
              
              {/* Image section */}
              <div className="mb-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="relative">
                    <img 
                      src={currentQuestion.image}
                      alt="Writing prompt image" 
                      className="w-full max-h-[400px] rounded-lg object-cover shadow-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-[#009dff]">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-[#009dff] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{currentQuestion.instruction}</p>
                </div>
              </div>
              
              {/* Writing area */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-lg font-semibold text-gray-900">Your Response:</label>
                  <div className="flex items-center space-x-4">
                    <div className={`text-sm px-3 py-1 rounded-full ${
                      wordCount >= currentQuestion.minWords 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {wordCount} / {currentQuestion.minWords} words minimum
                    </div>
                    {!canSubmit && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Need {currentQuestion.minWords - wordCount} more words
                      </div>
                    )}
                  </div>
                </div>
                
                <Textarea
                  value={answers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Write something here..."
                  className="min-h-[400px] text-base leading-relaxed resize-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]"
                />
              </div>
              
              {/* Flag and Clear buttons */}
              <div className="flex items-center justify-start space-x-2">
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
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  disabled={answers[currentQuestionIndex] === null || answers[currentQuestionIndex] === ''}
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
                  disabled={!canSubmit}
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

export default WritingTest;
