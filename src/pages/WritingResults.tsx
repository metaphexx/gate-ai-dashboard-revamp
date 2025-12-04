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
  CheckCircle,
  MessageSquare,
  Target,
  RefreshCw,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import EverestLogo from '@/components/test/EverestLogo';

// Mock data for the writing results
const writingResults = {
  creativity: { score: 15, total: 25 },
  structure: { score: 7, total: 15 },
  grammar: { score: 2, total: 10 },
  overall: { score: 24, total: 50 },
  timeSpent: "25 Min 00 Sec",
  feedback: {
    creativity: {
      feedback: "The piece has a hint of originality with the metaphor of the tunnel as a journey of persistence. However, it lacks depth and engagement beyond surface-level reflections.",
      suggestions: "Use more vivid imagery and sensory details to bring your metaphors to life. Explore unexpected angles or perspectives on your chosen topic, and add personal anecdotes or unique observations to deepen engagement."
    },
    structure: {
      feedback: "The response has a basic structure with an introduction and conclusion. However, the flow is disrupted by abrupt transitions and lack of coherence.",
      suggestions: "Use transition words and phrases to connect ideas smoothly. Create a clear thesis statement in your introduction and ensure each paragraph focuses on a single main idea."
    },
    grammar: {
      feedback: "Numerous grammatical errors detract from readability: 'tunnel' should be 'tunnel', 'stretches' should be 'stretches', and 'energy' should be 'emerge'.",
      suggestions: "Proofread your work carefully before submitting and use spell-check tools to catch common errors. Reading your writing aloud can help identify awkward phrasing and grammatical issues."
    },
    overall: {
      feedback: "The response suffers from a lack of depth and multiple grammatical errors. It barely meets the length requirement, leading to severe penalties.",
      suggestions: "Aim to exceed the minimum word count to allow for fuller development of your ideas. Focus on quality over quantity in your revisions, and practice timed writing exercises to improve both speed and accuracy."
    }
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
          {/* Mobile Header */}
          <div className="grid md:hidden grid-cols-[auto_1fr_auto] items-center">
            <div className="flex justify-start">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-center">
              <EverestLogo />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => navigate('/')}
                size="sm"
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                <Home className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
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
          
          {/* Mobile Title */}
          <div className="md:hidden mt-3">
            <h1 className="text-lg font-bold text-[#009dff] text-center">Writing Assessment Results</h1>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Overall Score Section */}
        <Card className="mb-6 md:mb-8 bg-[#009dff] text-white rounded-2xl border-none shadow-lg overflow-hidden">
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Overall Score</h2>
                <p className="text-base md:text-lg opacity-90 mb-4 md:mb-6">
                  You scored {writingResults.overall.score} out of {writingResults.overall.total} points
                </p>
                <div className="inline-flex items-center space-x-3 bg-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3">
                  <Clock className="h-5 w-5 md:h-6 md:w-6" />
                  <div>
                    <span className="text-sm md:text-base font-semibold">Time taken:</span>
                    <span className="text-base md:text-lg font-bold ml-2">{writingResults.timeSpent}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-3 md:mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold">{Math.round(overallPercentage)}%</div>
                    </div>
                  </div>
                  <svg className="w-28 h-28 md:w-32 md:h-32 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="45"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="6"
                      fill="transparent"
                      className="md:hidden"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="45"
                      stroke="white"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={`${(overallPercentage / 100) * 283} 283`}
                      strokeLinecap="round"
                      className="md:hidden"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="50"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      fill="transparent"
                      className="hidden md:block"
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
                      className="hidden md:block"
                    />
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  {getStarRating(overallPercentage).map((star, index) => (
                    <div key={index} className="w-4 h-4 md:w-5 md:h-5">
                      {star}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Detailed Breakdown */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Detailed Breakdown</h3>
            <div className="space-y-4">
              {/* Creativity */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1">Creativity</h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          {((writingResults.creativity.score / writingResults.creativity.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">{writingResults.creativity.score}</div>
                      <div className="text-xs md:text-sm text-gray-600">out of {writingResults.creativity.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 md:mt-4">
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
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1">Structure</h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          {((writingResults.structure.score / writingResults.structure.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">{writingResults.structure.score}</div>
                      <div className="text-xs md:text-sm text-gray-600">out of {writingResults.structure.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 md:mt-4">
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
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1">Grammar</h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          {((writingResults.grammar.score / writingResults.grammar.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">{writingResults.grammar.score}</div>
                      <div className="text-xs md:text-sm text-gray-600">out of {writingResults.grammar.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 md:mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(writingResults.grammar.score / writingResults.grammar.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overall */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-base md:text-lg mb-1">Overall</h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          {((writingResults.overall.score / writingResults.overall.total) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-gray-900">{writingResults.overall.score}</div>
                      <div className="text-xs md:text-sm text-gray-600">out of {writingResults.overall.total}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 md:mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(writingResults.overall.score / writingResults.overall.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Comparison Chart */}
            <Card className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#009dff]" />
                  Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Creativity', score: (writingResults.creativity.score / writingResults.creativity.total) * 100, fill: '#22c55e' },
                        { name: 'Structure', score: (writingResults.structure.score / writingResults.structure.total) * 100, fill: '#f97316' },
                        { name: 'Grammar', score: (writingResults.grammar.score / writingResults.grammar.total) * 100, fill: '#ef4444' },
                        { name: 'Overall', score: (writingResults.overall.score / writingResults.overall.total) * 100, fill: '#3b82f6' },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" width={70} />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']} />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps Action Card */}
            <Card className="mt-6 bg-gradient-to-br from-[#009dff]/10 to-blue-50 rounded-xl border border-[#009dff]/20 shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#009dff] rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">Next Steps</h4>
                    <p className="text-xs md:text-sm text-gray-600">Recommended actions to improve</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <CheckCircle className="h-5 w-5 text-red-500" />
                    <span className="text-sm text-gray-700">Focus on grammar exercises</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <FileText className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-gray-700">Practice essay structuring</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                    <Lightbulb className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Read more creative writing samples</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#009dff] text-[#009dff] hover:bg-[#009dff]/10"
                    onClick={() => navigate('/writing-lessons')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Review Lessons
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-[#009dff] hover:bg-[#008ae6] text-white"
                    onClick={() => navigate('/writing-pre-start')}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Feedback */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Detailed Feedback</h3>
            <div className="space-y-4">
              {/* Overall Feedback - Moved to top */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Star className="h-4 w-4 md:h-5 md:w-5 text-[#009dff]" />
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">Overall</h4>
                  </div>
                  
                  {/* Feedback Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Feedback</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {writingResults.feedback.overall.feedback}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions Section */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Suggestions</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {writingResults.feedback.overall.suggestions}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Creativity Feedback */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">Creativity</h4>
                  </div>
                  
                  {/* Feedback Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Feedback</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {writingResults.feedback.creativity.feedback}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions Section */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Suggestions</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {writingResults.feedback.creativity.suggestions}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Structure Feedback */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">Structure</h4>
                  </div>
                  
                  {/* Feedback Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Feedback</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {writingResults.feedback.structure.feedback}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions Section */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Suggestions</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {writingResults.feedback.structure.suggestions}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Grammar Feedback */}
              <Card className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900 text-base md:text-lg">Grammar</h4>
                  </div>
                  
                  {/* Feedback Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Feedback</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {writingResults.feedback.grammar.feedback}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions Section */}
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Suggestions</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {writingResults.feedback.grammar.suggestions}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 md:mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-gray-300 hover:bg-gray-50 hover:text-gray-900 w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/writing-solution')}
            className="bg-[#009dff] hover:bg-[#008ae6] text-white w-full sm:w-auto"
          >
            View Solution
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingResults;
