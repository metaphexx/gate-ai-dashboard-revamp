
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, FileText, CheckCircle, AlertCircle, Play } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

const ReadingComprehensionPreStart = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/reading-comprehension-test');
  };

  const handleGoBack = () => {
    navigate('/video-lessons/reading-comprehension');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reading Comprehension Test</h1>
              <p className="text-gray-600">GATE Exam Preparation</p>
            </div>
          </div>

          {/* Test Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Test Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Passages</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
              </div>
              <p className="text-gray-600">
                This reading comprehension test evaluates your ability to understand, analyze, and interpret 
                written passages across various topics and question types.
              </p>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Read Actively</h4>
                    <p className="text-sm text-gray-600">
                      Read each passage carefully, paying attention to main ideas, supporting details, and the author's tone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Understand Question Types</h4>
                    <p className="text-sm text-gray-600">
                      Questions may ask about main ideas, specific details, inferences, vocabulary, or author's purpose.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Refer Back to the Text</h4>
                    <p className="text-sm text-gray-600">
                      Always base your answers on information provided in the passage, not on outside knowledge.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Manage Your Time</h4>
                    <p className="text-sm text-gray-600">
                      Spend approximately 15 minutes per passage (including reading time and answering questions).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Types */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Question Types You'll Encounter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Main Idea Questions</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Ask about the central theme or primary purpose of the passage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Detail Questions</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Focus on specific information directly stated in the text.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Inference Questions</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Require you to draw conclusions based on textual evidence.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Vocabulary Questions</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Test understanding of words or phrases in context.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Tone/Attitude Questions</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Ask about the author's perspective or attitude toward the topic.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Structure Questions</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Focus on how the passage is organized or how ideas relate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Reading Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Skim the questions first to know what to look for while reading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Read the passage once for general understanding, then reread for details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Eliminate obviously wrong answer choices to improve your odds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Don't overthink - choose the answer most directly supported by the text</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Start Test Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleStartTest}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Reading Comprehension Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingComprehensionPreStart;
