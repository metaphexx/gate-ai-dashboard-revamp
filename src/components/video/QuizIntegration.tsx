
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizIntegrationProps {
  lessonId: string;
  onQuizComplete: (score: number) => void;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the first step in solving algebraic equations?',
    options: [
      'Multiply both sides by a constant',
      'Isolate the variable term',
      'Add the same value to both sides',
      'Divide both sides by the coefficient'
    ],
    correctAnswer: 1,
    explanation: 'The first step is usually to isolate the variable term by moving constants to the other side of the equation.'
  },
  {
    id: '2',
    question: 'Which property allows you to change the order of addition?',
    options: [
      'Associative Property',
      'Distributive Property',
      'Commutative Property',
      'Identity Property'
    ],
    correctAnswer: 2,
    explanation: 'The Commutative Property states that a + b = b + a, allowing you to change the order of addition.'
  }
];

const QuizIntegration: React.FC<QuizIntegrationProps> = ({ lessonId, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    setShowResults(true);
    onQuizComplete(percentage);
    
    toast({
      title: "Quiz completed!",
      description: `You scored ${percentage}% (${score}/${sampleQuestions.length})`,
    });
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (!quizStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Lesson Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Test your understanding with a quick quiz about this lesson.
            </p>
            <Badge variant="outline">
              {sampleQuestions.length} Questions
            </Badge>
            <Button onClick={startQuiz} className="w-full">
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / sampleQuestions.length) * 100);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{percentage}%</div>
            <p className="text-gray-600">
              You got {score} out of {sampleQuestions.length} questions correct
            </p>
          </div>

          <div className="space-y-3">
            {sampleQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={resetQuiz} className="w-full">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = sampleQuestions[currentQuestion];
  const hasSelectedAnswer = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
          <Badge variant="outline">
            {Math.round(((currentQuestion + 1) / sampleQuestions.length) * 100)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
              className="w-full text-left justify-start h-auto p-3"
              onClick={() => selectAnswer(index)}
            >
              <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={!hasSelectedAnswer}
          >
            {currentQuestion < sampleQuestions.length - 1 ? 'Next' : 'Finish'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizIntegration;
