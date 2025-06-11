
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DayActivity {
  date: string;
  questionsCompleted: number;
  testsCompleted: number;
  examsCompleted: number;
}

const StudyCalendarHeatmap = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data - in real app this would come from API
  const mockActivityData: DayActivity[] = [
    { date: '2025-06-01', questionsCompleted: 5, testsCompleted: 0, examsCompleted: 0 },
    { date: '2025-06-02', questionsCompleted: 8, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-03', questionsCompleted: 12, testsCompleted: 0, examsCompleted: 0 },
    { date: '2025-06-04', questionsCompleted: 0, testsCompleted: 0, examsCompleted: 0 },
    { date: '2025-06-05', questionsCompleted: 35, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-06', questionsCompleted: 75, testsCompleted: 2, examsCompleted: 1 },
    { date: '2025-06-07', questionsCompleted: 18, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-08', questionsCompleted: 0, testsCompleted: 0, examsCompleted: 0 },
    { date: '2025-06-09', questionsCompleted: 25, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-10', questionsCompleted: 22, testsCompleted: 2, examsCompleted: 0 },
    { date: '2025-06-11', questionsCompleted: 16, testsCompleted: 1, examsCompleted: 1 },
  ];

  const getActivityLevel = (questionsCompleted: number): string => {
    if (questionsCompleted === 0) return 'bg-gray-100 border border-gray-200 hover:bg-gray-200';
    if (questionsCompleted <= 10) return 'bg-[#009dff]/30 border border-[#009dff]/40 hover:bg-[#009dff]/40';
    if (questionsCompleted <= 30) return 'bg-[#009dff]/60 border border-[#009dff]/70 hover:bg-[#009dff]/70';
    return 'bg-[#009dff] border border-[#009dff] hover:bg-[#009dff]/90';
  };

  const getTextColor = (questionsCompleted: number): string => {
    if (questionsCompleted === 0) return 'text-gray-600';
    if (questionsCompleted <= 10) return 'text-[#009dff] font-semibold';
    return 'text-white font-bold';
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const activity = mockActivityData.find(a => a.date === dateString) || {
        date: dateString,
        questionsCompleted: 0,
        testsCompleted: 0,
        examsCompleted: 0
      };
      days.push({ day, ...activity });
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  const isGateExamDate = (dateString: string) => {
    return dateString === '2026-03-14';
  };

  const hasActivity = (questionsCompleted: number, testsCompleted: number, examsCompleted: number) => {
    return questionsCompleted > 0 || testsCompleted > 0 || examsCompleted > 0;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm text-gray-700">{formatMonthYear(currentDate)}</h4>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-[#009dff]/10 hover:text-[#009dff]"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft size={12} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-[#009dff]/10 hover:text-[#009dff]"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight size={12} />
            </Button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-x-0.5 gap-y-1 mb-1">
          {weekDays.map(day => (
            <div key={day} className="text-xs text-gray-700 text-center py-1 font-semibold">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-x-0.5 gap-y-1">
          {days.map((dayData, index) => (
            <div key={index} className="flex justify-center">
              {dayData ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        w-10 h-10 rounded cursor-pointer transition-all duration-200 flex items-center justify-center text-sm
                        ${isGateExamDate(dayData.date) 
                          ? 'bg-green-500 border border-green-600 hover:bg-green-600 text-white font-bold' 
                          : getActivityLevel(dayData.questionsCompleted)
                        }
                        ${!isGateExamDate(dayData.date) ? getTextColor(dayData.questionsCompleted) : ''}
                        ${isToday(dayData.date) ? 'ring-2 ring-blue-600 ring-offset-1' : ''}
                      `}
                    >
                      {dayData.day}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="bg-white border border-gray-200 shadow-lg min-w-[200px] max-w-[300px] w-auto z-[9999] fixed"
                    avoidCollisions={true}
                    collisionPadding={16}
                    sideOffset={8}
                    align="center"
                    alignOffset={0}
                    sticky="always"
                  >
                    <div className="text-sm">
                      <div className="font-semibold mb-1 text-gray-900">
                        {new Date(dayData.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      {isGateExamDate(dayData.date) ? (
                        <div className="text-green-600 font-semibold whitespace-nowrap">GATE Exam 2026</div>
                      ) : hasActivity(dayData.questionsCompleted, dayData.testsCompleted, dayData.examsCompleted) ? (
                        <div className="space-y-0.5 whitespace-nowrap">
                          <div className="text-gray-700">Completed {dayData.questionsCompleted} questions</div>
                          <div className="text-gray-700">Completed {dayData.testsCompleted} tests</div>
                          <div className="text-gray-700">Completed {dayData.examsCompleted} exams</div>
                        </div>
                      ) : (
                        <div className="text-gray-500 whitespace-nowrap">No activity on this date.</div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="w-10 h-10" />
              )}
            </div>
          ))}
        </div>

        {/* Activity Level Legend */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200"></div>
            <div className="w-3 h-3 rounded bg-[#009dff]/30 border border-[#009dff]/40"></div>
            <div className="w-3 h-3 rounded bg-[#009dff]/60 border border-[#009dff]/70"></div>
            <div className="w-3 h-3 rounded bg-[#009dff] border border-[#009dff]"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StudyCalendarHeatmap;
