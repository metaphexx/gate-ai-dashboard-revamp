import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/cards/StatCard';
import { UserCheck, BookOpen, Video, Star } from 'lucide-react';
import { generateTutorData } from '@/utils/mockData';

export const TutorInsights = () => {
  const tutorData = generateTutorData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tutor & Staff Insights</h2>
        <p className="text-muted-foreground">Staff performance analytics, contribution tracking, and activity monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Tutors" value="12" icon={<UserCheck className="w-5 h-5" />} trend={{ value: 8.3, isPositive: true }} />
        <StatCard title="Questions Created" value="601" icon={<BookOpen className="w-5 h-5" />} trend={{ value: 15.7, isPositive: true }} />
        <StatCard title="Videos Created" value="35" icon={<Video className="w-5 h-5" />} trend={{ value: 12.1, isPositive: true }} />
        <StatCard title="Avg Rating" value="4.7" icon={<Star className="w-5 h-5" />} trend={{ value: 3.2, isPositive: true }} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tutor Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Tutor</th>
                  <th className="text-center p-3 font-medium">Questions</th>
                  <th className="text-center p-3 font-medium">Videos</th>
                  <th className="text-center p-3 font-medium">Rating</th>
                  <th className="text-center p-3 font-medium">Response Time</th>
                  <th className="text-center p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tutorData.map((tutor) => (
                  <tr key={tutor.id} className="border-b border-border/50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{tutor.name}</div>
                        <div className="text-sm text-muted-foreground">{tutor.subject}</div>
                      </div>
                    </td>
                    <td className="text-center p-3">{tutor.questionsCreated}</td>
                    <td className="text-center p-3">{tutor.videosCreated}</td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-current" />
                        <span>{tutor.studentRating}</span>
                      </div>
                    </td>
                    <td className="text-center p-3">{tutor.responseTime}</td>
                    <td className="text-center p-3">
                      <Badge variant="default">Active</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};