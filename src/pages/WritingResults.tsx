
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
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

const ScoreChart = ({ score, total, title }: { score: number; total: number; title: string }) => {
  const percentage = (score / total) * 100;
  const data = [
    { name: 'Score', value: score, fill: '#38C172' },
    { name: 'Remaining', value: total - score, fill: '#E5E7EB' }
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
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
            <div className="text-lg font-bold text-gray-900">Total: {total}</div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900">
          You have scored <span className="text-[#009dff] font-bold">{score}</span> out of <span className="font-bold">{total}</span>
        </p>
      </div>
    </div>
  );
};

const WritingResults = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#009dff]">Writing Report</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/writing-test')}
                className="border-gray-200 hover:bg-gray-50"
              >
                View solution
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="bg-[#009dff] hover:bg-[#008ae6] text-white"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scores Section */}
          <div className="space-y-6">
            {/* Creativity */}
            <Card className="bg-white rounded-2xl border-none shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Creativity</CardTitle>
                  <Award className="h-5 w-5 text-[#009dff]" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScoreChart 
                  score={writingResults.creativity.score} 
                  total={writingResults.creativity.total}
                  title="Creativity"
                />
              </CardContent>
            </Card>

            {/* Structure */}
            <Card className="bg-white rounded-2xl border-none shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Structure</CardTitle>
                  <Target className="h-5 w-5 text-[#009dff]" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScoreChart 
                  score={writingResults.structure.score} 
                  total={writingResults.structure.total}
                  title="Structure"
                />
              </CardContent>
            </Card>

            {/* Grammar */}
            <Card className="bg-white rounded-2xl border-none shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Grammar</CardTitle>
                  <TrendingUp className="h-5 w-5 text-[#009dff]" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <ScoreChart 
                  score={writingResults.grammar.score} 
                  total={writingResults.grammar.total}
                  title="Grammar"
                />
              </CardContent>
            </Card>

            {/* Overall Score */}
            <Card className="bg-gradient-to-r from-[#009dff] to-[#80dfff] text-white rounded-2xl border-none shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Overall</CardTitle>
                  <Award className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Score', value: writingResults.overall.score, fill: '#FFFFFF' },
                              { name: 'Remaining', value: writingResults.overall.total - writingResults.overall.score, fill: 'rgba(255,255,255,0.3)' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={60}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            strokeWidth={0}
                          >
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-lg font-bold">Total: {writingResults.overall.total}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      You have scored <span className="font-bold">{writingResults.overall.score}</span> out of <span className="font-bold">{writingResults.overall.total}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Taken */}
            <Card className="bg-white rounded-2xl border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="h-5 w-5 text-[#009dff]" />
                  <span className="text-lg font-semibold text-gray-900">
                    Total Time Taken: {writingResults.timeSpent}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <div className="space-y-6">
            <Card className="bg-white rounded-2xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Creativity Feedback */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Creativity</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {writingResults.feedback.creativity}
                  </p>
                </div>

                {/* Structure Feedback */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Structure</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {writingResults.feedback.structure}
                  </p>
                </div>

                {/* Grammar Feedback */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Grammar</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {writingResults.feedback.grammar}
                  </p>
                </div>

                {/* Overall Feedback */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Overall</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {writingResults.feedback.overall}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingResults;
