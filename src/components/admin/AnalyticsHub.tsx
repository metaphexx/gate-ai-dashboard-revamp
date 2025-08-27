
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/cards/StatCard';
import { 
  Users, 
  Clock, 
  MousePointer,
  TrendingUp,
  Activity,
  BarChart3,
  RefreshCw,
  Download,
  Zap,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { generateRealTimeMetrics, generateEngagementData } from '@/utils/mockData';

// Mock real-time activity feed
const generateActivityFeed = () => [
  { id: 1, user: 'John D.', action: 'Started Mock Exam 1', time: '2 minutes ago', type: 'exam' },
  { id: 2, user: 'Sarah M.', action: 'Completed Reading Comprehension', time: '5 minutes ago', type: 'completion' },
  { id: 3, user: 'Mike L.', action: 'Registered account', time: '8 minutes ago', type: 'registration' },
  { id: 4, user: 'Emma K.', action: 'Watched video lesson', time: '12 minutes ago', type: 'video' },
  { id: 5, user: 'David R.', action: 'Failed Abstract Reasoning', time: '15 minutes ago', type: 'failure' }
];

// Mock feature usage data
const featureUsageData = [
  { feature: 'Mock Exams', usage: 45, color: 'hsl(var(--primary))' },
  { feature: 'Video Lessons', usage: 35, color: 'hsl(var(--accent))' },
  { feature: 'Practice Tests', usage: 25, color: 'hsl(var(--warning))' },
  { feature: 'Study Notes', usage: 20, color: 'hsl(var(--destructive))' },
  { feature: 'Skills Trainer', usage: 15, color: 'hsl(var(--muted-foreground))' }
];

// Mock user journey data
const userJourneyData = [
  { stage: 'Registration', users: 1000, conversion: 100 },
  { stage: 'First Login', users: 850, conversion: 85 },
  { stage: 'First Test', users: 680, conversion: 68 },
  { stage: 'Video Lesson', users: 540, conversion: 54 },
  { stage: 'Second Test', users: 450, conversion: 45 },
  { stage: 'Premium Upgrade', users: 120, conversion: 12 }
];

export const AnalyticsHub = () => {
  const [refreshing, setRefreshing] = useState(false);
  const realTimeMetrics = generateRealTimeMetrics();
  const engagementData = generateEngagementData().slice(-30);
  const activityFeed = generateActivityFeed();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="space-y-8 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Analytics Hub
            </h2>
            <p className="text-muted-foreground text-lg mt-2">
              Real-time metrics, user engagement, and feature performance analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleRefresh} 
              disabled={refreshing}
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
            <Button variant="outline" className="shadow-lg hover:shadow-xl transition-shadow">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit glass-card">
            <TabsTrigger value="realtime" className="text-sm font-medium">Real-Time Metrics</TabsTrigger>
            <TabsTrigger value="engagement" className="text-sm font-medium">User Engagement</TabsTrigger>
            <TabsTrigger value="features" className="text-sm font-medium">Feature Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-6">
            {/* Real-Time Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Online Users"
                value={realTimeMetrics.onlineUsers}
                icon={<Users className="w-5 h-5" />}
                trend={{ value: 12.5, isPositive: true }}
                variant="primary"
                className="animate-bounce-subtle"
              />
              <StatCard
                title="Active Sessions"
                value={realTimeMetrics.activeTests}
                icon={<Activity className="w-5 h-5" />}
                trend={{ value: 8.3, isPositive: true }}
                variant="accent"
                className="animate-bounce-subtle [animation-delay:200ms]"
              />
              <StatCard
                title="Avg Response Time"
                value={realTimeMetrics.responseTime}
                icon={<Clock className="w-5 h-5" />}
                trend={{ value: 5.2, isPositive: false }}
                variant="warning"
                className="animate-bounce-subtle [animation-delay:400ms]"
              />
              <StatCard
                title="System Health"
                value={realTimeMetrics.systemHealth}
                icon={<BarChart3 className="w-5 h-5" />}
                trend={{ value: 2.1, isPositive: true }}
                variant="destructive"
                className="animate-bounce-subtle [animation-delay:600ms]"
              />
            </div>

            {/* Real-Time Charts & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Live Activity Feed */}
              <Card className="glass-card border-primary/10 hover:shadow-glow-primary transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Activity className="w-5 h-5 text-primary animate-pulse" />
                    Live Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {activityFeed.map((activity, index) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'exam' ? 'bg-primary animate-pulse' :
                          activity.type === 'completion' ? 'bg-accent' :
                          activity.type === 'registration' ? 'bg-warning' :
                          activity.type === 'video' ? 'bg-blue-500' : 'bg-destructive'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Real-Time Performance Chart */}
              <Card className="lg:col-span-2 glass-card border-accent/10 hover:shadow-glow-accent transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    System Performance (Last 24 Hours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={engagementData.slice(-24)}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px hsl(var(--shadow-medium))'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="dau" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorUsers)"
                          strokeWidth={3}
                          name="Online Users"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="testsCompleted" 
                          stroke="hsl(var(--accent))" 
                          fillOpacity={1} 
                          fill="url(#colorSessions)"
                          strokeWidth={3}
                          name="Tests Completed"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            {/* Engagement Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* DAU/WAU/MAU Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="dau" 
                          stackId="1" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.3}
                          name="DAU"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="wau" 
                          stackId="2" 
                          stroke="hsl(var(--accent))" 
                          fill="hsl(var(--accent))" 
                          fillOpacity={0.3}
                          name="WAU"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* User Journey Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>User Journey Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userJourneyData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="stage" type="category" width={100} />
                        <Tooltip formatter={(value, name) => [`${value} users`, 'Users']} />
                        <Bar dataKey="users" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Duration & Drop-off Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Duration Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData.slice(-7)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sessionDuration" fill="hsl(var(--accent))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Frequency Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '6-9 AM', users: 245, percentage: 15 },
                      { time: '12-2 PM', users: 389, percentage: 24 },
                      { time: '6-9 PM', users: 567, percentage: 35 },
                      { time: '9-12 PM', users: 423, percentage: 26 }
                    ].map((period) => (
                      <div key={period.time} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{period.time}</span>
                          <span className="text-sm text-muted-foreground">{period.users} users</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${period.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            {/* Feature Usage Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={featureUsageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="usage"
                          label={({ feature, usage }) => `${feature}: ${usage}%`}
                        >
                          {featureUsageData.map((entry, index) => (
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
                  <CardTitle>Feature Adoption Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featureUsageData.map((feature, index) => (
                      <div key={feature.feature} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{feature.feature}</span>
                          <Badge variant="secondary">{feature.usage}% adoption</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${feature.usage}%`,
                              backgroundColor: feature.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
