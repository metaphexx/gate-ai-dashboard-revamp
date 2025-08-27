import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  Video,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Users,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { generateQuestionBankData, generateVideoLessonData } from '@/utils/mockData';
import StatCard from '@/components/cards/StatCard';

// Mock content coverage data
const contentCoverage = [
  { topic: 'Pattern Recognition', coverage: 85, difficulty: 'Hard', questions: 45, lastUpdated: '2024-01-20' },
  { topic: 'Logical Sequences', coverage: 92, difficulty: 'Medium', questions: 67, lastUpdated: '2024-01-18' },
  { topic: 'Spatial Reasoning', coverage: 78, difficulty: 'Hard', questions: 34, lastUpdated: '2024-01-15' },
  { topic: 'Mathematical Reasoning', coverage: 95, difficulty: 'Easy', questions: 89, lastUpdated: '2024-01-22' },
  { topic: 'Reading Analysis', coverage: 88, difficulty: 'Medium', questions: 56, lastUpdated: '2024-01-19' }
];

// Mock difficulty distribution
const difficultyData = [
  { difficulty: 'Easy', count: 156, percentage: 35, color: '#38C172' },
  { difficulty: 'Medium', count: 234, percentage: 52, color: '#F59E0B' },
  { difficulty: 'Hard', count: 58, percentage: 13, color: '#EF4444' }
];

// Mock contributor activity
const contributorActivity = [
  { name: 'Dr. Sarah Johnson', questions: 45, videos: 8, rating: 4.8, lastActive: '2 hours ago' },
  { name: 'Prof. Mike Chen', questions: 67, videos: 12, rating: 4.6, lastActive: '1 day ago' },
  { name: 'Dr. Emma Davis', questions: 34, videos: 6, rating: 4.9, lastActive: '3 hours ago' },
  { name: 'Prof. John Smith', questions: 52, videos: 9, rating: 4.7, lastActive: '5 hours ago' }
];

export const ContentPerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const questionBankData = generateQuestionBankData();
  const videoLessonData = generateVideoLessonData();

  const totalQuestions = 448;
  const totalVideos = 156;
  const avgCorrectRate = 68;
  const avgWatchTime = 85;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Content Performance Intelligence</h2>
          <p className="text-muted-foreground">Question bank analytics, video lesson insights, and content quality metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Content Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Questions"
          value={totalQuestions.toLocaleString()}
          icon={<FileText className="w-5 h-5" />}
          trend={{ value: 8.5, isPositive: true }}
        />
        <StatCard
          title="Total Videos"
          value={totalVideos.toLocaleString()}
          icon={<Video className="w-5 h-5" />}
          trend={{ value: 12.3, isPositive: true }}
        />
        <StatCard
          title="Avg Correct Rate"
          value={`${avgCorrectRate}%`}
          icon={<Target className="w-5 h-5" />}
          trend={{ value: 3.7, isPositive: true }}
        />
        <StatCard
          title="Avg Watch Time"
          value={`${avgWatchTime}%`}
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: 5.2, isPositive: false }}
        />
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
          <TabsTrigger value="videos">Video Lessons</TabsTrigger>
          <TabsTrigger value="coverage">Content Coverage</TabsTrigger>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
          {/* Question Bank Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Difficulty Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ difficulty, percentage }) => `${difficulty}: ${percentage}%`}
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Effectiveness vs Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={questionBankData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="attempts" name="Attempts" />
                      <YAxis dataKey="correctRate" name="Correct Rate %" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter dataKey="correctRate" fill="hsl(var(--primary))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Question Performance Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Subjects</SelectItem>
                      <SelectItem value="Writing">Writing</SelectItem>
                      <SelectItem value="Abstract Reasoning">Abstract Reasoning</SelectItem>
                      <SelectItem value="Reading Comprehension">Reading Comprehension</SelectItem>
                      <SelectItem value="Quantitative Reasoning">Quantitative Reasoning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Questions Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Correct Rate</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead>Avg Time</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questionBankData.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-xs">
                            <div className="truncate">{question.question}</div>
                          </TableCell>
                          <TableCell>{question.subject}</TableCell>
                          <TableCell>
                            <Badge variant={
                              question.difficulty === 'Easy' ? 'default' :
                              question.difficulty === 'Medium' ? 'secondary' : 'outline'
                            }>
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {question.correctRate >= 70 ? (
                                <TrendingUp className="w-4 h-4 text-accent" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-destructive" />
                              )}
                              <span className={question.correctRate >= 70 ? 'text-accent' : 'text-destructive'}>
                                {question.correctRate}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{question.attempts.toLocaleString()}</TableCell>
                          <TableCell>{question.avgTime}s</TableCell>
                          <TableCell>{question.lastUpdated}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          {/* Video Lesson Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Engagement Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={videoLessonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="title" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completionRate" fill="hsl(var(--primary))" name="Completion Rate %" />
                      <Bar dataKey="rating" fill="hsl(var(--accent))" name="Rating (out of 5)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Watch Time vs Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={videoLessonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="views" name="Views" />
                      <YAxis dataKey="avgWatchTime" name="Avg Watch Time (min)" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter dataKey="avgWatchTime" fill="hsl(var(--accent))" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Lesson Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Avg Watch Time</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videoLessonData.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-medium">{video.title}</TableCell>
                        <TableCell>{video.subject}</TableCell>
                        <TableCell>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</TableCell>
                        <TableCell>{video.views.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={video.completionRate >= 70 ? 'default' : 'secondary'}>
                            {video.completionRate}%
                          </Badge>
                        </TableCell>
                        <TableCell>{Math.floor(video.avgWatchTime / 60)}:{(video.avgWatchTime % 60).toString().padStart(2, '0')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{video.rating}</span>
                            <span className="text-xs text-muted-foreground">/5.0</span>
                          </div>
                        </TableCell>
                        <TableCell>{video.lastUpdated}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-6">
          {/* Content Coverage Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Topic Coverage & Quality Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentCoverage.map((topic) => (
                  <div key={topic.topic} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{topic.topic}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={topic.difficulty === 'Easy' ? 'default' : topic.difficulty === 'Medium' ? 'secondary' : 'outline'}>
                          {topic.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{topic.questions} questions</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Coverage: {topic.coverage}%</span>
                      <span className="text-xs text-muted-foreground">Updated: {topic.lastUpdated}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full" 
                        style={{ width: `${topic.coverage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors" className="space-y-6">
          {/* Contributor Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Contributor Activity & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Questions Created</TableHead>
                      <TableHead>Videos Created</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributorActivity.map((contributor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{contributor.name}</TableCell>
                        <TableCell>{contributor.questions}</TableCell>
                        <TableCell>{contributor.videos}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{contributor.rating}</span>
                            <span className="text-xs text-muted-foreground">/5.0</span>
                          </div>
                        </TableCell>
                        <TableCell>{contributor.lastActive}</TableCell>
                        <TableCell>
                          <Badge variant="default">Active</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};