
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Home, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star
} from 'lucide-react';

// Mock data for the writing results
const writingResults = {
  creativity: { score: 15, total: 25 },
  structure: { score: 7, total: 15 },
  grammar: { score: 2, total: 10 },
  overall: { score: 24, total: 50 },
  timeSpent: "00 Hr 25 M 0 S",
  feedback: {
    creativity: "The piece has a hint of originality with the metaphor of the tunnel as a journey of persistence. However, it lacks depth and engagement beyond surface-level reflections.",
    structure: "The response has a basic structure with an introduction and conclusion. However, the flow is disrupted by abrupt transitions and lack of coherence.",
    grammar: "Numerous grammatical errors detract from readability: 'tunnel' should be 'tunnel', 'stretches' should be 'stretches', and 'energy' should be 'emerge'.",
    overall: "The response suffers from a lack of depth and multiple grammatical errors. It barely meets the length requirement, leading to severe penalties."
  }
};

const ScoreCircle = ({ score, total, title, color }: { score: number; total: number; title: string; color: string }) => {
  const percentage = (score / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getIcon = () => {
    if (percentage >= 80) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (percentage >= 50) return <AlertCircle className="h-6 w-6 text-yellow-500" />;
    return <XCircle className="h-6 w-6 text-red-500" />;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{score}</div>
            <div className="text-xs text-gray-500">/{total}</div>
          </div>
        </div>
      </div>
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center space-x-2">
          {getIcon()}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600">{percentage.toFixed(1)}%</p>
      </div>
    </div>
  );
};

const WritingResults = () => {
  const navigate = useNavigate();

  const overallPercentage = (writingResults.overall.score / writingResults.overall.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/writing-test')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Test
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#009dff] to-purple-600 bg-clip-text text-transparent">
                Writing Assessment Results
              </h1>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-[#009dff] to-purple-600 hover:from-[#008ae6] to-purple-700 text-white shadow-lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Score Hero Section */}
        <Card className="mb-8 bg-gradient-to-r from-[#009dff] to-purple-600 text-white border-none shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Overall Score</h2>
                <p className="text-blue-100 text-lg">
                  You scored {writingResults.overall.score} out of {writingResults.overall.total} points
                </p>
                <div className="flex items-center mt-4 space-x-2">
                  <Clock className="h-5 w-5 text-blue-100" />
                  <span className="text-blue-100">Time taken: {writingResults.timeSpent}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="white"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${overallPercentage * 2.51} 251`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">{overallPercentage.toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(overallPercentage / 20) 
                          ? 'text-yellow-300 fill-yellow-300' 
                          : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scores Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <ScoreCircle 
                    score={writingResults.creativity.score} 
                    total={writingResults.creativity.total}
                    title="Creativity"
                    color="#10b981"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <ScoreCircle 
                    score={writingResults.structure.score} 
                    total={writingResults.structure.total}
                    title="Structure"
                    color="#f59e0b"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <ScoreCircle 
                    score={writingResults.grammar.score} 
                    total={writingResults.grammar.total}
                    title="Grammar"
                    color="#ef4444"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Feedback</h3>
            
            <div className="space-y-4">
              {Object.entries(writingResults.feedback).map(([category, feedback]) => (
                <Card key={category} className="bg-white border-none shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-gray-900 capitalize flex items-center">
                      {category === 'creativity' && <Star className="mr-2 h-4 w-4 text-green-500" />}
                      {category === 'structure' && <CheckCircle className="mr-2 h-4 w-4 text-yellow-500" />}
                      {category === 'grammar' && <AlertCircle className="mr-2 h-4 w-4 text-red-500" />}
                      {category === 'overall' && <Star className="mr-2 h-4 w-4 text-purple-500" />}
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700 leading-relaxed">{feedback}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-12 space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/writing-test')}
            className="border-gray-300 hover:bg-gray-50"
          >
            Review Test
          </Button>
          <Button
            onClick={() => navigate('/practice')}
            className="bg-gradient-to-r from-[#009dff] to-purple-600 hover:from-[#008ae6] to-purple-700 text-white"
          >
            Take Another Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingResults;
