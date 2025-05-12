
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Circle, Unlock } from 'lucide-react';

const TierSummary = () => {
  const stats = {
    totalAttempted: 137,
    correct: 59,
    incorrect: 78,
    unattempted: 2,
    freeQuestions: 139,
    premiumQuestions: 2000
  };
  
  // Calculate percentages for progress bar
  const totalQuestions = stats.freeQuestions + stats.premiumQuestions;
  const correctPercentage = Math.round((stats.correct / totalQuestions) * 100);
  const incorrectPercentage = Math.round((stats.incorrect / totalQuestions) * 100);
  const unattemptedPercentage = Math.round((stats.unattempted / totalQuestions) * 100);
  const lockedPercentage = 100 - correctPercentage - incorrectPercentage - unattemptedPercentage;
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Stats Overview (60% width) */}
        <div className="md:w-3/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Progress</h3>
            <Badge variant="outline" className="bg-[#009dff]/10 text-[#009dff] px-3 py-1">Free Tier</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Questions Attempted</span>
              <span className="text-2xl font-bold">{stats.totalAttempted}</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Check size={16} className="text-accent" />
                <span className="text-gray-500 text-sm">Correct</span>
              </div>
              <span className="text-2xl font-bold text-accent">{stats.correct}</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <X size={16} className="text-destructive" />
                <span className="text-gray-500 text-sm">Incorrect</span>
              </div>
              <span className="text-2xl font-bold text-destructive">{stats.incorrect}</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Circle size={16} className="text-gray-400" />
                <span className="text-gray-500 text-sm">Unattempted</span>
              </div>
              <span className="text-2xl font-bold text-gray-400">{stats.unattempted}</span>
            </div>
          </div>
        </div>
        
        {/* Right Section - Progress + Upsell (40% width) */}
        <div className="md:w-2/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{correctPercentage}%</span>
            </div>
            
            {/* Multi-color segmented progress bar */}
            <div className="h-4 w-full flex rounded-full overflow-hidden">
              <div 
                className="bg-accent"
                style={{ width: `${correctPercentage}%` }}
              ></div>
              <div 
                className="bg-destructive"
                style={{ width: `${incorrectPercentage}%` }}
              ></div>
              <div 
                className="bg-gray-300"
                style={{ width: `${unattemptedPercentage}%` }}
              ></div>
              <div 
                className="bg-amber-300"
                style={{ width: `${lockedPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-sm flex justify-between">
              <div>
                <span className="font-medium">Free Access:</span> {stats.freeQuestions} questions
              </div>
              <div className="flex items-center gap-1">
                <Unlock size={14} className="text-amber-600" />
                <span className="text-amber-600 font-medium">
                  {stats.premiumQuestions}+ locked
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button size="sm" className="w-full gap-1 bg-[#009dff] hover:bg-[#009dff]/90">
              <Crown size={14} />
              <span>Unlock {stats.premiumQuestions}+ Questions</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierSummary;
