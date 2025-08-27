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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Online Users"
          value={realTimeMetrics.onlineUsers}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Active Tests"
          value={realTimeMetrics.activeTests}
          icon={<FileCheck className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
          variant="accent"
        />
        <StatCard
          title="Response Time"
          value={realTimeMetrics.responseTime}
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: 5.2, isPositive: false }}
          variant="warning"
        />
        <StatCard
          title="Error Rate"
          value={realTimeMetrics.errorRate}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: 2.1, isPositive: false }}
          variant="destructive"
        />
      </div>

      {/* System Overview & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Metrics */}
        <div className="lg:col-span-2">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                System Performance
              </h3>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Users</span>
                      <span className="font-bold text-primary">{systemMetrics.totalUsers.toLocaleString()}</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Tests</span>
                      <span className="font-bold text-green-600">{systemMetrics.totalTests.toLocaleString()}</span>
                    </div>
                    <Progress value={65} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Storage Used</span>
                      <span className="font-bold text-yellow-600">{systemMetrics.storageUsed}</span>
                    </div>
                    <Progress value={45} className="h-3" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Uptime</span>
                      <span className="font-bold text-green-600">{systemMetrics.uptime}</span>
                    </div>
                    <Progress value={99.97} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">API Calls</span>
                      <span className="font-bold text-primary">{systemMetrics.apiCalls.toLocaleString()}</span>
                    </div>
                    <Progress value={82} className="h-3" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Bandwidth</span>
                      <span className="font-bold text-green-600">{systemMetrics.bandwidthUsed}</span>
                    </div>
                    <Progress value={68} className="h-3" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="text-gray-500">Live Performance:</span>
                  </div>
                  <span className="font-bold text-green-600">98.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Recent Alerts
            </h3>
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                  alert.severity === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : alert.severity === 'medium'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        className={`text-xs px-2 py-0 ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">{alert.title}</span>
                    </div>
                    <p className="text-xs text-gray-500">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Daily Active Users (7 days)
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Test Completions (7 days)
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
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
                <Bar 
                  dataKey="testsCompleted" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-gray-600">Access frequently used admin functions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'User Management', icon: UserCheck, color: 'primary', description: 'Manage user accounts and permissions' },
            { title: 'Content Review', icon: BookOpen, color: 'accent', description: 'Review and approve new content' },
            { title: 'Analytics', icon: BarChart3, color: 'warning', description: 'View detailed analytics reports' },
            { title: 'Revenue', icon: DollarSign, color: 'destructive', description: 'Financial performance overview' },
          ].map((action, index) => (
            <div 
              key={index}
              className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <action.icon className={`w-6 h-6 ${
                  action.color === 'primary' ? 'text-primary' :
                  action.color === 'accent' ? 'text-green-600' :
                  action.color === 'warning' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
              </div>
              <h4 className="font-semibold text-gray-900 group-hover:text-primary">
                {action.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {action.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};