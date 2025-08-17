import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Eye, MessageSquare, Clock, TrendingUp, Calendar, MessageCircle } from 'lucide-react';
import EverestLogo from '@/components/test/EverestLogo';
import TimeAnalysisSection from '@/components/results/TimeAnalysisSection';
import AverageTimeSection from '@/components/results/AverageTimeSection';
import FloatingChatButton from '@/components/chat/FloatingChatButton';
import ChatPanel from '@/components/chat/ChatPanel';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useChatContext } from '@/contexts/ChatContext';

const AbstractReasoningResults = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setMessages } = useChatContext();

  const handleProceedToFeedback = () => {
    navigate('/abstract-reasoning-feedback');
  };

  const handleViewSolution = () => {
    navigate('/abstract-reasoning-solution');
  };

  const handleBackToTests = () => {
    navigate('/practice');
  };

  const handleOpenChat = () => {
    // Add test results context to chat
    const resultsMessage = {
      id: 'results-context',
      type: 'assistant' as const,
      content: "I can see you just completed your Abstract Reasoning test! You scored 16 out of 37 questions (43.2% accuracy) in 20 minutes. Your strongest areas are Pattern Recognition (62.5%) and Classification (57.1%). Matrix Reasoning, Series Completion, and Analogies need some work. How can I help you improve your performance?",
      timestamp: new Date(),
      quickReplies: ["How to improve Matrix Reasoning?", "Study tips for weak areas", "Practice recommendations"]
    };
    
    setMessages(prev => [...prev, resultsMessage]);
    setIsChatOpen(true);
  };

  // Get current date and time for completion
  const completionDate = new Date();
  const formatCompletionDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
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

  // Question stats for progress bar calculation
  const totalQuestions = 37;
  const correctQuestions = 16;
  const incorrectQuestions = 5;
  const skippedQuestions = 16;

  // Calculate percentages for progress bar
  const correctPercentage = (correctQuestions / totalQuestions) * 100;
  const incorrectPercentage = (incorrectQuestions / totalQuestions) * 100;
  const skippedPercentage = (skippedQuestions / totalQuestions) * 100;

  // Create gradient stops based on actual percentages
  const gradientStops = `
    linear-gradient(to right, 
      #22c55e 0%, 
      #22c55e ${correctPercentage}%, 
      #ef4444 ${correctPercentage}%, 
      #ef4444 ${correctPercentage + incorrectPercentage}%, 
      #f59e0b ${correctPercentage + incorrectPercentage}%, 
      #f59e0b 100%
    )
  `;

  // Enhanced question report data with time spent and status for bar chart
  const questionReportData = Array.from({ length: 37 }, (_, i) => {
    const questionNum = i + 1;
    let status, timeSpent, fill;
    
    if (questionNum <= 16) {
      status = 'Correct';
      timeSpent = Math.floor(Math.random() * 60) + 20; // 20-80 seconds for correct
      fill = '#22c55e'; // Green
    } else if (questionNum <= 21) {
      status = 'Incorrect';
      timeSpent = Math.floor(Math.random() * 80) + 15; // 15-95 seconds for incorrect
      fill = '#ef4444'; // Red
    } else {
      status = 'Skipped';
      timeSpent = Math.floor(Math.random() * 30) + 5; // 5-35 seconds for skipped
      fill = '#f59e0b'; // Orange
    }
    
    return {
      question: questionNum,
      timeSpent,
      status,
      fill
    };
  });

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`Question ${label}`}</p>
          <p className="text-sm">{`Status: ${data.status}`}</p>
          <p className="text-sm">{`Time: ${data.timeSpent}s`}</p>
        </div>
      );
    }
    return null;
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

          {/* Score Overview with Action Buttons */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Your Score Card */}
            <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-4">Your Score</h3>
                  <div className="text-6xl font-bold text-[#009dff] mb-2">16</div>
                  <p className="text-lg text-gray-600 mb-4">Out of 37</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xl font-medium">
                      <span>Accuracy</span>
                      <span className="font-bold">43.2%</span>
                    </div>
                    <div className="flex justify-between text-xl font-medium">
                      <span>Time Taken</span>
                      <span className="font-bold flex items-center">
                         <Clock className="h-6 w-6 mr-1" />
                        00h 20m 0s
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-medium text-gray-600">
                      <span>Completed</span>
                      <span className="flex items-center">
                        <Calendar className="h-6 w-6 mr-1" />
                        {formatCompletionDate(completionDate)}
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

          {/* Chat Prompt Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-[#009dff]/5 rounded-2xl shadow-lg border border-[#009dff]/20 mb-8 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#009dff] to-[#33a9ff] flex items-center justify-center shadow-lg animate-pulse">
                    <img 
                      src="/lovable-uploads/e877c1c5-3f7c-4632-bdba-61ea2da5ff08.png" 
                      alt="Elliot Avatar" 
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">💬 Need personalized study tips? Chat with Elliot!</h3>
                    <p className="text-gray-600 text-sm">I can analyze your test results and provide targeted recommendations to improve your weak areas.</p>
                  </div>
                </div>
                <Button 
                  onClick={handleOpenChat}
                  className="bg-[#009dff] hover:bg-[#0080ff] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons with swapped colors */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleProceedToFeedback}
                  variant="outline"
                  className="border-[#009dff] text-[#009dff] hover:bg-[#009dff] hover:text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors flex-1"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Proceed to Feedback
                </Button>
                <Button 
                  onClick={handleViewSolution}
                  className="bg-[#009dff] hover:bg-[#008ae6] text-white px-8 py-3 rounded-xl text-lg font-medium flex-1"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  View Solutions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Report with Bar Chart */}
          <Card className="bg-white rounded-2xl shadow-xl shadow-blue-100 border-none mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Question Report</CardTitle>
              <div className="grid grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
                  <div className="text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{correctQuestions}</div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{incorrectQuestions}</div>
                  <div className="text-gray-600">Incorrect</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{skippedQuestions}</div>
                  <div className="text-gray-600">Skipped</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-2 rounded-full w-full transition-all duration-500" 
                  style={{
                    background: gradientStops
                  }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-600 flex items-center justify-end">
                <Clock className="h-6 w-6 mr-1" />
                00h 20m 0s Time Taken
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={questionReportData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="question" 
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: '#9ca3af' }}
                    />
                    <YAxis 
                      label={{ value: 'Time Spent (sec)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: '#9ca3af' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="timeSpent" 
                      radius={[2, 2, 0, 0]}
                    >
                      {questionReportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Custom Legend */}
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span>Correct</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                  <span>Incorrect</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                  <span>Skipped</span>
                </div>
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
        </div>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={handleOpenChat} />

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default AbstractReasoningResults;
