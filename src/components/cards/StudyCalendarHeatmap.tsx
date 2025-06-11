
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    { date: '2025-06-05', questionsCompleted: 15, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-06', questionsCompleted: 20, testsCompleted: 2, examsCompleted: 1 },
    { date: '2025-06-07', questionsCompleted: 18, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-08', questionsCompleted: 0, testsCompleted: 0, examsCompleted: 0 },
    { date: '2025-06-09', questionsCompleted: 25, testsCompleted: 1, examsCompleted: 0 },
    { date: '2025-06-10', questionsCompleted: 22, testsCompleted: 2, examsCompleted: 0 },
    { date: '2025-06-11', questionsCompleted: 16, testsCompleted: 1, examsCompleted: 1 },
  ];

  const getActivityLevel = (questionsCompleted: number, testsCompleted: number, examsCompleted: number): string => {
    const totalActivity = questionsCompleted + (testsCompleted * 5) + (examsCompleted * 10);
    
    if (totalActivity === 0) return 'bg-gray-100 border-gray-200';
    if (totalActivity <= 8) return 'bg-blue-100 border-blue-200';
    if (totalActivity <= 20) return 'bg-blue-300 border-blue-400';
    return 'bg-primary border-primary';
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

  const days = getDaysInMonth(currentDate);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <TooltipProvider>
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm text-gray-700">{formatMonthYear(currentDate)}</h4>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft size={12} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight size={12} />
            </Button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {weekDays.map(day => (
            <div key={day} className="text-xs text-gray-500 text-center py-1 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((dayData, index) => (
            <div key={index} className="flex justify-center">
              {dayData ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        w-7 h-7 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center border
                        ${getActivityLevel(dayData.questionsCompleted, dayData.testsCompleted, dayData.examsCompleted)}
                        ${isToday(dayData.date) ? 'ring-2 ring-primary ring-offset-1' : ''}
                      `}
                    >
                      <span className="text-xs font-medium text-gray-700">
                        {dayData.day}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-gray-200 shadow-lg">
                    <div className="text-sm">
                      <div className="font-semibold mb-1 text-gray-900">
                        {new Date(dayData.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-gray-700">Completed {dayData.questionsCompleted} questions</div>
                      <div className="text-gray-700">Completed {dayData.testsCompleted} tests</div>
                      <div className="text-gray-700">Completed {dayData.examsCompleted} exams</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="w-7 h-7" />
              )}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StudyCalendarHeatmap;
