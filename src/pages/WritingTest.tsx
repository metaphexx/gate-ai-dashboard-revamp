import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  ChevronLeft, 
  Flag,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  FileText,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
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
    instruction: "Look at the image above and write a creative piece inspired by what you see. You may choose any writing style - narrative, descriptive, persuasive, or analytical. Your response should be between 200-300 words.",
    minWords: 200,
    maxWords: 300,
    answer: null
  }
];

const WritingTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(mockQuestions.length).fill(false));
  const [time, setTime] = useState(2700); // 45 minutes in seconds for writing
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [writingAnalytics, setWritingAnalytics] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0
  });
  
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  // Calculate writing analytics
  const calculateAnalytics = (text: string) => {
    if (!text) {
      return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
    }

    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;

    return { words, characters, sentences, paragraphs };
  };

  // Text formatting functions
  const applyFormat = (command: string, value?: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let newText = '';
    let newCursorPos = start;
    
    switch (command) {
      case 'bold':
        newText = `${beforeText}**${selectedText}**${afterText}`;
        newCursorPos = selectedText ? end + 4 : start + 2;
        break;
      case 'italic':
        newText = `${beforeText}_${selectedText}_${afterText}`;
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
      case 'underline':
        newText = `${beforeText}<u>${selectedText}</u>${afterText}`;
        newCursorPos = selectedText ? end + 7 : start + 3;
        break;
      case 'strikethrough':
        newText = `${beforeText}~~${selectedText}~~${afterText}`;
        newCursorPos = selectedText ? end + 4 : start + 2;
        break;
      case 'quote':
        newText = `${beforeText}> ${selectedText}${afterText}`;
        newCursorPos = selectedText ? end + 2 : start + 2;
        break;
      case 'bulletList':
        newText = `${beforeText}• ${selectedText}${afterText}`;
        newCursorPos = selectedText ? end + 2 : start + 2;
        break;
      case 'numberedList':
        newText = `${beforeText}1. ${selectedText}${afterText}`;
        newCursorPos = selectedText ? end + 3 : start + 3;
        break;
      default:
        return;
    }
    
    handleAnswerChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Handle keyboard navigation - removed flag and clear shortcuts
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

  // Update analytics when answer changes
  useEffect(() => {
    const currentAnswer = answers[currentQuestionIndex] || '';
    const analytics = calculateAnalytics(currentAnswer);
    setWritingAnalytics(analytics);
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

  const canSubmit = writingAnalytics.words >= currentQuestion.minWords && writingAnalytics.words <= currentQuestion.maxWords;

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
                  <div className="space-y-2">
                    <p className="text-gray-700 leading-relaxed">{currentQuestion.instruction}</p>
                    {writingAnalytics.words > 0 && writingAnalytics.words < 120 && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Need {120 - writingAnalytics.words} more words (minimum 120 words required)
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Writing area */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-lg font-semibold text-gray-900">Your Response:</label>
                  <div className="flex items-center space-x-4">
                    <div className={`text-sm px-3 py-1 rounded-full ${
                      canSubmit 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      Write between {currentQuestion.minWords}-{currentQuestion.maxWords} words
                    </div>
                    {writingAnalytics.words > 0 && writingAnalytics.words < 120 && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Need {120 - writingAnalytics.words} more words (minimum 120 words)
                      </div>
                    )}
                    {!canSubmit && writingAnalytics.words >= 120 && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {writingAnalytics.words < currentQuestion.minWords 
                          ? `Need ${currentQuestion.minWords - writingAnalytics.words} more words`
                          : `${writingAnalytics.words - currentQuestion.maxWords} words over limit`
                        }
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Writing Analytics */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{writingAnalytics.words}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{writingAnalytics.characters}</div>
                    <div className="text-sm text-gray-600">Characters</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{writingAnalytics.sentences}</div>
                    <div className="text-sm text-gray-600">Sentences</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{writingAnalytics.paragraphs}</div>
                    <div className="text-sm text-gray-600">Paragraphs</div>
                  </div>
                </div>
                
                {/* Text formatting toolbar */}
                <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap items-center gap-1">
                  <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('bold')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('italic')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('underline')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('strikethrough')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Strikethrough"
                    >
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-1 border-r border-gray-300 pr-2 mr-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('bulletList')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('numberedList')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Numbered List"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('quote')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Quote"
                    >
                      <Quote className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={answers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Write something here..."
                  className="min-h-[400px] w-full text-base leading-relaxed resize-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] border border-gray-200 rounded-b-lg rounded-t-none p-4 border-t-0"
                />
              </div>
              
              {/* Flag button only - removed clear option */}
              <div className="flex items-center justify-start space-x-2">
                <Button 
                  variant="outline"
                  onClick={toggleFlagQuestion}
                  className={`border ${flaggedQuestions[currentQuestionIndex] ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-blue-100 text-[#009dff] hover:bg-blue-50'}`}
                >
                  <Flag className={`mr-2 h-4 w-4 ${flaggedQuestions[currentQuestionIndex] ? 'fill-orange-200' : ''}`} />
                  {flaggedQuestions[currentQuestionIndex] ? 'Flagged for Review' : 'Flag for Review'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Keyboard shortcuts info - removed flag and clear shortcuts */}
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
