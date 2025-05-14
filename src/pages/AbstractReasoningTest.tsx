
import React, { useState, useEffect } from 'react';
import { Question } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Flag } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useNavigate } from 'react-router-dom';

import TestSummaryModal from '@/components/test/TestSummaryModal';
import EverestLogo from '@/components/test/EverestLogo';

const questionsData: Question[] = [
  {
    id: 1,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/001.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 1."
  },
  {
    id: 2,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/002.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 2."
  },
  {
    id: 3,
    text: "Continue the pattern.",
    image: "/lovable-uploads/003.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 3."
  },
  {
    id: 4,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/004.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 4."
  },
  {
    id: 5,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/005.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 5."
  },
  {
    id: 6,
    text: "Continue the pattern.",
    image: "/lovable-uploads/006.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 6."
  },
  {
    id: 7,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/007.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 7."
  },
  {
    id: 8,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/008.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 8."
  },
  {
    id: 9,
    text: "Continue the pattern.",
    image: "/lovable-uploads/009.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 9."
  },
  {
    id: 10,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/010.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 10."
  },
  {
    id: 11,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/011.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 11."
  },
    {
    id: 12,
    text: "Continue the pattern.",
    image: "/lovable-uploads/012.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 12."
  },
  {
    id: 13,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/013.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 13."
  },
  {
    id: 14,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/014.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 14."
  },
  {
    id: 15,
    text: "Continue the pattern.",
    image: "/lovable-uploads/015.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 15."
  },
  {
    id: 16,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/016.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 16."
  },
  {
    id: 17,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/017.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 17."
  },
  {
    id: 18,
    text: "Continue the pattern.",
    image: "/lovable-uploads/018.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 18."
  },
  {
    id: 19,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/019.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 19."
  },
  {
    id: 20,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/020.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 20."
  },
  {
    id: 21,
    text: "Continue the pattern.",
    image: "/lovable-uploads/021.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 21."
  },
    {
    id: 22,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/022.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 22."
  },
  {
    id: 23,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/023.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 23."
  },
  {
    id: 24,
    text: "Continue the pattern.",
    image: "/lovable-uploads/024.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 24."
  },
  {
    id: 25,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/025.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 25."
  },
  {
    id: 26,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/026.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 26."
  },
  {
    id: 27,
    text: "Continue the pattern.",
    image: "/lovable-uploads/027.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 27."
  },
  {
    id: 28,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/028.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 28."
  },
  {
    id: 29,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/029.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 29."
  },
  {
    id: 30,
    text: "Continue the pattern.",
    image: "/lovable-uploads/030.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 30."
  },
  {
    id: 31,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/031.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 31."
  },
    {
    id: 32,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/032.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 32."
  },
  {
    id: 33,
    text: "Continue the pattern.",
    image: "/lovable-uploads/033.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 33."
  },
  {
    id: 34,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/034.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
    explanation: "Explanation for question 34."
  },
  {
    id: 35,
    text: "Identify the odd one out.",
    image: "/lovable-uploads/035.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Explanation for question 35."
  },
  {
    id: 36,
    text: "Continue the pattern.",
    image: "/lovable-uploads/036.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
    explanation: "Explanation for question 36."
  },
  {
    id: 37,
    text: "Which figure completes the sequence?",
    image: "/lovable-uploads/037.png",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Explanation for question 37."
  },
];

const AbstractReasoningTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(questionsData.length).fill(null));
  const [flaggedQuestions, setFlaggedQuestions] = useState(Array(questionsData.length).fill(false));
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const totalQuestions = questionsData.length;
  const currentQuestion = questionsData[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    // Prevent scrolling when the explanation dialog is open
    if (isExplanationOpen || isSubmitModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isExplanationOpen, isSubmitModalOpen]);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleFlagToggle = () => {
    const newFlaggedQuestions = [...flaggedQuestions];
    newFlaggedQuestions[currentQuestionIndex] = !flaggedQuestions[currentQuestionIndex];
    setFlaggedQuestions(newFlaggedQuestions);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsExplanationOpen(false); // Close explanation when moving to the next question
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsExplanationOpen(false); // Close explanation when moving to the previous question
    }
  };

  const openExplanation = () => {
    setIsExplanationOpen(true);
  };

  const closeExplanation = () => {
    setIsExplanationOpen(false);
  };

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const handleSubmitTest = () => {
    setIsSubmitModalOpen(false);
    navigate('/abstract-reasoning-results');
  };

  const handleQuickNavigation = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsExplanationOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-2">
        <div className="container flex items-center justify-between">
          <EverestLogo />
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => toast({
              title: "Test Paused",
              description: "You can resume this test later from your dashboard.",
            })}>
              Pause Test
            </Button>
            <Button size="sm" onClick={openSubmitModal} className="bg-[#009dff] hover:bg-[#0084d6] text-white">
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container grid grid-cols-4 gap-4 py-8">
        {/* Question Area */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardContent className="relative">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{currentQuestion.text}</h2>
                {currentQuestion.image && (
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={currentQuestion.image}
                      alt={`Question ${currentQuestionIndex + 1}`}
                      className="object-contain w-full h-full question-image rounded-md"
                    />
                  </AspectRatio>
                )}
              </div>

              {/* Answer Options */}
              <RadioGroup defaultValue={answers[currentQuestionIndex] || undefined} onValueChange={handleAnswerChange} className="w-full">
                <div className="grid gap-2">
                  {currentQuestion.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} className="peer h-5 w-5 shrink-0 rounded-full border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                      <Label htmlFor={option} className="cursor-pointer peer-checked:font-semibold">{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Separator className="my-6" />

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={handleFlagToggle} className="gap-2">
                  {flaggedQuestions[currentQuestionIndex] ? <AlertCircle className="w-4 h-4" /> : <Flag className="w-4 h-4" />}
                  {flaggedQuestions[currentQuestionIndex] ? 'Unflag Question' : 'Flag for Review'}
                </Button>
                <div className="flex space-x-2">
                  <Button variant="secondary" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>
                  <Button onClick={goToNextQuestion} disabled={currentQuestionIndex === totalQuestions - 1}>
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Question Navigation */}
        <div className="col-span-1">
          <Card className="h-full">
            <CardContent className="flex flex-col h-full">
              <h3 className="text-sm font-semibold mb-3">Quick Navigation</h3>
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 p-1">
                  {questionsData.map((question, index) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      className={`justify-start text-sm ${currentQuestionIndex === index ? 'bg-accent text-accent-foreground hover:bg-accent/80' : ''}`}
                      onClick={() => handleQuickNavigation(index)}
                    >
                      {index + 1}. {answers[index] ? <CheckCircle className="w-4 h-4 ml-auto" /> : flaggedQuestions[index] ? <AlertCircle className="w-4 h-4 ml-auto text-orange-500" /> : null}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4">
                <Button variant="secondary" className="w-full" onClick={openExplanation}>View Explanation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Explanation Modal */}
      <Dialog open={isExplanationOpen} onOpenChange={closeExplanation}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Question {currentQuestionIndex + 1} Explanation</DialogTitle>
            <DialogDescription>{currentQuestion.explanation}</DialogDescription>
          </DialogHeader>
          <Button className="w-full" onClick={closeExplanation}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Submit Test Modal */}
      <TestSummaryModal 
        isOpen={isSubmitModalOpen} 
        onClose={closeSubmitModal} 
        onSubmit={handleSubmitTest}
        questions={questionsData}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
      />
    </div>
  );
};

export default AbstractReasoningTest;
