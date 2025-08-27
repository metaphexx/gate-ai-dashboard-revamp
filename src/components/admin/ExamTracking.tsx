import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/cards/StatCard';
import { 
  GraduationCap, 
  Trophy,
  Clock,
  Users,
  TrendingUp,
  Target,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, AreaChart } from 'recharts';
import { generateExamData } from '@/utils/mockData';

// Mock exam performance trends
const examTrends = [
  { month: 'Jan', attempts: 1250, avgScore: 72, passRate: 68 },
  { month: 'Feb', attempts: 1340, avgScore: 74, passRate: 71 },
  { month: 'Mar', attempts: 1420, avgScore: 76, passRate: 73 },
  { month: 'Apr', attempts: 1380, avgScore: 75, passRate: 72 },
  { month: 'May', attempts: 1560, avgScore: 78, passRate: 76 },
  { month: 'Jun', attempts: 1680, avgScore: 79, passRate: 78 }
];

// Mock score distribution data
const scoreDistribution = [
  { range: '0-20%', count: 45, percentage: 5 },
  { range: '21-40%', count: 89, percentage: 10 },
  { range: '41-60%', count: 156, percentage: 18 },
  { range: '61-80%', count: 298, percentage: 34 },
  { range: '81-100%', count: 289, percentage: 33 }
];

// Mock completion analysis
const completionAnalysis = [
  { exam: 'Mock Exam 1', started: 1250, completed: 1050, dropOff: 16 },
  { exam: 'Mock Exam 2', started: 980, completed: 856, dropOff: 12.7 },
  { exam: 'Mini Mock', started: 2100, completed: 1890, dropOff: 10 },
  { exam: 'Practice Test', started: 1560, completed: 1340, dropOff: 14.1 }
];

export const ExamTracking = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const examData = generateExamData();

  const totalAttempts = 8450;
  const averageScore = 76;
  const passRate = 74;
  const completionRate = 87;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Exam and Practice Tracking</h2>
          <p className="text-muted-foreground">Comprehensive exam analytics, performance tracking, and completion insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Exam Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Attempts"
          value={totalAttempts.toLocaleString()}
          icon={<GraduationCap className="w-5 h-5" />}
          trend={{ value: 15.8, isPositive: true }}
        />
        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={<Trophy className="w-5 h-5" />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard
          title="Pass Rate"
          value={`${passRate}%`}
          icon={<Target className="w-5 h-5" />}
          trend={{ value: 5.7, isPositive: true }}
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 2.3, isPositive: false }}
        />
      </div>

      <Tabs defaultValue="attempts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attempts">Exam Attempts</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="completion">Completion Tracking</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="attempts" className="space-y-6">
          {/* Exam Popularity & Attempts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Popularity (Attempts)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={examData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="attempts" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Duration per Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={examData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} minutes`, 'Duration']} />
                      <Bar dataKey="avgDuration" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exam Details Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Detailed Exam Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examData.map((exam, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{exam.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{exam.attempts} attempts</Badge>
                        <Badge variant={exam.passRate >= 70 ? 'default' : 'secondary'}>
                          {exam.passRate}% pass rate
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{exam.avgScore}%</div>
                        <div className="text-xs text-muted-foreground">Avg Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{exam.avgDuration}min</div>
                        <div className="text-xs text-muted-foreground">Avg Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">{exam.completionRate}%</div>
                        <div className="text-xs text-muted-foreground">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-destructive">{100 - exam.completionRate}%</div>
                        <div className="text-xs text-muted-foreground">Drop-off</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Section Performance:</span>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {exam.sections.map((section, sIndex) => (
                          <div key={sIndex} className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-medium text-sm">{section.name}</div>
                            <div className="text-xs text-muted-foreground">{section.avgScore}% • {section.avgTime}min</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Score Distribution & Performance Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section-Level Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { subject: 'Writing', score: 72, fullMark: 100 },
                      { subject: 'Abstract', score: 65, fullMark: 100 },
                      { subject: 'Reading', score: 78, fullMark: 100 },
                      { subject: 'Quantitative', score: 81, fullMark: 100 }
                    ]}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar 
                        name="Average Score" 
                        dataKey="score" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.3} 
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Breakdown by Score Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreDistribution.map((range, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="font-medium">{range.range}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{range.count} students</span>
                      <div className="w-32">
                        <Progress value={range.percentage} className="h-2" />
                      </div>
                      <span className="font-medium w-12 text-right">{range.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completion" className="space-y-6">
          {/* Completion vs Drop-off Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start vs Finish Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={completionAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="exam" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="started" fill="hsl(var(--muted-foreground))" name="Started" />
                      <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completed" />
                      <Line type="monotone" dataKey="dropOff" stroke="hsl(var(--destructive))" name="Drop-off %" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completion Funnel Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: 'Exam Started', count: 1250, percentage: 100 },
                    { stage: 'First Question', count: 1180, percentage: 94 },
                    { stage: '25% Complete', count: 1100, percentage: 88 },
                    { stage: '50% Complete', count: 1050, percentage: 84 },
                    { stage: '75% Complete', count: 1020, percentage: 82 },
                    { stage: 'Exam Completed', count: 1000, percentage: 80 }
                  ].map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{stage.stage}</span>
                        <span className="text-muted-foreground">{stage.count} users ({stage.percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Spent Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Time Spent Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {examData.map((exam, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg text-center">
                    <h4 className="font-semibold mb-2">{exam.name}</h4>
                    <div className="text-2xl font-bold text-primary mb-1">{exam.avgDuration}min</div>
                    <div className="text-sm text-muted-foreground">Average Time</div>
                    <div className="mt-2 text-xs">
                      <span className="text-accent">Min: 45min</span>
                      <span className="mx-2">•</span>
                      <span className="text-destructive">Max: 180min</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Performance Trends Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Performance Trends (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={examTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="attempts" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3}
                      name="Attempts"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="avgScore" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      name="Avg Score %"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="passRate" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={3}
                      name="Pass Rate %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Improving Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Scores</span>
                    <Badge variant="default">+7% this month</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion Rates</span>
                    <Badge variant="default">+3% this month</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pass Rates</span>
                    <Badge variant="default">+5% this month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-warning" />
                  Areas of Concern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Abstract Reasoning</span>
                    <Badge variant="outline">-2% drop-off</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Management</span>
                    <Badge variant="outline">+5min avg time</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile Completion</span>
                    <Badge variant="outline">-8% vs desktop</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Add more practice questions for Abstract Reasoning</p>
                  <p>• Implement timer warnings at 75% mark</p>
                  <p>• Optimize mobile exam interface</p>
                  <p>• Create section-specific tutorials</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};