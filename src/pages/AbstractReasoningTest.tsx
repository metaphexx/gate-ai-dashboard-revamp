
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Flag, Maximize, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [time, setTime] = useState(1200); // 20 minutes in seconds
  const [fullscreen, setFullscreen] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged);
  };

  const handleFlagQuestion = () => {
    console.log(`Question ${currentQuestionIndex + 1} flagged for review`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Fixed top navigation bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-700 hover:text-indigo-500 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back to Tests</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className={`font-medium ${time < 60 ? 'animate-pulse text-red-500' : ''}`}>
                {formatTime(time)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with top padding to account for fixed header */}
      <div className="container mx-auto pt-20 px-4 pb-24">
        {/* Test title and progress */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h1 className="text-2xl font-bold text-indigo-900">
              Abstract Reasoning Test
            </h1>
            <span className="text-sm text-indigo-600 font-medium">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </span>
          </div>
          
          <div className="relative h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question dots navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2">
            {mockQuestions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
                  ${index === currentQuestionIndex 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200' 
                    : answers[index] !== null
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main question card */}
        <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-indigo-100">
          <CardContent className="p-0">
            {/* Category banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-6 text-white">
              <p className="text-sm font-medium">{currentQuestion.category}</p>
            </div>
            
            {/* Question content */}
            <div className="p-6 md:p-8">
              {/* Question prompt */}
              <h2 className="text-xl font-semibold text-gray-800 mb-8">
                {currentQuestion.prompt}
              </h2>
              
              {/* Image section */}
              <div className={`relative mb-8 transition-all duration-300
                ${isImageEnlarged ? 'scale-110' : 'scale-100'}`}>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="relative">
                    <img 
                      src={currentQuestion.image}
                      alt="Abstract reasoning question" 
                      className="max-h-[300px] w-auto mx-auto rounded object-contain"
                    />
                    <button 
                      onClick={toggleImageSize}
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-lg hover:bg-white shadow-sm"
                      aria-label="Enlarge image"
                    >
                      <Maximize size={18} />
                    </button>
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
                    {currentQuestion.options.map((option) => (
                      <div 
                        key={option}
                        className={`border rounded-xl p-4 transition-all
                          ${answers[currentQuestionIndex] === option 
                            ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                            : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem 
                            value={option} 
                            id={`option-${option}`}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label 
                              htmlFor={`option-${option}`}
                              className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
                            >
                              Option {option}
                            </label>
                            <p className="text-gray-500 text-sm">
                              Select this answer
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Fixed bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={handleFlagQuestion}
              className="border-indigo-100 text-indigo-600 hover:bg-indigo-50"
            >
              <Flag className="mr-2 h-4 w-4" />
              Flag for Review
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="border-gray-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === mockQuestions.length - 1}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Fullscreen image modal */}
        {fullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={currentQuestion.image}
                alt="Abstract reasoning question fullscreen" 
                className="max-h-[80vh] max-w-full object-contain"
              />
              <button 
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full"
              >
                <Maximize className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbstractReasoningTest;
