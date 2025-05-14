
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
import { ArrowLeft, ArrowRight, Flag, Maximize } from 'lucide-react';

// Mock data for questions (in a real app, this would come from an API)
const mockQuestions = [
  {
    id: 1,
    prompt: "What is the next shape in this sequence?",
    image: "/abstract-reasoning.jpg", // Using the existing abstract reasoning image
    options: ["A", "B", "C", "D"],
    answer: null
  },
  {
    id: 2,
    prompt: "Identify the pattern that does not belong in the group.",
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    answer: null
  },
  {
    id: 3,
    prompt: "Which figure completes the sequence?",
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
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
        index === currentQuestionIndex
        ? 'bg-primary text-primary-foreground shadow-md'
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
    <div className="min-h-screen bg-background p-6">
      {/* Progress bar */}
      <div className="mb-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question navigation pills */}
      <div className="mb-8 py-4 overflow-x-auto">
        <div className="flex space-x-2">
          {questionButtons}
        </div>
      </div>

      <div className="flex justify-between items-start flex-wrap">
        <h1 className="text-xl font-semibold mb-4">Abstract Reasoning Test</h1>
        
        {/* Timer card */}
        <Card className="mb-4 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center">
              <span className="font-medium text-sm mr-2">Time Remaining:</span>
              <span className="bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-medium">
                {formatTime(time)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main question card */}
      <Card className="w-full max-w-4xl mx-auto shadow-md">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-800 mb-4">
              {currentQuestion.prompt}
            </h2>
            
            <div className="relative bg-white p-4 border border-gray-200 rounded-lg">
              <div className={`max-w-[90%] mx-auto ${fullscreen ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8' : ''}`}>
                <img 
                  src={currentQuestion.image}
                  alt="Abstract reasoning question" 
                  className="max-h-[400px] w-auto mx-auto rounded-md object-contain"
                />
                <button 
                  onClick={toggleFullscreen}
                  className="absolute top-2 right-2 p-1 bg-white/80 rounded-md hover:bg-white"
                  aria-label={fullscreen ? "Exit fullscreen" : "View in fullscreen"}
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <RadioGroup 
              value={answers[currentQuestionIndex] || ""}
              onValueChange={handleAnswerChange}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={option} className="mb-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-md hover:border-primary">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`} 
                      aria-label={`Option ${option}`}
                    />
                    <label 
                      htmlFor={`option-${index}`} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      Your answer for {option}
                    </label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>

        {/* Question actions */}
        <div className="flex justify-between px-6 py-3 border-t">
          <Button 
            variant="outline" 
            onClick={handleFlagQuestion}
            className="text-muted-foreground"
          >
            <Flag className="mr-2 h-4 w-4" /> Flag for Review
          </Button>
        </div>

        <CardFooter className="justify-between p-6 pt-2">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default AbstractReasoningTest;
