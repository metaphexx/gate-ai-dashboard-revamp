import React, { useState } from 'react';
import { Award, TrendingUp, Settings, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import StudyCalendarHeatmap from './StudyCalendarHeatmap';
import AchievementsGrid from './AchievementsGrid';

const StudyStreakCard = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'streak' | 'achievements'>('calendar');
  const [dailyGoal, setDailyGoal] = useState(5);
  const [streakGoal, setStreakGoal] = useState(5);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [tempDailyGoal, setTempDailyGoal] = useState(dailyGoal);
  const [tempStreakGoal, setTempStreakGoal] = useState(streakGoal);
  
  const completedSessions = 0; // Changed to 0
  const streakDays = 4;
  
  // Create streak dots array based on current goal
  const streakDots = Array.from({ length: streakGoal }, (_, i) => i < streakDays);

  const handleUpdateGoals = () => {
    setDailyGoal(tempDailyGoal);
    setStreakGoal(tempStreakGoal);
    setIsGoalDialogOpen(false);
  };

  const handleCancelGoals = () => {
    setTempDailyGoal(dailyGoal);
    setTempStreakGoal(streakGoal);
    setIsGoalDialogOpen(false);
  };
  
  return (
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold">Study Progress</h3>
        <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-[#009dff]/10 hover:text-[#009dff]"
            >
              <Settings size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Goals</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="daily-goal" className="text-sm font-medium">
                  Daily Question Goal
                </label>
                <Input
                  id="daily-goal"
                  type="number"
                  min="1"
                  max="50"
                  value={tempDailyGoal}
                  onChange={(e) => setTempDailyGoal(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="streak-goal" className="text-sm font-medium">
                  Streak Goal (days)
                </label>
                <Input
                  id="streak-goal"
                  type="number"
                  min="3"
                  max="30"
                  value={tempStreakGoal}
                  onChange={(e) => setTempStreakGoal(Math.max(3, parseInt(e.target.value) || 3))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCancelGoals}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateGoals}
                  className="bg-[#009dff] hover:bg-[#009dff]/90"
                >
                  Update Goals
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-3 sm:mb-4">
        <div className="flex gap-0.5 sm:gap-1">
          <Button
            variant={activeTab === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 text-xs sm:text-sm px-1 sm:px-3 h-8 ${activeTab === 'calendar' ? 'bg-[#009dff] hover:bg-[#009dff]/90' : 'hover:bg-[#009dff]/10 hover:text-[#009dff]'}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </Button>
          <Button
            variant={activeTab === 'streak' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 text-xs sm:text-sm px-1 sm:px-3 h-8 ${activeTab === 'streak' ? 'bg-[#009dff] hover:bg-[#009dff]/90' : 'hover:bg-[#009dff]/10 hover:text-[#009dff]'}`}
            onClick={() => setActiveTab('streak')}
          >
            Streak
          </Button>
          <Button
            variant={activeTab === 'achievements' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 text-xs sm:text-sm px-1 sm:px-3 h-8 ${activeTab === 'achievements' ? 'bg-[#009dff] hover:bg-[#009dff]/90' : 'hover:bg-[#009dff]/10 hover:text-[#009dff]'}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <StudyCalendarHeatmap />
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame size={16} className="text-[#009dff]" />
                <div className="text-lg font-bold text-[#009dff]">{streakDays} Days</div>
              </div>
              <div className="text-xs text-gray-600">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap size={16} className="text-gray-700" />
                <div className="text-lg font-bold text-gray-700">12 Days</div>
              </div>
              <div className="text-xs text-gray-600">Longest Streak</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'streak' && (
        <div className="space-y-4">
          <div className="flex flex-col items-center p-4 bg-[#009dff]/10 rounded-lg">
            <Award size={28} className="text-[#009dff] mb-2" />
            <div className="text-xl font-bold text-center">{streakDays}-Day Streak</div>
            <div className="text-xs text-gray-600 mb-2">Goal: {streakGoal} days</div>
            <div className="flex items-center gap-1.5">
              {streakDots.map((isActive, idx) => (
                <div 
                  key={idx} 
                  className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#009dff]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 bg-[#009dff]/10 text-[#009dff] rounded-full mr-3">
              <TrendingUp size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Daily Goal</p>
              <div className="mt-1.5 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-[#009dff] h-2 rounded-full" 
                    style={{ width: `${(completedSessions / dailyGoal) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{completedSessions}/{dailyGoal} questions</span>
              </div>
              {completedSessions === 0 && (
                <div className="mt-1 text-xs text-red-500 font-medium whitespace-nowrap">
                  🚀 Start Now! Complete your daily goal today!
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame size={16} className="text-[#009dff]" />
                <div className="text-lg font-bold text-[#009dff]">{streakDays} Days</div>
              </div>
              <div className="text-xs text-gray-600">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap size={16} className="text-gray-700" />
                <div className="text-lg font-bold text-gray-700">12 Days</div>
              </div>
              <div className="text-xs text-gray-600">Longest Streak</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <AchievementsGrid />
      )}
    </div>
  );
};

export default StudyStreakCard;
