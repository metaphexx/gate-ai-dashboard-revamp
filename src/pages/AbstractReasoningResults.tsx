
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Eye, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';
import TimeAnalysisSection from '@/components/results/TimeAnalysisSection';
import AverageTimeSection from '@/components/results/AverageTimeSection';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  // Sample data for charts and tables
  const timeData = [
    { name: 'Correct', value: 40, color: '#22c55e' },
    { name: 'Incorrect', value: 20, color: '#ef4444' },
    { name: 'Skipped', value: 40, color: '#f59e0b' }
  ];

  const avgTimeData = [
    { name: 'Pattern Recognition', value: 2.4, color: '#f59e0b' },
    { name: 'Classification', value: 2.2, color: '#f59e0b' },
    { name: 'Odd-One-Out', value: 2.0, color: '#f59e0b' },
    { name: 'Matrix Reasoning', value: 1.8, color: '#ef4444' },
    { name: 'Series Completion', value: 1.6, color: '#ef4444' },
    { name: 'Analogies', value: 1.4, color: '#ef4444' }
  ];

  const performanceData = [
    { subType: 'Pattern Recognition', performance: 5, correct: 5, incorrect: 1, skipped: 2, percentage: 62.5, status: 'Developing' },
    { subType: 'Classification', performance: 4, correct: 4, incorrect: 1, skipped: 2, percentage: 57.1, status: 'Developing' },
    { subType: 'Odd-One-Out', performance: 3, correct: 3, incorrect: 1, skipped: 2, percentage: 50.0, status: 'Developing' },
    { subType: 'Matrix Reasoning', performance: 2, correct: 2, incorrect: 1, skipped: 3, percentage: 33.3, status: 'Needs Work' },
    { subType: 'Series Completion', performance: 1, correct: 1, incorrect: 0, skipped: 3, percentage: 25.0, status: 'Needs Work' },
    { subType: 'Analogies', performance: 1, correct: 1, incorrect: 1, skipped: 4, percentage: 16.7, status: 'Needs Work' }
  ];

  const questionReportData = Array.from({ length: 37 }, (_, i) => ({
    question: i + 1,
    status: i < 16 ? 1 : i < 21 ? -1 : 0 // 1 = correct, -1 = incorrect, 0 = skipped
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Developing':
        return 'bg-orange-100 text-orange-800';
      case 'Needs Work':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              <span>Back to Practice Tests</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto pt-24 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Abstract Reasoning Test Results
            </h1>
            <div className="bg-blue-50 border-l-4 border-[#009dff] p-4 rounded-r-lg inline-block">
              <div className="flex items-center">
                <div className="text-[#009dff] mr-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#009dff]">Performance Summary</p>
                  <p className="text-sm text-gray-600">Focus on improving Matrix Reasoning and Series Completion and Analogies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Score Overview */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Your Score Card */}
            <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-4">Your Score</h3>
                  <div className="text-6xl font-bold text-[#009dff] mb-2">16</div>
                  <p className="text-lg text-gray-600 mb-4">Out of 37</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-medium">43.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time Taken</span>
                      <span className="font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        00h 20m 0s
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview Card */}
            <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium mb-4">Performance Overview</h3>
                  <div className="text-sm text-gray-600 mb-4">Performance Level: <span className="font-medium text-orange-600">Developing (43.2%)</span></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">16</div>
                    <div className="text-xs text-gray-600">Correct</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">5</div>
                    <div className="text-xs text-gray-600">Incorrect</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">16</div>
                    <div className="text-xs text-gray-600">Skipped</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Report */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Question Report</CardTitle>
              <div className="grid grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-gray-900">37</div>
                  <div className="text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">16</div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <div className="text-gray-600">Incorrect</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">16</div>
                  <div className="text-gray-600">Skipped</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 via-red-500 to-orange-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
              <div className="text-right text-sm text-gray-600 flex items-center justify-end">
                <Clock className="h-4 w-4 mr-1" />
                00h 20m 0s Time Taken
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={questionReportData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="question" 
                      type="number" 
                      domain={[1, 37]}
                      ticks={[1, 5, 10, 15, 20, 25, 30, 35, 37]}
                    />
                    <YAxis 
                      domain={[-1.5, 1.5]} 
                      ticks={[-1, 0, 1]}
                      tickFormatter={(value) => value === 1 ? 'Correct' : value === 0 ? 'Skipped' : 'Incorrect'}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        const status = value === 1 ? 'Correct' : value === 0 ? 'Skipped' : 'Incorrect';
                        return [status, 'Status'];
                      }}
                      labelFormatter={(label) => `Question ${label}`}
                    />
                    <Line 
                      type="stepAfter" 
                      dataKey="status" 
                      stroke="#009dff" 
                      strokeWidth={2}
                      dot={{ fill: '#009dff', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance by Sub-Type */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Performance by Sub-Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sub-Type</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Correct</TableHead>
                      <TableHead>Incorrect</TableHead>
                      <TableHead>Skipped</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.subType}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#009dff] h-2 rounded-full" 
                              style={{ width: `${(row.performance / 8) * 100}%` }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell>{row.correct} / 8</TableCell>
                        <TableCell>{row.incorrect} / 8</TableCell>
                        <TableCell>{row.skipped} / 8</TableCell>
                        <TableCell>{row.percentage}%</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Time Analysis and Average Time Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <TimeAnalysisSection timeData={timeData} totalTime="00h 20m 0s" />
            <AverageTimeSection avgTimeData={avgTimeData} />
          </div>

          {/* Action buttons */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none">
            <CardContent className="p-8">
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
