
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Unlock, FileQuestion, Clock, BarChart, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left Section - Stats Overview (60% width) */}
        <div className="lg:w-3/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Your Progress</h3>
            <Badge variant="outline" className="bg-[#009dff]/10 text-[#009dff] px-2 sm:px-3 py-1 text-xs sm:text-sm">Free Tier</Badge>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col min-w-0">
              <span className="text-gray-500 text-xs sm:text-sm truncate">Questions Attempted</span>
              <span className="text-xl sm:text-2xl font-bold">{stats.totalAttempted}</span>
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-accent rounded-full flex-shrink-0"></div>
                <span className="text-gray-500 text-xs sm:text-sm truncate">Correct</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-accent">{stats.correct}</span>
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-destructive rounded-full flex-shrink-0"></div>
                <span className="text-gray-500 text-xs sm:text-sm truncate">Incorrect</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-destructive">{stats.incorrect}</span>
            </div>
            
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 rounded-full flex-shrink-0"></div>
                <span className="text-gray-500 text-xs sm:text-sm truncate">Unattempted</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-400">{stats.unattempted}</span>
            </div>
          </div>
        </div>
        
        {/* Right Section - Progress + Upsell (40% width) */}
        <div className="lg:w-2/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Progress</span>
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Info size={14} className="text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="p-2 space-y-1.5 w-56">
                      <div className="text-xs font-medium">Progress Legend:</div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-accent rounded-full"></div>
                          <span>Correct</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          <span>Incorrect</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span>Unattempted</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-[#4361EE] rounded-full"></div>
                          <span>Locked Questions</span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span>{correctPercentage}%</span>
            </div>
            
            {/* Multi-color segmented progress bar */}
            <div className="h-3 w-full flex rounded-full overflow-hidden">
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
                className="bg-[#4361EE]" 
                style={{ width: `${lockedPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm pt-1">
              <div className="text-gray-500">
                Free access: {stats.freeQuestions} questions
              </div>
              <div className="flex items-center gap-1 text-[#4361EE] font-medium">
                <Unlock size={14} />
                <span>{stats.premiumQuestions}+ locked</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    className="w-full gap-1.5 bg-[#009dff] hover:bg-[#009dff]/90 shadow-[0_0_10px_rgba(0,157,255,0.3)] hover:shadow-[0_0_15px_rgba(0,157,255,0.4)] transition-all"
                  >
                    <Crown size={15} />
                    <span>Unlock {stats.premiumQuestions}+ Questions</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Premium users unlock 2,000+ GATE-style questions across all sections.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex justify-center mt-1">
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">Most students upgrade within a week</span>
            </div>
            
            {/* Feature preview icons under CTA */}
            <div className="flex items-center justify-center flex-wrap mt-2 text-xs text-gray-500 gap-x-2 gap-y-1">
              <div className="flex items-center gap-1">
                <FileQuestion size={12} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Full-length mocks</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Clock size={12} className="flex-shrink-0" />
                <span className="whitespace-nowrap">Timed exams</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <BarChart size={12} className="flex-shrink-0" />
                <span className="whitespace-nowrap">2000+ Qs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierSummary;
