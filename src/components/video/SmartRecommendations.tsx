
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Clock, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Recommendation {
  id: string;
  title: string;
  type: 'lesson' | 'practice' | 'review';
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface SmartRecommendationsProps {
  currentLessonId: string;
  userPerformance: {
    weakAreas: string[];
    strongAreas: string[];
    learningStyle: string;
  };
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  currentLessonId,
  userPerformance
}) => {
  const isMobile = useIsMobile();
  // Mock recommendations based on current lesson and performance
  const recommendations: Recommendation[] = [
    {
      id: 'algebra-practice',
      title: 'Algebraic Equations Practice',
      type: 'practice',
      reason: 'Based on your recent quiz performance, additional practice with algebraic equations would be beneficial',
      priority: 'high',
      estimatedTime: '15 min',
      difficulty: 'intermediate'
    },
    {
      id: 'percentage-review',
      title: 'Percentages Review',
      type: 'review',
      reason: 'You scored well on percentages - review to maintain proficiency',
      priority: 'medium',
      estimatedTime: '10 min',
      difficulty: 'beginner'
    },
    {
      id: 'word-problems',
      title: 'Mathematical Word Problems',
      type: 'lesson',
      reason: 'Next logical step in your learning path',
      priority: 'high',
      estimatedTime: '20 min',
      difficulty: 'intermediate'
    },
    {
      id: 'speed-math',
      title: 'Speed Mathematics Techniques',
      type: 'lesson',
      reason: 'Improve calculation speed for time-constrained tests',
      priority: 'low',
      estimatedTime: '25 min',
      difficulty: 'advanced'
    }
  ];

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityText = (priority: Recommendation['priority'], isMobile: boolean = false) => {
    if (isMobile) {
      return priority; // Just "high", "medium", "low"
    }
    return `${priority} priority`;
  };

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'lesson': return <Star className="w-4 h-4" />;
      case 'practice': return <TrendingUp className="w-4 h-4" />;
      case 'review': return <Clock className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: Recommendation['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Smart Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 mb-4">
          Based on your performance and learning patterns, here are personalized recommendations:
        </div>

        {recommendations.map((rec) => (
          <div key={rec.id} className="p-3 sm:p-4 border rounded-lg space-y-3 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {getTypeIcon(rec.type)}
                <h4 className="font-medium break-words">{rec.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-shrink-0">
                <Badge className={getPriorityColor(rec.priority)}>
                  {getPriorityText(rec.priority, isMobile)}
                </Badge>
                <Badge className={getDifficultyColor(rec.difficulty)}>
                  {rec.difficulty}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-gray-600 break-words">{rec.reason}</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {rec.estimatedTime}
                </span>
                <span className="capitalize">{rec.type}</span>
              </div>
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                Start {rec.type}
              </Button>
            </div>
          </div>
        ))}

        {/* Learning insights */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Learning Insights</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div>
              <strong>Weak Areas:</strong> {userPerformance.weakAreas.join(', ')}
            </div>
            <div>
              <strong>Strong Areas:</strong> {userPerformance.strongAreas.join(', ')}
            </div>
            <div>
              <strong>Learning Style:</strong> {userPerformance.learningStyle}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
