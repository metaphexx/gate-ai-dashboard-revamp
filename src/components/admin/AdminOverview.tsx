import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/cards/StatCard';
import { RealTimeActivityFeed } from './RealTimeActivityFeed';
import { 
  Users, 
  FileCheck, 
  Video, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Database,
  Server,
  Globe,
  Cpu,
  HardDrive,
  UserCheck,
  BookOpen,
  BarChart3,
  UserPlus,
  Timer,
  Shield,
  ToggleLeft,
  ToggleRight,
  PieChart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { 
  generateEngagementData, 
  generateRealTimeMetrics, 
  generateSystemMetrics, 
  generateAlerts,
  generateUserGrowthData,
  generateUserTypeData
} from '@/utils/mockData';

export const AdminOverview = () => {
  const [chartToggle, setChartToggle] = useState<'users' | 'duration'>('users');
  
  const realTimeMetrics = generateRealTimeMetrics();
  const systemMetrics = generateSystemMetrics();
  const engagementData = generateEngagementData().slice(-7);
  const alerts = generateAlerts();
  const userGrowthData = generateUserGrowthData().slice(-7);
  const userTypeData = generateUserTypeData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard Overview</h2>
        <p className="text-gray-600">
          Real-time system monitoring and key performance indicators
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Online Users"
          value={realTimeMetrics.onlineUsers}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="New Users Today"
          value={realTimeMetrics.newUsersToday}
          icon={<UserPlus className="w-5 h-5" />}
          trend={{ value: 18.2, isPositive: true }}
          variant="accent"
        />
        <StatCard
          title="Avg Session Length"
          value={realTimeMetrics.avgSessionLength}
          icon={<Timer className="w-5 h-5" />}
          trend={{ value: 5.8, isPositive: true }}
          variant="warning"
        />
      </div>

      {/* Real-time Activity & System Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity Feed */}
        <RealTimeActivityFeed />
        
        {/* System Performance */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Users</span>
                      <span className="font-bold text-primary">{systemMetrics.totalUsers.toLocaleString()}</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Tests</span>
                      <span className="font-bold text-green-600">{systemMetrics.totalTests.toLocaleString()}</span>
                    </div>
                    <Progress value={65} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="font-bold text-green-600">{systemMetrics.uptime}</span>
                    </div>
                    <Progress value={99.97} className="h-3" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Live Performance:</span>
                  </div>
                  <span className="font-bold text-green-600">98.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Chart with Toggle */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {chartToggle === 'users' ? 'Daily Active Users (7 days)' : 'Session Duration (7 days)'}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChartToggle(chartToggle === 'users' ? 'duration' : 'users')}
                className="flex items-center gap-2"
              >
                {chartToggle === 'users' ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                Toggle
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={chartToggle === 'users' ? 'dau' : 'sessionDurationMinutes'}
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorChart)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Test Completions Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Test Completions (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorTestCompletions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="testsCompleted" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorTestCompletions)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Users - Manual vs Self-Registered */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              User Registration (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
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
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="manuallyAdded" 
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Manually Added"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="selfRegistered" 
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Self-Registered"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Paid vs Free Users */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value, name) => {
                      const total = userTypeData.reduce((sum, entry) => sum + entry.value, 0);
                      const percentage = ((Number(value) / total) * 100).toFixed(1);
                      return [`${Number(value).toLocaleString()} (${percentage}%)`, name];
                    }}
                  />
                  <Pie 
                    data={userTypeData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={120}
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              {userTypeData.map((entry, index) => {
                const total = userTypeData.reduce((sum, item) => sum + item.value, 0);
                const percentage = ((entry.value / total) * 100).toFixed(1);
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {entry.name}: {entry.value.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts - Moved Down */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                  alert.severity === 'high' 
                    ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800' 
                    : alert.severity === 'medium'
                    ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800'
                    : 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        className={`text-xs px-2 py-0 ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">{alert.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
