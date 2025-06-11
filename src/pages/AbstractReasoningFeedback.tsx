
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';

const AbstractReasoningFeedback = () => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const feedbackOptions = [
    { id: 'very-difficult', emoji: '😠', label: 'Very Difficult' },
    { id: 'difficult', emoji: '😟', label: 'Difficult' },
    { id: 'moderate', emoji: '😐', label: 'Moderate' },
    { id: 'easy', emoji: '😊', label: 'Easy' },
    { id: 'very-easy', emoji: '😄', label: 'Very Easy' }
  ];

  const handleSubmitFeedback = () => {
    // Here you would typically submit the feedback
    navigate('/');
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleBackToResults = () => {
    navigate('/abstract-reasoning-results');
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
              onClick={handleBackToResults}
              className="flex items-center text-[#009dff] hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Results</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto pt-24 px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Feedback
                </h1>
                <p className="text-gray-600">
                  How did you find this test?
                </p>
              </div>

              {/* Emoji Rating */}
              <div className="mb-8">
                <div className="grid grid-cols-5 gap-4">
                  {feedbackOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedRating(option.id)}
                      className={`flex flex-col items-center p-4 rounded-xl transition-all hover:scale-105 ${
                        selectedRating === option.id
                          ? 'bg-blue-50 border-2 border-[#009dff] shadow-md'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-4xl mb-2">{option.emoji}</div>
                      <span className={`text-sm font-medium text-center ${
                        selectedRating === option.id ? 'text-[#009dff]' : 'text-gray-700'
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleSkip}
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 px-8 py-3 rounded-xl text-lg font-medium flex-1"
                >
                  Skip
                </Button>
                <Button 
                  onClick={handleSubmitFeedback}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white px-8 py-3 rounded-xl text-lg font-medium flex-1"
                  disabled={!selectedRating}
                >
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AbstractReasoningFeedback;
