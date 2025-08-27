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
  DollarSign,
  Activity,
  Database,
  Server,
  Globe,
  Cpu,
  HardDrive,
  UserCheck,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { generateEngagementData, generateRealTimeMetrics, generateSystemMetrics, generateAlerts } from '@/utils/mockData';

export const AdminOverview = () => {
  const realTimeMetrics = generateRealTimeMetrics();
  const systemMetrics = generateSystemMetrics();
  const engagementData = generateEngagementData().slice(-7);
  const alerts = generateAlerts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="space-y-8 p-6">
        <div className="animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Admin Dashboard Overview
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Real-time system monitoring and key performance indicators
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 shadow-lg">
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
            variant="primary"
            className="animate-float"
          />
          <StatCard
            title="Active Tests"
            value={realTimeMetrics.activeTests}
            icon={<FileCheck className="w-5 h-5" />}
            trend={{ value: 8.3, isPositive: true }}
            variant="accent"
            className="animate-float [animation-delay:200ms]"
          />
          <StatCard
            title="Response Time"
            value={realTimeMetrics.responseTime}
            icon={<Clock className="w-5 h-5" />}
            trend={{ value: 5.2, isPositive: false }}
            variant="warning"
            className="animate-float [animation-delay:400ms]"
          />
          <StatCard
            title="Error Rate"
            value={realTimeMetrics.errorRate}
            icon={<AlertTriangle className="w-5 h-5" />}
            trend={{ value: 2.1, isPositive: false }}
            variant="destructive"
            className="animate-float [animation-delay:600ms]"
          />
        </div>

        {/* System Overview & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Metrics */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-primary/10 hover:shadow-glow-primary transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Server className="w-5 h-5 text-primary" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Users</span>
                        <span className="font-bold text-primary">{systemMetrics.totalUsers.toLocaleString()}</span>
                      </div>
                      <Progress value={78} className="h-3 bg-muted/30" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Tests</span>
                        <span className="font-bold text-accent">{systemMetrics.totalTests.toLocaleString()}</span>
                      </div>
                      <Progress value={65} className="h-3 bg-muted/30" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Storage Used</span>
                        <span className="font-bold text-warning">{systemMetrics.storageUsed}</span>
                      </div>
                      <Progress value={45} className="h-3 bg-muted/30" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Uptime</span>
                        <span className="font-bold text-accent">{systemMetrics.uptime}</span>
                      </div>
                      <Progress value={99.97} className="h-3 bg-muted/30" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">API Calls</span>
                        <span className="font-bold text-primary">{systemMetrics.apiCalls.toLocaleString()}</span>
                      </div>
                      <Progress value={82} className="h-3 bg-muted/30" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Bandwidth</span>
                        <span className="font-bold text-accent">{systemMetrics.bandwidthUsed}</span>
                      </div>
                      <Progress value={68} className="h-3 bg-muted/30" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-accent animate-pulse" />
                      <span className="text-muted-foreground">Live Performance:</span>
                    </div>
                    <span className="font-bold text-accent animate-counter">98.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card className="glass-card border-accent/10 hover:shadow-glow-accent transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] animate-slide-up ${
                      alert.severity === 'high' 
                        ? 'bg-destructive/10 border-destructive/20 hover:bg-destructive/15' 
                        : alert.severity === 'medium'
                        ? 'bg-warning/10 border-warning/20 hover:bg-warning/15'
                        : 'bg-accent/10 border-accent/20 hover:bg-accent/15'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant={alert.severity === 'high' ? 'destructive' : 
                                   alert.severity === 'medium' ? 'default' : 'secondary'}
                            className="text-xs px-2 py-0 animate-pulse-glow"
                          >
                            {alert.severity.toUpperCase()}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card border-primary/10 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="w-5 h-5 text-primary" />
                Daily Active Users (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="dau" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorUsers)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/10 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="w-5 h-5 text-accent" />
                Test Completions (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
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
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="testsCompleted" 
                      fill="hsl(var(--accent))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card border-muted/20 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <p className="text-muted-foreground">Access frequently used admin functions</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'User Management', icon: UserCheck, color: 'primary', description: 'Manage user accounts and permissions' },
                { title: 'Content Review', icon: BookOpen, color: 'accent', description: 'Review and approve new content' },
                { title: 'Analytics', icon: BarChart3, color: 'warning', description: 'View detailed analytics reports' },
                { title: 'Revenue', icon: DollarSign, color: 'destructive', description: 'Financial performance overview' },
              ].map((action, index) => (
                <div 
                  key={index}
                  className={`group p-6 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg animate-slide-up ${
                    action.color === 'primary' 
                      ? 'bg-primary/5 border-primary/20 hover:bg-primary/10' 
                      : action.color === 'accent'
                      ? 'bg-accent/5 border-accent/20 hover:bg-accent/10'
                      : action.color === 'warning'
                      ? 'bg-warning/5 border-warning/20 hover:bg-warning/10'
                      : 'bg-destructive/5 border-destructive/20 hover:bg-destructive/10'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <action.icon className={`w-6 h-6 ${
                      action.color === 'primary' ? 'text-primary' :
                      action.color === 'accent' ? 'text-accent' :
                      action.color === 'warning' ? 'text-warning' :
                      'text-destructive'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};