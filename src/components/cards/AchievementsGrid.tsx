
import React from 'react';
import { 
  Trophy, Target, Zap, Calendar, Clock, TrendingUp, 
  Award, Star, Flame, Moon, Coffee, CheckCircle2,
  BarChart3, Timer, Medal
} from 'lucide-react';

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
  // Mock data - in real app this would come from API/user progress
  const achievements: Achievement[] = [
    // Practice Milestones
    { id: '1', title: 'Question Grinder', description: 'Completed 500 Questions', icon: <Target size={16} />, category: 'practice', isUnlocked: true },
    { id: '2', title: 'Quiz Explorer', description: 'Completed 20 Quizzes', icon: <CheckCircle2 size={16} />, category: 'practice', isUnlocked: true },
    { id: '3', title: 'Test Finisher', description: 'Completed 50 Tests', icon: <Award size={16} />, category: 'practice', isUnlocked: false },
    { id: '4', title: 'Exam Veteran', description: 'Completed 10 Exams', icon: <Medal size={16} />, category: 'practice', isUnlocked: false },
    { id: '5', title: 'Daily Starter', description: 'Completed activity for 7 days in a row', icon: <Calendar size={16} />, category: 'practice', isUnlocked: true },

    // Performance Milestones
    { id: '6', title: 'Accuracy Master', description: 'Achieved 90%+ accuracy on 5 quizzes', icon: <Star size={16} />, category: 'performance', isUnlocked: false },
    { id: '7', title: 'Perfect Streak', description: 'Achieved 100% accuracy in any full test', icon: <Trophy size={16} />, category: 'performance', isUnlocked: true },
    { id: '8', title: 'Comeback Kid', description: 'Improved accuracy by 15% over last 10 quizzes', icon: <TrendingUp size={16} />, category: 'performance', isUnlocked: false },
    { id: '9', title: 'Speed Demon', description: 'Completed quiz in under 50% of time', icon: <Zap size={16} />, category: 'performance', isUnlocked: true },
    { id: '10', title: 'Top 10%', description: 'Scored in top 10% on any exam', icon: <BarChart3 size={16} />, category: 'performance', isUnlocked: false },

    // Consistency/Streaks
    { id: '11', title: 'Streak Beginner', description: '3 days streak', icon: <Flame size={16} />, category: 'consistency', isUnlocked: true },
    { id: '12', title: 'Streak Master', description: '14 days streak', icon: <Flame size={16} />, category: 'consistency', isUnlocked: false },
    { id: '13', title: 'Streak Legend', description: '30 days streak', icon: <Flame size={16} />, category: 'consistency', isUnlocked: false },
    { id: '14', title: 'Weekend Warrior', description: 'Active on 4 consecutive weekends', icon: <Coffee size={16} />, category: 'consistency', isUnlocked: true },
    { id: '15', title: 'Night Owl', description: 'Completed activities after 9 PM for 7 days', icon: <Moon size={16} />, category: 'consistency', isUnlocked: false }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'practice': return 'text-blue-600';
      case 'performance': return 'text-green-600';
      case 'consistency': return 'text-orange-600';
      case 'special': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {achievements.slice(0, 12).map((achievement) => (
          <div
            key={achievement.id}
            className={`
              p-2 rounded-md text-center transition-all duration-200 hover:scale-105
              ${achievement.isUnlocked 
                ? 'bg-primary-light border border-primary/20' 
                : 'bg-gray-50 border border-gray-200 opacity-60'
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
        ))}
      </div>
      
      {achievements.length > 12 && (
        <div className="text-center">
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            View all {achievements.length} achievements
          </button>
        </div>
      )}
    </div>
  );
};

export default AchievementsGrid;
