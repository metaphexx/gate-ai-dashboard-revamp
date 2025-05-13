
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface TestCardProps {
  title: string;
  questions: number;
  duration: number;
  description: string;
  imagePath: string;
  isNew?: boolean;
  hasAI?: boolean;
}
const TestCard = ({
  title,
  questions,
  duration,
  description,
  imagePath,
  isNew = false,
  hasAI = false
}: TestCardProps) => {
  return <div className="w-full max-w-[350px] min-h-[400px] p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition flex flex-col justify-between">
      {/* Card image */}
      <div className="relative">
        <div className="h-[120px] w-full rounded-md mb-3 bg-cover bg-center" style={{
        backgroundImage: `url(${imagePath})`
      }}>
          <div className="flex justify-between p-2">
            <div>
              {isNew && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  New
                </span>}
              {hasAI && <span className="absolute top-3 left-3 z-10 text-[11px] font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  AI
                </span>}
            </div>
            <div className="bg-white rounded-md px-2 py-1 flex items-center">
              <Clock size={16} className="mr-1" />
              <span className="text-xs">{duration} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Meta */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-3">
          Q: {questions} · ⏱️ {duration} mins
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-snug mb-6">
        {description}
      </p>

      {/* CTA Button */}
      <Button className="w-full">
        Start Now
      </Button>
    </div>;
};
export default TestCard;
