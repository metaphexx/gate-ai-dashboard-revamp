import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Search, 
  Filter,
  MoreHorizontal,
  UserPlus,
  Download,
  Eye,
  Edit,
  Trash2,
  Mail,
  Clock,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { generateMockUsers } from '@/utils/mockData';
import StatCard from '@/components/cards/StatCard';

const mockUsers = generateMockUsers(20);

// Mock learning analytics data
const learningAnalytics = [
  { subject: 'Writing', avgTime: 45, velocity: 2.3, effectiveness: 78 },
  { subject: 'Abstract Reasoning', avgTime: 60, velocity: 1.8, effectiveness: 65 },
  { subject: 'Reading Comprehension', avgTime: 38, velocity: 2.7, effectiveness: 82 },
  { subject: 'Quantitative Reasoning', avgTime: 52, velocity: 2.1, effectiveness: 75 }
];

// Mock user segmentation data
const userSegments = [
  { segment: 'High Performers', count: 285, color: '#38C172' },
  { segment: 'Average Students', count: 1240, color: '#009dff' },
  { segment: 'At-Risk Users', count: 156, color: '#F59E0B' },
  { segment: 'Inactive Users', count: 89, color: '#EF4444' }
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'All' || user.tier === selectedTier;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'Active').length;
  const premiumUsers = mockUsers.filter(u => u.tier === 'Premium').length;
  const avgScore = Math.round(mockUsers.reduce((sum, user) => sum + user.averageScore, 0) / totalUsers);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management System</h2>
          <p className="text-muted-foreground">Comprehensive user profiles, behavior analytics, and learning insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* User Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Premium Users"
          value={premiumUsers.toLocaleString()}
          icon={<BookOpen className="w-5 h-5" />}
          trend={{ value: 15.7, isPositive: true }}
        />
        <StatCard
          title="Average Score"
          value={`${avgScore}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="profiles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profiles">User Profiles</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Analytics</TabsTrigger>
          <TabsTrigger value="learning">Learning Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Tiers</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Free">Free</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* User Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Directory ({filteredUsers.length} users)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Tests</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Study Time</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.registrationDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            {user.lastActive}
                          </div>
                        </TableCell>
                        <TableCell>{user.totalTests}</TableCell>
                        <TableCell>
                          <Badge variant={user.averageScore >= 70 ? 'default' : 'secondary'}>
                            {user.averageScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>{user.studyTime}h</TableCell>
                        <TableCell>
                          <Badge variant={user.tier === 'Premium' ? 'default' : 'outline'}>
                            {user.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          {/* User Segmentation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Segmentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userSegments}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ segment, count }) => `${segment}: ${count}`}
                      >
                        {userSegments.map((entry, index) => (
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
                <CardTitle>Study Patterns by Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: 'Morning (6-12)', users: 345, color: '#38C172' },
                    { time: 'Afternoon (12-6)', users: 567, color: '#009dff' },
                    { time: 'Evening (6-10)', users: 789, color: '#F59E0B' },
                    { time: 'Night (10-6)', users: 234, color: '#8B5CF6' }
                  ].map((period) => (
                    <div key={period.time} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{period.time}</span>
                        <span className="text-sm text-muted-foreground">{period.users} users</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="h-3 rounded-full" 
                          style={{ 
                            width: `${(period.users / 789) * 100}%`,
                            backgroundColor: period.color
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

        <TabsContent value="learning" className="space-y-6">
          {/* Learning Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={learningAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="effectiveness" fill="hsl(var(--primary))" name="Effectiveness %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Velocity Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {learningAnalytics.map((item) => (
                    <div key={item.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.subject}</span>
                        <div className="text-sm text-muted-foreground">
                          {item.velocity} topics/week
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Avg Time: </span>
                          <span className="font-medium">{item.avgTime}min</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Success Rate: </span>
                          <span className="font-medium">{item.effectiveness}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.effectiveness}%` }}
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
  );
};