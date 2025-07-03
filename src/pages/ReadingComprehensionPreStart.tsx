
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';

const ReadingComprehensionPreStart = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/reading-comprehension-test');
  };

  const handleBackToPractice = () => {
    navigate('/video-lessons/reading-comprehension');
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
              onClick={handleBackToPractice}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back To Practice Tests</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Reading Comprehension
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              This reading comprehension test evaluates your ability to understand, analyze, and interpret 
              written passages across various topics and question types.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Instructions */}
            <div className="md:col-span-2">
              <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Please Read Instructions Carefully
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#009dff] rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        You will have <strong>45 minutes</strong> to complete this test.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#009dff] rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        There are <strong>3 passages</strong> with <strong>15 multiple-choice questions</strong> total. Read each passage carefully and answer the questions that follow.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#009dff] rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Spend approximately 15 minutes per passage (including reading time and answering questions). Base your answers on information provided in the passage.
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button 
                      onClick={handleStartTest}
                      className="bg-[#009dff] hover:bg-[#008ae6] text-white px-8 py-3 rounded-xl text-lg font-medium flex-1"
                    >
                      Start Test
                    </Button>
                    <Button 
                      onClick={handleBackToPractice}
                      variant="outline"
                      className="border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors"
                    >
                      Back To Practice Tests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Info Sidebar */}
            <div className="md:col-span-1">
              <Card className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl shadow-blue-100 border border-blue-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Test Includes
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-3">Reading Comprehension</h4>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>Question type:</span>
                          <span className="font-medium text-gray-900">MCQ</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Passages:</span>
                          <span className="font-medium text-gray-900">3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Questions:</span>
                          <span className="font-medium text-gray-900">15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Duration:</span>
                          <span className="font-medium text-gray-900">45 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="mt-6 pt-6 border-t border-blue-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Clock className="h-8 w-8 text-[#009dff] mb-2" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Duration</span>
                        <span className="text-sm font-bold text-gray-900">45 min</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <CheckCircle className="h-8 w-8 text-[#009dff] mb-2" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Questions</span>
                        <span className="text-sm font-bold text-gray-900">15</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingComprehensionPreStart;
