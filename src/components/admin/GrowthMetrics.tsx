import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/cards/StatCard';
import { 
  BarChart3, 
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  DollarSign,
  Target,
  MapPin,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, FunnelChart, Funnel, LabelList } from 'recharts';
import { generateAcquisitionData } from '@/utils/mockData';

// Mock conversion funnel data
const conversionFunnel = [
  { stage: 'Visitors', count: 10000, conversion: 100, color: '#E5E7EB' },
  { stage: 'Signups', count: 1250, conversion: 12.5, color: '#009dff' },
  { stage: 'Email Verified', count: 1063, conversion: 10.6, color: '#0284c7' },
  { stage: 'First Test', count: 744, conversion: 7.4, color: '#38C172' },
  { stage: 'Regular Users', count: 372, conversion: 3.7, color: '#F59E0B' },
  { stage: 'Premium Users', count: 93, conversion: 0.9, color: '#EF4444' }
];

// Mock geographic distribution
const geographicData = [
  { country: 'United States', users: 2845, percentage: 32.1 },
  { country: 'United Kingdom', users: 1567, percentage: 17.7 },
  { country: 'Canada', users: 987, percentage: 11.1 },
  { country: 'Australia', users: 743, percentage: 8.4 },
  { country: 'Germany', users: 654, percentage: 7.4 },
  { country: 'India', users: 543, percentage: 6.1 },
  { country: 'Others', users: 1521, percentage: 17.2 }
];

// Mock device/browser analytics
const deviceData = [
  { type: 'Desktop', users: 4567, percentage: 51.5, browsers: { Chrome: 78, Safari: 12, Firefox: 7, Edge: 3 } },
  { type: 'Mobile', users: 3891, percentage: 43.9, browsers: { Chrome: 65, Safari: 28, Samsung: 5, Firefox: 2 } },
  { type: 'Tablet', users: 407, percentage: 4.6, browsers: { Safari: 72, Chrome: 25, Firefox: 3 } }
];

// Mock referral program data
const referralData = [
  { month: 'Jan', referrals: 45, conversions: 23, viral: 0.51 },
  { month: 'Feb', referrals: 67, conversions: 34, viral: 0.51 },
  { month: 'Mar', referrals: 89, conversions: 47, viral: 0.53 },
  { month: 'Apr', referrals: 134, conversions: 72, viral: 0.54 },
  { month: 'May', referrals: 156, conversions: 89, viral: 0.57 },
  { month: 'Jun', referrals: 203, conversions: 124, viral: 0.61 }
];

// Mock growth experiments
const experiments = [
  { 
    name: 'Onboarding Redesign', 
    status: 'Completed', 
    impact: '+23%', 
    metric: 'First Test Completion',
    startDate: '2024-01-15',
    endDate: '2024-02-15'
  },
  { 
    name: 'Pricing Page A/B Test', 
    status: 'Running', 
    impact: '+8%', 
    metric: 'Premium Conversion',
    startDate: '2024-02-20',
    endDate: '2024-03-20'
  },
  { 
    name: 'Email Frequency Test', 
    status: 'Completed', 
    impact: '+15%', 
    metric: 'Email Open Rate',
    startDate: '2024-01-01',
    endDate: '2024-02-01'
  },
  { 
    name: 'Mobile App Push', 
    status: 'Planning', 
    impact: 'TBD', 
    metric: 'User Retention',
    startDate: '2024-03-01',
    endDate: '2024-04-01'
  }
];

export const GrowthMetrics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const acquisitionData = generateAcquisitionData();

  const totalUsers = 8865;
  const growthRate = 24.7;
  const acquisitionCost = 42;
  const viralCoefficient = 0.57;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Growth Metrics & Acquisition</h2>
          <p className="text-muted-foreground">User acquisition analysis, conversion optimization, and growth experiment tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Time Range
          </Button>
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Set Goals
          </Button>
          <Button size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Growth Report
          </Button>
        </div>
      </div>

      {/* Growth Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 24.7, isPositive: true }}
        />
        <StatCard
          title="Growth Rate"
          value={`${growthRate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Avg CAC"
          value={`$${acquisitionCost}`}
          icon={<DollarSign className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: false }}
        />
        <StatCard
          title="Viral Coefficient"
          value={viralCoefficient.toFixed(2)}
          icon={<Target className="w-5 h-5" />}
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="acquisition" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="acquisition">User Acquisition</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="geography">Geographic & Device</TabsTrigger>
          <TabsTrigger value="experiments">Growth Experiments</TabsTrigger>
        </TabsList>

        <TabsContent value="acquisition" className="space-y-6">
          {/* Acquisition Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Acquisition Channels Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={acquisitionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="users"
                        label={({ channel, users }) => `${channel}: ${users}`}
                      >
                        {acquisitionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
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
                <CardTitle>Cost per Acquisition by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={acquisitionData.filter(d => d.cost > 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Cost per User']} />
                      <Bar 
                        dataKey="cost" 
                        fill="hsl(var(--primary))" 
                        name="Cost per User"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Channel Details Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Channel Performance Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Channel</th>
                      <th className="text-center p-3 font-medium">Users</th>
                      <th className="text-center p-3 font-medium">Cost</th>
                      <th className="text-center p-3 font-medium">CPA</th>
                      <th className="text-center p-3 font-medium">Conversion</th>
                      <th className="text-center p-3 font-medium">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acquisitionData.map((channel, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 font-medium">{channel.channel}</td>
                        <td className="text-center p-3">{channel.users.toLocaleString()}</td>
                        <td className="text-center p-3">
                          {channel.cost > 0 ? `$${channel.cost.toLocaleString()}` : 'Free'}
                        </td>
                        <td className="text-center p-3">
                          {channel.cost > 0 ? `$${(channel.cost / channel.users).toFixed(2)}` : '$0'}
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={channel.conversion >= 15 ? 'default' : 'secondary'}>
                            {channel.conversion}%
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={channel.conversion >= 15 ? 'default' : 'outline'}>
                            {channel.cost > 0 ? `${((channel.conversion * 50) / (channel.cost / channel.users) * 100).toFixed(0)}%` : '∞'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Referral Program Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Program Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={referralData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="referrals" fill="hsl(var(--primary))" name="Referrals Sent" />
                    <Bar yAxisId="left" dataKey="conversions" fill="hsl(var(--accent))" name="Conversions" />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="viral" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={3}
                      name="Viral Coefficient"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>User Acquisition Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conversionFunnel.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {stage.count.toLocaleString()} users
                        </span>
                        <Badge variant="outline">
                          {stage.conversion}%
                        </Badge>
                        {index > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {((1 - stage.count / conversionFunnel[index - 1].count) * 100).toFixed(1)}% drop
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-6">
                        <div 
                          className="h-6 rounded-full transition-all duration-700 flex items-center justify-center" 
                          style={{ 
                            width: `${stage.conversion}%`,
                            backgroundColor: stage.color
                          }}
                        >
                          <span className="text-xs font-medium text-white">
                            {stage.conversion >= 10 ? `${stage.conversion}%` : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Optimization Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                    <h4 className="font-semibold text-destructive mb-2">High Drop-off: Signup → Verification</h4>
                    <p className="text-sm text-muted-foreground mb-2">15% users don't verify email</p>
                    <div className="text-xs space-y-1">
                      <div>• Simplify verification process</div>
                      <div>• Add SMS verification option</div>
                      <div>• Improve email deliverability</div>
                    </div>
                  </div>

                  <div className="p-3 border border-warning/20 rounded-lg bg-warning/5">
                    <h4 className="font-semibold text-warning mb-2">Medium Priority: First Test</h4>
                    <p className="text-sm text-muted-foreground mb-2">30% don't complete first test</p>
                    <div className="text-xs space-y-1">
                      <div>• Better onboarding tutorial</div>
                      <div>• Reduce first test difficulty</div>
                      <div>• Add progress indicators</div>
                    </div>
                  </div>

                  <div className="p-3 border border-accent/20 rounded-lg bg-accent/5">
                    <h4 className="font-semibold text-accent mb-2">Premium Conversion</h4>
                    <p className="text-sm text-muted-foreground mb-2">Only 25% upgrade to premium</p>
                    <div className="text-xs space-y-1">
                      <div>• Highlight premium benefits</div>
                      <div>• Offer limited-time trials</div>
                      <div>• Personalized upgrade prompts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'Visitor → Signup', current: 12.5, target: 15, trend: '+2.3%' },
                    { metric: 'Signup → Verified', current: 85.0, target: 90, trend: '+1.2%' },
                    { metric: 'Verified → First Test', current: 70.0, target: 80, trend: '+0.8%' },
                    { metric: 'Test → Regular User', current: 50.0, target: 60, trend: '-1.1%' },
                    { metric: 'Regular → Premium', current: 25.0, target: 35, trend: '+3.2%' }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{metric.current}%</span>
                          <Badge variant={metric.trend.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(metric.current / metric.target) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">Target: {metric.target}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          {/* Geographic Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Geographic User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20">
                          <Progress value={country.percentage} className="h-2" />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {country.percentage}%
                        </span>
                        <span className="text-sm font-medium w-16 text-right">
                          {country.users.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Device & Browser Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{device.type}</span>
                        <div className="text-right">
                          <div className="font-bold">{device.users.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{device.percentage}%</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        {Object.entries(device.browsers).map(([browser, percentage]) => (
                          <div key={browser} className="text-center">
                            <div className="font-medium">{browser}</div>
                            <div className="text-muted-foreground">{percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Geographic Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Country</th>
                      <th className="text-center p-3 font-medium">Users</th>
                      <th className="text-center p-3 font-medium">Avg Session</th>
                      <th className="text-center p-3 font-medium">Conversion</th>
                      <th className="text-center p-3 font-medium">Revenue/User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geographicData.slice(0, -1).map((country, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 font-medium">{country.country}</td>
                        <td className="text-center p-3">{country.users.toLocaleString()}</td>
                        <td className="text-center p-3">{Math.floor(Math.random() * 20) + 15}min</td>
                        <td className="text-center p-3">
                          <Badge variant="default">
                            {(Math.random() * 10 + 8).toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          ${(Math.random() * 30 + 20).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiments" className="space-y-6">
          {/* Growth Experiments */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Experiments & A/B Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experiments.map((experiment, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{experiment.name}</h4>
                      <Badge variant={
                        experiment.status === 'Completed' ? 'default' :
                        experiment.status === 'Running' ? 'secondary' : 'outline'
                      }>
                        {experiment.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impact:</span>
                        <span className={experiment.impact.startsWith('+') ? 'text-accent font-medium' : 'font-medium'}>
                          {experiment.impact}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Metric:</span>
                        <span>{experiment.metric}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Period:</span>
                        <span>{experiment.startDate} to {experiment.endDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experiment Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Experiment Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <div className="font-semibold text-accent">Successful Experiments</div>
                    <div className="text-2xl font-bold">73%</div>
                    <div className="text-sm text-muted-foreground">Beat control by >5%</div>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="font-semibold text-primary">Avg Improvement</div>
                    <div className="text-2xl font-bold">+18.4%</div>
                    <div className="text-sm text-muted-foreground">Across winning tests</div>
                  </div>
                  
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="font-semibold text-warning">Revenue Impact</div>
                    <div className="text-2xl font-bold">$124K</div>
                    <div className="text-sm text-muted-foreground">Additional monthly revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experiment Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span>Ideas in Backlog</span>
                    <Badge variant="outline">24</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-warning/10 rounded">
                    <span>In Development</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-primary/10 rounded">
                    <span>Currently Running</span>
                    <Badge variant="default">2</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-accent/10 rounded">
                    <span>Analyzing Results</span>
                    <Badge variant="default">1</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span>Completed This Month</span>
                    <Badge variant="outline">5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};