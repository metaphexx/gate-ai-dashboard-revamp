
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  const userName = "Hari"; // This would come from user context in a real app
  
  // Calculate days remaining until March 14th, 2026 in GMT+8 timezone
  const calculateDaysRemaining = () => {
    const now = new Date();
    // Convert current time to GMT+8
    const gmt8Offset = 8 * 60; // GMT+8 in minutes
    const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
    const gmt8Time = new Date(now.getTime() + (localOffset + gmt8Offset) * 60 * 1000);
    
    // GATE exam date: March 14th, 2026 at 00:00 GMT+8
    const gateExamDate = new Date('2026-03-14T00:00:00+08:00');
    
    // Calculate difference in milliseconds
    const timeDiff = gateExamDate.getTime() - gmt8Time.getTime();
    
    // Convert to days and round down
    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysRemaining); // Ensure it doesn't go negative
  };
  
  const daysRemaining = calculateDaysRemaining();
  
  // Sample weekly tip content
  const weeklyTip = "Focus on Abstract Reasoning this week - your scores show room for improvement";
  
  return (
    <div className="bg-gradient-to-r from-[#0080ff] to-[#33a9ff] text-white rounded-xl overflow-hidden shadow-md h-full">
      <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between h-full gap-4">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome back, {userName}!</h2>
          <p className="text-sm sm:text-base opacity-90 mb-3">
            The next GATE exam is in {daysRemaining} days. Ready to continue your preparation?
          </p>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
            <Button variant="secondary" className="rounded-md text-[#009dff] text-sm sm:text-base px-3 sm:px-5 py-2 w-full lg:w-auto">
              <Play size={16} className="mr-2 flex-shrink-0" />
              <span className="truncate">Resume Last Session</span>
            </Button>
            <Button variant="outline" className="rounded-md bg-white/10 text-white border-white/20 hover:bg-white/20 text-sm sm:text-base px-3 sm:px-5 py-2 w-full lg:w-auto">
              <span className="truncate">Start New Practice</span>
              <ArrowRight size={16} className="ml-2 flex-shrink-0" />
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/3 w-full">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 w-full">
            <h3 className="text-xs sm:text-sm font-semibold uppercase mb-1">WEEKLY TIP</h3>
            <p className="text-xs sm:text-sm">{weeklyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
