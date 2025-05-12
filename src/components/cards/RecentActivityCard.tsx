
import React from 'react';
import { Clock, BookOpen, FileCheck, Award } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'practice' | 'exam' | 'skill' | 'achievement';
  title: string;
  timestamp: string;
  score?: number;
  time?: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'exam',
    title: 'Writing Mock Exam',
    timestamp: '2 days ago',
    score: 25,
    time: '33m'
  },
  {
    id: 2,
    type: 'practice',
    title: 'Abstract Reasoning',
    timestamp: '3 days ago',
    score: 40,
    time: '45m'
  },
  {
    id: 3,
    type: 'skill',
    title: 'Quantitative Training',
    timestamp: '4 days ago',
    time: '20m'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'practice':
      return <BookOpen size={18} />;
    case 'exam':
      return <FileCheck size={18} />;
    case 'skill':
      return <BookOpen size={18} />;
    case 'achievement':
      return <Award size={18} />;
    default:
      return <Clock size={18} />;
  }
};

const RecentActivityCard = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-primary hover:text-primary/80 text-xs">View All</button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start bg-gray-50 p-3 rounded-lg">
            <div className={`p-2 rounded-full mr-3 ${
              activity.type === 'exam' ? 'bg-blue-100 text-primary' :
              activity.type === 'practice' ? 'bg-green-100 text-accent' :
              activity.type === 'skill' ? 'bg-orange-100 text-warning' :
              'bg-purple-100 text-purple-600'
            }`}>
              {getIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{activity.title}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
              
              <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                {activity.time && (
                  <span className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {activity.time}
                  </span>
                )}
                
                {activity.score !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-md ${
                    activity.score >= 70 ? 'bg-green-100 text-green-800' :
                    activity.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activity.score}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
