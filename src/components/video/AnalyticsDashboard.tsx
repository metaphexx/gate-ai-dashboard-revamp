
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Trophy, Target } from 'lucide-react';

interface AnalyticsDashboardProps {
  totalWatchTime: number;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  streak: number;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  totalWatchTime,
  completedLessons,
  totalLessons,
  averageScore,
  streak
}) => {
  const completionRate = (completedLessons / totalLessons) * 100;
  const watchTimeHours = Math.floor(totalWatchTime / 3600);
  const watchTimeMinutes = Math.floor((totalWatchTime % 3600) / 60);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Watch Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-2xl font-bold">{watchTimeHours}h {watchTimeMinutes}m</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{completedLessons}/{totalLessons} lessons</span>
              <span>{Math.round(completionRate)}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-2xl font-bold">{averageScore}%</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Study Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-orange-600" />
            <span className="text-2xl font-bold">{streak} days</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
