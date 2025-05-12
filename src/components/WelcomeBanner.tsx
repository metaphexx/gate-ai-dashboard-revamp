
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  const userName = "Hari"; // This would come from user context in a real app
  const daysRemaining = 47;
  // Sample weekly tip content
  const weeklyTip = "Focus on Abstract Reasoning this week - your scores show room for improvement";
  
  return (
    <div className="bg-[#009dff] text-white rounded-xl overflow-hidden">
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-1">Welcome back, {userName}!</h2>
          <p className="text-sm opacity-90 mb-4">
            Your next GATE exam is in {daysRemaining} days. Ready to continue your preparation?
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="rounded-md text-[#009dff]">
              <Play size={16} className="mr-1" />
              Resume Last Session
            </Button>
            <Button variant="outline" size="sm" className="rounded-md bg-white/10 text-white border-white/20 hover:bg-white/20">
              Start New Practice
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/3 flex flex-col items-end">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 w-full">
            <h3 className="text-sm font-semibold uppercase mb-2">Weekly Tip</h3>
            <p className="text-sm">{weeklyTip}</p>
          </div>
          
          <div className="mt-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 w-12 h-12 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
              <Play size={24} fill="white" className="ml-1" />
            </div>
            <p className="text-xs mt-1 text-center text-white/80">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
