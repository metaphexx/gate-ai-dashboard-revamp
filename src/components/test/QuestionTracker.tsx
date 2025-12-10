
import React from 'react';
import { cn } from "@/lib/utils";
import { Flag } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <div className="mb-4 md:mb-8 overflow-visible mt-4 md:mt-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 md:space-x-3 pb-2">
          {questions.map((question, index) => {
            const status = getStatus(index);
            return (
              <button
                key={question.id}
                onClick={() => onSelect(index)}
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-all relative overflow-visible text-sm md:text-base",
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
                  <span className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-4 h-4 md:w-5 md:h-5 bg-orange-500 rounded-full flex items-center justify-center z-10">
                    <Flag className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-2 flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2 text-xs text-gray-500">
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-400 mr-1"></span>
          <span>Not attempted</span>
        </div>
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-100 mr-1"></span>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white border-2 border-orange-400 mr-1"></span>
          <span>Flagged</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionTracker;
