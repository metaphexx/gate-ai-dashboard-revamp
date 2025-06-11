
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
    instruction: "Look at the image above and write a creative piece inspired by what you see. You may choose any writing style - narrative, descriptive, persuasive, or analytical.",
    minWords: 200,
    maxWords: 300,
    answer: null
  }
];

const WritingTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(mockQuestions.length).fill(null));
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>(Array(mockQuestions.length).fill(false));
  const [time, setTime] = useState(1500); // 25 minutes in seconds for writing
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

  // Calculate writing analytics from HTML content
  const calculateAnalytics = (htmlContent: string) => {
    if (!htmlContent) {
      return { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
    }

    // Create a temporary div to extract text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    const words = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = textContent.length;
    const sentences = textContent.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = htmlContent.split(/<\/p>|<br\s*\/?>/i).filter(paragraph => {
      const tempP = document.createElement('div');
      tempP.innerHTML = paragraph;
      return (tempP.textContent || tempP.innerText || '').trim().length > 0;
    }).length;

    return { words, characters, sentences, paragraphs };
  };

  // Text formatting functions using document.execCommand
  const applyFormat = (command: string, value?: string) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    try {
      switch (command) {
        case 'bold':
          document.execCommand('bold', false);
          break;
        case 'italic':
          document.execCommand('italic', false);
          break;
        case 'underline':
          document.execCommand('underline', false);
          break;
        case 'strikethrough':
          document.execCommand('strikeThrough', false);
          break;
        case 'quote':
          document.execCommand('formatBlock', false, 'blockquote');
          break;
        case 'bulletList':
          document.execCommand('insertUnorderedList', false);
          break;
        case 'numberedList':
          document.execCommand('insertOrderedList', false);
          break;
        case 'alignLeft':
          document.execCommand('justifyLeft', false);
          break;
        case 'alignCenter':
          document.execCommand('justifyCenter', false);
          break;
        case 'alignRight':
          document.execCommand('justifyRight', false);
          break;
        default:
          break;
      }
      
      // Update analytics after formatting
      handleEditorChange();
    } catch (error) {
      console.log('Formatting command not supported:', command);
    }
  };

  // Handle editor content changes
  const handleEditorChange = () => {
    if (!editorRef.current) return;
    
    const htmlContent = editorRef.current.innerHTML;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = htmlContent;
    setAnswers(newAnswers);
    
    // Update analytics
    const analytics = calculateAnalytics(htmlContent);
    setWritingAnalytics(analytics);
  };

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

  // Update editor content when question changes
  useEffect(() => {
    if (editorRef.current) {
      const currentAnswer = answers[currentQuestionIndex] || '';
      editorRef.current.innerHTML = currentAnswer;
      
      // Update analytics
      const analytics = calculateAnalytics(currentAnswer);
      setWritingAnalytics(analytics);
    }
  }, [currentQuestionIndex]);

  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your test has been submitted automatically.",
      variant: "destructive",
    });
    handleSubmitTest();
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
    const unanswered = answers.filter(answer => {
      if (!answer) return true;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = answer;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      return textContent.trim() === '';
    }).length;
    
    const hasShortAnswers = answers.some((answer, index) => {
      if (!answer) return false;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = answer;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
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
                    <p className="text-gray-700 leading-relaxed">Look at the image above and write a creative piece inspired by what you see. You may choose any writing style - narrative, descriptive, persuasive, or analytical.</p>
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
                    {writingAnalytics.words < currentQuestion.minWords && writingAnalytics.words > 0 && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Need {currentQuestion.minWords - writingAnalytics.words} more words
                      </div>
                    )}
                    {writingAnalytics.words > currentQuestion.maxWords && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {writingAnalytics.words - currentQuestion.maxWords} words over limit
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
                      onClick={() => applyFormat('alignLeft')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Align Left"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('alignCenter')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Align Center"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applyFormat('alignRight')}
                      className="h-8 w-8 p-0 hover:bg-gray-200"
                      title="Align Right"
                    >
                      <AlignRight className="h-4 w-4" />
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
                
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorChange}
                  className="min-h-[400px] w-full text-base leading-relaxed focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] border border-gray-200 rounded-b-lg rounded-t-none p-4 border-t-0 focus:outline-none"
                  style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  suppressContentEditableWarning={true}
                  data-placeholder="Write something here..."
                />
              </div>
              
              {/* Flag button */}
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
        
        {/* Keyboard shortcuts info */}
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

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #009dff;
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #6B7280;
        }
        
        [contenteditable] ul {
          list-style-type: disc;
          margin-left: 1.5rem;
        }
        
        [contenteditable] ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
};

export default WritingTest;
