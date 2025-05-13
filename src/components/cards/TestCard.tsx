
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface TestCardProps {
  title: string;
  questions: number;
  duration: number;
  description: string;
  imagePath: string;
  isNew?: boolean;
}

const TestCard = ({
  title,
  questions,
  duration,
  description,
  imagePath,
  isNew = false
}: TestCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 max-w-[320px] hover:shadow-md transition-all flex flex-col justify-between">
      {/* Card image */}
      <div 
        className="h-[100px] w-full rounded-md mb-3 bg-cover bg-center"
        style={{ backgroundImage: `url(${imagePath})` }}
      >
        <div className="flex justify-between p-2">
          <div>
            {isNew && (
              <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="bg-white rounded-md px-2 py-1 flex items-center">
            <Clock size={16} className="mr-1" />
            <span className="text-xs">{duration} min</span>
          </div>
        </div>
      </div>

      {/* Title and Meta */}
      <h3 className="text-md font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-3">
        Q: {questions} · ⏱️ {duration} mins
      </p>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-snug line-clamp-2 mb-4">
        {description}
      </p>

      {/* CTA Button */}
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2">
        Start Now
      </Button>
    </div>
  );
};

export default TestCard;
