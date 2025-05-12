
import React from 'react';
import { Clock, BookOpen, FileCheck, Award } from 'lucide-react';

interface ActivityItem {
  type: 'practice' | 'exam' | 'skill' | 'achievement';
  title: string;
  timestamp: string;
  score?: number;
  time?: string;
}

const activities: ActivityItem[] = [
  {
    type: 'exam',
    title: 'Completed Writing Mock',
    timestamp: '2 days ago',
    score: 25,
    time: '33 mins'
  },
  {
    type: 'practice',
    title: 'Abstract Reasoning Practice',
    timestamp: '3 days ago',
    score: 40,
    time: '45 mins'
  },
  {
    type: 'skill',
    title: 'Quantitative Skill Training',
    timestamp: '4 days ago',
    time: '20 mins'
  },
  {
    type: 'achievement',
    title: 'First Mock Exam Completed',
    timestamp: '1 week ago'
  },
  {
    type: 'practice',
    title: 'Reading Comprehension',
    timestamp: '1 week ago',
    score: 55,
    time: '1 hour'
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
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-primary hover:text-primary/80 text-sm">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start">
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
                <p className="font-medium">{activity.title}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
              
              {(activity.score !== undefined || activity.time) && (
                <div className="flex items-center mt-1 text-sm text-gray-500 space-x-2">
                  {activity.time && (
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {activity.time}
                    </span>
                  )}
                  
                  {activity.score !== undefined && (
                    <span className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 ${
                        activity.score >= 70 ? 'bg-accent' :
                        activity.score >= 40 ? 'bg-warning' :
                        'bg-destructive'
                      }`}></div>
                      {activity.score}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
