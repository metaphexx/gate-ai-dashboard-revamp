
import React from 'react';
import { Button } from '@/components/ui/button';

interface HistoryCardProps {
  title: string;
  date: string;
  description: string;
  feedback: string;
  attemptCount: number;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  date,
  description,
  feedback,
  attemptCount
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 w-full max-w-[400px]">
      {/* Title Row */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
          {date}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 leading-snug line-clamp-3">
        {description}
      </p>
      
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
          🔁 Feedback: {feedback}
        </span>
        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
          ✅ Attempt Count: {attemptCount}
        </span>
      </div>
      
      {/* Report Button */}
      <Button className="w-full mt-2">
        View Report
      </Button>
    </div>
  );
};

export default HistoryCard;
