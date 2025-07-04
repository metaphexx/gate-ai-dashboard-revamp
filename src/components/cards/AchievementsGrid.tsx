import React, { useState } from 'react';
import { 
  Trophy, Target, Zap, Calendar, Clock, TrendingUp, 
  Award, Star, Flame, Moon, Coffee, CheckCircle2,
  BarChart3, Timer, Medal
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'practice' | 'performance' | 'consistency' | 'special';
  isUnlocked: boolean;
  progress?: number;
  target?: number;
}

const AchievementsGrid = () => {
  const [showAllModal, setShowAllModal] = useState(false);

  const achievements: Achievement[] = [
    // Practice Milestones
    { id: '1', title: 'Question Grinder', description: 'Complete 500 Questions in total.', icon: <Target size={16} />, category: 'practice', isUnlocked: true },
    { id: '2', title: 'Mini Mock Explorer', description: 'Complete 20 Mini Mocks.', icon: <CheckCircle2 size={16} />, category: 'practice', isUnlocked: true },
    { id: '3', title: 'Test Finisher', description: 'Complete 50 Tests.', icon: <Award size={16} />, category: 'practice', isUnlocked: false },
    { id: '4', title: 'Exam Veteran', description: 'Complete 10 Exams.', icon: <Medal size={16} />, category: 'practice', isUnlocked: false },
    { id: '5', title: 'Daily Starter', description: 'Complete at least 1 activity for 7 consecutive days.', icon: <Calendar size={16} />, category: 'practice', isUnlocked: true },

    // Performance Milestones
    { id: '6', title: 'Accuracy Master', description: 'Achieve 90%+ accuracy on 5 Quizzes.', icon: <Star size={16} />, category: 'performance', isUnlocked: false },
    { id: '7', title: 'Perfect Streak', description: 'Achieve 100% accuracy on any full Test.', icon: <Trophy size={16} />, category: 'performance', isUnlocked: true },
    { id: '8', title: 'Comeback Kid', description: 'Improve average accuracy by 15% across your last 10 Quizzes.', icon: <TrendingUp size={16} />, category: 'performance', isUnlocked: false },
    { id: '9', title: 'Speed Demon', description: 'Complete a full Quiz in under 50% of the allotted time.', icon: <Zap size={16} />, category: 'performance', isUnlocked: true },
    { id: '10', title: 'Top 10%', description: 'Score in the top 10% percentile on any Exam.', icon: <BarChart3 size={16} />, category: 'performance', isUnlocked: false },

    // Consistency/Streaks
    { id: '11', title: 'Streak Beginner', description: 'Maintain a 3-day activity streak.', icon: <Flame size={16} />, category: 'consistency', isUnlocked: true },
    { id: '12', title: 'Streak Master', description: 'Maintain a 14-day activity streak.', icon: <Flame size={16} />, category: 'consistency', isUnlocked: false },
    { id: '13', title: 'Streak Legend', description: 'Maintain a 30-day activity streak.', icon: <Flame size={16} />, category: 'consistency', isUnlocked: false },
    { id: '14', title: 'Weekend Warrior', description: 'Complete activities on 4 consecutive weekends.', icon: <Coffee size={16} />, category: 'consistency', isUnlocked: true },
    { id: '15', title: 'Night Owl', description: 'Complete activities after 9 PM on 7 separate days.', icon: <Moon size={16} />, category: 'consistency', isUnlocked: false }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'practice': return 'text-[#009dff]';
      case 'performance': return 'text-green-600';
      case 'consistency': return 'text-orange-600';
      case 'special': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'practice': return 'Practice Milestones';
      case 'performance': return 'Performance Milestones';
      case 'consistency': return 'Consistency/Streaks';
      case 'special': return 'Special Events';
      default: return 'Other';
    }
  };

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const AchievementItem = ({ achievement }: { achievement: Achievement }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`
            p-2 rounded-md text-center transition-all duration-200 hover:scale-105 cursor-pointer
            ${achievement.isUnlocked 
              ? 'bg-[#009dff]/10 border border-[#009dff]/20 hover:bg-[#009dff]/20' 
              : 'bg-gray-50 border border-gray-200 opacity-60 hover:bg-gray-100'
            }
          `}
        >
          <div className={`
            inline-flex items-center justify-center w-6 h-6 rounded-full mb-1
            ${achievement.isUnlocked 
              ? `bg-white ${getCategoryColor(achievement.category)}` 
              : 'bg-gray-200 text-gray-400'
            }
          `}>
            {achievement.icon}
          </div>
          <p className={`
            text-xs font-medium leading-tight
            ${achievement.isUnlocked ? 'text-gray-900' : 'text-gray-400'}
          `}>
            {achievement.title}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        className="bg-white border border-gray-200 shadow-lg min-w-[280px] max-w-[400px] w-auto z-[9999] fixed" 
        avoidCollisions={true} 
        collisionPadding={16}
        sideOffset={8}
        align="center"
        alignOffset={0}
        sticky="always"
      >
        <div className="text-sm p-2">
          <div className="font-semibold mb-2 text-gray-900">{achievement.title}</div>
          <div className={`${achievement.isUnlocked ? 'text-gray-700' : 'text-gray-500'} leading-relaxed`}>
            {achievement.isUnlocked ? achievement.description : `Locked - ${achievement.description}`}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {achievements.slice(0, 12).map((achievement) => (
            <AchievementItem key={achievement.id} achievement={achievement} />
          ))}
        </div>
        
        {achievements.length > 12 && (
          <div className="text-center">
            <Dialog open={showAllModal} onOpenChange={setShowAllModal}>
              <DialogTrigger asChild>
                <button className="text-xs text-[#009dff] hover:text-[#009dff]/80 font-medium transition-colors">
                  View all {achievements.length} achievements
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>All Achievements</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">
                        {getCategoryName(category)}
                      </h3>
                      <div className="grid grid-cols-5 gap-3">
                        {categoryAchievements.map((achievement) => (
                          <AchievementItem key={achievement.id} achievement={achievement} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default AchievementsGrid;
