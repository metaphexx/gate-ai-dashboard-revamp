
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Check, X } from 'lucide-react';

const TierSummary = () => {
  const stats = {
    totalAttempted: 137,
    correct: 59,
    incorrect: 78,
    freeQuestions: 139,
    premiumQuestions: 300
  };
  
  // Calculate percentage for progress bar
  const correctPercentage = Math.round((stats.correct / stats.totalAttempted) * 100);
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Your Progress</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary-light text-primary px-3 py-1 rounded-full">Free Tier</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm">Questions Attempted</span>
          <span className="text-2xl font-bold">{stats.totalAttempted}</span>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Check size={14} className="text-accent" />
            <span className="text-gray-500 text-sm">Correct</span>
          </div>
          <span className="text-2xl font-bold">{stats.correct}</span>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <X size={14} className="text-destructive" />
            <span className="text-gray-500 text-sm">Incorrect</span>
          </div>
          <span className="text-2xl font-bold">{stats.incorrect}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{correctPercentage}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${correctPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="text-sm">
          <span className="font-medium">Free Access:</span> {stats.freeQuestions} questions
        </div>
        <Button size="sm" className="gap-1">
          <Crown size={14} />
          <span>Unlock {stats.premiumQuestions}+ Questions</span>
        </Button>
      </div>
    </div>
  );
};

export default TierSummary;
