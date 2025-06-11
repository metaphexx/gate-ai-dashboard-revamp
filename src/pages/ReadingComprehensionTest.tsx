import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Clock, 
  ChevronLeft, 
  Flag,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QuestionTracker from '@/components/test/QuestionTracker';
import QuestionTimer from '@/components/test/QuestionTimer';
import TestSummaryModal from '@/components/test/TestSummaryModal';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for reading comprehension questions
const mockQuestions = [
  {
    id: 1,
    prompt: "What does sensitivity refer to in the context of the SKA project?",
    category: "Reading Comprehension",
    passage: "Exploring the Cosmos: The Square Kilometre Array\n\nThe Square Kilometre Array (SKA) is an ambitious international collaboration involving 20 countries to construct the most advanced radio telescope ever created. Spanning two primary sites in Australia and South Africa, construction began in 2016, with the total cost estimated at $2 billion, shared among participating nations.\n\nThe Australia–New Zealand portion of the SKA will feature thousands of radio antennas, most of which will take the shape of dishes. These antennas will be arranged in clusters, extending thousands of kilometres from a central hub in Western Australia. Collectively, the total surface area of these dishes will amount to approximately one square kilometre, hence the project's name. The antennas will be interconnected electronically, functioning as a single colossal telescope capable of capturing vast areas of the cosmos and producing the sharpest cosmic images ever seen.\n\nThe SKA's extraordinary size and ability to scan a broad spectrum of radio frequencies will make it 50 times more sensitive and 10,000 times faster than any existing radio telescope. This enhanced sensitivity is crucial, as signals from distant space objects grow weaker the farther they are from Earth. Scientists anticipate that this groundbreaking instrument will provide clearer insights into phenomena such as galaxy formation and the elusive existence of dark matter.\n\nHowever, the SKA project is not without its challenges. Cutting-edge innovations in computing, communication, and manufacturing will be necessary to support its functionality. One significant hurdle will be managing and organising the vast quantities of data transmitted through thousands of kilometres of fibre optic cables connecting the antennas—a data flow that will surpass the entire current global internet traffic!\n\nThe SKA core site in Australia will be located on a remote high desert plain in Western Australia, 315 kilometres northeast of Geraldton. This site was chosen not for political or financial reasons, but due to its exceptional qualities. It offers an optimal view of the Milky Way galaxy and experiences minimal radio interference from human activity, ensuring the clearest possible observations of deep space.",
    options: [
      "The confidentiality of the project's planning stages.",
      "The advanced capabilities of the radio antennas.",
      "The environmental conditions of the site.",
      "The accuracy of the data being analysed."
    ],
    answer: null
  },
  {
    id: 2,
    prompt: "According to the passage, what makes the Australian site ideal for the SKA project?",
    category: "Reading Comprehension", 
    passage: "Exploring the Cosmos: The Square Kilometre Array\n\nThe Square Kilometre Array (SKA) is an ambitious international collaboration involving 20 countries to construct the most advanced radio telescope ever created. Spanning two primary sites in Australia and South Africa, construction began in 2016, with the total cost estimated at $2 billion, shared among participating nations.\n\nThe Australia–New Zealand portion of the SKA will feature thousands of radio antennas, most of which will take the shape of dishes. These antennas will be arranged in clusters, extending thousands of kilometres from a central hub in Western Australia. Collectively, the total surface area of these dishes will amount to approximately one square kilometre, hence the project's name. The antennas will be interconnected electronically, functioning as a single colossal telescope capable of capturing vast areas of the cosmos and producing the sharpest cosmic images ever seen.\n\nThe SKA's extraordinary size and ability to scan a broad spectrum of radio frequencies will make it 50 times more sensitive and 10,000 times faster than any existing radio telescope. This enhanced sensitivity is crucial, as signals from distant space objects grow weaker the farther they are from Earth. Scientists anticipate that this groundbreaking instrument will provide clearer insights into phenomena such as galaxy formation and the elusive existence of dark matter.\n\nHowever, the SKA project is not without its challenges. Cutting-edge innovations in computing, communication, and manufacturing will be necessary to support its functionality. One significant hurdle will be managing and organising the vast quantities of data transmitted through thousands of kilometres of fibre optic cables connecting the antennas—a data flow that will surpass the entire current global internet traffic!\n\nThe SKA core site in Australia will be located on a remote high desert plain in Western Australia, 315 kilometres northeast of Geraldton. This site was chosen not for political or financial reasons, but due to its exceptional qualities. It offers an optimal view of the Milky Way galaxy and experiences minimal radio interference from human activity, ensuring the clearest possible observations of deep space.",
    options: [
      "Its proximity to major cities and research facilities.",
      "The availability of government funding and support.",
      "Its optimal view of the Milky Way and minimal radio interference.",
      "The existing telecommunications infrastructure in the area."
    ],
    answer: null
  },
  {
    id: 3,
    prompt: "What is the primary challenge mentioned regarding the SKA's data management?",
    category: "Reading Comprehension",
    passage: "Exploring the Cosmos: The Square Kilometre Array\n\nThe Square Kilometre Array (SKA) is an ambitious international collaboration involving 20 countries to construct the most advanced radio telescope ever created. Spanning two primary sites in Australia and South Africa, construction began in 2016, with the total cost estimated at $2 billion, shared among participating nations.\n\nThe Australia–New Zealand portion of the SKA will feature thousands of radio antennas, most of which will take the shape of dishes. These antennas will be arranged in clusters, extending thousands of kilometres from a central hub in Western Australia. Collectively, the total surface area of these dishes will amount to approximately one square kilometre, hence the project's name. The antennas will be interconnected electronically, functioning as a single colossal telescope capable of capturing vast areas of the cosmos and producing the sharpest cosmic images ever seen.\n\nThe SKA's extraordinary size and ability to scan a broad spectrum of radio frequencies will make it 50 times more sensitive and 10,000 times faster than any existing radio telescope. This enhanced sensitivity is crucial, as signals from distant space objects grow weaker the farther they are from Earth. Scientists anticipate that this groundbreaking instrument will provide clearer insights into phenomena such as galaxy formation and the elusive existence of dark matter.\n\nHowever, the SKA project is not without its challenges. Cutting-edge innovations in computing, communication, and manufacturing will be necessary to support its functionality. One significant hurdle will be managing and organising the vast quantities of data transmitted through thousands of kilometres of fibre optic cables connecting the antennas—a data flow that will surpass the entire current global internet traffic!\n\nThe SKA core site in Australia will be located on a remote high desert plain in Western Australia, 315 kilometres northeast of Geraldton. This site was chosen not for political or financial reasons, but due to its exceptional qualities. It offers an optimal view of the Milky Way galaxy and experiences minimal radio interference from human activity, ensuring the clearest possible observations of deep space.",
    options: [
      "The high cost of fibre optic cables.",
      "Managing data flow that exceeds global internet traffic.",
      "Ensuring data security across multiple countries.",
      "Converting radio signals into digital format."
    ],
    answer: null
  }
];

const ReadingComprehensionTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(mockQuestions.length).fill(false));
  const [time, setTime] = useState(1800); // 30 minutes in seconds for reading comprehension
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
    
    toast({
      title: "Test completed!",
      description: "Your answers have been submitted.",
      variant: "default",
    });
    
    setShowSubmitDialog(false);
    navigate('/reading-comprehension-results');
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
              Reading Comprehension <span className="text-base font-medium text-[#009dff]">• Question {currentQuestionIndex + 1} of {mockQuestions.length}</span>
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
        
        {/* Main question card with improved layout */}
        <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-blue-100">
          <CardContent className="p-0">
            {/* Category banner */}
            <div className="bg-[#009dff] py-3 px-6 text-white shadow-sm rounded-t-lg">
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
                    <p className="text-gray-800 font-medium text-lg leading-relaxed">{currentQuestion.prompt}</p>
                  </div>
                  
                  {/* Answer options */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select your answer:</h3>
                    <RadioGroup 
                      value={answers[currentQuestionIndex] || ""}
                      onValueChange={handleAnswerChange}
                    >
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                          const optionLabels = ['A', 'B', 'C', 'D'];
                          const optionLabel = optionLabels[idx];
                          const isSelected = answers[currentQuestionIndex] === option;
                          
                          return (
                            <div 
                              key={option}
                              className={`border rounded-xl p-4 transition-all cursor-pointer
                                ${isSelected
                                  ? 'border-[#009dff] bg-blue-50 shadow-md' 
                                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                                }`}
                              onClick={() => handleAnswerChange(option)}
                            >
                              <div className="flex items-start">
                                <RadioGroupItem
                                  value={option}
                                  id={`option-${idx}`}
                                  className="mt-1 mr-3"
                                />
                                <Label 
                                  htmlFor={`option-${idx}`}
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-start">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                                      isSelected
                                        ? 'bg-[#009dff] text-white' 
                                        : 'bg-gray-100 text-gray-700'
                                    }`}>
                                      {optionLabel}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-gray-800 leading-relaxed">{option}</p>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
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
                      disabled={answers[currentQuestionIndex] === null}
                    >
                      Clear Answer
                    </Button>
                  </div>
                </div>
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

export default ReadingComprehensionTest;
