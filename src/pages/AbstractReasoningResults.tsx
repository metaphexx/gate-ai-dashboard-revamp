
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Eye, MessageSquare } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';

const AbstractReasoningResults = () => {
  const navigate = useNavigate();

  const handleProceedToFeedback = () => {
    navigate('/abstract-reasoning-feedback');
  };

  const handleViewSolution = () => {
    navigate('/abstract-reasoning-solution');
  };

  const handleBackToTests = () => {
    navigate('/practice');
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
              onClick={handleBackToTests}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Tests</span>
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
              Test Complete!
            </h1>
            <p className="text-lg text-gray-600">
              You've completed the Abstract Reasoning test. Here are your results.
            </p>
          </div>

          {/* Results Card */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-[#009dff] mb-2">7/10</div>
                <p className="text-xl text-gray-700 mb-4">Questions Correct</p>
                <div className="text-2xl font-semibold text-gray-900">70% Score</div>
              </div>

              {/* Performance breakdown */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-[#009dff] mb-1">7</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-2xl font-bold text-red-600 mb-1">2</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-600 mb-1">1</div>
                  <div className="text-sm text-gray-600">Unanswered</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleViewSolution}
                  variant="outline"
                  className="border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors flex-1"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Solutions
                </Button>
                <Button 
                  onClick={handleProceedToFeedback}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white px-8 py-3 rounded-xl text-lg font-medium flex-1"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Proceed to Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AbstractReasoningResults;
