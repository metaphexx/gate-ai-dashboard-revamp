
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, FileText } from 'lucide-react';

interface HistoryCardProps {
  id: string;
  title: string;
  date: string;
  description: string;
  feedback: string;
  attemptCount: number;
  examType: 'mock' | 'practice';
  isRetakeable?: boolean;
  onRetake?: (id: string, examType: 'mock' | 'practice') => void;
  onViewReport?: (id: string) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  id,
  title,
  date,
  description,
  feedback,
  attemptCount,
  examType,
  isRetakeable = true,
  onRetake,
  onViewReport
}) => {
  const handleRetake = () => {
    if (onRetake) {
      onRetake(id, examType);
    }
  };

  const handleViewReport = () => {
    if (onViewReport) {
      onViewReport(id);
    }
  };

  // Format feedback status with better styling
  const getFeedbackStyle = () => {
    switch (feedback.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'skipped':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getFeedbackIcon = () => {
    switch (feedback.toLowerCase()) {
      case 'completed':
        return '✅';
      case 'skipped':
        return '⏭️';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 w-full max-w-[400px] hover:shadow-md transition-shadow">
      {/* Title Row */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900 leading-tight">{title}</h3>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {isRetakeable && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md whitespace-nowrap">
              Retakeable
            </span>
          )}
        </div>
      </div>
      
      {/* Date and Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
          {date}
        </span>
        <span className={`text-xs px-2 py-1 rounded-md ${getFeedbackStyle()}`}>
          {getFeedbackIcon()} {feedback}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 leading-snug line-clamp-3">
        {description}
      </p>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2">
        {isRetakeable && (
          <Button 
            className="flex-1 flex items-center gap-2" 
            onClick={handleRetake}
          >
            <RotateCcw className="h-4 w-4" />
            Retake Test
          </Button>
        )}
        <Button 
          variant="outline" 
          className="flex-1 flex items-center gap-2" 
          onClick={handleViewReport}
        >
          <FileText className="h-4 w-4" />
          View Report
        </Button>
      </div>
    </div>
  );
};

export default HistoryCard;
