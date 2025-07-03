
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Clock, BookOpen, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  condition: (stats: UserStats) => boolean;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface UserStats {
  lessonsCompleted: number;
  totalWatchTime: number;
  streak: number;
  averageScore: number;
  notesCount: number;
  quizzesTaken: number;
}

interface AchievementSystemProps {
  stats: UserStats;
}

const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Getting Started',
    description: 'Complete your first lesson',
    icon: <BookOpen className="w-5 h-5" />,
    type: 'bronze',
    condition: (stats) => stats.lessonsCompleted >= 1,
    unlocked: false
  },
  {
    id: 'five-lessons',
    title: 'Dedicated Learner',
    description: 'Complete 5 lessons',
    icon: <Target className="w-5 h-5" />,
    type: 'silver',
    condition: (stats) => stats.lessonsCompleted >= 5,
    unlocked: false
  },
  {
    id: 'perfect-quiz',
    title: 'Quiz Master',
    description: 'Score 100% on a quiz',
    icon: <Star className="w-5 h-5" />,
    type: 'gold',
    condition: (stats) => stats.averageScore >= 100,
    unlocked: false
  },
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Take 10 notes',
    icon: <BookOpen className="w-5 h-5" />,
    type: 'bronze',
    condition: (stats) => stats.notesCount >= 10,
    unlocked: false
  },
  {
    id: 'time-watcher',
    title: 'Time Investment',
    description: 'Watch 2 hours of content',
    icon: <Clock className="w-5 h-5" />,
    type: 'silver',
    condition: (stats) => stats.totalWatchTime >= 7200, // 2 hours in seconds
    unlocked: false
  },
  {
    id: 'streak-master',
    title: 'Consistency Champion',
    description: 'Maintain a 7-day study streak',
    icon: <Zap className="w-5 h-5" />,
    type: 'gold',
    condition: (stats) => stats.streak >= 7,
    unlocked: false
  }
];

const AchievementSystem: React.FC<AchievementSystemProps> = ({ stats }) => {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);
  const { toast } = useToast();

  // Load achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userAchievements');
    if (saved) {
      setUserAchievements(JSON.parse(saved));
    } else {
      setUserAchievements(achievements);
    }
  }, []);

  // Check for new achievements
  useEffect(() => {
    if (userAchievements.length === 0) return;

    const updatedAchievements = userAchievements.map(achievement => {
      if (!achievement.unlocked && achievement.condition(stats)) {
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
      }
      return achievement;
    });

    const newlyUnlocked = updatedAchievements.filter(
      (achievement, index) => achievement.unlocked && !userAchievements[index].unlocked
    );

    if (newlyUnlocked.length > 0) {
      setUserAchievements(updatedAchievements);
      setNewUnlocks(newlyUnlocked);
      localStorage.setItem('userAchievements', JSON.stringify(updatedAchievements));

      // Show toast for new achievements
      newlyUnlocked.forEach(achievement => {
        toast({
          title: "🎉 Achievement Unlocked!",
          description: `${achievement.title}: ${achievement.description}`,
        });
      });
    }
  }, [stats, userAchievements, toast]);

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const unlockedCount = userAchievements.filter(a => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements ({unlockedCount}/{userAchievements.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {userAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? `${getTypeColor(achievement.type)} opacity-100`
                  : 'bg-gray-50 text-gray-400 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={achievement.unlocked ? '' : 'opacity-50'}>
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs mt-1">{achievement.description}</p>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs mt-2 opacity-75">
                      Unlocked {achievement.unlockedAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.unlocked && (
                  <Badge variant="outline" className={getTypeColor(achievement.type)}>
                    {achievement.type}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {unlockedCount === 0 && (
          <div className="text-center text-gray-500 py-4">
            Complete lessons and take quizzes to unlock achievements!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementSystem;
