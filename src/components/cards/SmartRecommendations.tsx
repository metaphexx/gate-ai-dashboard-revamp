
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, FileCheck, Target } from 'lucide-react';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  actionType: 'default' | 'outline' | 'secondary';
}

const SmartRecommendations = () => {
  const recommendations: Recommendation[] = [
    {
      id: 1,
      title: "Abstract Reasoning needs attention",
      description: "Your accuracy is 35% - lower than average",
      icon: <Target className="text-destructive" size={18} />,
      action: "Review Concepts",
      actionType: 'default'
    },
    {
      id: 2,
      title: "Ready for Reading Comprehension",
      description: "You've mastered the basics (40% accuracy)",
      icon: <BookOpen className="text-warning" size={18} />,
      action: "Practice More",
      actionType: 'outline'
    },
    {
      id: 3,
      title: "Try a full mock exam",
      description: "You've completed enough section practice",
      icon: <FileCheck className="text-accent" size={18} />,
      action: "Start Mock",
      actionType: 'secondary'
    }
  ];
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recommended Actions</h3>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-white rounded-full flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-tight mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
            <Button 
              size="sm"
              variant={item.actionType}
              className="w-full sm:w-auto min-h-[36px]"
            >
              {item.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;
