import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import StatCard from '@/components/cards/StatCard';
import { 
  Repeat, 
  TrendingDown,
  TrendingUp,
  Users,
  UserX,
  Activity,
  Calendar,
  Target,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart } from 'recharts';
import { generateCohortData } from '@/utils/mockData';

// Mock retention data
const retentionData = [
  { period: 'Week 1', cohortJan: 100, cohortFeb: 100, cohortMar: 100, cohortApr: 100 },
  { period: 'Week 2', cohortJan: 85, cohortFeb: 88, cohortMar: 90, cohortApr: 92 },
  { period: 'Week 4', cohortJan: 72, cohortFeb: 75, cohortMar: 78, cohortApr: 81 },
  { period: 'Month 1', cohortJan: 65, cohortFeb: 68, cohortMar: 72, cohortApr: 75 },
  { period: 'Month 2', cohortJan: 58, cohortFeb: 62, cohortMar: 66, cohortApr: 69 },
  { period: 'Month 3', cohortJan: 52, cohortFeb: 56, cohortMar: 60, cohortApr: 63 },
  { period: 'Month 6', cohortJan: 45, cohortFeb: 48, cohortMar: 52, cohortApr: 55 }
];

// Mock churn analysis data
const churnData = [
  { month: 'Jan', newUsers: 450, churnedUsers: 89, churnRate: 19.8, netGrowth: 361 },
  { month: 'Feb', newUsers: 520, churnedUsers: 76, churnRate: 14.6, netGrowth: 444 },
  { month: 'Mar', newUsers: 610, churnedUsers: 92, churnRate: 15.1, netGrowth: 518 },
  { month: 'Apr', newUsers: 580, churnedUsers: 108, churnRate: 18.6, netGrowth: 472 },
  { month: 'May', newUsers: 670, churnedUsers: 95, churnRate: 14.2, netGrowth: 575 },
  { month: 'Jun', newUsers: 720, churnedUsers: 103, churnRate: 14.3, netGrowth: 617 }
];

// Mock DAU/MAU stickiness data
const stickinessData = [
  { date: '2024-01-01', dau: 1250, mau: 3400, stickiness: 36.8 },
  { date: '2024-01-08', dau: 1340, mau: 3500, stickiness: 38.3 },
  { date: '2024-01-15', dau: 1420, mau: 3600, stickiness: 39.4 },
  { date: '2024-01-22', dau: 1380, mau: 3650, stickiness: 37.8 },
  { date: '2024-01-29', dau: 1560, mau: 3700, stickiness: 42.2 }
];

// Mock reactivation campaigns
const reactivationMetrics = [
  { campaign: 'Email Series 1', sent: 2400, opened: 720, clicked: 144, reactivated: 86 },
  { campaign: 'Push Notifications', sent: 1800, opened: 540, clicked: 108, reactivated: 65 },
  { campaign: 'SMS Reminders', sent: 1200, opened: 960, clicked: 192, reactivated: 115 },
  { campaign: 'In-App Messages', sent: 3200, opened: 1920, clicked: 384, reactivated: 230 }
];

// Mock funnel conversion data
const funnelData = [
  { stage: 'Registration', users: 10000, percentage: 100, dropOff: 0 },
  { stage: 'Email Verification', users: 8500, percentage: 85, dropOff: 15 },
  { stage: 'First Login', users: 7650, percentage: 76.5, dropOff: 8.5 },
  { stage: 'First Test Attempt', users: 6120, percentage: 61.2, dropOff: 15.3 },
  { stage: 'Second Test', users: 4896, percentage: 48.96, dropOff: 12.24 },
  { stage: 'Regular Usage (5+ tests)', users: 3427, percentage: 34.27, dropOff: 14.69 },
  { stage: 'Premium Upgrade', users: 1028, percentage: 10.28, dropOff: 23.99 }
];

export const RetentionAnalytics = () => {
  const [selectedCohort, setSelectedCohort] = useState('all');
  const cohortData = generateCohortData();

  const currentRetention = 58;
  const churnRate = 15.2;
  const stickinessRatio = 39.4;
  const reactivationRate = 12.8;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Retention & Cohort Analytics</h2>
          <p className="text-muted-foreground">Comprehensive retention tracking, churn analysis, and user lifecycle insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Time Period
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button size="sm">
            <Target className="w-4 h-4 mr-2" />
            Set Targets
          </Button>
        </div>
      </div>

      {/* Retention Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="3-Month Retention"
          value={`${currentRetention}%`}
          icon={<Repeat className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Churn Rate"
          value={`${churnRate}%`}
          icon={<UserX className="w-5 h-5" />}
          trend={{ value: 2.1, isPositive: false }}
        />
        <StatCard
          title="DAU/MAU Stickiness"
          value={`${stickinessRatio}%`}
          icon={<Activity className="w-5 h-5" />}
          trend={{ value: 4.7, isPositive: true }}
        />
        <StatCard
          title="Reactivation Rate"
          value={`${reactivationRate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 6.2, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="cohorts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          <TabsTrigger value="churn">Churn Tracking</TabsTrigger>
          <TabsTrigger value="stickiness">User Stickiness</TabsTrigger>
          <TabsTrigger value="reactivation">Reactivation</TabsTrigger>
        </TabsList>

        <TabsContent value="cohorts" className="space-y-6">
          {/* Cohort Retention Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cohort Retention Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Retention']} />
                    <Line 
                      type="monotone" 
                      dataKey="cohortJan" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      name="January Cohort"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cohortFeb" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      name="February Cohort"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cohortMar" 
                      stroke="#38C172" 
                      strokeWidth={2}
                      name="March Cohort"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cohortApr" 
                      stroke="#009dff" 
                      strokeWidth={2}
                      name="April Cohort"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Cohort Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Cohort</th>
                      <th className="text-center p-3 font-medium">New Users</th>
                      <th className="text-center p-3 font-medium">Month 1</th>
                      <th className="text-center p-3 font-medium">Month 3</th>
                      <th className="text-center p-3 font-medium">Month 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortData.map((cohort, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 font-medium">{cohort.month} 2024</td>
                        <td className="text-center p-3">{cohort.newUsers}</td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${cohort.month1}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{cohort.month1}%</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-accent rounded-full" 
                                style={{ width: `${cohort.month3}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{cohort.month3}%</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-warning rounded-full" 
                                style={{ width: `${cohort.month6}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{cohort.month6}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="churn" className="space-y-6">
          {/* Churn Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={churnData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="churnedUsers" fill="hsl(var(--destructive))" name="Churned Users" />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="churnRate" 
                        stroke="hsl(var(--warning))" 
                        strokeWidth={3}
                        name="Churn Rate %"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Net Growth Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={churnData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="newUsers" 
                        stackId="1"
                        stroke="hsl(var(--accent))" 
                        fill="hsl(var(--accent))" 
                        name="New Users"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="netGrowth" 
                        stackId="2"
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        name="Net Growth"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Churn Prediction & Segments */}
          <Card>
            <CardHeader>
              <CardTitle>At-Risk User Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="flex items-center gap-2 mb-3">
                    <UserX className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold text-destructive">High Risk</h4>
                  </div>
                  <div className="text-2xl font-bold text-destructive mb-2">156 users</div>
                  <p className="text-sm text-muted-foreground mb-3">No activity in 14+ days, low test scores</p>
                  <div className="space-y-2 text-sm">
                    <div>• Average last login: 18 days</div>
                    <div>• Test completion: &lt;30%</div>
                    <div>• Predicted churn: 78%</div>
                  </div>
                </div>

                <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-5 h-5 text-warning" />
                    <h4 className="font-semibold text-warning">Medium Risk</h4>
                  </div>
                  <div className="text-2xl font-bold text-warning mb-2">298 users</div>
                  <p className="text-sm text-muted-foreground mb-3">Declining engagement, irregular usage</p>
                  <div className="space-y-2 text-sm">
                    <div>• Average last login: 7 days</div>
                    <div>• Test completion: 30-60%</div>
                    <div>• Predicted churn: 45%</div>
                  </div>
                </div>

                <div className="p-4 border border-accent/20 rounded-lg bg-accent/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-accent" />
                    <h4 className="font-semibold text-accent">Low Risk</h4>
                  </div>
                  <div className="text-2xl font-bold text-accent mb-2">1,234 users</div>
                  <p className="text-sm text-muted-foreground mb-3">Regular usage, good engagement</p>
                  <div className="space-y-2 text-sm">
                    <div>• Average last login: 2 days</div>
                    <div>• Test completion: &gt;60%</div>
                    <div>• Predicted churn: 12%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stickiness" className="space-y-6">
          {/* DAU/MAU Stickiness */}
          <Card>
            <CardHeader>
              <CardTitle>DAU/MAU Stickiness Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={stickinessData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="dau" fill="hsl(var(--primary))" fillOpacity={0.6} name="DAU" />
                    <Bar yAxisId="left" dataKey="mau" fill="hsl(var(--muted-foreground))" fillOpacity={0.3} name="MAU" />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="stickiness" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      name="Stickiness %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Engagement Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelData.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {stage.users.toLocaleString()} users
                        </span>
                        {index > 0 && (
                          <Badge variant="outline" className="text-xs">
                            -{stage.dropOff}% drop-off
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-4">
                        <div 
                          className="bg-primary h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2" 
                          style={{ width: `${stage.percentage}%` }}
                        >
                          <span className="text-xs text-primary-foreground font-medium">
                            {stage.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reactivation" className="space-y-6">
          {/* Reactivation Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Reactivation Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Campaign</th>
                      <th className="text-center p-3 font-medium">Sent</th>
                      <th className="text-center p-3 font-medium">Opened</th>
                      <th className="text-center p-3 font-medium">Clicked</th>
                      <th className="text-center p-3 font-medium">Reactivated</th>
                      <th className="text-center p-3 font-medium">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reactivationMetrics.map((campaign, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 font-medium">{campaign.campaign}</td>
                        <td className="text-center p-3">{campaign.sent.toLocaleString()}</td>
                        <td className="text-center p-3">
                          <div className="flex flex-col items-center">
                            <span>{campaign.opened.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex flex-col items-center">
                            <span>{campaign.clicked.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-accent">{campaign.reactivated}</span>
                            <span className="text-xs text-muted-foreground">users</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={((campaign.reactivated / campaign.sent) * 100) >= 5 ? 'default' : 'secondary'}>
                            {((campaign.reactivated / campaign.sent) * 100).toFixed(1)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Win-Back Strategies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                    <div>
                      <div className="font-medium">Personalized Study Plan</div>
                      <div className="text-sm text-muted-foreground">Based on previous performance</div>
                    </div>
                    <Badge variant="default">23% success</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div>
                      <div className="font-medium">Limited Time Offers</div>
                      <div className="text-sm text-muted-foreground">Premium discounts</div>
                    </div>
                    <Badge variant="default">18% success</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                    <div>
                      <div className="font-medium">Progress Reminders</div>
                      <div className="text-sm text-muted-foreground">Show learning streaks</div>
                    </div>
                    <Badge variant="default">15% success</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reactivation Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <div className="font-medium">Day 7: First Reminder</div>
                    <div className="text-sm text-muted-foreground">Gentle email with progress summary</div>
                  </div>
                  <div className="border-l-2 border-accent pl-4">
                    <div className="font-medium">Day 14: Value Proposition</div>
                    <div className="text-sm text-muted-foreground">Highlight unused features</div>
                  </div>
                  <div className="border-l-2 border-warning pl-4">
                    <div className="font-medium">Day 21: Incentive Offer</div>
                    <div className="text-sm text-muted-foreground">Special discount or bonus content</div>
                  </div>
                  <div className="border-l-2 border-destructive pl-4">
                    <div className="font-medium">Day 30: Final Attempt</div>
                    <div className="text-sm text-muted-foreground">Last chance messaging</div>
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