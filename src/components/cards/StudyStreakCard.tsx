
import React from 'react';
import { Award, TrendingUp, Trophy, Medal, Star } from 'lucide-react';

const StudyStreakCard = () => {
  const dailyGoal = 5;
  const completedSessions = 3;
  const streakDays = 4;
  
  // Create streak dots array
  const streakDots = Array.from({ length: 5 }, (_, i) => i < streakDays);
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Study Streak</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col items-center p-4 bg-primary-light rounded-lg">
          <Award size={28} className="text-primary mb-2" />
          <div className="text-xl font-bold text-center">{streakDays}-Day Streak</div>
          <div className="flex items-center gap-1.5 mt-2">
            {streakDots.map((isActive, idx) => (
              <div 
                key={idx} 
                className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-primary' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="p-2 bg-primary-light text-primary rounded-full mr-3">
            <TrendingUp size={18} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Daily Goal</p>
            <div className="mt-1.5 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(completedSessions / dailyGoal) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{completedSessions}/{dailyGoal} questions</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-100">
          <h4 className="font-medium text-sm mb-2">Latest Achievements</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 p-2 bg-primary-light rounded-md text-center">
              <span className="text-lg">🎯</span>
              <p className="text-xs font-medium mt-1">First Mock</p>
            </div>
            <div className="flex-1 p-2 bg-primary-light rounded-md text-center">
              <span className="text-lg">⏱️</span>
              <p className="text-xs font-medium mt-1">Speed Master</p>
            </div>
            <div className="flex-1 p-2 bg-primary-light rounded-md text-center">
              <span className="text-lg">🏆</span>
              <p className="text-xs font-medium mt-1">Top Scorer</p>
            </div>
            <div className="flex-1 p-2 bg-primary-light rounded-md text-center">
              <span className="text-lg">⭐</span>
              <p className="text-xs font-medium mt-1">Perfect Quiz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStreakCard;
