
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  return (
    <div className="flex bg-primary text-white rounded-xl overflow-hidden">
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-1">Hi Hari,</h2>
        <p className="text-lg font-medium mb-3">Welcome To GATE AI Question Bank!</p>
        <p className="text-sm opacity-90 mb-5">
          Select a section to get started or resume your last session to continue your preparation.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="rounded-md text-primary">
            Resume Session
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button variant="outline" className="rounded-md bg-white/10 text-white border-white/20 hover:bg-white/20">
            Start New Practice
          </Button>
        </div>
      </div>
      <div className="hidden md:flex items-center p-4">
        <div className="bg-white/10 backdrop-blur rounded-lg p-2">
          <div className="bg-primary-foreground text-primary rounded-full p-3 cursor-pointer hover:bg-opacity-90 transition-all">
            <Play size={24} fill="currentColor" />
          </div>
          <p className="text-xs mt-2 text-center text-white/80">Watch Tutorial</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
