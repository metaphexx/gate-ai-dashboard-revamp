
import React, { useState } from 'react';
import { Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StudyCalendarHeatmap from './StudyCalendarHeatmap';
import AchievementsGrid from './AchievementsGrid';

const StudyStreakCard = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'streak' | 'achievements'>('calendar');
  const dailyGoal = 5;
  const completedSessions = 3;
  const streakDays = 4;
  
  // Create streak dots array
  const streakDots = Array.from({ length: 5 }, (_, i) => i < streakDays);
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Study Progress</h3>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-4">
        <div className="flex">
          <Button
            variant={activeTab === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 mr-1 ${activeTab === 'calendar' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-100 hover:text-blue-600'}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </Button>
          <Button
            variant={activeTab === 'streak' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 mx-1 ${activeTab === 'streak' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-100 hover:text-blue-600'}`}
            onClick={() => setActiveTab('streak')}
          >
            Streak
          </Button>
          <Button
            variant={activeTab === 'achievements' ? 'default' : 'ghost'}
            size="sm"
            className={`flex-1 ml-1 ${activeTab === 'achievements' ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-blue-100 hover:text-blue-600'}`}
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
              <div className="text-lg font-bold text-blue-600">{streakDays} Days</div>
              <div className="text-xs text-gray-600">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-lg font-bold text-gray-700">12 Days</div>
              <div className="text-xs text-gray-600">Longest Streak</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'streak' && (
        <div className="space-y-4">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <Award size={28} className="text-blue-600 mb-2" />
            <div className="text-xl font-bold text-center">{streakDays}-Day Streak</div>
            <div className="flex items-center gap-1.5 mt-2">
              {streakDots.map((isActive, idx) => (
                <div 
                  key={idx} 
                  className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-full mr-3">
              <TrendingUp size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Daily Goal</p>
              <div className="mt-1.5 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(completedSessions / dailyGoal) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{completedSessions}/{dailyGoal} questions</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-lg font-bold text-blue-600">{streakDays} Days</div>
              <div className="text-xs text-gray-600">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-lg font-bold text-gray-700">12 Days</div>
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
