
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Flag, Maximize, ZoomIn } from 'lucide-react';

// Mock data for questions (in a real app, this would come from an API)
const mockQuestions = [
  {
    id: 1,
    prompt: "What is the next shape in this sequence?",
    category: "Pattern Recognition",
    image: "/abstract-reasoning.jpg", // Using the existing abstract reasoning image
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

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          // Handle time's up scenario
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

  const handleFlagQuestion = () => {
    // Implementation for flagging questions for review
    console.log(`Question ${currentQuestionIndex + 1} flagged for review`);
  };

  const questionButtons = mockQuestions.map((question, index) => (
    <button
      key={question.id}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
        index === currentQuestionIndex
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
        : answers[index] !== null
        ? 'bg-accent text-accent-foreground'
        : 'bg-muted text-muted-foreground hover:bg-muted/80'
      }`}
      onClick={() => setCurrentQuestionIndex(index)}
      aria-current={index === currentQuestionIndex ? "true" : "false"}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Header with progress bar */}
      <div className="mb-2">
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>

      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Title and question count */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Abstract Reasoning Test <span className="text-gray-500 text-base font-normal">• Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
          </h1>
          
          {/* Timer card - fixed position */}
          <div className="fixed top-6 right-6 z-10">
            <Card className="shadow-md border border-gray-100">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <span className="font-medium text-sm mr-2">Time Remaining:</span>
                  <span className={`bg-red-50 text-red-500 px-3 py-1 rounded-full text-sm font-medium ${time < 60 ? 'animate-pulse' : ''}`}>
                    {formatTime(time)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Question navigation pills */}
        <div className="py-4 overflow-x-auto bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex space-x-3">
            {questionButtons}
          </div>
        </div>

        {/* Main question card */}
        <Card className="w-full shadow-md border-gray-100">
          <CardContent className="p-6">
            {/* Question category and prompt */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">{currentQuestion.category}</p>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {currentQuestion.prompt}
              </h2>
              
              {/* Image container with frame */}
              <div className="relative bg-gray-50 p-3 border border-gray-200 rounded-xl mb-8">
                <div className={`relative ${fullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8' : ''}`}>
                  <img 
                    src={currentQuestion.image}
                    alt="Abstract reasoning question" 
                    className="max-h-[300px] w-auto mx-auto rounded-md object-contain"
                  />
                  <button 
                    onClick={toggleFullscreen}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-md hover:bg-white shadow-sm"
                    aria-label={fullscreen ? "Exit fullscreen" : "View in fullscreen"}
                  >
                    <Maximize size={18} />
                  </button>
                </div>
                
                {/* Zoom button below image */}
                <div className="mt-2 flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleFullscreen} 
                    className="text-gray-600"
                  >
                    <ZoomIn className="mr-1 h-4 w-4" /> Zoom Image
                  </Button>
                </div>
              </div>

              {/* Answer options in 2x2 grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <RadioGroup 
                  value={answers[currentQuestionIndex] || ""}
                  onValueChange={handleAnswerChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div key={option} className="col-span-1">
                      <div className={`flex items-center space-x-3 p-4 border rounded-xl transition-all hover:shadow-md ${
                        answers[currentQuestionIndex] === option ? 'ring-2 ring-primary bg-blue-50' : 'hover:border-gray-300'
                      }`}>
                        <RadioGroupItem 
                          value={option} 
                          id={`option-${index}`} 
                          aria-label={`Option ${option}`}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Option {option}</span>
                          <label 
                            htmlFor={`option-${index}`} 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                          >
                            Your answer for {option}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </CardContent>

          {/* Question actions */}
          <div className="flex justify-between px-6 py-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleFlagQuestion}
              className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 hover:text-blue-700"
            >
              <Flag className="mr-2 h-4 w-4" /> Flag for Review
            </Button>
            
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 mb-1">Navigation</span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === mockQuestions.length - 1}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AbstractReasoningTest;
