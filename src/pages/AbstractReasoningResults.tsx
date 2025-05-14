import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EverestLogo from '@/components/test/EverestLogo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';

// Mock data for the results page
const resultData = {
  totalMarks: 37,
  correct: 16,
  incorrect: 5,
  skipped: 16,
  accuracy: 76,
  timeTaken: "00h 20m 0s",
  subTypes: [
    { 
      name: 'Pattern Recognition', 
      correct: 5, 
      incorrect: 1, 
      skipped: 2, 
      total: 8,
      percentage: 62.5 
    },
    { 
      name: 'Classification', 
      correct: 4, 
      incorrect: 1, 
      skipped: 2, 
      total: 7,
      percentage: 57.1 
    },
    { 
      name: 'Odd-One-Out', 
      correct: 3, 
      incorrect: 1, 
      skipped: 2, 
      total: 6,
      percentage: 50 
    },
    { 
      name: 'Matrix Reasoning', 
      correct: 2, 
      incorrect: 1, 
      skipped: 3, 
      total: 6,
      percentage: 33.3 
    },
    { 
      name: 'Series Completion', 
      correct: 1, 
      incorrect: 0, 
      skipped: 3, 
      total: 4,
      percentage: 25 
    },
    { 
      name: 'Analogies', 
      correct: 1, 
      incorrect: 1, 
      skipped: 4, 
      total: 6,
      percentage: 16.7 
    },
  ],
  timeDistribution: [
    { name: 'On Correct', value: 40, fill: '#38C172' },
    { name: 'On Incorrect', value: 20, fill: '#EF4444' },
    { name: 'On Skipped', value: 40, fill: '#F59E0B' },
  ],
  questionPerformance: Array(37).fill(0).map((_, i) => {
    // Random distribution of correct (1), incorrect (0), and skipped (-1)
    const status = Math.floor(Math.random() * 3) - 1;
    return {
      question: i + 1,
      status,
      statusText: status === 1 ? 'Correct' : status === 0 ? 'Incorrect' : 'Skipped',
      color: status === 1 ? '#38C172' : status === 0 ? '#EF4444' : '#F59E0B'
    };
  })
};

// Calculate time spent per subtype for chart
const timePerSubtype = resultData.subTypes.map(subtype => ({
  name: subtype.name,
  time: Math.round((parseInt(resultData.timeTaken.split('h')[0]) * 60 + 
          parseInt(resultData.timeTaken.split('h')[1].split('m')[0])) * 
          (subtype.total / resultData.totalMarks)),
  fill: getPerformanceBandColor(subtype.percentage)
}));

// Helper function to get performance band color
function getPerformanceBandColor(percentage: number): string {
  if (percentage >= 71) return '#38C172'; // Strong - Green
  if (percentage >= 41) return '#F59E0B'; // Developing - Orange
  return '#EF4444'; // Needs Work - Red
}

// Helper function to get performance band text
function getPerformanceBandText(percentage: number): string {
  if (percentage >= 71) return 'Strong';
  if (percentage >= 41) return 'Developing';
  return 'Needs Work';
}

// Helper function to create stacked bar data
const createStackedBarData = () => {
  return [
    {
      name: 'Results',
      correct: resultData.correct,
      incorrect: resultData.incorrect,
      skipped: resultData.skipped
    }
  ];
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md text-sm">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const AbstractReasoningResults = () => {
  // Find weakest areas for quick summary
  const weakestAreas = [...resultData.subTypes]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 2)
    .map(area => area.name);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 py-2 px-6 flex items-center justify-between shadow-sm">
        <div>
          <EverestLogo />
        </div>
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </Link>
      </header>
      
      <div className="container mx-auto py-8 px-4 space-y-8">
        <h1 className="text-2xl font-bold mb-6">Abstract Reasoning Test Results</h1>
        
        {/* Quick Summary Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-8">
          <div className="flex items-start gap-3">
            <Info className="text-blue-500 mt-0.5" size={20} />
            <div>
              <h3 className="font-medium text-blue-700">Performance Summary</h3>
              <p className="text-blue-600">
                Focus on improving {weakestAreas.join(' and ')}. You performed well in Pattern Recognition.
              </p>
            </div>
          </div>
        </div>

        {/* Score Summary Section */}
        <section className="grid md:grid-cols-7 gap-6">
          {/* Left card - Score details */}
          <Card className="md:col-span-3 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Score</h2>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold">{resultData.correct}</div>
                <div className="text-gray-500">Out of {resultData.totalMarks}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                  <div className="font-medium">{resultData.accuracy}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Time Taken</div>
                  <div className="font-medium flex items-center">
                    <Clock size={16} className="mr-1" /> {resultData.timeTaken}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full bg-[#009dff] hover:bg-[#0084d6]">
                  View Solution
                </Button>
                <Button className="w-full bg-[#009dff] hover:bg-[#0084d6]">
                  Proceed to Feedback
                </Button>
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Right card - Performance visualization */}
          <Card className="md:col-span-4 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              
              {/* Stacked bar chart */}
              <div className="h-20 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={createStackedBarData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={40}
                  >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="correct" stackId="a" fill="#38C172" name="Correct" radius={[4, 0, 0, 4]} />
                    <Bar dataKey="incorrect" stackId="a" fill="#EF4444" name="Incorrect" />
                    <Bar dataKey="skipped" stackId="a" fill="#F59E0B" name="Skipped" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex justify-center mb-6 gap-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#38C172] rounded-full mr-2"></div>
                  <span className="text-sm">Correct: {resultData.correct}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#EF4444] rounded-full mr-2"></div>
                  <span className="text-sm">Incorrect: {resultData.incorrect}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#F59E0B] rounded-full mr-2"></div>
                  <span className="text-sm">Skipped: {resultData.skipped}</span>
                </div>
              </div>
              
              {/* Performance bands legend */}
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="font-medium text-sm mb-2">Performance Bands</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#38C172] rounded-full mr-2"></div>
                    <span className="text-xs">71-100% - Strong</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#F59E0B] rounded-full mr-2"></div>
                    <span className="text-xs">41-70% - Developing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#EF4444] rounded-full mr-2"></div>
                    <span className="text-xs">0-40% - Needs Work</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sub-Type Performance Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Performance by Sub-Type</h2>
          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Sub-Type</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead className="text-right">Correct</TableHead>
                      <TableHead className="text-right">Incorrect</TableHead>
                      <TableHead className="text-right">Skipped</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.subTypes.map((subType, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{subType.name}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${subType.percentage}%`, 
                                backgroundColor: getPerformanceBandColor(subType.percentage)
                              }}
                            ></div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{subType.correct} / {subType.total}</TableCell>
                        <TableCell className="text-right">{subType.incorrect} / {subType.total}</TableCell>
                        <TableCell className="text-right">{subType.skipped} / {subType.total}</TableCell>
                        <TableCell className="text-right font-medium">{subType.percentage}%</TableCell>
                        <TableCell className="text-right">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs ${
                              subType.percentage >= 71 ? 'bg-green-100 text-green-800' :
                              subType.percentage >= 41 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {getPerformanceBandText(subType.percentage)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Question Report Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Question Report</h2>
          <Card className="shadow-md">
            <CardContent className="p-6">
              {/* Stats Summary */}
              <div className="grid grid-cols-5 gap-4 mb-8 text-center">
                <div>
                  <div className="text-2xl font-bold">{resultData.totalMarks}</div>
                  <div className="text-gray-500 text-sm">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{resultData.correct}</div>
                  <div className="text-gray-500 text-sm">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{resultData.incorrect}</div>
                  <div className="text-gray-500 text-sm">Incorrect</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{resultData.skipped}</div>
                  <div className="text-gray-500 text-sm">Skipped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{resultData.timeTaken}</div>
                  <div className="text-gray-500 text-sm">Time Taken</div>
                </div>
              </div>

              {/* Mini bar chart summary */}
              <div className="h-2 flex rounded-full overflow-hidden mb-8">
                <div 
                  className="bg-green-500" 
                  style={{width: `${(resultData.correct / resultData.totalMarks) * 100}%`}}
                ></div>
                <div 
                  className="bg-red-500" 
                  style={{width: `${(resultData.incorrect / resultData.totalMarks) * 100}%`}}
                ></div>
                <div 
                  className="bg-yellow-500" 
                  style={{width: `${(resultData.skipped / resultData.totalMarks) * 100}%`}}
                ></div>
              </div>
              
              {/* Question performance trend chart */}
              <h3 className="font-medium mb-2">Performance Trend Across Questions</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={resultData.questionPerformance}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="question" 
                      label={{ value: 'Question Number', position: 'insideBottomRight', offset: -10 }}
                    />
                    <YAxis 
                      domain={[-1, 1]}
                      ticks={[-1, 0, 1]}
                      tickFormatter={(value) => {
                        if (value === 1) return 'Correct';
                        if (value === 0) return 'Incorrect';
                        return 'Skipped';
                      }}
                    />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        const item = props.payload;
                        return [item.statusText, 'Status'];
                      }}
                      labelFormatter={(label) => `Question ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="status" 
                      stroke="#009dff" 
                      activeDot={{ r: 8, fill: "#009dff" }}
                      dot={{ fill: "#009dff", stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Time Analysis Section */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Time Distribution */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Time Analysis</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resultData.timeDistribution}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Percentage of Time (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" name="Time Percentage">
                      {resultData.timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-3 text-center">
                {resultData.timeDistribution.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm" style={{ color: item.fill }}>{item.value}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Time per Subtype */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Average Time per Sub-Type</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timePerSubtype}
                    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" label={{ value: 'Minutes', position: 'insideBottom' }} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="time" name="Minutes">
                      {timePerSubtype.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AbstractReasoningResults;
