
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
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics Hub</h2>
          <p className="text-gray-600 mt-2">
            Real-time metrics, user engagement, and feature performance analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit bg-white border border-gray-200">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Activity Feed */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Live Activity Feed
                  </h3>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {activityFeed.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'exam' ? 'bg-primary' :
                        activity.type === 'completion' ? 'bg-green-600' :
                        activity.type === 'registration' ? 'bg-yellow-600' :
                        activity.type === 'video' ? 'bg-blue-500' : 'bg-red-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-xs text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-Time Performance Chart */}
              <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    System Performance (Last 24 Hours)
                  </h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementData.slice(-24)}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
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
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorSessions)"
                        strokeWidth={3}
                        name="Tests Completed"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            {/* Engagement Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* DAU/WAU/MAU Trend */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Engagement Trends</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
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
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                        name="WAU"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* User Journey Funnel */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Journey Funnel</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userJourneyData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis dataKey="stage" type="category" width={100} stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value, name) => [`${value} users`, 'Users']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="users" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Session Duration & Drop-off Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Session Duration Distribution</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData.slice(-7)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="sessionDuration" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Login Frequency Patterns</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { time: '6-9 AM', users: 245, percentage: 15 },
                    { time: '12-2 PM', users: 389, percentage: 24 },
                    { time: '6-9 PM', users: 567, percentage: 35 },
                    { time: '9-12 PM', users: 423, percentage: 26 }
                  ].map((period) => (
                    <div key={period.time} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{period.time}</span>
                        <span className="text-sm text-gray-600">{period.users} users</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${period.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            {/* Feature Usage Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Feature Usage Heatmap</h3>
                </div>
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
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Feature Adoption Trends</h3>
                </div>
                <div className="space-y-4">
                  {featureUsageData.map((feature, index) => (
                    <div key={feature.feature} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{feature.feature}</span>
                        <Badge className="bg-gray-100 text-gray-800">{feature.usage}% adoption</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
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
              </div>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  );
};
