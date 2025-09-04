
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

// Enhanced user journey data with realistic conversion stages
const userJourneyData = [
  { stage: 'Registration', users: 2500, conversion: 100 },
  { stage: 'Email Verification', users: 2200, conversion: 88 },
  { stage: 'Profile Setup', users: 1980, conversion: 79 },
  { stage: 'First Login', users: 1850, conversion: 74 },
  { stage: 'Tutorial Completion', users: 1665, conversion: 67 },
  { stage: 'First Practice Test', users: 1400, conversion: 56 },
  { stage: 'First Mock Exam', users: 1120, conversion: 45 },
  { stage: 'Video Lesson View', users: 896, conversion: 36 },
  { stage: 'Second Mock Exam', users: 672, conversion: 27 },
  { stage: 'Study Notes Access', users: 504, conversion: 20 },
  { stage: 'Premium Upgrade', users: 300, conversion: 12 },
  { stage: 'Active User (7+ days)', users: 180, conversion: 7 }
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
            User engagement insights and feature performance analytics
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

        <Tabs defaultValue="engagement" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit bg-white border border-gray-200">
            <TabsTrigger value="engagement" className="text-sm font-medium">User Engagement</TabsTrigger>
            <TabsTrigger value="features" className="text-sm font-medium">Feature Analytics</TabsTrigger>
          </TabsList>


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
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userJourneyData} layout="horizontal" barCategoryGap="10%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis 
                        dataKey="stage" 
                        type="category" 
                        width={150} 
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value, name) => {
                          const total = userJourneyData[0]?.users || 1;
                          const percentage = ((value as number / total) * 100).toFixed(1);
                          return [`${value} users (${percentage}% conversion)`, 'Users'];
                        }}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="users" 
                        fill="hsl(var(--primary))" 
                        stroke="hsl(var(--primary))"
                        strokeWidth={1}
                        radius={[0, 4, 4, 0]}
                      />
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
                    <LineChart data={engagementData.slice(-7)}>
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
                      <Line 
                        type="monotone" 
                        dataKey="sessionDuration" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
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
