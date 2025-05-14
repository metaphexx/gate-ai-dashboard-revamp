
import React from 'react';
import { Clock } from 'lucide-react';

interface QuestionTimerProps {
  time: number;
  isWarning: boolean;
}

const QuestionTimer = ({ time, isWarning }: QuestionTimerProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`
      bg-white shadow-md rounded-full px-4 py-2 
      flex items-center
      border ${isWarning ? 'border-red-200' : 'border-blue-100'}
      ${isWarning ? 'animate-pulse' : ''}
    `}>
      <Clock className={`h-5 w-5 mr-2 ${isWarning ? 'text-red-500' : 'text-[#009dff]'}`} />
      <span 
        className={`font-medium ${isWarning ? 'text-red-500' : 'text-[#009dff]'}`}
      >
        {formatTime(time)}
      </span>
    </div>
  );
};

export default QuestionTimer;
