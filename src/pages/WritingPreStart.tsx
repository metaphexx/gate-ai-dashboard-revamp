
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, FileText, CheckCircle, AlertCircle, Play } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

const WritingPreStart = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/writing-test');
  };

  const handleGoBack = () => {
    navigate('/video-lessons/writing');
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
              <h1 className="text-2xl font-bold text-gray-900">Writing Test</h1>
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
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-gray-600">Essay Prompt</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">30</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">300-400</div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
              </div>
              <p className="text-gray-600">
                This writing test will assess your ability to construct a well-organized essay with clear arguments, 
                proper structure, and effective use of language.
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
                    <h4 className="font-medium mb-1">Read the Prompt Carefully</h4>
                    <p className="text-sm text-gray-600">
                      Take time to understand what the prompt is asking. Identify key terms and requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Plan Your Essay</h4>
                    <p className="text-sm text-gray-600">
                      Spend 3-5 minutes planning your essay structure: introduction, body paragraphs, and conclusion.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Write Clear Arguments</h4>
                    <p className="text-sm text-gray-600">
                      Support your main points with specific examples and logical reasoning.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">4</Badge>
                  <div>
                    <h4 className="font-medium mb-1">Review and Edit</h4>
                    <p className="text-sm text-gray-600">
                      Save 2-3 minutes at the end to review your essay for clarity and errors.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Criteria */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Assessment Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Content & Ideas</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Relevance to the prompt</li>
                    <li>• Depth of analysis</li>
                    <li>• Use of examples</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Organization</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Clear introduction and conclusion</li>
                    <li>• Logical flow of ideas</li>
                    <li>• Effective transitions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Language Use</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Grammar and syntax</li>
                    <li>• Vocabulary variety</li>
                    <li>• Sentence structure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mechanics</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Spelling accuracy</li>
                    <li>• Punctuation</li>
                    <li>• Word count adherence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Stay within the word count range (300-400 words)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Use formal academic language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Keep track of time - aim for 25 minutes writing, 5 minutes reviewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Make your position clear in the introduction</span>
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
              Start Writing Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPreStart;
