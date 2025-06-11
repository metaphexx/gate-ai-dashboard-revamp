
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';

const AbstractReasoningPreStart = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/abstract-reasoning-test');
  };

  const handleBackToHome = () => {
    navigate('/');
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
              onClick={handleBackToHome}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto pt-20 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Abstract Reasoning
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Abstract Reasoning section of the GATE (Gifted and Talented Education) test assesses a student's ability to recognise patterns, identify relationships, solve problems using logical reasoning, and think critically in a non-verbal context.
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
                        You will have <strong>5 minutes</strong> to complete this test.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#009dff] rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        There are <strong>10 multiple-choice questions</strong>. Each question presents a sequence or pattern with 4 possible answers: A, B, C, or D. Choose the answer you think is correct and select it.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-[#009dff] rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-bold">•</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Do not spend too much time on any one question. If you are unsure, move on and come back to it later if you have time.
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
                      onClick={handleBackToHome}
                      variant="outline"
                      className="border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors"
                    >
                      Back To Home
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
                      <h4 className="font-semibold text-gray-900 mb-3">Abstract Reasoning</h4>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>Question type:</span>
                          <span className="font-medium text-gray-900">MCQ</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Question count:</span>
                          <span className="font-medium text-gray-900">10</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Duration:</span>
                          <span className="font-medium text-gray-900">10 minutes</span>
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
                        <span className="text-sm font-bold text-gray-900">10 min</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <CheckCircle className="h-8 w-8 text-[#009dff] mb-2" />
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Questions</span>
                        <span className="text-sm font-bold text-gray-900">10</span>
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

export default AbstractReasoningPreStart;
