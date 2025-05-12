
import React from 'react';
import { Play, ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  // Sample weekly tip content
  const weeklyTip = "Focus on timed practice to improve your speed in quantitative sections";
  
  return (
    <div className="bg-primary text-white rounded-xl overflow-hidden">
      <div className="p-5 flex flex-col md:flex-row md:items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={20} />
            <h2 className="text-lg font-bold">Weekly Tip</h2>
          </div>
          <p className="text-sm opacity-90 mb-4">
            {weeklyTip}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="rounded-md text-primary">
              Resume Session
              <ArrowRight size={14} className="ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-md bg-white/10 text-white border-white/20 hover:bg-white/20">
              New Practice
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur rounded-lg p-2 mx-4">
            <div className="bg-primary-foreground text-primary rounded-full p-2 cursor-pointer hover:bg-opacity-90 transition-all">
              <Play size={20} fill="currentColor" />
            </div>
            <p className="text-xs mt-1 text-center text-white/80">Tutorial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
