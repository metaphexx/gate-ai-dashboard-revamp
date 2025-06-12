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
  Star,
  Lightbulb,
  FileText,
  CheckCircle
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for the writing results
const writingResults = {
  creativity: { score: 15, total: 25 },
  structure: { score: 7, total: 15 },
  grammar: { score: 2, total: 10 },
  overall: { score: 24, total: 50 },
  timeSpent: "25 Min 00 Sec",
  feedback: {
    creativity: "The piece has a hint of originality with the metaphor of the tunnel as a journey of persistence. However, it lacks depth and engagement beyond surface-level reflections.",
    structure: "The response has a basic structure with an introduction and conclusion. However, the flow is disrupted by abrupt transitions and lack of coherence.",
    grammar: "Numerous grammatical errors detract from readability: 'tunnel' should be 'tunnel', 'stretches' should be 'stretches', and 'energy' should be 'emerge'.",
    overall: "The response suffers from a lack of depth and multiple grammatical errors. It barely meets the length requirement, leading to severe penalties."
  }
};

const chartConfig = {
  score: {
    label: "Score",
    color: "#38C172",
  },
  remaining: {
    label: "Remaining",
    color: "#E5E7EB",
  },
};

const ScoreChart = ({ score, total, color }: { score: number; total: number; color: string }) => {
  const percentage = (score / total) * 100;
  const data = [
    { name: 'Score', value: score, fill: color },
    { name: 'Remaining', value: total - score, fill: '#E5E7EB' }
  ];

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-24 h-24">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{score}</div>
            <div className="text-xs text-gray-600">/{total}</div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-600">
          {percentage.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

const WritingResults = () => {
  const navigate = useNavigate();
  const overallPercentage = (writingResults.overall.score / writingResults.overall.total) * 100;

  // Generate star rating based on percentage
  const getStarRating = (percentage: number) => {
    const stars = Math.round(percentage / 20); // Convert to 5-star scale
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <EverestLogo />
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span className="text-sm">Back to Test</span>
                </button>
                <span className="text-gray-300">|</span>
                <h1 className="text-xl font-bold text-[#009dff]">Writing Assessment Results</h1>
              </div>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="bg-[#009dff] hover:bg-[#008ae6] text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overall Score Section */}
        <Card className="mb-8 bg-[#009dff] text-white rounded-2xl border-none shadow-lg overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">Overall Score</h2>
                <p className="text-lg opacity-90 mb-6">
                  You scored {writingResults.overall.score} out of {writingResults.overall.total} points
                </p>
                <div className="inline-flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-3">
                  <Clock className="h-6 w-6" />
                  <div>
                    <span className="text-base font-semibold">Time taken:</span>
                    <span className="text-lg font-bold ml-2">{writingResults.timeSpent}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">{Math.round(overallPercentage)}%</div>
                    </div>
                  </div>
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="white"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(overallPercentage / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  {getStarRating(overallPercentage)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Breakdown */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Breakdown</h3>
            <div className="space-y-4">
              {/* Creativity */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">Creativity</h4>
                        <p className="text-sm text-gray-600">
                          {((writingResults.creativity.score / writingResults.creativity.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{writingResults.creativity.score}</div>
                      <div className="text-sm text-gray-600">out of {writingResults.creativity.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(writingResults.creativity.score / writingResults.creativity.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Structure */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">Structure</h4>
                        <p className="text-sm text-gray-600">
                          {((writingResults.structure.score / writingResults.structure.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{writingResults.structure.score}</div>
                      <div className="text-sm text-gray-600">out of {writingResults.structure.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${(writingResults.structure.score / writingResults.structure.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Grammar */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">Grammar</h4>
                        <p className="text-sm text-gray-600">
                          {((writingResults.grammar.score / writingResults.grammar.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{writingResults.grammar.score}</div>
                      <div className="text-sm text-gray-600">out of {writingResults.grammar.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(writingResults.grammar.score / writingResults.grammar.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Feedback</h3>
            <div className="space-y-4">
              {/* Overall Feedback - Moved to top */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Star className="h-5 w-5 text-[#009dff]" />
                    <h4 className="font-semibold text-gray-900 text-lg">Overall</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {writingResults.feedback.overall}
                  </p>
                </CardContent>
              </Card>

              {/* Creativity Feedback */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-lg">Creativity</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {writingResults.feedback.creativity}
                  </p>
                </CardContent>
              </Card>

              {/* Structure Feedback */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-lg">Structure</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {writingResults.feedback.structure}
                  </p>
                </CardContent>
              </Card>

              {/* Grammar Feedback */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-lg">Grammar</h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {writingResults.feedback.grammar}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-gray-300 hover:bg-gray-50"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/writing-solution')}
            className="bg-[#009dff] hover:bg-[#008ae6] text-white"
          >
            View Solution
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingResults;
