import React from 'react';
import { Activity, Clock, BookOpen, Play, UserPlus, Award, XCircle, FileText, Calculator, Trophy } from 'lucide-react';
import { generateActivityFeed } from '@/utils/mockData';

export const RealTimeActivityFeed = () => {
  const activities = generateActivityFeed().slice(0, 8); // Show only 8 recent activities

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  };

  const getActivityIcon = (activity: string) => {
    if (activity.includes('Mock Exam') || activity.includes('exam')) return BookOpen;
    if (activity.includes('Completed') || activity.includes('completed')) return Award;
    if (activity.includes('Started') || activity.includes('started')) return Play;
    if (activity.includes('Registered') || activity.includes('account')) return UserPlus;
    if (activity.includes('video') || activity.includes('lesson')) return Play;
    if (activity.includes('Failed') || activity.includes('failed')) return XCircle;
    if (activity.includes('Reading') || activity.includes('Comprehension')) return FileText;
    if (activity.includes('Quantitative') || activity.includes('Reasoning')) return Calculator;
    if (activity.includes('score') || activity.includes('points')) return Trophy;
    return Activity;
  };

  const getActivityColor = (activity: string) => {
    if (activity.includes('Mock Exam') || activity.includes('exam')) return 'bg-blue-500';
    if (activity.includes('Completed') || activity.includes('completed')) return 'bg-green-600';
    if (activity.includes('Started') || activity.includes('started')) return 'bg-yellow-600';
    if (activity.includes('Registered') || activity.includes('account')) return 'bg-purple-600';
    if (activity.includes('video') || activity.includes('lesson')) return 'bg-indigo-600';
    if (activity.includes('Failed') || activity.includes('failed')) return 'bg-red-600';
    if (activity.includes('Reading') || activity.includes('Comprehension')) return 'bg-teal-600';
    if (activity.includes('Quantitative') || activity.includes('Reasoning')) return 'bg-orange-600';
    if (activity.includes('score') || activity.includes('points')) return 'bg-emerald-600';
    return 'bg-gray-600';
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Real-Time Activity Feed
        </h3>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.activity);
          const colorClass = getActivityColor(activity.activity);
          
          return (
            <div 
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${colorClass}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                <div className="flex items-center gap-2">
                  <IconComponent className="w-3 h-3 text-gray-600" />
                  <p className="text-xs text-gray-600">{activity.activity}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Live updates every 30s</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};