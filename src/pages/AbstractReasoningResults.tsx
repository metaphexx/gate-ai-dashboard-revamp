
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';

interface ResultData {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeTaken: string;
  subTypes: {
    name: string;
    correct: number;
    incorrect: number;
    skipped: number;
    total: number;
    percentage: number;
  }[];
}

// Mock data for the results page
const resultData: ResultData = {
  totalQuestions: 37,
  correct: 16,
  incorrect: 5,
  skipped: 16,
  timeTaken: "00h 20m 0s",
  subTypes: [
    {
      name: "Pattern Recognition",
      correct: 5,
      incorrect: 1,
      skipped: 2,
      total: 8,
      percentage: 62.5
    },
    {
      name: "Classification",
      correct: 4,
      incorrect: 1,
      skipped: 2,
      total: 7,
      percentage: 57.1
    },
    {
      name: "Odd-One-Out",
      correct: 3,
      incorrect: 1,
      skipped: 2,
      total: 6,
      percentage: 50
    },
    {
      name: "Matrix Reasoning",
      correct: 2,
      incorrect: 1,
      skipped: 3,
      total: 6,
      percentage: 33.3
    },
    {
      name: "Series Completion",
      correct: 1,
      incorrect: 0,
      skipped: 3,
      total: 4,
      percentage: 25
    },
    {
      name: "Analogies",
      correct: 1,
      incorrect: 1,
      skipped: 4,
      total: 6,
      percentage: 16.7
    }
  ]
};

// Generate line chart data for question performance
const generateQuestionData = () => {
  // In a real app, this would come from actual question results
  return Array.from({ length: 37 }, (_, i) => {
    // Randomly generate status: 2 = correct, 1 = incorrect, 0 = skipped
    // But distribute them to match our overall stats
    let status;
    const rand = Math.random();
    if (rand < 0.43) status = 2; // ~16/37 correct
    else if (rand < 0.57) status = 1; // ~5/37 incorrect
    else status = 0; // ~16/37 skipped
    
    return {
      questionNumber: i + 1,
      status,
    };
  });
};

const timeData = [
  { name: 'On Correct', value: 40, color: '#38C172' },
  { name: 'On Incorrect', value: 20, color: '#EF4444' },
  { name: 'On Skipped', value: 40, color: '#F59E0B' },
];

const avgTimeData = [
  { name: 'Pattern Recognition', value: 3.8, color: resultData.subTypes[0].percentage > 70 ? '#38C172' : 
                                                resultData.subTypes[0].percentage > 40 ? '#F59E0B' : '#EF4444' },
  { name: 'Classification', value: 3.9, color: resultData.subTypes[1].percentage > 70 ? '#38C172' : 
                                          resultData.subTypes[1].percentage > 40 ? '#F59E0B' : '#EF4444' },
  { name: 'Odd-One-Out', value: 3.0, color: resultData.subTypes[2].percentage > 70 ? '#38C172' : 
                                      resultData.subTypes[2].percentage > 40 ? '#F59E0B' : '#EF4444' },
  { name: 'Matrix Reasoning', value: 2.8, color: resultData.subTypes[3].percentage > 70 ? '#38C172' : 
                                        resultData.subTypes[3].percentage > 40 ? '#F59E0B' : '#EF4444' },
  { name: 'Series Completion', value: 2.0, color: resultData.subTypes[4].percentage > 70 ? '#38C172' : 
                                          resultData.subTypes[4].percentage > 40 ? '#F59E0B' : '#EF4444' },
  { name: 'Analogies', value: 2.9, color: resultData.subTypes[5].percentage > 70 ? '#38C172' : 
                                resultData.subTypes[5].percentage > 40 ? '#F59E0B' : '#EF4444' },
];

// Helper function to get status based on percentage
const getStatusInfo = (percentage: number) => {
  if (percentage >= 71) {
    return { status: 'Strong', color: 'bg-accent text-accent-foreground' };
  } else if (percentage >= 41) {
    return { status: 'Developing', color: 'bg-warning text-warning-foreground' };
  } else {
    return { status: 'Needs Work', color: 'bg-destructive text-destructive-foreground' };
  }
};

// Function to get weak areas for improvement
const getWeakAreas = () => {
  const weakAreas = resultData.subTypes
    .filter(subType => subType.percentage < 40)
    .map(subType => subType.name);
  
  if (weakAreas.length === 0) {
    return null;
  }

  return weakAreas;
};

// Function to get strong areas
const getStrongAreas = () => {
  const strongAreas = resultData.subTypes
    .filter(subType => subType.percentage > 70)
    .map(subType => subType.name);
  
  if (strongAreas.length === 0) {
    return null;
  }

  return strongAreas;
};

const AbstractReasoningResults = () => {
  const questionData = React.useMemo(() => generateQuestionData(), []);
  const accuracy = resultData.correct / resultData.totalQuestions * 100;
  const weakAreas = getWeakAreas();
  const strongAreas = getStrongAreas();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <EverestLogo />
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </header>

      <div className="container max-w-6xl py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Abstract Reasoning Test Results</h1>

        {/* Performance Summary Alert */}
        {(weakAreas || strongAreas) && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-600">Performance Summary</h3>
                <div className="mt-2 text-sm text-blue-700">
                  {weakAreas && <p>Focus on improving {weakAreas.join(' and ')}.</p>}
                  {strongAreas && <p>You performed well in {strongAreas.join(' and ')}.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Your Score Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <h2 className="text-2xl font-bold text-center">Your Score</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="text-6xl font-bold mb-2">{resultData.correct}</div>
              <div className="text-lg text-muted-foreground mb-6">Out of {resultData.totalQuestions}</div>
              
              <div className="grid grid-cols-2 gap-8 w-full">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <div className="text-xl font-semibold">{accuracy.toFixed(1)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                  <div className="text-xl font-semibold flex items-center justify-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {resultData.timeTaken}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full bg-primary hover:bg-primary/90">View Solution</Button>
              <Button variant="outline" className="w-full">Proceed to Feedback</Button>
              <Link to="/" className="w-full">
                <Button variant="outline" className="w-full">Back to Home</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Performance Overview Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <h2 className="text-2xl font-bold">Performance Overview</h2>
            </CardHeader>
            <CardContent className="pt-4">
              {/* Horizontal stacked bar chart */}
              <div className="mb-6">
                <div className="h-8 flex rounded-md overflow-hidden">
                  <div 
                    className="bg-accent animate-fade-in" 
                    style={{width: `${(resultData.correct / resultData.totalQuestions) * 100}%`}}
                  ></div>
                  <div 
                    className="bg-destructive animate-fade-in" 
                    style={{width: `${(resultData.incorrect / resultData.totalQuestions) * 100}%`}}
                  ></div>
                  <div 
                    className="bg-warning animate-fade-in" 
                    style={{width: `${(resultData.skipped / resultData.totalQuestions) * 100}%`}}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center text-sm">
                    <div className="h-3 w-3 bg-accent rounded-full mr-1"></div>
                    <span>Correct: {resultData.correct}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-3 w-3 bg-destructive rounded-full mr-1"></div>
                    <span>Incorrect: {resultData.incorrect}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-3 w-3 bg-warning rounded-full mr-1"></div>
                    <span>Skipped: {resultData.skipped}</span>
                  </div>
                </div>
              </div>

              {/* Performance Bands */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Performance Bands</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-accent rounded-full"></div>
                    <span className="text-sm">71-100% - Strong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-warning rounded-full"></div>
                    <span className="text-sm">41-70% - Developing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-destructive rounded-full"></div>
                    <span className="text-sm">0-40% - Needs Work</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sub-Type Performance Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Performance by Sub-Type</h2>
          <div className="rounded-lg border overflow-hidden">
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
                {resultData.subTypes.map((subType) => {
                  const { status, color } = getStatusInfo(subType.percentage);
                  return (
                    <TableRow key={subType.name}>
                      <TableCell className="font-medium">{subType.name}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              subType.percentage > 70 ? 'bg-accent' : 
                              subType.percentage > 40 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${subType.percentage}%` }}
                          ></div>
                        </div>
                      </TableCell>
                      <TableCell>{subType.correct} / {subType.total}</TableCell>
                      <TableCell>{subType.incorrect} / {subType.total}</TableCell>
                      <TableCell>{subType.skipped} / {subType.total}</TableCell>
                      <TableCell className="font-semibold">{subType.percentage.toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge className={color}>{status}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Question Report Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Question Report</h2>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              {/* Stats Row */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{resultData.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{resultData.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">{resultData.incorrect}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">{resultData.skipped}</div>
                  <div className="text-sm text-muted-foreground">Skipped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{resultData.timeTaken}</div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 flex rounded-md overflow-hidden mb-8">
                <div 
                  className="bg-accent"
                  style={{width: `${(resultData.correct / resultData.totalQuestions) * 100}%`}}
                ></div>
                <div 
                  className="bg-destructive"
                  style={{width: `${(resultData.incorrect / resultData.totalQuestions) * 100}%`}}
                ></div>
                <div 
                  className="bg-warning"
                  style={{width: `${(resultData.skipped / resultData.totalQuestions) * 100}%`}}
                ></div>
              </div>
              
              {/* Performance Trend Line Chart */}
              <h3 className="text-lg font-semibold mb-2">Performance Trend Across Questions</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={questionData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="questionNumber" 
                      label={{ value: "Question Number", position: "insideBottom", offset: -5 }} 
                    />
                    <YAxis 
                      domain={[0, 2]} 
                      ticks={[0, 1, 2]} 
                      tickFormatter={(value) => {
                        return value === 0 ? 'Skipped' : value === 1 ? 'Incorrect' : 'Correct';
                      }}
                    />
                    <Tooltip 
                      formatter={(value: any) => {
                        return value === 0 ? 'Skipped' : value === 1 ? 'Incorrect' : 'Correct';
                      }}
                      labelFormatter={(label) => `Question ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="status" 
                      stroke="#009dff" 
                      strokeWidth={2}
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                      className="animate-[fade-in_1s_ease-out]"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Time Analysis Pie Chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-bold">Time Analysis</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      className="animate-[fade-in_1s_ease-out]"
                    >
                      {timeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'Time Spent']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col w-full gap-1 mt-2">
                <div className="text-center font-semibold text-lg">{resultData.timeTaken}</div>
                <div className="text-center text-sm text-muted-foreground">Total Time Spent</div>
              </div>

              <div className="grid grid-cols-3 w-full mt-4">
                {timeData.map((item) => (
                  <div key={item.name} className="text-center">
                    <div className="text-sm font-semibold" style={{ color: item.color }}>
                      {item.value}%
                    </div>
                    <div className="text-xs text-muted-foreground">{item.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Average Time per Sub-Type */}
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
              <h2 className="text-xl font-bold">Average Time per Sub-Type</h2>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={avgTimeData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis
                      type="number"
                      label={{ value: 'Minutes', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: any) => [`${value} minutes`, 'Average Time']}
                    />
                    <Bar
                      dataKey="value"
                      className="animate-[fade-in_1s_ease-out]"
                      radius={[0, 4, 4, 0]}
                    >
                      {avgTimeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AbstractReasoningResults;
