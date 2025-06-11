
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';
import ReadingComprehensionChatPanel from '@/components/chat/ReadingComprehensionChatPanel';

const ReadingComprehensionFeedback = () => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    navigate('/reading-comprehension-results');
  };

  const handleChatWithElliot = () => {
    setIsChatOpen(true);
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
                  How did you find this Reading Comprehension test?
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

              {/* Chat with Elliot Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-[#009dff]/10 to-[#33a9ff]/10 rounded-xl p-6 border border-[#009dff]/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center overflow-hidden">
                      <img 
                        src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                        alt="Elliot Avatar" 
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Ask Elliot about your Reading Comprehension results</h3>
                      <p className="text-gray-600 text-sm">Get detailed explanations for any question you found challenging</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleChatWithElliot}
                    className="w-full bg-[#009dff] hover:bg-[#0080ff] text-white px-6 py-3 rounded-xl text-lg font-medium"
                  >
                    Chat with Elliot about your answers
                  </Button>
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

      {/* Specialized Reading Comprehension Chat Panel */}
      <ReadingComprehensionChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default ReadingComprehensionFeedback;
