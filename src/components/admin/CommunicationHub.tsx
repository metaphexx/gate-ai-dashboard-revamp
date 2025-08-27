import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/cards/StatCard';
import { MessageSquare, Mail, Bell, Users } from 'lucide-react';

export const CommunicationHub = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Communication & Support Hub</h2>
        <p className="text-muted-foreground">User messaging, support tickets, and feedback management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Tickets" value="23" icon={<MessageSquare className="w-5 h-5" />} trend={{ value: 12.5, isPositive: false }} />
        <StatCard title="Email Campaigns" value="8" icon={<Mail className="w-5 h-5" />} trend={{ value: 8.3, isPositive: true }} />
        <StatCard title="Response Time" value="2.3h" icon={<Bell className="w-5 h-5" />} trend={{ value: 15.2, isPositive: false }} />
        <StatCard title="Satisfaction" value="94%" icon={<Users className="w-5 h-5" />} trend={{ value: 3.1, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: '#1234', user: 'John D.', issue: 'Login problems', status: 'Open', priority: 'High' },
                { id: '#1235', user: 'Sarah M.', issue: 'Payment failed', status: 'In Progress', priority: 'Medium' },
                { id: '#1236', user: 'Mike L.', issue: 'Test not loading', status: 'Resolved', priority: 'Low' }
              ].map((ticket, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">{ticket.id} - {ticket.user}</div>
                    <div className="text-sm text-muted-foreground">{ticket.issue}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={ticket.status === 'Open' ? 'destructive' : ticket.status === 'In Progress' ? 'secondary' : 'default'}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Campaigns</span>
                <Badge variant="default">8 Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Badge variant="secondary">156 Sent Today</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>In-App Messages</span>
                <Badge variant="outline">23 Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Live Chat</span>
                <Badge variant="default">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};