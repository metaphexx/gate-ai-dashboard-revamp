
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  const userName = "Hari"; // This would come from user context in a real app
  const daysRemaining = 47;
  // Sample weekly tip content
  const weeklyTip = "Focus on Abstract Reasoning this week - your scores show room for improvement";
  
  return (
    <div className="bg-gradient-to-r from-[#0080ff] to-[#33a9ff] text-white rounded-xl overflow-hidden shadow-md">
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {userName}!</h2>
          <p className="text-base opacity-90 mb-3">
            Your next GATE exam is in {daysRemaining} days. Ready to continue your preparation?
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-md text-[#009dff] text-base px-5 py-2">
              <Play size={18} className="mr-2" />
              Resume Last Session
            </Button>
            <Button variant="outline" className="rounded-md bg-white/10 text-white border-white/20 hover:bg-white/20 text-base px-5 py-2">
              Start New Practice
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 w-full">
            <h3 className="text-sm font-semibold uppercase mb-1">WEEKLY TIP</h3>
            <p className="text-sm">{weeklyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
