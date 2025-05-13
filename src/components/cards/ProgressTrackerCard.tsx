
import React from 'react';
import { Award, TrendingUp, Trophy, Medal } from 'lucide-react';

const ProgressTrackerCard = () => {
  const dailyGoal = 5;
  const completedSessions = 3;
  const streakDays = 4;
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Progress Tracker</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="p-2 bg-primary-light text-primary rounded-full mr-3">
            <TrendingUp size={18} />
          </div>
          <div>
            <p className="font-medium">Daily Sessions</p>
            <div className="mt-2 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${(completedSessions / dailyGoal) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{completedSessions}/{dailyGoal}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="p-2 bg-accent/10 text-accent rounded-full mr-3">
            <Award size={18} />
          </div>
          <div>
            <p className="font-medium">Study Streak</p>
            <p className="text-sm text-gray-500">You've studied {streakDays} days in a row!</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-2">Recent Achievements</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 p-3 bg-primary-light rounded-md text-center">
              <span className="text-2xl">🎯</span>
              <p className="text-xs font-medium mt-1">First Mock</p>
            </div>
            <div className="flex-1 p-3 bg-primary-light rounded-md text-center">
              <span className="text-2xl">⏱️</span>
              <p className="text-xs font-medium mt-1">Speed Master</p>
            </div>
            <div className="flex-1 p-3 bg-primary-light rounded-md text-center">
              <span className="text-2xl">🏆</span>
              <p className="text-xs font-medium mt-1">Top 10%</p>
            </div>
            <div className="flex-1 p-3 bg-primary-light rounded-md text-center">
              <span className="text-2xl">⭐</span>
              <p className="text-xs font-medium mt-1">Perfect Quiz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTrackerCard;
