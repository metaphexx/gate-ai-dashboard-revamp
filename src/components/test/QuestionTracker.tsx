
import React from 'react';
import { cn } from "@/lib/utils";
import { Flag } from 'lucide-react';

interface Question {
  id: number;
  prompt: string;
  options: string[];
  answer: string | null;
}

interface QuestionTrackerProps {
  questions: Question[];
  currentIndex: number;
  getStatus: (index: number) => 'blank' | 'answered' | 'flagged';
  onSelect: (index: number) => void;
}

const QuestionTracker = ({ questions, currentIndex, getStatus, onSelect }: QuestionTrackerProps) => {
  return (
    <div className="mb-8 overflow-visible">
      <div className="flex space-x-3 overflow-visible">
        {questions.map((question, index) => {
          const status = getStatus(index);
          return (
            <button
              key={question.id}
              onClick={() => onSelect(index)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full transition-all relative overflow-visible",
                index === currentIndex
                  ? 'bg-gradient-to-r from-[#009dff] to-[#80dfff] text-white shadow-lg shadow-blue-200' 
                  : status === 'flagged'
                    ? 'bg-white text-orange-600 border-2 border-orange-400'
                    : status === 'answered'
                      ? 'bg-blue-100 text-[#009dff]' 
                      : 'bg-gray-400 text-white hover:bg-gray-300'
              )}
              aria-label={`Question ${index + 1}`}
            >
              {index + 1}
              {status === 'flagged' && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center z-10">
                  <Flag className="w-3 h-3 text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-gray-400 mr-1"></span>
          <span>Not attempted</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-100 mr-1"></span>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-white border-2 border-orange-400 mr-1"></span>
          <span>Flagged</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionTracker;
