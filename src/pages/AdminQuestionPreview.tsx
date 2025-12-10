import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { 
  ChevronLeft, 
  ArrowLeft,
  ImageIcon,
  ZoomIn,
  ZoomOut,
  CheckCircle,
} from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';

// Mock questions data (same as AdminQuestions)
const mockQuestionsData = [
  {
    id: 1,
    question: "What is the next shape in this sequence?",
    subType: "Pattern Recognition",
    questionTypeName: "Abstract Reasoning",
    prompt: "Identify the pattern",
    instruction: "Select the correct answer",
    explanation: "The shapes follow a rotation pattern",
    hasImage: true,
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
  },
  {
    id: 2,
    question: "Calculate the value of x in the equation",
    subType: "Algebra",
    questionTypeName: "Quantitative Reasoning",
    prompt: "Solve for x",
    instruction: "Show your working",
    explanation: "Use algebraic manipulation",
    hasImage: false,
    options: ["12", "15", "18", "21"],
    correctAnswer: "15",
  },
  {
    id: 3,
    question: "Which figure completes the analogy?",
    subType: "Analogies",
    questionTypeName: "Abstract Reasoning",
    prompt: "Complete the analogy",
    instruction: "Choose the best match",
    explanation: "The relationship between shapes",
    hasImage: true,
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: "B",
  },
  {
    id: 4,
    question: "Read the passage and answer the question",
    subType: "Comprehension",
    questionTypeName: "Reading Comprehension",
    prompt: "Based on the passage",
    instruction: "Select the best answer",
    explanation: "Direct inference from text",
    hasImage: false,
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: "Option 2",
  },
  {
    id: 5,
    question: "Identify the pattern that does not belong",
    subType: "Odd One Out",
    questionTypeName: "Abstract Reasoning",
    prompt: "Find the odd one",
    instruction: "Select the different pattern",
    explanation: "One shape breaks the pattern",
    hasImage: true,
    image: "/abstract-reasoning.jpg",
    options: ["A", "B", "C", "D"],
    correctAnswer: "D",
  },
];

const AdminQuestionPreview = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState(100); // Percentage: 50-150

  const question = mockQuestionsData.find(q => q.id === Number(questionId)) || mockQuestionsData[0];

  const handleImageSizeChange = (value: number[]) => {
    setImageSize(value[0]);
  };

  const setPresetSize = (size: 'small' | 'medium' | 'large') => {
    const sizes = { small: 60, medium: 100, large: 140 };
    setImageSize(sizes[size]);
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
              onClick={() => navigate('/admin/questions')}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Questions List</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto pt-20 px-4 pb-24">
        {/* Page title */}
        <div className="w-full px-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h1 className="text-2xl font-bold text-blue-900">
              Question Preview <span className="text-base font-medium text-[#009dff]">• {question.questionTypeName}</span>
            </h1>
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Preview Mode - For Developer Reference
            </span>
          </div>
        </div>
        
        {/* Main question card */}
        <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-xl shadow-blue-100">
          <CardContent className="p-0">
            {/* Category banner */}
            <div className="bg-[#009dff] py-3 px-6 text-white shadow-sm rounded-t-lg">
              <p className="text-sm font-medium">{question.subType}</p>
            </div>
            
            {/* Question content */}
            <div className="p-6 md:p-8">
              {/* Question prompt */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {question.question}
              </h2>
              
              {/* Instruction */}
              <p className="text-gray-600 mb-6 italic">
                {question.instruction}
              </p>
              
              {/* Image section with size control */}
              {question.hasImage && (
                <div className="mb-8">
                  {/* Image Size Control Panel */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="h-5 w-5 text-amber-600" />
                      <h3 className="font-semibold text-amber-800">Image Size Control</h3>
                      <span className="ml-auto text-sm bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                        Developer Feature
                      </span>
                    </div>
                    
                    <p className="text-sm text-amber-700 mb-4">
                      Adjust the image size to ensure optimal display for students. Changes here should be saved to the database.
                    </p>
                    
                    {/* Preset buttons */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-medium text-gray-700">Presets:</span>
                      <Button
                        variant={imageSize === 60 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPresetSize('small')}
                        className={imageSize === 60 ? "bg-[#009dff] hover:bg-[#008ae6]" : ""}
                      >
                        <ZoomOut className="h-4 w-4 mr-1" />
                        Small (60%)
                      </Button>
                      <Button
                        variant={imageSize === 100 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPresetSize('medium')}
                        className={imageSize === 100 ? "bg-[#009dff] hover:bg-[#008ae6]" : ""}
                      >
                        Medium (100%)
                      </Button>
                      <Button
                        variant={imageSize === 140 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPresetSize('large')}
                        className={imageSize === 140 ? "bg-[#009dff] hover:bg-[#008ae6]" : ""}
                      >
                        <ZoomIn className="h-4 w-4 mr-1" />
                        Large (140%)
                      </Button>
                    </div>
                    
                    {/* Slider control */}
                    <div className="flex items-center gap-4">
                      <ZoomOut className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <Slider
                          value={[imageSize]}
                          onValueChange={handleImageSizeChange}
                          min={50}
                          max={150}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <ZoomIn className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-bold text-gray-700 min-w-[50px] text-right">
                        {imageSize}%
                      </span>
                    </div>
                    
                    {/* Save button for developers */}
                    <div className="mt-4 pt-4 border-t border-amber-200">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        Save Image Size to Database
                      </Button>
                      <span className="ml-3 text-sm text-amber-700">
                        (This would save imageSize: {imageSize} to the question record)
                      </span>
                    </div>
                  </div>

                  {/* Image display */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="relative flex justify-center">
                      <img 
                        src={question.image}
                        alt="Question image" 
                        className="rounded object-contain transition-all duration-300 ease-in-out"
                        style={{ 
                          maxHeight: `${300 * (imageSize / 100)}px`,
                          width: `${imageSize}%`,
                          maxWidth: '100%'
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Current display size: {imageSize}% (max-height: {Math.round(300 * (imageSize / 100))}px)
                    </p>
                  </div>
                </div>
              )}
              
              {/* Answer options */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">Answer Options:</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    ✓ Correct Answer: {question.correctAnswer}
                  </span>
                </div>
                <RadioGroup 
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, idx) => {
                      const optionLabels = ['A', 'B', 'C', 'D'];
                      const optionLabel = optionLabels[idx];
                      const isCorrect = option === question.correctAnswer;
                      return (
                        <div 
                          key={option}
                          className={`border-2 rounded-xl p-4 transition-all cursor-pointer
                            ${isCorrect 
                              ? 'border-green-500 bg-green-50' 
                              : selectedAnswer === option 
                                ? 'border-[#009dff] bg-blue-50 shadow-md' 
                                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                            }`}
                          onClick={() => setSelectedAnswer(option)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                isCorrect
                                  ? 'bg-green-500 text-white'
                                  : selectedAnswer === option 
                                    ? 'bg-[#009dff] text-white' 
                                    : 'bg-gray-100 text-gray-700'
                              }`}>
                                {optionLabel}
                              </div>
                              <div className="flex-1 ml-3">
                                <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-gray-700'}`}>
                                  Option {optionLabel}: {option}
                                </p>
                              </div>
                            </div>
                            {isCorrect && (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-xs font-medium text-green-600">Correct Answer</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
              
              {/* Explanation section */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Explanation (shown after answer):</h3>
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Back button */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/questions')}
            className="border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questions List
          </Button>
        </div>

        {/* Developer notes */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Developer Notes</h3>
          <ul className="text-sm text-blue-700 space-y-2 list-disc list-inside">
            <li>The <strong>Image Size Control</strong> panel should be visible only in the admin/edit view, not for students.</li>
            <li>The <code className="bg-blue-100 px-1 rounded">imageSize</code> value (50-150%) should be saved to the database alongside the question.</li>
            <li>When rendering the question for students, apply the saved imageSize percentage to the image.</li>
            <li>Default value should be 100% if no size is specified.</li>
            <li>This preview page matches the student-facing design from the Abstract Reasoning test.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionPreview;
