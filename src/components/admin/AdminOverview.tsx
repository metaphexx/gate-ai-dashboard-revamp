import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/cards/StatCard';
import { 
  Users, 
  FileCheck, 
  Video, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { generateEngagementData, generateRealTimeMetrics, generateSystemMetrics, generateAlerts } from '@/utils/mockData';

export const AdminOverview = () => {
  const realTimeMetrics = generateRealTimeMetrics();
  const systemMetrics = generateSystemMetrics();
  const engagementData = generateEngagementData().slice(-7);
  const alerts = generateAlerts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground">Real-time system metrics and key performance indicators</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Online Users"
          value={realTimeMetrics.onlineUsers}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Active Tests"
          value={realTimeMetrics.activeTests}
          icon={<FileCheck className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Response Time"
          value={realTimeMetrics.responseTime}
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: 5.2, isPositive: false }}
        />
        <StatCard
          title="Error Rate"
          value={realTimeMetrics.errorRate}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      {/* System Overview & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Metrics */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Users</span>
                      <span className="font-semibold">{systemMetrics.totalUsers.toLocaleString()}</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Tests</span>
                      <span className="font-semibold">{systemMetrics.totalTests.toLocaleString()}</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Storage Used</span>
                      <span className="font-semibold">{systemMetrics.storageUsed}</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="font-semibold text-accent">{systemMetrics.uptime}</span>
                    </div>
                    <Progress value={99.97} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">API Calls</span>
                      <span className="font-semibold">{systemMetrics.apiCalls.toLocaleString()}</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Bandwidth</span>
                      <span className="font-semibold">{systemMetrics.bandwidthUsed}</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={alert.severity === 'high' ? 'destructive' : 
                                 alert.severity === 'medium' ? 'default' : 'secondary'}
                          className="text-xs px-2 py-0"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-sm font-medium">{alert.title}</span>
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

      {/* Engagement Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="dau" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Test Completions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Completions (7 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="testsCompleted" fill="hsl(var(--accent))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-semibold">User Management</h4>
              <p className="text-sm text-muted-foreground">Manage user accounts</p>
            </div>
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <FileCheck className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-semibold">Content Review</h4>
              <p className="text-sm text-muted-foreground">Review questions & videos</p>
            </div>
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-semibold">Analytics</h4>
              <p className="text-sm text-muted-foreground">View detailed analytics</p>
            </div>
            <div className="p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <DollarSign className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-semibold">Revenue</h4>
              <p className="text-sm text-muted-foreground">Financial reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};