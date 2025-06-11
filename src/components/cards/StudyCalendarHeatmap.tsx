
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DayActivity {
  date: string;
  questionsCompleted: number;
  questionsReviewed: number;
  testsCompleted: number;
}

interface TooltipData extends DayActivity {
  x: number;
  y: number;
}

const StudyCalendarHeatmap = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<TooltipData | null>(null);

  // Mock data - in real app this would come from API
  const mockActivityData: DayActivity[] = [
    { date: '2025-06-01', questionsCompleted: 5, questionsReviewed: 2, testsCompleted: 0 },
    { date: '2025-06-02', questionsCompleted: 8, questionsReviewed: 3, testsCompleted: 1 },
    { date: '2025-06-03', questionsCompleted: 12, questionsReviewed: 5, testsCompleted: 0 },
    { date: '2025-06-04', questionsCompleted: 0, questionsReviewed: 0, testsCompleted: 0 },
    { date: '2025-06-05', questionsCompleted: 15, questionsReviewed: 8, testsCompleted: 1 },
    { date: '2025-06-06', questionsCompleted: 20, questionsReviewed: 10, testsCompleted: 2 },
    { date: '2025-06-07', questionsCompleted: 18, questionsReviewed: 6, testsCompleted: 1 },
    { date: '2025-06-08', questionsCompleted: 0, questionsReviewed: 0, testsCompleted: 0 },
    { date: '2025-06-09', questionsCompleted: 25, questionsReviewed: 12, testsCompleted: 1 },
    { date: '2025-06-10', questionsCompleted: 22, questionsReviewed: 8, testsCompleted: 2 },
    { date: '2025-06-11', questionsCompleted: 16, questionsReviewed: 4, testsCompleted: 1 },
  ];

  const getActivityLevel = (questionsCompleted: number): string => {
    if (questionsCompleted === 0) return 'bg-gray-100 border border-gray-200';
    if (questionsCompleted <= 5) return 'bg-blue-100 border border-blue-200';
    if (questionsCompleted <= 15) return 'bg-blue-300 border border-blue-400';
    return 'bg-blue-500 border border-blue-600';
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
        questionsReviewed: 0,
        testsCompleted: 0
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

  const handleDayHover = (dayData: any, event: React.MouseEvent) => {
    if (dayData && dayData.day) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoveredDay({
        ...dayData,
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-base text-gray-900">{formatMonthYear(currentDate)}</h4>
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
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-xs text-gray-500 text-center py-1 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayData, index) => (
          <div
            key={index}
            className={`
              w-6 h-6 rounded-sm cursor-pointer transition-all duration-200 hover:scale-110 relative flex items-center justify-center
              ${dayData ? getActivityLevel(dayData.questionsCompleted) : ''}
              ${dayData && isToday(dayData.date) ? 'ring-2 ring-primary ring-offset-1' : ''}
              ${!dayData ? 'bg-transparent' : ''}
            `}
            onMouseEnter={(e) => dayData && handleDayHover(dayData, e)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            {dayData && (
              <span className="text-xs font-medium text-gray-700">
                {dayData.day}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs rounded-md px-3 py-2 shadow-lg pointer-events-none"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div className="font-semibold mb-1">
            {new Date(hoveredDay.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div>Completed {hoveredDay.questionsCompleted} questions</div>
          <div>Reviewed {hoveredDay.questionsReviewed} questions</div>
          {hoveredDay.testsCompleted > 0 && (
            <div>Took {hoveredDay.testsCompleted} test{hoveredDay.testsCompleted > 1 ? 's' : ''}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyCalendarHeatmap;
